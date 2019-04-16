'use strict';

window.addEventListener('DOMContentLoaded', Init);

//initialize drawing and moving the ball on canvas
function Init() {
    drawBoard(board);
    drawBall(playerBall);
    drawBall(exitBall);
    timeStamp;

    //document.addEventListener('deviceorientation', draw);

    let seconds = 0;
    
    function formatNumber(value) { return value > 9 ? value : '0' + value; }

    function formatTimer() {
        let timerMinutes = formatNumber(parseInt(seconds/60,10));
        let timerSeconds = formatNumber(++seconds%60);
        document.getElementById('timer').innerHTML = `${timerMinutes}` + ':' + `${timerSeconds}`;
    }
    setInterval(formatTimer, 1000);
}

//get reference to the canvas object
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

var timeStamp = Date.now();
var board = new Board(40, 'rgb(0, 0, 0)', 1);
var playerBall = new Ball(20, 20, 0, 0, 12, 'rgb(47, 24, 175)', 'rgb(255, 147, 7)', 3);
var exitBall = new Ball(20, 20, 440, 280, 14, 'rgb(0, 0, 0)', 'rgb(34, 34, 34, 60)', 8);

//set board properties
function Board(squareSide, strokeStyle, lineWidth) {
    this.squareSide = squareSide;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
}

function Ball(centerX, centerY, offsetX, offsetY, radius, strokeStyle, fillStyle, lineWidth) {
    //set dimensions by vertical and horizontal distance to center of a ball
    this.centerX = centerX;
    this.centerY = centerY;
    //and offset values and ball's radius
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.radius = radius;
    //set strokeStyle, fillStyle, lineWidth
    this.strokeStyle = strokeStyle;
    this.fillStyle = fillStyle;
    this.lineWidth = lineWidth;
}

//drawing playing board
function drawBoard(board) {
    const side = board.squareSide;
    let horizontalSquares = canvas.width / side;
    let verticalSquares = canvas.height / side;

    for (let i = 0; i < horizontalSquares; i++) {
        for (let j = 0; j < verticalSquares; j++) {
            ctx.strokeRect(i * side, j * side, side, side);
        }
    }
    return board;
}

//draw ball on canvas
function drawBall(ball) {
    //set ball styles
    ctx.strokeStyle = ball.strokeStyle;
    ctx.fillStyle = ball.fillStyle;
    ctx.lineWidth = ball.lineWidth;

    //draw a ball
    ctx.beginPath();
    ctx.arc(ball.centerX + ball.offsetX, ball.centerY + ball.offsetY, ball.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function draw() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(playerBall);
    drawBall(exitBall);

    playerBall.offsetX = 2;
    playerBall.offsetY = -2;

    let stepX = playerBall.centerX + playerBall.offsetX,
        stepY = playerBall.centerY + playerBall.offsetY;
    if (stepX > canvas.width - playerBall.radius || stepX < playerBall.radius) {
        playerBall.offsetX = -playerBall.offsetX;
    }
    if (stepY > canvas.height - playerBall.radius || stepY < playerBall.radius) {
        playerBall.offsetY = -playerBall.offsetY;
    }

    playerBall.centerX += playerBall.offsetX;
    playerBall.centerY += playerBall.offsetY;
}
setInterval(draw, 200);
