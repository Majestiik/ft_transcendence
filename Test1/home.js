const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

var homeOn = true;
var gameOn = false;

//load images

var paddleL = {	img: new Image(),
				x: 0,
				y: 0,
				score: 0 }

var paddleR = {	img: new Image(),
				x: 0,
				y: 0,
				score: 0 }

var ball = {	img: new Image(),
				x: 0,
				y: 0 ,
				speed: 5,
				velocityX: 5,
				velocityY: 5 }

paddleL.img.src = 'images/paddleL.png';
paddleR.img.src = 'images/paddleR.png';
ball.img.src = 'images/ball.png';

var bg_home = new Image();
var button = new Image();
var button_selected = new Image();
var h_play_button = {	img: new Image(),
						x: 0,
						y: 0,
						text: "Play",
						font: '50px Orbitron',
						fillStyle: 'pink' }

var h_chat_button = {	img: new Image(),
						x: 0,
						y: 0,
						text: "Play",
						font: '50px Orbitron',
						fillStyle: 'pink' }

var g_back_button = {	img: new Image(),
						x: 0,
						y: 0,
						text: "Back",
						font: '50px Orbitron',
						fillStyle: 'pink' }

bg_home.src = 'images/bg_home.png';
button.src = 'images/button.png';
button_selected.src = 'images/button_selected.png';
h_play_button.img.src = button.src;
h_chat_button.img.src = button.src;
g_back_button.img.src = button.src;

//resize Canva
const resizeCanva = () => {
	cvs.width = window.innerWidth - 20;
	cvs.height = window.innerHeight - 20;
	h_play_button.x = cvs.width / 20;
	h_play_button.y = cvs.height / 15;
	h_chat_button.x = cvs.width / 4;
	h_chat_button.y = cvs.height / 15;
	g_back_button.x = cvs.width / 2 - g_back_button.img.width / 2;
	g_back_button.y = g_back_button.img.height / 2;
	paddleL.x = paddleL.img.width / 2;
	paddleL.y = cvs.height / 2 - paddleL.img.height / 2;
	paddleR.x = cvs.width - paddleR.img.width * 1.5;
	paddleR.y = cvs.height / 2 - paddleR.img.height / 2;
}
resizeCanva()
window.addEventListener('resize', resizeCanva)

