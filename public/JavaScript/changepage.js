

//change website title function

function changeTitleWeb(menuChange){

  document.getElementById("titleWeb").innerHTML=menuChange;          

}



//********************************************************************************************************************************************************** */
//change fresh page


function ChangeFresh() {
    // document.getElementsByClassName("active").className="menu";
    let x = document.getElementById("form");
    let y=document.getElementById("banner");
    let z=document.getElementById("rightadds");
    let w=document.getElementById("verticalmenu");

    document.getElementById("hot").className = "menu";
    document.getElementById("fresh").className = "menu active";
    // document.getElementById("logout").className = "menu";
    document.getElementById("hot2").className="left-menu";
    document.getElementById("fresh2").className="left-menu active";
    document.getElementById("cats").className="left-menu";
    document.getElementById("dogs").className="left-menu";
    document.getElementById("school").className="left-menu";
    document.getElementById("funny").className="left-menu";
    document.getElementById("darkhumor").className="left-menu";

    document.getElementById("upload").className = "menu";
    document.getElementById("photosFresh").style.display="block";
    document.getElementById("post-container").style.display="block";
    document.getElementById("photosHot").style.display="none";
    document.getElementById("photosCats").style.display="none";
    document.getElementById("photosDarkHumour").style.display="none";
    document.getElementById("photosDogs").style.display="none";
    document.getElementById("photosSchool").style.display="none";
    document.getElementById("photosFunny").style.display="none";

    if(document.cookie!=""){
      document.getElementById("register").style.display="none";
      document.getElementById("login").style.display="none";
      document.getElementById("myprofile").style.display="block";
      document.getElementById("logout").style.display="block";
      document.getElementById("upload").style.display="block";
    }else{
      document.getElementById("myprofile").style.display="none";
      document.getElementById("logout").style.display="none";
      document.getElementById("myprofile").style.display="none";
      document.getElementById("upload").style.display="none";
    
    }
   
    document.getElementById("uploadform").style.display="none";
      x.style.display = "none";
      y.style.display="block";
      z.style.display="block";
      w.style.display="block";
      document.getElementById("success").style.display="none";
   changeTitleWeb("Fresh");



      let xhttp=new XMLHttpRequest();

      // extract user data from html file form
      
          // when reply is received from the server the following happens
           xhttp.onreadystatechange=function(){
          if(this.readyState==4 && this.status==200){
             // document.getElementById("photosFresh").innerHTML=this.responseText;
             let obj = JSON.parse(xhttp.responseText);
              console.log(obj);
              let htmlStr="";
              obj.forEach(element => {
                  let extension=element["Path"].split(".").pop();
                  if(extension=="jpg" || extension=="png" || extension=="jpeg"|| extension=="gif"){
                  htmlStr+=('<div class="photo-titleContainer" id="title"><h4>Category: ' + element["category"] + '<br>' + element["title"] + '</h4></div><div class="photo-container" id="photo"><img src="' + element["Path"] + '" alt="post" height="100%" width="100%"></div><div class="photo-buttons" id="photo-buttons"><div class="points" id="points' + element["id"] + '"><h4>Points:' + (element["no_upv"] - element["no_down"]) + '</h4></div>' +
                      '<br><button type="button" id="' + element["id"] + '" class="up" onclick="upvote(this.id),setTimeout(checkPoints(this.id), 1000);"></button><button type="button"  onclick="downvote(this.id)" class="down"id="' + element["id"] + '"></button><button type="button" class="comment" onclick="showCommentWindow(this.id)" id="' + element["id"] + '"></button><br></div></div>');
  
                 // console.log(request.cookies.username);
              }else if(extension=="mp4"){
                  htmlStr+=('<div class="photo-titleContainer" id="title"><h4>Category: ' + element["category"] + '<br>' + element["title"] + '</h4></div><div class="photo-container" id="photo"><video title="videoPost" width="100%" height="fit-content" controls><source src="' + element["Path"] + '"  type="video/mp4"></video></div><div class="photo-buttons" id="photo-buttons"><div class="points" id="points' + element["id"] + '"><h4>Points:' + (element["no_upv"] - element["no_down"]) + '</h4></div>' +
                  '<br><button type="button" id="' + element["id"] + '" class="up" onclick="upvote(this.id),setTimeout(checkPoints(this.id), 1000);"></button><button type="button"  onclick="downvote(this.id)" class="down"id="' + element["id"] + '"></button><button type="button" class="comment" onclick="showCommentWindow(this.id)" id="' + element["id"] + '"></button><br></div></div>');
  
              }
              });
              document.getElementById("photosFresh").innerHTML=htmlStr;
          }else{
              document.getElementById("photosFresh").innerHTML="Error with the server";
          }
           };
          xhttp.open("GET","/fresh",true);
          xhttp.setRequestHeader("Content-type", "application/json");
          xhttp.send();



  }



