var canvas = document.getElementById("mycanvas");
var context = canvas.getContext("2d");
var changeColor = false;
const span = 40; move = 7;

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
var enemy = {
    x: 100,
    y: 100
}
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

    //動畫效果 (覆蓋繪畫)
    context.closePath();
    context.stroke();
    context.restore();

    context.globalAlpha = 0.2;
    context.fillStyle = 'rgb(0, 0, 30)';
    context.fillRect(0, 0, canvas.width, canvas.height);


    //敵人
    context.globalAlpha = 1;
    if (changeColor) {
        context.fillStyle = 'yellow';
    }
    else {
        context.fillStyle = 'lightgreen';
    }
    context.fillRect(enemy.x, enemy.y, 40, 40);
    //角色
    context.globalAlpha = 1;
    context.fillStyle = 'red';
    context.fillRect(locate.x, locate.y, 30, 30);
}


//回傳陣列  [x範圍(小) , x範圍(大) , y範圍(小) , y範圍(大)]

function getEnemyRange() {
    return [
        enemy.x,
        enemy.x + 40,
        enemy.y,
        enemy.y + 40
    ]
}
function getPlayerRange() {
    return [
        locate.x,
        locate.x + 30,
        locate.y,
        locate.y + 30
    ]
}

setInterval(() => {
    var EnemyRange = getEnemyRange();
    var PlayerRange = getPlayerRange();
    if (PlayerRange[0] <= EnemyRange[1] && PlayerRange[1] >= EnemyRange[0] && PlayerRange[2] <= EnemyRange[3] && PlayerRange[3] >= EnemyRange[2]) {
        changeColor = true;
    }
    else {
        changeColor = false;
    }
})
