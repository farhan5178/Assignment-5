document.getElementById('login-btn').addEventListener('click',function(){
//1 get the  user
const userName=document.getElementById('user-name')
const contactNumber=userName.value
    console.log(contactNumber)

//2 get the pin 
const inputPin=document.getElementById('input-pin');
const pinNumber=inputPin.value;
console.log(pinNumber)
//3 match mobile&&pin
if(contactNumber=="admin" && pinNumber=='admin123'){
//3-1 true:: >> alert > home 
alert('login-sucesss');
window.location.assign("./home.html")

}else{
//3-2 false :: alert > return

alert("login Failed")
return;
}
})