//******************************************************************************************************************** */
  //change hot page


  function ChangeHot() {

    // document.getElementsByClassName("active").className="menu";
    let x = document.getElementById("form");
    let y=document.getElementById("banner");
    let z=document.getElementById("rightadds");
    let w=document.getElementById("verticalmenu");
    changeTitleWeb("Hot");
    document.getElementById("hot").className = "menu active";
    document.getElementById("fresh").className = "menu";
    document.getElementById("hot2").className="left-menu active";
    document.getElementById("fresh2").className="left-menu";
    document.getElementById("cats").className="left-menu";
    document.getElementById("dogs").className="left-menu";
    document.getElementById("school").className="left-menu";
    document.getElementById("funny").className="left-menu";
    document.getElementById("darkhumor").className="left-menu";

    document.getElementById("photosFresh").style.display="none";
    document.getElementById("post-container").style.display="block";
    document.getElementById("photosHot").style.display="block";
    document.getElementById("upload").className = "menu ";
    document.getElementById("photosCats").style.display="none";
    document.getElementById("photosDarkHumour").style.display="none";
    document.getElementById("photosDogs").style.display="none";
    document.getElementById("photosSchool").style.display="none";
    document.getElementById("photosFunny").style.display="none";

    if(document.cookie!=""){
      document.getElementById("register").style.display="none";
      document.getElementById("login").style.display="none";
      document.getElementById("myprofile").style.display="block";
      document.getElementById("logout").style.display="block";
      document.getElementById("upload").style.display="block";
    
    }else{
      document.getElementById("myprofile").style.display="none";
      document.getElementById("logout").style.display="none";
      document.getElementById("myprofile").style.display="none";
      document.getElementById("upload").style.display="none";

    }


    document.getElementById("uploadform").style.display="none";
    document.getElementById("loginform").style.display="none";
      x.style.display = "none";
      y.style.display="block";
      z.style.display="block";
      w.style.display="block";
      document.getElementById("success").style.display="none";

      
      let xhttp=new XMLHttpRequest();

      // extract user data from html file form
      
          // when reply is received from the server the following happens
           xhttp.onreadystatechange=function(){
          if(this.readyState==4 && this.status==200){
            //  document.getElementById("photosHot").innerHTML=this.responseText;
            let obj = JSON.parse(xhttp.responseText);
            let htmlStr="";
            console.log(obj);
            obj.forEach(element => {
                let extension=element["Path"].split(".").pop();
                if(extension=="jpg" || extension=="png" || extension=="jpeg"|| extension=="gif"){
                htmlStr+=('<div class="photo-titleContainer" id="title"><h4>Category: ' + element["category"] + '<br>' + element["title"] + '</h4></div><div class="photo-container" id="photo"><img src="' + element["Path"] + '" alt="post" height="100%" width="100%"></div><div class="photo-buttons" id="photo-buttons"><div class="points" id="points' + element["id"] + '"><h4>Points:' + (element["no_upv"] - element["no_down"]) + '</h4></div>' +
                    '<br><button type="button" id="' + element["id"] + '" class="up" onclick="upvote(this.id),setTimeout(checkPoints(this.id), 1000);"></button><button type="button"  onclick="downvote(this.id)" class="down"id="' + element["id"] + '"></button><button type="button" class="comment" onclick="showCommentWindow(this.id)" id="' + element["id"] + '"></button><br></div></div>');

                //console.log(request.cookies.username);
            }else if(extension=="mp4"){
                htmlStr+=('<div class="photo-titleContainer" id="title"><h4>Category: ' + element["category"] + '<br>' + element["title"] + '</h4></div><div class="photo-container" id="photo"><video title="videoPost" width="100%" height="fit-content" controls><source src="' + element["Path"] + '"  type="video/mp4"></video></div><div class="photo-buttons" id="photo-buttons"><div class="points" id="points' + element["id"] + '"><h4>Points:' + (element["no_upv"] - element["no_down"]) + '</h4></div>' +
                '<br><button type="button" id="' + element["id"] + '" class="up" onclick="upvote(this.id),setTimeout(checkPoints(this.id), 1000);"></button><button type="button"  onclick="downvote(this.id)" class="down"id="' + element["id"] + '"></button><button type="button" class="comment" onclick="showCommentWindow(this.id)" id="' + element["id"] + '"></button><br></div></div>');

            }
            });
            document.getElementById("photosHot").innerHTML=htmlStr;
          }else{
              document.getElementById("photosHot").innerHTML="Server error";
          }
           };
          xhttp.open("GET","/hot",true);
          xhttp.setRequestHeader("Content-type", "application/json");
          xhttp.send();

  }



