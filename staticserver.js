//Import the express module
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fs = require('fs');
const formidable = require('formidable');
const cookieParser = require("cookie-parser");
const validator=require("email-validator");
const nodemailer=require("nodemailer");
const passwordValidator=require("password-validator");
let schema= new passwordValidator();                     

// ***********************************************************************************************************************************************
// schematic for password validator

schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                 // Must have digits
.has().not().spaces()                           // Should not have spaces



// ***************************************************************************************************************************************************
//The express module is a function. When it is executed it returns an app object
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());



// ***************************************************************************************************************************************************
//Create a connection pool with the user details
const connectionPool = mysql.createPool({
    connectionLimit: 1,
    host: "localhost",
    user: "root",
    password: "",
    database: "db",
    debug: false

});




// **********************************************************************************************************************************************8
//Set up express to serve static files from the directory called 'public'
app.use(express.static("public"));
app.post('/register', handlePostRequest);
app.post('/upload', handleuploadrequest);
app.get('/login', handleLogInRequest);
app.get("/logout", logout);
app.get("/fresh", loadfreshcontent);
app.get("/upvote", upvote);
app.get("/downvote", downvote);
app.get("/hot", loadhotcontent);
app.get("/comment",loadcomments);
app.get("/submitComment",submitComments);
app.get("/funny",load);
app.get("/cats",load);
app.get("/darkHumour",load);
app.get("/dogs",load);
app.get("/school",load);
app.get("/myprofile",loadProfile);
app.get("/delete",deletePost);
app.get("/updateProfile",updateUserProfile);



// ***************************************************************************************************************************************************
// update user profile

function updateUserProfile(request,response){

    let sql="UPDATE users SET FullName='"+request.query.FN+"',dob='"+request.query.date+"',Gender='"+request.query.gender+"' WHERE username='"+request.query.id+"'";

    connectionPool.query(sql, (err, result) => {
        if (err) {//Check for errors
            console.error("Error executing query: " + JSON.stringify(err));
        }
        else {
           response.send("Account Updated Succesfully!");
           
        }
    });

}


// **************************************************************************************************************************************************
// delete post function 

function deletePost(request,response){
    let sql="DELETE FROM images WHERE id="+request.query.id; 
   connectionPool.query(sql, (err, result) => {
    if (err) {//Check for errors
        console.error("Error executing query: " + JSON.stringify(err));
    }
    else {
       response.send("Post Deleted Succesfully!");
      
    }
});
}


// ***************************************************************************************************************************************************
// load user profile

function loadProfile(request,response){
    let sql = "SELECT images.*,users.FullName,users.dob,users.Gender,users.username FROM users left JOIN images ON images.user_id_fk=users.id WHERE users.username='"+request.cookies.username+"'";

    connectionPool.query(sql, (err, result) => {
        if (err) {//Check for errors
            console.error("Error executing query: " + JSON.stringify(err));
        }
        else {
           
            let object = JSON.stringify(result);
            response.send(object);
          
        }
    });

}


// *******************************************************************************************************************************************************
// submit a comment


function submitComments(request,response){
    let sql="INSERT INTO comments(user_id_fk,comment,image_id_fk) VALUES ((SELECT id FROM users WHERE username='"+request.cookies.username+"'),'"+request.query.comment+"',"+request.query.id+")";
    connectionPool.query(sql,(err,result)=>{
        
        if(err){
            console.error("Error executing query: " + JSON.stringify(err));
            response.send("You are not logged in or there is a problem With the Server, please try again later.")
        }
        else{
            // schow comments is called when a comment has been submitted 
            loadcomments(request,response);
        }

    });
}



// *******************************************************************************************************************************************************
// load comment function

function loadcomments(request,response){
     let sql="SELECT comments.comment,comments.image_id_fk , users.FullName  FROM comments INNER JOIN users ON comments.user_id_fk=users.id WHERE image_id_fk="+request.query.id+"  ORDER BY date,time ASC "
     connectionPool.query(sql, (err, result) => {
        if (err) {//Check for errors
            console.error("Error executing query: " + JSON.stringify(err));
            response.send("You are not logged in or there is a problem With the Server, please try again later.")
        }
        else {
            let object = JSON.stringify(result);
           
            response.send(object);
            
        }
    });
}



// *******************************************************************************************************************************************************
// upvote begin

