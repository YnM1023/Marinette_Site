console.log("success!");

var btns = document.querySelectorAll(".nav li");

function resetBtns(){
    for(var i=0;i<btns.length;i++){
        btns[i].classList.remove("active");
    }
}

btns.forEach(function(btn){
    btn.addEventListener("click",function(){
        resetBtns();
        btn.classList.add("active");
    });
});