//************************************************************************************************************************** */
  //change upload page


  function ChangeUpload() {
    document.getElementById("register").className = "menu";
    document.getElementById("login").className = "menu";
    document.getElementById("myprofile").className = "menu";
    document.getElementById("hot").className = "menu";
    document.getElementById("fresh").className = "menu";
    document.getElementById("upload").className = "menu active";
    document.getElementById("logout").className = "menu";
    document.getElementById("hot2").className="left-menu";
    document.getElementById("fresh2").className="left-menu";
    document.getElementById("cats").className="left-menu";
    document.getElementById("dogs").className="left-menu";
    document.getElementById("school").className="left-menu";
    document.getElementById("funny").className="left-menu";
    document.getElementById("darkhumor").className="left-menu";
   changeTitleWeb("Upload");

    document.getElementById("form").style.display="none";
    document.getElementById("banner").style.display="none";
    document.getElementById("rightadds").style.display="none";
    document.getElementById("verticalmenu").style.display="none";
    document.getElementById("loginform").style.display="none";
    document.getElementById("uploadform").style.display="block";
    document.getElementById("success").style.display="none";
    document.getElementById("photosFresh").style.display="none";
    document.getElementById("post-container").style.display="none";
    document.getElementById("photosHot").style.display="none";
    document.getElementById("photosCats").style.display="none";
    document.getElementById("photosDarkHumour").style.display="none";
    document.getElementById("photosDogs").style.display="none";
    document.getElementById("photosSchool").style.display="none";
    document.getElementById("photosFunny").style.display="none";
  }



//******************************************************************************************************************************************** */
  //change register page


  function ChangeRegister() {
    
    let x = document.getElementById("form");
    let y=document.getElementById("banner");
    let z=document.getElementById("rightadds");
    let w=document.getElementById("verticalmenu");

    document.getElementById("register").className = "menu active";
    document.getElementById("login").className = "menu";
    document.getElementById("myprofile").className = "menu";
    document.getElementById("hot").className = "menu";
    document.getElementById("fresh").className = "menu";
    document.getElementById("upload").className = "menu";
    document.getElementById("logout").className = "menu";
    document.getElementById("hot2").className="left-menu";
    document.getElementById("fresh2").className="left-menu";
    document.getElementById("photosFresh").style.display="none";
    document.getElementById("post-container").style.display="none";
    document.getElementById("photosHot").style.display="none";
    document.getElementById("photosCats").style.display="none";
    document.getElementById("photosDarkHumour").style.display="none";
    document.getElementById("photosDogs").style.display="none";
    document.getElementById("photosSchool").style.display="none";
    document.getElementById("photosFunny").style.display="none";
    changeTitleWeb("Register")
   document.getElementById("loginform").style.display="none";
      x.style.display = "block";
      y.style.display="none";
      z.style.display="none";
      w.style.display="none";
      document.getElementById("uploadform").style.display="none";
      document.getElementById("success").style.display="none";
   
  }