async function upvote(request, response) {
    let p = new Promise((resolve, reject) => {
    let sql = "SELECT id FROM users WHERE username='" + request.cookies.username + "'";
    connectionPool.query(sql, (err, result) => {
        if (err) {//Check for errors
            console.error("Error executing query: " + JSON.stringify(err));
        }
        else {
           
            let object = JSON.stringify(result);
            let obj = JSON.parse(object);
            obj.forEach(element => {
               
                let query = "SELECT * FROM votes WHERE friends_id_fk=" + element["id"] + " AND image_id_fk=" + request.query.id;
                connectionPool.query(query, (error, res) => {
                    if (error) {//Check for errors
                        console.error("Error executing query: " + JSON.stringify(error));
                    }
                    else {
                        let queryres = JSON.stringify(res);
                        let queryarr = JSON.parse(queryres);
                       
                        if (res == "" || res == null) {
                            query2 = "INSERT INTO votes (upvote, downvote, image_id_fk, friends_id_fk) " +
                                "       VALUES (1,0," + request.query.id + "," + element["id"] + ")";
                            connectionPool.query(query2, (er, re) => {
                                if (er) {//Check for errors
                                    console.error("Error executing query: " + JSON.stringify(er));
                                    reject(er);
                                }
                                else {
                                   
                                   resolve(re);
                                }
                            });
                        } else {

                            queryarr.forEach(el => {
                                if (el["downvote"] == 1) {
                                    query2 = "DELETE FROM votes WHERE id=" + el["id"];
                                    connectionPool.query(query2, (er, re) => {
                                        if (er) {//Check for errors
                                            console.error("Error executing query: " + JSON.stringify(er));
                                            reject(er);
                                        }
                                        else {
                                           
                                           resolve(re);
                                        }
                                    });

                                }else if(el["upvote"]==1){
                                    query2 = "UPDATE votes SET upvote=1 WHERE id=" + el["id"];
                                    connectionPool.query(query2, (er, re) => {
                                        if (er) {//Check for errors
                                            console.error("Error executing query: " + JSON.stringify(er));
                                            reject(er);
                                        }
                                        else {
                                           
                                           resolve(re);
                                        }
                                    });
                                }

                            });
                        }
                    }
                });
            });
        }
    });
});
p.then(() => {

// check votes begin for upvote, then display votes
    let sql="SELECT COUNT(upvote) FROM votes WHERE image_id_fk="+request.query.id+" AND upvote=1";
    connectionPool.query(sql, (err, result) => {
        if (err) {//Check for errors
            console.error("Error executing query: " + JSON.stringify(err));
        }
        else {
            let sql2="SELECT COUNT(downvote) FROM votes WHERE image_id_fk="+request.query.id+" AND downvote=1";
            let object = JSON.stringify(result);
            let obj = JSON.parse(object);
            obj.forEach(element => {
            connectionPool.query(sql2, (error, res) => {
                if (error) {//Check for errors
                    console.error("Error executing query: " + JSON.stringify(error));
                }
                else {
                    let obj=JSON.stringify(res);
                    let object=JSON.parse(obj);
                    object.forEach(el =>{
                       
                    let sql3="UPDATE images SET no_upv="+element["COUNT(upvote)"]+",no_down="+el["COUNT(downvote)"]+" WHERE id="+request.query.id;
                    connectionPool.query(sql3, (er, re) => {
                        if (err) {//Check for errors
                            console.error("Error executing query: " + JSON.stringify(er));
                        }
                        else {
                           
                            response.send(JSON.stringify(element["COUNT(upvote)"]-el["COUNT(downvote)"]));

                        }
                    });
                    });
                }
            });
            
        });
        }
        
    });


}).catch(() => { console.log("ERROR") });
// check votes end
}
// upvote function ends


// *******************************************************************************************************************************************************
// downvote function

