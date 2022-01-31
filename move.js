var canvas = document.getElementById("mycanvas");
var context = canvas.getContext("2d");

var up = document.getElementById("up");
var down = document.getElementById("down");
var right = document.getElementById("right");
var left = document.getElementById("left");

const span = 40; move = 6;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//轉移      (亦為動畫關鍵)
/*
    context.translate(x, y);                        //相對當下位置偏移(x,y)
    context.rotate(Math.PI / 180 * degree);         //以當下位置為中心旋轉 deg
    context.scale(x, y);                            //以當下位置為中心縮放(x,y)
*/


context.save();


var locate = {
    x: 250,
    y: 350
}

up.addEventListener("click", () => {
    locate.y = locate.y - move;
    draw();
})
down.addEventListener("click", () => {
    locate.y = locate.y + move;
    draw();
})
right.addEventListener("click", () => {
    locate.x = locate.x + move;
    draw();
})
left.addEventListener("click", () => {
    locate.x = locate.x - move;
    draw();
})





addEventListener("keydown", (e) => {
    if (e.keyCode == 37) {  //左
        locate.x = locate.x - 5;
    }
    else if (e.keyCode == 39) {  //右
        locate.x = locate.x + 5;
    }
    else if (e.keyCode == 38) {  //上
        locate.y = locate.y - 5;
    }
    else if (e.keyCode == 40) {   //下
        locate.y = locate.y + 5;
    }
    draw();
})



draw();

function draw() {
    //背景
    context.save();
    context.strokeStyle = 'white';
    context.globalAlpha = 0.1;

    context.beginPath();

    for (var i = 0; i < canvas.width; i += span) {
        context.moveTo(i, 0);
        context.lineTo(i, canvas.height);
    }

    for (var i = 0; i < canvas.height; i += span) {
        context.moveTo(0, i);
        context.lineTo(canvas.width, i);

    }
    context.closePath();
    context.stroke();
    context.restore();
    //角色
    context.globalAlpha = 0.2;
    context.fillStyle = 'rgb(0, 0, 30)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 1;
    context.fillStyle = 'red';
    context.fillRect(locate.x, locate.y, 30, 30);
}