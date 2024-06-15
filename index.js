
function sc(){
   var scrollv = window.scrollY;
   
   if (scrollv >= 30) {
    document.getElementById('nav').style.position = "sticky";
    document.getElementById('nav').style.backgroundColor = "white";
    document.getElementById('rv').style.color = "#000b62";
    document.getElementById('rv').style.top = "6px";
    document.getElementById('nav').style.boxShadow = "0px 5px 7px 1px rgba(255,255,255,0.02)";
    document.getElementById('nav').style.height = "80px";
     document.getElementById('rightul').style.color = "black";
    

   } 
   if (scrollv < 30) {
    document.getElementById('nav').style.position = "absolute";
    document.getElementById('rv').style.color = "white";
    document.getElementById('rv').style.top = "12px";
    document.getElementById('nav').style.backgroundColor = "transparent";
    document.getElementById('nav').style.height = "100px";
    document.getElementById('nav').style.boxShadow = "none";
    document.getElementById('rightul').style.color = "white"
  
   } 
}
window.addEventListener('scroll' , sc)