async function downvote(request, response) {
    let p = new Promise((resolve, reject) => {
        let sql = "SELECT id FROM users WHERE username='" + request.cookies.username + "'";
        connectionPool.query(sql, (err, result) => {
            if (err) {//Check for errors
                console.error("Error executing query: " + JSON.stringify(err));
            }
            else {
              
                let object = JSON.stringify(result);
                let obj = JSON.parse(object);
                obj.forEach(element => {
                   
                    let query = "SELECT * FROM votes WHERE friends_id_fk=" + element["id"] + " AND image_id_fk=" + request.query.id;
                    connectionPool.query(query, (error, res) => {
                        if (error) {//Check for errors
                            console.error("Error executing query: " + JSON.stringify(error));
                        }
                        else {
                            let queryres = JSON.stringify(res);
                            let queryarr = JSON.parse(queryres);
                            
                            if (res == "" || res == null) {
                                query2 = "INSERT INTO votes (upvote, downvote, image_id_fk, friends_id_fk) " +
                                    "       VALUES (0,1," + request.query.id + "," + element["id"] + ")";
                                connectionPool.query(query2, (er, re) => {
                                    if (er) {//Check for errors
                                        console.error("Error executing query: " + JSON.stringify(er));
                                        reject(er);
                                    }
                                    else {
                                      
                                       resolve(re);
                                    }
                                });
                            } else {
    
                                queryarr.forEach(el => {
                                    if (el["upvote"] == 1) {
                                        query2 = "DELETE FROM votes WHERE id=" + el["id"];
                                        connectionPool.query(query2, (er, re) => {
                                            if (er) {//Check for errors
                                                console.error("Error executing query: " + JSON.stringify(er));
                                                reject(er);
                                            }
                                            else {
                                              
                                               resolve(re);
                                            }
                                        });
    
                                    }else if(el["downvote"]==1){
                                        query2 = "UPDATE votes SET downvote=1 WHERE id=" + el["id"];
                                        connectionPool.query(query2, (er, re) => {
                                            if (er) {//Check for errors
                                                console.error("Error executing query: " + JSON.stringify(er));
                                                reject(er);
                                            }
                                            else {
                                               
                                               resolve(re);
                                            }
                                        });
                                    }
    
                                });
                            }
                        }
                    });
                });
            }
        });
    });
    p.then(() => {
    
    // check votes begin, checks if votes have been made, if yes, updates the points
        let sql="SELECT COUNT(upvote) FROM votes WHERE image_id_fk="+request.query.id+" AND upvote=1";
        connectionPool.query(sql, (err, result) => {
            if (err) {//Check for errors
                console.error("Error executing query: " + JSON.stringify(err));
            }
            else {
                let sql2="SELECT COUNT(downvote) FROM votes WHERE image_id_fk="+request.query.id+" AND downvote=1";
                let object = JSON.stringify(result);
                let obj = JSON.parse(object);
                obj.forEach(element => {
                connectionPool.query(sql2, (error, res) => {
                    if (error) {//Check for errors
                        console.error("Error executing query: " + JSON.stringify(error));
                    }
                    else {
                        let obj=JSON.stringify(res);
                        let object=JSON.parse(obj);
                        object.forEach(el =>{
                          
                        let sql3="UPDATE images SET no_upv="+element["COUNT(upvote)"]+",no_down="+el["COUNT(downvote)"]+" WHERE id="+request.query.id;
                        connectionPool.query(sql3, (er, re) => {
                            if (err) {//Check for errors
                                console.error("Error executing query: " + JSON.stringify(er));
                            }
                            else {
                             
                                response.send(JSON.stringify(element["COUNT(upvote)"]-el["COUNT(downvote)"]));
    
                            }
                        });
                        });
                    }
                });
                
            });
            }
            
        });
    
    
    }).catch(() => { console.log("ERROR") });
    // check votes end
}
// downvote function ends



// *******************************************************************************************************************************************************
// load SCHOOL, DARKHUMOR, CATSS, DOGS, FUNNY page posts code

function load(request,response){
    let sql = "SELECT * FROM images WHERE category="+request.query.category+" ORDER BY id DESC";

    connectionPool.query(sql, (err, result) => {
        if (err) {//Check for errors
            console.error("Error executing query: " + JSON.stringify(err));
        }
        else {
           
            let object = JSON.stringify(result);
            response.send(object);
        }
    });

}
// *******************************************************************************************************************************************************
// load fresh page posts

function loadfreshcontent(request, response) {
    let sql = "SELECT * FROM images WHERE no_upv-no_down<20 ORDER BY id DESC";

    connectionPool.query(sql, (err, result) => {
        if (err) {//Check for errors
            console.error("Error executing query: " + JSON.stringify(err));
        }
        else {
            
            let object = JSON.stringify(result);
           response.send(object);
            response.end();
        }
    });

}


// *******************************************************************************************************************************************************
// load hot page posts

function loadhotcontent(request, response) {
    let sql = "SELECT * FROM images WHERE no_upv-no_down>=20 ORDER BY id DESC";

    connectionPool.query(sql, (err, result) => {
       
        
        if (err) {//Check for errors
            console.error("Error executing query: " + JSON.stringify(err));
        }
        else {
           
            let object = JSON.stringify(result);
           response.send(object);
            response.end();
        }
    
        
    
    });

}




// *******************************************************************************************************************************************************
// log in code

function handleLogInRequest(request, response) {

    //Output the data sent to the server

    //Build query
    let sql = "SELECT * FROM users " +
        "       WHERE username=" + '"' + request.query.usr.toLowerCase() + '"';



    //Execute query and output results
    connectionPool.query(sql, (err, result) => {
        if (err) {//Check for errors
            console.error("Error executing query: " + JSON.stringify(err));
            response.send("Problem With the Server, please try again later.")
        }
        else {
            let object = JSON.stringify(result);
            let obj = JSON.parse(object);
            if (obj[0].password == request.query.pass) {
                response.cookie("username", request.query.usr).send("Logged In Succesfully,</h3>\n Redirecting in a few moments. If it takes too long, please press ");
            } else {
                response.send("Wrong username or password, please try again!")

            }

        }
       
    });


}
// log in code end



