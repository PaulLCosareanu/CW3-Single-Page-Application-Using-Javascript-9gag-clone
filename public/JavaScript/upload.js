
// this was just a test to try to catch the response from the upload, but it failed,
// i'm open for suggestions
function getResponse(){

    
    formData = new FormData();
    formData.append("title",document.querySelector("title").value);
    formData.append("category",document.querySelector("category").value);
    formData.append("filetoupload",document.querySelector("filetoupload"));
    let xhttp=new XMLHttpRequest();
          xhttp.onreadystatechange=function(){
               if(this.readyState==4 && this.status==200){
                   if(this.responseText=="uploadsuccess"){
                    document.getElementById("serverresponseupdate").innerHTML=this.responseText;
                   }
                }else{
                    document.getElementById("serverresponseupdate").innerHTML=this.responseText;
               }
                };
               xhttp.open("POST","/upload",true);
            //    xhttp.setRequestHeader("content-type", "application/json");
               xhttp.send(formData);
}