//get Mouse Position
function getMousePos(canvas, evt){
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

//draw Home images
function drawHome(){
	ctx.drawImage(bg_home, 0, 0);

	ctx.drawImage(h_play_button.img, h_play_button.x, h_play_button.y);
	ctx.font = h_play_button.font;
	ctx.fillStyle = h_play_button.fillStyle;
	ctx.fillText('Game', h_play_button.x + h_play_button.img.width / 4, h_play_button.y + h_play_button.img.height / 1.3);
	
	ctx.drawImage(h_chat_button.img, h_chat_button.x, h_chat_button.y);
	ctx.font = h_chat_button.font;
	ctx.fillStyle = h_chat_button.fillStyle;
	ctx.fillText('Chat', h_chat_button.x + h_chat_button.img.width / 3.5, h_chat_button.y + h_chat_button.img.height / 1.3);
}

//draw Game images
function drawGame(){
	ctx.drawImage(bg_home, 0, 0);

	ctx.drawImage(g_back_button.img, g_back_button.x, g_back_button.y);
	ctx.font = g_back_button.font;
	ctx.fillStyle = g_back_button.fillStyle;
	ctx.fillText('Back', g_back_button.x + g_back_button.img.width / 3.5, g_back_button.y + g_back_button.img.height / 1.3);

	ctx.drawImage(paddleL.img, paddleL.x, paddleL.y, paddleL.img.width / 1.2, paddleL.img.height / 1.2);
	ctx.drawImage(paddleR.img, paddleR.x, paddleR.y, paddleR.img.width / 1.2, paddleR.img.height / 1.2);
	ctx.drawImage(ball.img, ball.x, ball.y, ball.img.width / 1.2, ball.img.height / 1.2);

	ctx.font = '50px Orbitron';
	ctx.fillStyle = 'white';
	ctx.fillText(paddleL.score, cvs.width/4 , cvs.height/11);
	ctx.fillText(paddleR.score, 3*cvs.width/4 , cvs.height/11);
}

function resetBall() {
	ball.x = cvs.width / 2 - ball.img.width / 2;
	ball.y = cvs.height / 2 - ball.img.height / 2;
	ball.speed = 5;
	ball.velocityX = 5;
	ball.velocityY = 5;
}

function resetPaddles(){
	paddleL.x = paddleL.img.width / 2;
	paddleL.y = cvs.height / 2 - paddleL.img.height / 2;
	paddleR.x = cvs.width - paddleR.img.width * 1.5;
	paddleR.y = cvs.height / 2 - paddleR.img.height / 2;
}

//collision detection
function collision(b,p){
	b.img.top = b.y + 50;
	b.img.bottom = b.y - 50 + b.img.height;
	b.img.left = b.x + 50;
	b.img.right = b.x - 50 + b.img.width;

	p.img.top = p.y;
	p.img.bottom = p.y + p.img.height;
	p.img.left = p.x;
	p.img.right = p.x + p.img.width;

	return b.img.right > p.img.left && b.img.bottom > p.img.top && b.img.left < p.img.right && b.img.top < p.img.bottom;
}

//update Game
function updateGame(){
	ball.x += ball.velocityX;
	ball.y += ball.velocityY;

	let computerLevel = 0.1;
	paddleR.y += (ball.y - (paddleR.y + paddleR.img.height/5)) * computerLevel;

	if (ball.y + ball.img.height - 35 > cvs.height || ball.y < - 35)
	{
		ball.velocityY = -ball.velocityY;
	}

	let player = (ball.x < cvs.width/2) ? paddleL : paddleR;

	if(collision(ball, player))
	{
		let colliderPoint = ball.y - (player.y + player.img.height / 2);

		colliderPoint = colliderPoint / (player.img.height / 2);

		let angleRad = colliderPoint * Math.PI / 4;

		let direction = (ball.x < cvs.width / 2) ? 1 : -1;

		ball.velocityX = direction * ball.speed * Math.cos(angleRad);
		ball.velocityY = ball.speed * Math.sin(angleRad);

		ball.speed += 0.5;
	}

	if (ball.x + ball.img.width - 35 < 0)
	{
		paddleR.score++;
		resetBall();
	}
	else if (ball.x - ball.img.width - 35 > cvs.width)
	{
		paddleL.score++;
		resetBall();
	}
}

//Update loop
function Update(){
	if (homeOn)
		drawHome();
	else if (gameOn)
	{
		updateGame();
		drawGame();
	}
}

//check over button
function checkMousePos(evt){
	var pos = getMousePos(cvs, evt);

	if (homeOn)
	{
		if (pos.x >= h_play_button.x && pos.x <= h_play_button.x + h_play_button.img.width && pos.y >= h_play_button.y && pos.y <= h_play_button.y + h_play_button.img.height)
		{
			h_play_button.img.src = button_selected.src;
			h_play_button.fillStyle = 'purple';
		}
		else
		{
			h_play_button.img.src = button.src;
			h_play_button.fillStyle = 'pink';
		}
		if (pos.x >= h_chat_button.x && pos.x <= h_chat_button.x + h_chat_button.img.width && pos.y >= h_chat_button.y && pos.y <= h_chat_button.y + h_chat_button.img.height)
		{
			h_chat_button.img.src = button_selected.src;
			h_chat_button.fillStyle = 'purple';
		}
		else
		{
			h_chat_button.img.src = button.src;
			h_chat_button.fillStyle = 'pink';
		}
	}
	else if (gameOn)
	{
		if (pos.x >= g_back_button.x && pos.x <= g_back_button.x + g_back_button.img.width && pos.y >= g_back_button.y && pos.y <= g_back_button.y + g_back_button.img.height)
		{
			g_back_button.img.src = button_selected.src;
			g_back_button.fillStyle = 'purple';
		}
		else
		{
			g_back_button.img.src = button.src;
			g_back_button.fillStyle = 'pink';
		}
		paddleL.y = pos.y - paddleL.img.height / 2;
	}
}

//check Click
function checkMouseClick(evt){
	var pos = getMousePos(cvs, evt);

	if (homeOn)
	{
		if (pos.x >= h_play_button.x && pos.x <= h_play_button.x + h_play_button.img.width && pos.y >= h_play_button.y && pos.y <= h_play_button.y + h_play_button.img.height)
		{
			//alert("Launch Game");
			homeOn = false;
			gameOn = true;
			resetBall();
			resetPaddles();
			paddleL.score = 0;
			paddleR.score = 0;
		}
		if (pos.x >= h_chat_button.x && pos.x <= h_chat_button.x + h_chat_button.img.width && pos.y >= h_chat_button.y && pos.y <= h_chat_button.y + h_chat_button.img.height)
		{
			alert("Chat comming soon");
		}
	}
	else if (gameOn)
	{
		if (pos.x >= g_back_button.x && pos.x <= g_back_button.x + g_back_button.img.width && pos.y >= g_back_button.y && pos.y <= g_back_button.y + g_back_button.img.height)
		{
			//alert("Back Menu");
			gameOn = false;
			homeOn = true;
		}
	}
}

const framePerSecond = 50;
setInterval(Update, 1000/framePerSecond);