//************************************************************************************************************************************************ */
  //change log in page


  function ChangeLogIn() {
    
    document.getElementById("register").className = "menu";
    document.getElementById("login").className = "menu active";
    document.getElementById("myprofile").className = "menu";
    document.getElementById("hot").className = "menu";
    document.getElementById("fresh").className = "menu";
    document.getElementById("upload").className = "menu";
    document.getElementById("logout").className = "menu";
    document.getElementById("hot2").className="left-menu";
    document.getElementById("fresh2").className="left-menu";
    document.getElementById("cats").className="left-menu";
    document.getElementById("dogs").className="left-menu";
    document.getElementById("school").className="left-menu";
    document.getElementById("funny").className="left-menu";
    document.getElementById("darkhumor").className="left-menu";
changeTitleWeb("Log In")

    document.getElementById("form").style.display="none";
    document.getElementById("banner").style.display="none";
    document.getElementById("rightadds").style.display="none";
    document.getElementById("verticalmenu").style.display="none";
    document.getElementById("loginform").style.display="block";
    document.getElementById("uploadform").style.display="none";
    document.getElementById("success").style.display="none";
    document.getElementById("photosFresh").style.display="none";
    document.getElementById("post-container").style.display="none";
    document.getElementById("photosHot").style.display="none";
    document.getElementById("photosCats").style.display="none";
    document.getElementById("photosDarkHumour").style.display="none";
    document.getElementById("photosDogs").style.display="none";
    document.getElementById("photosSchool").style.display="none";
    document.getElementById("photosFunny").style.display="none";

  }

//****************************************************************************************************************** */
  //change success upload page 

function changeSuccess(){

  document.getElementById("register").className = "menu";
    document.getElementById("login").className = "menu";
    document.getElementById("myprofile").className = "menu";
    document.getElementById("hot").className = "menu";
    document.getElementById("fresh").className = "menu";
    document.getElementById("upload").className = "menu";
    document.getElementById("logout").className = "menu";
    document.getElementById("hot2").className="left-menu";
    document.getElementById("fresh2").className="left-menu";
    document.getElementById("cats").className="left-menu";
    document.getElementById("dogs").className="left-menu";
    document.getElementById("school").className="left-menu";
    document.getElementById("funny").className="left-menu";
    document.getElementById("darkhumor").className="left-menu";
changeTitleWeb("Success");

    document.getElementById("form").style.display="none";
    document.getElementById("banner").style.display="none";
    document.getElementById("rightadds").style.display="none";
    document.getElementById("verticalmenu").style.display="none";
    document.getElementById("loginform").style.display="none";
    document.getElementById("uploadform").style.display="none";
    document.getElementById("success").style.display="block";
    document.getElementById("photosFresh").style.display="none";
    document.getElementById("post-container").style.display="none";
    document.getElementById("photosHot").style.display="none";
    
}


