//變數設定

var canvas = document.getElementById("gamecanvas");
var context = canvas.getContext("2d");
var changeColor = false;
var situation = 0;
var playing_sound = document.getElementById("playing_sound");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const span = 40; move = 7;

var locate = {
    x: 250,
    y: 350
}
var enemy = {
    x: 100,
    y: 100
}

const playerH = 25; playerW = 10;
const enemyH = 40; enemyW = 40;


//重要函數


function update() {
    //背景
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
    context.fillRect(locate.x, locate.y, 10, 25);
}



//回傳陣列  [x範圍(小) , x範圍(大) , y範圍(小) , y範圍(大)]

function getEnemyRange() {
    return [
        enemy.x,
        enemy.x + enemyW,
        enemy.y,
        enemy.y + enemyH
    ]
}
function getPlayerRange() {
    return [
        locate.x,
        locate.x + playerW,
        locate.y,
        locate.y + playerH
    ]
}






//判定是否碰撞
function touchOrNot() {
    var EnemyRange = getEnemyRange();
    var PlayerRange = getPlayerRange();
    if (PlayerRange[0] <= EnemyRange[1] && PlayerRange[1] >= EnemyRange[0] && PlayerRange[2] <= EnemyRange[3] && PlayerRange[3] >= EnemyRange[2]) {
        changeColor = true;
    }
    else {
        changeColor = false;
    }
}


function drawInitPicture() {
    context.fillStyle = 'green';
    context.font = '30px Calibri';
    context.textAlign = 'center';
    context.fillText("飛機遊戲!", canvas.width / 2, canvas.height / 2);
    context.fillStyle = 'red';
    context.fillText("點擊螢幕或按下鍵盤來開始遊戲", canvas.width / 2, canvas.height / 2 + canvas.height / 5);
}



//按鍵偵測

addEventListener("keydown", (e) => {
    if (situation == 1) {
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
    }
    else if (situation == 0) {
        situation = 1;
    }
})

addEventListener("click", () => {
    if (situation == 0) {
        situation = 1;

    }
})



//開始進行
setInterval(() => {
    if (situation == 1) {
        playing_sound.play();
        update();
        touchOrNot();
    }
    else if (situation == 0) {
        drawInitPicture();
    }
}, 30)
