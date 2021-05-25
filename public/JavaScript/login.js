function loginUser(){

    // set up a http request
let xhttp=new XMLHttpRequest();

// extract user data from html file form
let username = document.getElementById("usernamelogin").value;
    let password = document.getElementById("passwordlogin").value;
    let usr={
        username:username,
        pass:password
    }
    
    // when reply is received from the server the following happens
     xhttp.onreadystatechange=function(){
    if(this.readyState==4 && this.status==200){
        if(this.responseText=="Logged In Succesfully,</h3>\n Redirecting in a few moments. If it takes too long, please press "){
        document.getElementById("serverloginresponse").innerHTML="<span style='color: green'><h3>"+this.responseText+"</h3><a href='http://localhost:8080/'>here.</a></span>";
        }else{document.getElementById("serverloginresponse").innerHTML="<span style='color: red'><h3>"+this.responseText+"</h3></span>";}
    }else{
        document.getElementById("serverloginresponse").innerHTML="<span style='color:red;'><h3>"+this.responseText+"</h3></span>";
    }
     };
    xhttp.open("GET","/login?usr="+username+"&pass="+password,true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
     }