//************************************************************************************************************************************* */
// change myprofile


  function ChangeMyProfile() {
     // document.getElementsByClassName("active").className="menu";
     let x = document.getElementById("form");
     let y=document.getElementById("banner");
     let z=document.getElementById("rightadds");
     let w=document.getElementById("verticalmenu");
 
     document.getElementById("hot").className = "menu";
     document.getElementById("fresh").className = "menu";
     // document.getElementById("logout").className = "menu";
     document.getElementById("hot2").className="left-menu";
     document.getElementById("fresh2").className="left-menu";
     document.getElementById("cats").className="left-menu";
     document.getElementById("dogs").className="left-menu";
     document.getElementById("school").className="left-menu";
     document.getElementById("funny").className="left-menu";
     document.getElementById("darkhumor").className="left-menu";
     changeTitleWeb("MyProfile");
     document.getElementById("upload").className = "menu";
     document.getElementById("photosFresh").style.display="block";
     document.getElementById("post-container").style.display="block";
     document.getElementById("photosHot").style.display="none";
     document.getElementById("formedit").style.display="block";
 
     if(document.cookie!=""){
       document.getElementById("register").style.display="none";
       document.getElementById("login").style.display="none";
       document.getElementById("myprofile").style.display="block";
       document.getElementById("logout").style.display="block";
       document.getElementById("upload").style.display="block";
     }else{
       document.getElementById("myprofile").style.display="none";
       document.getElementById("logout").style.display="none";
       document.getElementById("myprofile").style.display="none";
       document.getElementById("upload").style.display="none";
     
     }
    
     document.getElementById("uploadform").style.display="none";
       x.style.display = "none";
       y.style.display="block";
       z.style.display="block";
       w.style.display="block";
       document.getElementById("success").style.display="none";
    changeTitleWeb("MyProfile");
 let counter=0;
 let htmlStr="";
 
       let xhttp=new XMLHttpRequest();
 
       // extract user data from html file form
       
           // when reply is received from the server the following happens
            xhttp.onreadystatechange=function(){
           if(this.readyState==4 && this.status==200){
              //  document.getElementById("photosFresh").innerHTML=this.responseText;
               let obj=JSON.parse(xhttp.responseText);
               obj.forEach(element => {
                if(counter==0){
//console.log(element["dob"]);

                htmlStr=htmlStr+('    '+
              '  <form>'+
               '  <div class="container">'+
               ' <h1>Edit Details/ Posts:</h1>'+
               '  <p>Please edit any field and Submit to change details:</p>'+
               '  <hr />'+
               '  <b>Full Name*</b>'+
               '  <input type="text" value="'+element["FullName"]+'" id="fullnameUpdate" required />'+
               '  <b>Gender*</b>'+
               '  <input type="text" value="'+element["Gender"]+'" id="genderUpdate" required />'+
               '  <b>Date of Birth*</b>'+
               '  <input type="date" value="'+element["dob"]+'" id="dateofbirthUpdate" required />'+
               '  <hr />'+
               '  <button type="button" id="'+element["username"]+'" onclick="updateProfile(this.id)" class="registerbtn">'+
               '      Edit'+
               '  </button>'+
               '  </div>'+
               '  <div id="serverresponseupdate"></div>'+
               '  </div>'+
               '  </form>'+
               '  ');
counter=counter+1;


                }
                if(element["Path"]!=null){
                let extension=element["Path"].split(".").pop();
                if(extension=="jpg" || extension=="png" || extension=="jpeg"|| extension=="gif"){
                htmlStr=htmlStr+('<div class="photo-titleContainer" id="title"><h4>Category: ' + element["category"] + '<br>' + element["title"] + '</h4></div><div class="photo-container" id="photo"><img src="' + element["Path"] + '" alt="post" height="100%" width="100%"></div><div class="photo-buttons" id="photo-buttons"><div class="points" id="points' + element["id"] + '"><h4>Points:' + (element["no_upv"] - element["no_down"]) + '</h4></div>' +
                    '<br><button type="button" id="' + element["id"] + '" class="up" onclick="upvote(this.id),setTimeout(checkPoints(this.id), 1000);"></button><button type="button"  onclick="downvote(this.id)" class="down"id="' + element["id"] + '"></button><button type="button" class="comment" onclick="showCommentWindow(this.id)" id="' + element["id"] + '"></button><button type="button" class="delete" onclick="deletePost(this.id)" id="' + element["id"] + '"></button><br></div></div>');

               // console.log(request.cookies.username);
            }else if(extension=="mp4"){
                htmlStr=htmlStr+('<div class="photo-titleContainer" id="title"><h4>Category: ' + element["category"] + '<br>' + element["title"] + '</h4></div><div class="photo-container" id="photo"><video title="videoPost" width="100%" height="fit-content" controls><source src="' + element["Path"] + '"  type="video/mp4"></video></div><div class="photo-buttons" id="photo-buttons"><div class="points" id="points' + element["id"] + '"><h4>Points:' + (element["no_upv"] - element["no_down"]) + '</h4></div>' +
                '<br><button type="button" id="' + element["id"] + '" class="up" onclick="upvote(this.id),setTimeout(checkPoints(this.id), 1000);"></button><button type="button"  onclick="downvote(this.id)" class="down"id="' + element["id"] + '"></button><button type="button" class="comment" onclick="showCommentWindow(this.id)" id="' + element["id"] + '"></button><button type="button" class="delete" onclick="deletePost(this.id)" id="' + element["id"] + '"></button><br></div></div>');

            }
        }
            });
          document.getElementById("photosFresh").innerHTML=htmlStr;

           }else{
               document.getElementById("photosFresh").innerHTML="Error from the Server";
           }
            };
           xhttp.open("GET","/myprofile",true);
           xhttp.setRequestHeader("Content-type", "application/json");
           xhttp.send();
 
 
 
  }




