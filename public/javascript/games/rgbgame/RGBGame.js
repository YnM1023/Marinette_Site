// -------all used selector-------------------------------
// all the square in game 
var square = document.querySelectorAll(".square");
// head jumbotron
var jumbotron = document.querySelector(".jumbotron");
// head RGB Dispalyer
var header = document.getElementsByTagName("span");
// New Color button
var resetBtn = document.querySelector("#reset");
// messagedisplay
var message = document.querySelector("#message");
// hard button
var hardBtn = document.querySelector("#hard");
// esay button
var easyBtn = document.querySelector("#easy");
//-------all used variables-------------------------------

// creat array of color
var color = [];
// number of squares: changed by hard level
// default number of squares is 10
var numberOfSquare = 10;
// Correct color of Gussing Game
var correctColor;
// Selected Color when clicking
var SelectedColor;
//-------functions to get random colors-------------------
// get a random
function getRandomColor(){
	return Math.round(Math.random()*255);
}

// function to get RGB color
function getRgbColor(){
	var red = getRandomColor();
	var green = getRandomColor();
	var blue = getRandomColor();
	return "rgb("+red+", "+green+", "+blue+")";
}

// function to initialize
function initial(){
	for(var i=0;i<numberOfSquare;i++){
		var rgb = getRgbColor();
		color.push(rgb);
	}
	for(var i=0;i<square.length;i++){
		if(color[i]){
			square[i].style.display = "block";
			square[i].style.backgroundColor = color[i];
		}else{
			square[i].style.display = "none";
		}
	}
}

// choose the correct color!
function chooseCorrect(){
	correctColor = color[Math.round(Math.random()*(numberOfSquare-1))];
}

function displayCC(){
	header[0].textContent = correctColor;
}

//-------all the used Event Listener-------------------
function addListener(){
	for(var i=0;i<numberOfSquare;i++){
		square[i].addEventListener("click",clickSquare);
	}
}

function clickSquare(){
	SelectedColor = this.style.backgroundColor;
	if(SelectedColor === correctColor){
		message.textContent = "Correct!"
		console.log(SelectedColor);
		changeSquares();
		jumbotron.style.backgroundColor = correctColor;
		resetBtn.textContent = "PLAY AGAIN?";
	}else{
		this.style.backgroundColor = "#232323" ;
		message.textContent = "Try again!"
	}
}

resetBtn.addEventListener("click",reset);
hardBtn.addEventListener("click",function(){
	numberOfSquare = 10;
	easyBtn.classList.remove("selected");
	hardBtn.classList.add("selected");
	reset();
});
easyBtn.addEventListener("click",function(){
	numberOfSquare = 5;
	hardBtn.classList.remove("selected");
	easyBtn.classList.add("selected");
	reset();
});
//-------function to change color of divs----------------

function changeSquares(Color){
	for(var i=0;i<numberOfSquare;i++){
		square[i].style.backgroundColor = correctColor;
	}
}

//-------execute the initialize--------------------------
initial();
chooseCorrect();
displayCC();
addListener();

//--------function of reseting----------------------------
function reset(){
	color=[];
	jumbotron.style.backgroundColor = "steelblue";
	message.textContent = "";
	resetBtn.textContent = "NEW COLOR";
	initial();
	chooseCorrect();
	displayCC();
	addListener();
}