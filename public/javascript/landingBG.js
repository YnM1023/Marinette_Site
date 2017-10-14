var counter = 0;
function changeBG(){
    var imgs = [
        "url(https://i.imgur.com/NEcjXuR.jpg?2)",
        "url(https://i.imgur.com/S3wFCm6.jpg?2)",
        "url(https://i.imgur.com/XR4dDY8.jpg?2)",
        "url(https://i.imgur.com/CUPhtdw.jpg?2)",
        "url(https://i.imgur.com/A1LTR3w.jpg?2)",
      ]
    
    if(counter === imgs.length) counter = 0;
    $("body").css("background-image", imgs[counter]);

    counter++;
}
  
setInterval(changeBG, 3700);