//********************************************************************************************************************************************* */
  // Change Schoool


  function changeSchool(){
    let x = document.getElementById("form");
    let y=document.getElementById("banner");
    let z=document.getElementById("rightadds");
    let w=document.getElementById("verticalmenu");
    changeTitleWeb("School");
    document.getElementById("hot").className = "menu";
    document.getElementById("fresh").className = "menu";
    document.getElementById("hot2").className="left-menu";
    document.getElementById("fresh2").className="left-menu";
    document.getElementById("cats").className="left-menu";
    document.getElementById("dogs").className="left-menu";
    document.getElementById("school").className="left-menu active";
    document.getElementById("funny").className="left-menu";
    document.getElementById("darkhumor").className="left-menu";

    document.getElementById("post-container").style.display="block";
    document.getElementById("photosHot").style.display="none";
    document.getElementById("photosFresh").style.display="block";
    
    document.getElementById("upload").className = "menu ";

    if(document.cookie!=""){
      document.getElementById("register").style.display="none";
      document.getElementById("login").style.display="none";
      document.getElementById("myprofile").style.display="block";
      document.getElementById("logout").style.display="block";
      document.getElementById("upload").style.display="block";
    
    }else{
      document.getElementById("myprofile").style.display="none";
      document.getElementById("logout").style.display="none";
      document.getElementById("myprofile").style.display="none";
      document.getElementById("upload").style.display="none";

    }


    document.getElementById("uploadform").style.display="none";
    document.getElementById("loginform").style.display="none";
      x.style.display = "none";
      y.style.display="block";
      z.style.display="block";
      w.style.display="block";
      document.getElementById("success").style.display="none";

      
      let xhttp=new XMLHttpRequest();

      // extract user data from html file form
      
          // when reply is received from the server the following happens
           xhttp.onreadystatechange=function(){
          if(this.readyState==4 && this.status==200){
            serverResp("School",xhttp.responseText);
          }else{
              document.getElementById("photosFresh").innerHTML="<h3>Error within the Server</h3>";
          }
           };
          xhttp.open("GET","/School?category='School'",true);
          xhttp.setRequestHeader("Content-type", "application/json");
          xhttp.send();
  }



//****************************************************************************************************************************** */
// Change Funny


  function changeFunny(){
    let x = document.getElementById("form");
    let y=document.getElementById("banner");
    let z=document.getElementById("rightadds");
    let w=document.getElementById("verticalmenu");
    changeTitleWeb("Funny");
    document.getElementById("hot").className = "menu";
    document.getElementById("fresh").className = "menu";
    document.getElementById("hot2").className="left-menu";
    document.getElementById("fresh2").className="left-menu";
    document.getElementById("cats").className="left-menu";
    document.getElementById("dogs").className="left-menu";
    document.getElementById("school").className="left-menu";
    document.getElementById("funny").className="left-menu active";
    document.getElementById("darkhumor").className="left-menu";
    document.getElementById("post-container").style.display="block";
    document.getElementById("photosHot").style.display="none";
    document.getElementById("photosFresh").style.display="block";
    
    document.getElementById("upload").className = "menu ";

    if(document.cookie!=""){
      document.getElementById("register").style.display="none";
      document.getElementById("login").style.display="none";
      document.getElementById("myprofile").style.display="block";
      document.getElementById("logout").style.display="block";
      document.getElementById("upload").style.display="block";
    
    }else{
      document.getElementById("myprofile").style.display="none";
      document.getElementById("logout").style.display="none";
      document.getElementById("myprofile").style.display="none";
      document.getElementById("upload").style.display="none";

    }


    document.getElementById("uploadform").style.display="none";
    document.getElementById("loginform").style.display="none";
      x.style.display = "none";
      y.style.display="block";
      z.style.display="block";
      w.style.display="block";
      document.getElementById("success").style.display="none";

      
      let xhttp=new XMLHttpRequest();

      // extract user data from html file form
      
          // when reply is received from the server the following happens
           xhttp.onreadystatechange=function(){
          if(this.readyState==4 && this.status==200){
            serverResp("Funny",xhttp.responseText);
          }else{
              document.getElementById("photosFresh").innerHTML="<h3>Error within the Server</h3>";
          }
           };
          xhttp.open("GET","/funny?category='Funny'",true);
          xhttp.setRequestHeader("Content-type", "application/json");
          xhttp.send();
  }



