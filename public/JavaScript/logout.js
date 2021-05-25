function logout(){
    let xhttp=new XMLHttpRequest();


    // when reply is received from the server the following happens
     xhttp.onreadystatechange=function(){
    if(this.readyState==4 && this.status==200){
        document.getElementById("serverlogoutresponse").innerHTML="<span style='color:green;'><h3>Log out succesfull, redirecting in a few seconds...</h3><h4>If it takes too long, please press <a href='http://localhost:8080/'>here.</a></h4></span>";
    }else{
        document.getElementById("serverlogoutresponse").innerHTML=this.responseText;
    }
     };
    xhttp.open("GET","/logout",true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}