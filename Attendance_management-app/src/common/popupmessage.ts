export function addMessage(message:any){
    var messagebox = document.getElementById("MessageBox");
    var messagetext = document.createElement("div");
    messagetext.classList.add("messagetext")
    messagebox?.appendChild(messagetext);
    
    if(message.type == "success"){
      messagetext.innerHTML += '<img src="svgs/done_20dp_success.svg"></img>'
      messagetext.innerHTML += " "+ message.message;
      messagetext.classList.add("successmessage")
    }
    if(message.type == "warning"){
      messagetext.innerHTML += '<img src="svgs/info_20dp_warning.svg"></img>'
      messagetext.innerHTML += " "+ message.message;      
      messagetext.classList.add("warningmessage")
    }
    if(message.type == "failure"){
      messagetext.innerHTML += '<img src="svgs/error_20dp_error.svg"></img>'
      messagetext.innerHTML += " "+ message.message;
      messagetext.classList.add("failuremessage")   
    }
    
    setTimeout(() => {
      messagetext.remove();
    }, 5800);
}