//************************************************************************************************************************************* */
// Change Dark Humour

  function changeDarkHumor(){
    let x = document.getElementById("form");
    let y=document.getElementById("banner");
    let z=document.getElementById("rightadds");
    let w=document.getElementById("verticalmenu");
    changeTitleWeb("Dark-Humour");
    document.getElementById("hot").className = "menu";
    document.getElementById("fresh").className = "menu";
    document.getElementById("hot2").className="left-menu";
    document.getElementById("fresh2").className="left-menu";
    document.getElementById("cats").className="left-menu";
    document.getElementById("dogs").className="left-menu";
    document.getElementById("school").className="left-menu";
    document.getElementById("funny").className="left-menu";
    document.getElementById("darkhumor").className="left-menu active";


    document.getElementById("post-container").style.display="block";
    document.getElementById("photosHot").style.display="none";
    document.getElementById("photosFresh").style.display="block";
    
    document.getElementById("upload").className = "menu ";

    if(document.cookie!=""){
      document.getElementById("register").style.display="none";
      document.getElementById("login").style.display="none";
      document.getElementById("myprofile").style.display="block";
      document.getElementById("logout").style.display="block";
      document.getElementById("upload").style.display="block";
    
    }else{
      document.getElementById("myprofile").style.display="none";
      document.getElementById("logout").style.display="none";
      document.getElementById("myprofile").style.display="none";
      document.getElementById("upload").style.display="none";

    }


    document.getElementById("uploadform").style.display="none";
    document.getElementById("loginform").style.display="none";
      x.style.display = "none";
      y.style.display="block";
      z.style.display="block";
      w.style.display="block";
      document.getElementById("success").style.display="none";

      
      let xhttp=new XMLHttpRequest();

      // extract user data from html file form
      
          // when reply is received from the server the following happens
           xhttp.onreadystatechange=function(){
          if(this.readyState==4 && this.status==200){
            serverResp("DarkHumour",xhttp.responseText);
          }else{
              document.getElementById("photosDarkHumour").innerHTML="<h3>Error within the Server</h3>";
          }
           };
          xhttp.open("GET","/darkHumour?category='DarkHumor'",true);
          xhttp.setRequestHeader("Content-type", "application/json");
          xhttp.send();
  }





//***************************************************************************************************************************************** */
// change cats

  function changeCats(){
    let x = document.getElementById("form");
    let y=document.getElementById("banner");
    let z=document.getElementById("rightadds");
    let w=document.getElementById("verticalmenu");
    changeTitleWeb("Cats");
    document.getElementById("hot").className = "menu";
    document.getElementById("fresh").className = "menu";
    document.getElementById("hot2").className="left-menu";
    document.getElementById("fresh2").className="left-menu";
    document.getElementById("cats").className="left-menu active";
    document.getElementById("dogs").className="left-menu";
    document.getElementById("school").className="left-menu";
    document.getElementById("funny").className="left-menu";
    document.getElementById("darkhumor").className="left-menu";


    document.getElementById("post-container").style.display="block";
    document.getElementById("photosHot").style.display="none";
    document.getElementById("photosFresh").style.display="block";
    document.getElementById("upload").className = "menu ";

    if(document.cookie!=""){
      document.getElementById("register").style.display="none";
      document.getElementById("login").style.display="none";
      document.getElementById("myprofile").style.display="block";
      document.getElementById("logout").style.display="block";
      document.getElementById("upload").style.display="block";
    
    }else{
      document.getElementById("myprofile").style.display="none";
      document.getElementById("logout").style.display="none";
      document.getElementById("myprofile").style.display="none";
      document.getElementById("upload").style.display="none";

    }


    document.getElementById("uploadform").style.display="none";
    document.getElementById("loginform").style.display="none";
      x.style.display = "none";
      y.style.display="block";
      z.style.display="block";
      w.style.display="block";
      document.getElementById("success").style.display="none";

      
      let xhttp=new XMLHttpRequest();

      // extract user data from html file form
      
          // when reply is received from the server the following happens
           xhttp.onreadystatechange=function(){
          if(this.readyState==4 && this.status==200){
             serverResp("Cats",xhttp.responseText);
          }else{
              document.getElementById("photosCats").innerHTML="<h3>Error within the Server</h3>";
          }
           };
          xhttp.open("GET","/cats?category='Cats'",true);
          xhttp.setRequestHeader("Content-type", "application/json");
          xhttp.send();

  }