// *******************************************************************************************************************************************************
// log out

function logout(request, response) {
    response.clearCookie("username").send();
    response.end();

}



// *******************************************************************************************************************************************************
// upload form start(photo plus other details)

async function handleuploadrequest(request, response) {
    let form = new formidable.IncomingForm();
    
    let newpath = "http://localhost/public/Images/";
    let newpath2="./Public/Images/";
    form.parse(request, function (err, fields, files) {
        let oldpath = files.filetoupload.path;
        let extension=files.filetoupload.name.split(".").pop();
        if(extension=="jpg" || extension=="jpeg" || extension=="png" || extension=="gif" || extension=="mp4"){
        let title = fields.title;
        let category = fields.category;
        let p = new Promise((resolve, reject) => {


            let sql = "SELECT MAX(id) FROM images";
            connectionPool.query(sql, (err, result) => {
                if (err) {//Check for errors
                    console.error("Error executing query: " + JSON.stringify(err));
                    reject("Failed");
                }
                else {
                    let obj = JSON.stringify(result);
                    let object = JSON.parse(obj);
                    newpath = "http://localhost/public/Images/" + (object[0]['MAX(id)'] + 1) +"."+ extension; //change image name for database
                    newpath2="./Public/Images/" + (object[0]['MAX(id)'] + 1) +"."+ extension;  //change image name for file stored in the machine
                    resolve(newpath2);
                }
            });
        });

        p.then((newpath2) => {
           
            sql = "INSERT INTO images(Path,title,category,user_id_fk) VALUES ('"+newpath+"','"+title+"','"+category+"',(SELECT id FROM users WHERE username='"+request.cookies.username+"'))" ;
            connectionPool.query(sql, (err, result) => {
                if (err) {//Check for errors
                    console.error("Error executing query: " + JSON.stringify(err));
                }
                else {
                    console.log(JSON.stringify(result));
                   
                }
            });

          
            fs.rename(oldpath, newpath2, function (err) {
                if (err) throw (err);
                response.send("<span style='color: green'><h3>Post Uploaded Succesfully," +
                    "</h3>\n Redirecting in a few moments. If it takes too long, please press <a href='http://localhost:8080/'>here.</a>" +
                    "<span><script>setTimeout(function(){ window.location.replace('http://localhost:8080/');},3000);</script>");
                // response.send("uploadsuccess");
                response.end();

               
            
            });
        

        }).catch(() => { console.log("ERROR") });
    }else{
        response.send("<span><h1>Wrong File Format! Please try Again!</h1></span><script>setTimeout(function(){ window.location.replace('http://localhost:8080/');},3000);</script>");
    }
    });
}

// upload photo end



// *******************************************************************************************************************************************************
// register start

function handlePostRequest(request, response) {
    
    let newUser = request.body;
  

    
    if(validator.validate(newUser.username) && schema.validate(newUser.pass)){ //CHECKS IF USERNAME AND PASSWORD ARE VALID

    //Build query
    let sql = "INSERT INTO users (FullName, dob, Gender, username, password) " +
        "       VALUES ('" + newUser.username + "', '" + newUser.dateofbirth + "', '" + newUser.gend + "', '" + newUser.username.toLowerCase() + "', '" + newUser.pass + "')";

    //Execute query and output results
    connectionPool.query(sql, (err, result) => {
        if (err) {//Check for errors
            console.error("Error executing query: " + JSON.stringify(err));
            response.send("Username already exists");
        }
        else {
           
            //Finish off the interaction.
            response.send("User added successfully.");

            // SEND EMAIL TO THE EMAIL INPUTTED BY THE USER

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'CW3WEBDEV@gmail.com',
                  pass: '1234@Middlesex'
                }
              });
              
              var mailOptions = {
                from: 'CW3WEBDEV@gmail.com',
                to: newUser.username,
                subject: 'Register Confirm',
                text: 'Thank you for registering with M.E.M.E.S. Hope you have a great time within the comunity.Your username is :'+newUser.username+', and the password is :'+newUser.pass+' This content was created by Paul-Lucian Cosareanu M00600835'
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
        }
    });
    }else{
        
        response.send("You have not entered a valid email or a valid password, please try again.");
    }

}
// register end



//Start the app listening on port 8080
app.listen(8080, () => {
    console.log("server started at 8080 press control button + c to stop");
});




