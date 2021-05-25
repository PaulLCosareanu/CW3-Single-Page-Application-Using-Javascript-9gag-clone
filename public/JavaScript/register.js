function registeruser(){

    // set up a http request
let xhttp=new XMLHttpRequest();

// extract user data from html file form
let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let name = document.getElementById("fullname").value;
    let gender=document.getElementById("gender").value;
    let dob = document.getElementById("dateofbirth").value;

// create object to be sent to server
let usr={
    username:username,
    fullname:name,
    pass:password,
    gend:gender,
    dateofbirth:dob
}

// when reply is received from the server the following happens
 xhttp.onreadystatechange=function(){
if(this.readyState==4 && this.status==200){
    if(this.responseText=="User added successfully."){
    document.getElementById("serverresponse").innerHTML="<span style='color: green'>"+this.responseText+"</span>";
    }else{document.getElementById("serverresponse").innerHTML="<span style='color: red'>"+this.responseText+"</span>";}
}else{
    document.getElementById("serverresponse").innerHTML="<span style='color: red'>"+this.responseText+"</span>";
}
 };
xhttp.open("POST","/register",true);
xhttp.setRequestHeader("Content-type", "application/json");
xhttp.send(JSON.stringify(usr));
 }