//****************************************************************************************************************** */
  // change dogs


  function changeDogs(){
    let x = document.getElementById("form");
    let y=document.getElementById("banner");
    let z=document.getElementById("rightadds");
    let w=document.getElementById("verticalmenu");
    changeTitleWeb("Dogs");
    document.getElementById("hot").className = "menu";
    document.getElementById("fresh").className = "menu";
    document.getElementById("hot2").className="left-menu";
    document.getElementById("fresh2").className="left-menu";
    document.getElementById("cats").className="left-menu";
    document.getElementById("dogs").className="left-menu active";
    document.getElementById("school").className="left-menu";
    document.getElementById("funny").className="left-menu";
    document.getElementById("darkhumor").className="left-menu";

    document.getElementById("post-container").style.display="block";
    document.getElementById("photosHot").style.display="none";
    document.getElementById("photosFresh").style.display="block";
    document.getElementById("upload").className = "menu ";

    if(document.cookie!=""){
      document.getElementById("register").style.display="none";
      document.getElementById("login").style.display="none";
      document.getElementById("myprofile").style.display="block";
      document.getElementById("logout").style.display="block";
      document.getElementById("upload").style.display="block";
    
    }else{
      document.getElementById("myprofile").style.display="none";
      document.getElementById("logout").style.display="none";
      document.getElementById("myprofile").style.display="none";
      document.getElementById("upload").style.display="none";

    }


    document.getElementById("uploadform").style.display="none";
    document.getElementById("loginform").style.display="none";
      x.style.display = "none";
      y.style.display="block";
      z.style.display="block";
      w.style.display="block";
      document.getElementById("success").style.display="none";

      
      let xhttp=new XMLHttpRequest();

      // extract user data from html file form
      
          // when reply is received from the server the following happens
           xhttp.onreadystatechange=function(){
          if(this.readyState==4 && this.status==200){
             // document.getElementById("photosDogs").innerHTML=this.responseText;
              serverResp("Dogs",xhttp.responseText);
              
          }else{
              console.log("error");
          }
           };
          xhttp.open("GET","/dogs?category='Dogs'",true);
          xhttp.setRequestHeader("Content-type", "application/json");
          xhttp.send();


  }
  

  function serverResp(elementCat,response){

    let htmlStr="";
    let obj = JSON.parse(response);
    console.log(obj);
    obj.forEach(element => {
        let extension=element["Path"].split(".").pop();
        if(extension=="jpg" || extension=="png" || extension=="jpeg"|| extension=="gif"){
           
            htmlStr= htmlStr+('<div class="photo-titleContainer" id="title"><h4>Category: ' + element["category"] + '<br>' + element["title"] + '</h4></div><div class="photo-container" id="photo"><img src="' + element["Path"] + '" alt="post" height="100%" width="100%"></div><div class="photo-buttons" id="photo-buttons"><div class="points" id="points' + element["id"] + '"><h4>Points:' + (element["no_upv"] - element["no_down"]) + '</h4></div>' +
            '<br><button type="button" id="' + element["id"] + '" class="up" onclick="upvote(this.id),setTimeout(checkPoints(this.id), 1000);"></button><button type="button"  onclick="downvote(this.id)" class="down"id="' + element["id"] + '"></button><button type="button" class="comment" onclick="showCommentWindow(this.id)" id="' + element["id"] + '"></button><br></div></div>');
           
       
    }else if(extension=="mp4"){
        htmlStr+=('<div class="photo-titleContainer" id="title"><h4>Category: ' + element["category"] + '<br>' + element["title"] + '</h4></div><div class="photo-container" id="photo"><video title="videoPost" width="100%" height="fit-content" controls><source src="' + element["Path"] + '"  type="video/mp4"></video></div><div class="photo-buttons" id="photo-buttons"><div class="points" id="points' + element["id"] + '"><h4>Points:' + (element["no_upv"] - element["no_down"]) + '</h4></div>' +
        '<br><button type="button" id="' + element["id"] + '" class="up" onclick="upvote(this.id),setTimeout(checkPoints(this.id), 1000);"></button><button type="button"  onclick="downvote(this.id)" class="down"id="' + element["id"] + '"></button><button type="button" class="comment" onclick="showCommentWindow(this.id)" id="' + element["id"] + '"></button><br></div></div>');
      
    }
    });
    document.getElementById("photosFresh").innerHTML=htmlStr;
  }