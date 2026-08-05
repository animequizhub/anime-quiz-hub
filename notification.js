function showNotification(message,color="#238636"){

const notification=document.createElement("div");

notification.textContent=message;

notification.style.position="fixed";
notification.style.top="20px";
notification.style.right="20px";
notification.style.padding="15px";
notification.style.borderRadius="10px";
notification.style.background=color;
notification.style.color="white";
notification.style.zIndex="9999";

document.body.appendChild(notification);

setTimeout(()=>{

notification.remove();

},3000);

}

export { showNotification };