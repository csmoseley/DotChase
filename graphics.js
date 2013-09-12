// JavaScript Document
var facing = 'N';
var isMoving = false;

var boardsize = new Array(23,15);//x,y

var preylocation = new Array(2,1);//x,y

var predatorlocation = new Array(20,12);//x,y

var previousPred = new Array(0,0);//x,y

var currentStatus = "Hunting...";

var wallx = new Array(7,7,7,7,7,7,7,7,7,7,7,7,7);
var wally = new Array(10,11,12,13,14,9,0,1,2,3,4,5,6);

function preloader(){
			document.addEventListener("keydown",keyDownHandler, false);	
		document.addEventListener("keyup",keyUpHandler, false);	
	}
	
	function keyDownHandler(event)
{
	var keyPressed = String.fromCharCode(event.keyCode);
 console.log('keypressed!');
	if (keyPressed == "W")
	{		
		facing = "N";
		isMoving = true;
	}
	else if (keyPressed == "D")
	{	
		facing = "E";
		isMoving = true;		
	}
	else if (keyPressed == "S")
	{	
		facing = "S";
		isMoving = true;		
	}
	else if (keyPressed == "A")
	{	
		facing = "W";
		isMoving = true;		
	}
}
function keyUpHandler(event)
{
	var keyPressed = String.fromCharCode(event.keyCode);
	
	if ((keyPressed == "W") || (keyPressed == "A") || 
		(keyPressed == "S") || (keyPressed == "D"))
	{
		isMoving = false;
	}
}

function checkmovement(){
	if(isMoving == true){
		if(facing == 'N'){
			var newY = preylocation[1]-1;
			var newX = preylocation[0];
			if(checkifwall(newX,newY)||newY < 0){}else{
			preylocation[1] = preylocation[1] - 1;	
			}
			
		}else
		if(facing == 'W'){
			var newY = preylocation[1];
			var newX = preylocation[0]-1;
			if(checkifwall(newX,newY)||newX < 0){}else{
			preylocation[0] = preylocation[0] - 1;	
			}
			
		}else if(facing == 'E'){
			var newY = preylocation[1];
			var newX = preylocation[0]+1;
			if(checkifwall(newX,newY)||newX >= boardsize[0]){}else{
			preylocation[0] = preylocation[0] + 1;	
			}
			
		}else if(facing == 'S'){
			var newY = preylocation[1]+1;
			var newX = preylocation[0];
			if(checkifwall(newX,newY)||newY >= boardsize[1]){}else{
			preylocation[1] = preylocation[1] + 1;	
			}
			
		}
		
		
		
		
		
		
		
		
		
		
		
	}
}

function draw(){
	context.clearRect(0, 0, canvasWidth, canvasHeight);
	drawtiles();
	drawwalls();
	drawprey(preylocation[0],preylocation[1]);
	drawpredator(predatorlocation[0],predatorlocation[1]);
	
	drawtext();
	
}

function drawwalls(){
	for(i=0; i<wallx.length; i++){
		for(k=0; k<wally.length; k++){
			drawtile(wallx[i],wally[k], "#003300");
		}
	}
}


function drawtiles(){
	for (var i=0;i<boardsize[0];i++)
	{ 
		for(var k=0; k<boardsize[1];k++)
		{
			drawtile(i,k, "#663300");
		}
	}
}

function drawtile(x,y, colortile){
	context.fillStyle=colortile;
	context.fillRect(x*20,y*20,20,20);
}

function drawpredator(x,y){
	context.fillStyle="#FF0000";
	context.fillRect(x*20+2,y*20+2,16,16);
}

function drawprey(x,y){
	context.fillStyle="#0066FF";
	context.fillRect(x*20,y*20,18,18);
}

function findpath(){
	if(predatorlocation[0]==preylocation[0] && predatorlocation[1]==preylocation[1]){
		currentStatus = ('prey found');
	}else{
		
	var lowestF = new Array();
	var lowestFval = 1000;
	var Heur;
	var G;
	var F;
	for(j=-1; j<2; j++){
		for(i=-1; i<2; i++){
		newX = predatorlocation[0]+i;
		newY = predatorlocation[1]+j;
		if(i + j == 0 || checkifwall(newX,newY) || (previousPred[0] == newX && previousPred[1] == newY || (newY<0||newX<0||newY==15||newX==23))){}else{
	Heur = Math.abs((predatorlocation[0]+i) - preylocation[0])+Math.abs((predatorlocation[1]+j) - preylocation[1]);
	Heur = Heur*10;
	if(j == 0 || i == 0){
		G = 10;
	}else{
		G = 14;	
	}
	F = G + Heur;
	//console.log(i+','+j);
	//console.log(F);
	if(F <= lowestFval){
		lowestFval = F;
		lowestF[0] = predatorlocation[0]+i;
		lowestF[1] = predatorlocation[1]+j;
	}
	
	
	
	
	
	
			
			}
		}
	}
	previousPred[0] = predatorlocation[0];
	previousPred[1] = predatorlocation[1];
	predatorlocation[0] = lowestF[0];
		 predatorlocation[1] = lowestF[1];
	}
	
	
}

function checkifwall(x,y){
		for(l=0; l<wallx.length; l++){
		for(k=0; k<wally.length; k++){
			if(x == wallx[l] && y == wally[k]){return true;}
		}
	}
}


function drawtext(){
context.font="30px Arial";
context.fillText(currentStatus,10,352);
}