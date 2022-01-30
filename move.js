var canvas = document.getElementById("mycanvas");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//轉移      (亦為動畫關鍵)
/*
    context.translate(x, y);                        //相對當下位置偏移(x,y)
    context.rotate(Math.PI / 180 * degree);         //以當下位置為中心旋轉 deg
    context.scale(x, y);                            //以當下位置為中心縮放(x,y)
*/
context.fillStyle = 'red';


context.save();


var locate = {
    x: 100,
    y: 700
}


function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);  //清除
    context.fillRect(locate.x, locate.y, 30, 30);
    locate.y = locate.y - 5;
}

var limit = 0;

setInterval(() => {
    limit = limit + 0.01
    if (limit > 1.5) {
        locate.x = 100;
        locate.y = 700;
        limit = 0;
    }
    else {
        draw()
    }
}, 10)





context.restore();
