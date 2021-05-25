// *******************************************************************************************************************************************************
// function upvote

function upvote(parsedId){

    // set up a http request
let xhttp=new XMLHttpRequest();



    
    // when reply is received from the server the following happens
     xhttp.onreadystatechange=function(){
    if(this.readyState==4 && this.status==200){
         document.getElementById('points'+parsedId).innerHTML="<h4>Points:"+xhttp.responseText+"</h4>";
    }else{
         document.getElementById("points"+parsedId).innerHTML="<h4>You are not logged in!</h4>";
    }
     };
    xhttp.open("GET","/upvote?id="+parsedId,true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
     }


// *******************************************************************************************************************************************************
//function that checks for user id send from html(test to verify if it works)

     function checkPoints(parseId){
        
        console.log(parseId);

     }


     // *******************************************************************************************************************************************************
     // function for the downvote button


     function downvote(parsedId){

        // set up a http request
    let xhttp=new XMLHttpRequest();
    
    
    
        
        // when reply is received from the server the following happens
         xhttp.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
             document.getElementById('points'+parsedId).innerHTML="<h4>Points:"+xhttp.responseText+"</h4>";
        }else{
             document.getElementById("points"+parsedId).innerHTML="<h4>You are not logged in.</h4>";
        }
         };
        xhttp.open("GET","/downvote?id="+parsedId,true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
         }
    

// *******************************************************************************************************************************************************
// function to display the comment window

         function showCommentWindow(parsedId){
          document.getElementById("commentWindow").style.display="block";
         

          let xhttp=new XMLHttpRequest();

    // when reply is received from the server the following happens
     xhttp.onreadystatechange=function(){
    if(this.readyState==4 && this.status==200){
       
        let obj = JSON.parse(xhttp.responseText);
        html="";
       html+=("<button type='button' id='"+parsedId+"' onclick='submitComment("+parsedId+")' class='registerbtn'>Submit</button>");
        obj.forEach(element => {
           html+=("<div class='usersComment' id='comment'>User "+element['FullName']+" said => "+element['comment']+"</div>")
           
        
        });
        document.getElementById("commentsContainer").innerHTML=html;
    }else{
         document.getElementById("commentsContainer").innerHTML="<span style='color:red;'><h3>"+this.responseText+"</h3></span>";
    }
     };
    xhttp.open("GET","/comment?id="+parsedId,true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();

         }


// *******************************************************************************************************************************************************
// function to hide the comment window

         function hideCommentWindow(){
          document.getElementById("commentWindow").style.display="none";
         }

// *******************************************************************************************************************************************************
     //     function to submit a comment

         function submitComment(parseId){

          
          let xhttp=new XMLHttpRequest();
          let com=document.getElementById("commentText").value;
          xhttp.onreadystatechange=function(){
               if(this.readyState==4 && this.status==200){
                    let obj = JSON.parse(xhttp.responseText);
                    html="";
                   html+=("<button type='button' id='"+parseId+"' onclick='submitComment("+parseId+")' class='registerbtn'>Submit</button>");
                    obj.forEach(element => {
                       html+=("<div class='usersComment' id='comment'>User "+element['FullName']+" said => "+element['comment']+"</div>")
                       
                    
                    });
                    document.getElementById("commentsContainer").innerHTML=html;
                }else{
                     document.getElementById("commentsContainer").innerHTML="<span style='color:red;'><h3>"+this.responseText+"</h3></span>";
                }
                };
               xhttp.open("GET","/submitComment?id="+parseId+"&comment="+com,true);
               xhttp.setRequestHeader("Content-type", "application/json");
               xhttp.send();
           

         }



// *******************************************************************************************************************************************************
// function to delete a post

         function deletePost(parseId){

          
          let xhttp=new XMLHttpRequest();
          xhttp.onreadystatechange=function(){
               if(this.readyState==4 && this.status==200){
                    document.getElementById('points'+parseId).innerHTML="<span style='color:red;'><h3>"+ this.responseText+"</h3></span>";
               }else{
                    document.getElementById("points"+parseId).innerHTML=this.responseText;
               }
                };
               xhttp.open("GET","/delete?id="+parseId,true);
               xhttp.setRequestHeader("Content-type", "application/json");
               xhttp.send();
           

         }


// *******************************************************************************************************************************************************
     //     function to update the user profile

         function updateProfile(parseId){
          let name=document.getElementById("fullnameUpdate").value;
          let gender=document.getElementById("genderUpdate").value;
          let date=document.getElementById("dateofbirthUpdate").value;
          
          let xhttp=new XMLHttpRequest();
          xhttp.onreadystatechange=function(){
               if(this.readyState==4 && this.status==200){
                    document.getElementById('serverresponseupdate').innerHTML="<span style='color:green;'><h3>"+this.responseText+"</h3></span>";
               }else{
                    document.getElementById("serverresponseupdate").innerHTML=this.responseText;
               }
                };
               xhttp.open("GET","/updateProfile?id="+parseId+"&FN="+name+"&date="+date+"&gender="+gender,true);
               xhttp.setRequestHeader("Content-type", "application/json");
               xhttp.send();
           

         }