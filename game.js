//變數設定
var version = "1.1"
var canvas = document.getElementById("gamecanvas");
var context = canvas.getContext("2d");
var changeColor = false;
var changeColor2 = false;
var situation = 0;
var playing_sound = document.getElementById("playing_sound");
var win_sound = document.getElementById("win_sound");
var times = 0;
var time = 0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const span = 40; move = 7;


//敵人位置
var enemy1 = {
    x: 100,
    y: 100
}
var enemy2 = {
    x: 300,
    y: 300
}

//主角位置
var jet = {
    x: canvas.width / 2,
    y: canvas.height - 120
}

//子彈位置
var renewJet_x = jet.x;
var renewJet_y = jet.y;

const playerH = 25;
const playerW = 10;
const enemyH = 40;
const enemyW = 40;


//函數


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

    //敵人1
    context.globalAlpha = 1;
    if (changeColor) {
        resetEnemyLocate(enemy1);
    }
    context.fillStyle = 'lightgreen';

    context.fillRect(enemy1.x, enemy1.y, 40, 40);

    //敵人2
    context.globalAlpha = 1;
    if (changeColor2) {
        resetEnemyLocate(enemy2);
    }
    context.fillStyle = 'lightgreen';

    context.fillRect(enemy2.x, enemy2.y, 40, 40);


    //角色-子彈

    context.globalAlpha = 1;
    context.fillStyle = 'yellow';
    context.fillRect(renewJet_x - 5, renewJet_y, 10, 25);
    context.fillStyle = 'red';

    //角色-主角飛機

    //機頭

    context.beginPath();
    context.moveTo(jet.x, jet.y);
    context.lineTo(jet.x + 10, jet.y + 15);
    context.lineTo(jet.x - 10, jet.y + 15);
    context.lineTo(jet.x, jet.y);
    context.closePath();
    context.fill();

    //機身

    context.fillRect(jet.x - 10, jet.y + 15, 20, 40);

    //翅膀(左)

    context.beginPath();
    context.moveTo(jet.x - 10, jet.y + 25);
    context.lineTo(jet.x - 43, jet.y + 33);
    context.lineTo(jet.x - 10, jet.y + 33);
    context.lineTo(jet.x - 10, jet.y + 25);
    context.closePath();
    context.fill();

    //翅膀(右)

    context.beginPath();
    context.moveTo(jet.x + 10, jet.y + 25);
    context.lineTo(jet.x + 43, jet.y + 33);
    context.lineTo(jet.x + 10, jet.y + 33);
    context.lineTo(jet.x + 10, jet.y + 25);
    context.closePath();
    context.fill();

    //尾翼

    context.beginPath();
    context.moveTo(jet.x, jet.y + 52);
    context.lineTo(jet.x - 10, jet.y + 65);
    context.lineTo(jet.x + 10, jet.y + 65);
    context.lineTo(jet.x, jet.y + 52);
    context.closePath();
    context.fill();

    //紀錄數量
    context.fillStyle = 'orange';
    context.font = '20px Calibri';
    context.fillText("得分" + times, 50, 50);

}




//判定是否碰撞敵人1
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

//回傳陣列 敵人1  [x範圍(小) , x範圍(大) , y範圍(小) , y範圍(大)]


function getEnemyRange() {
    return [
        enemy1.x,
        enemy1.x + enemyW,
        enemy1.y,
        enemy1.y + enemyH
    ]
}
function getPlayerRange() {
    return [
        renewJet_x,
        renewJet_x + playerW,
        renewJet_y,
        renewJet_y + playerH
    ]
}

//判定是否碰撞敵人2
function touchOrNot2() {
    var EnemyRange2 = getEnemyRange2();
    var PlayerRange2 = getPlayerRange2();
    if (PlayerRange2[0] <= EnemyRange2[1] && PlayerRange2[1] >= EnemyRange2[0] && PlayerRange2[2] <= EnemyRange2[3] && PlayerRange2[3] >= EnemyRange2[2]) {
        changeColor2 = true;
    }
    else {
        changeColor2 = false;
    }
}




//回傳陣列 敵人2  [x範圍(小) , x範圍(大) , y範圍(小) , y範圍(大)]

function getEnemyRange2() {
    return [
        enemy2.x,
        enemy2.x + enemyW,
        enemy2.y,
        enemy2.y + enemyH
    ]
}
function getPlayerRange2() {
    return [
        renewJet_x,
        renewJet_x + playerW,
        renewJet_y,
        renewJet_y + playerH
    ]
}


//開始介面

function drawInitPicture() {
    context.fillStyle = 'green';
    context.font = '40px Calibri';
    context.textAlign = 'center';
    context.fillText("飛機遊戲!", canvas.width / 2, canvas.height / 2);
    context.font = '30px Calibri';
    context.fillStyle = 'red';
    context.fillText("點擊螢幕或按下鍵盤繼續", canvas.width / 2, canvas.height / 2 + canvas.height / 5);
    context.fillStyle = 'black';
    context.fillText("ver:" + version, canvas.width / 2, canvas.height / 2 + canvas.height / 3.5);
}

//遊戲說明
function drawRulePicture() {
    context.fillStyle = 'rgb(230, 227, 65)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'black';
    context.font = '30px Calibri';
    context.textAlign = 'center';
    context.fillText("遊戲說明:上下左右鍵控制飛機位置，子彈打到敵人10次後勝利", canvas.width / 2, canvas.height / 2);
    context.fillStyle = 'red';
    context.fillText("點擊螢幕或按下鍵盤來開始遊戲", canvas.width / 2, canvas.height / 2 + canvas.height / 5);
    context.fillStyle = 'blue';
    context.font = '20px Calibri';
    context.fillText("按\"V\"鍵查看版本資訊", canvas.width / 2, canvas.height / 2 + canvas.height / 3);
}

//接觸判定後
function resetEnemyLocate(who) {
    var newHeight = Math.round(Math.random() * canvas.height / 2);
    var newWidth = Math.round(Math.random() * (canvas.width - 35));
    who.x = newWidth;
    who.y = newHeight;
    times++
}
//遊戲結束
function youwin() {
    win_sound.play();
    context.fillStyle = 'rgb(0, 0, 30)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'green';
    context.font = '40px Calibri';
    context.textAlign = 'center';
    context.fillText("You Win!，您共花了" + time + "秒", canvas.width / 2, canvas.height / 2);
    context.fillText("快按兩次滑鼠重新遊戲", canvas.width / 2, canvas.height / 2 + canvas.height / 5);
    playing_sound.pause();
}

//按鍵偵測

addEventListener("keydown", (e) => {
    if (situation == 1) {
        if (e.keyCode == 37) {  //左
            if (jet.x > 15)
                jet.x -= move;
        }
        else if (e.keyCode == 39) {  //右
            if (jet.x < canvas.width - 15) {
                jet.x += move;
            }
        }
        else if (e.keyCode == 38) {  //上
            if (jet.y > canvas.height / 1.5) {
                jet.y -= move;
            }
        }
        else if (e.keyCode == 40) {   //下
            if (jet.y < canvas.height - 40) {
                jet.y += move;
            }
        }
    }
    else if (situation == 0) {
        situation = 0.5;
    }
    else if (situation == 0.5) {
        if (e.keyCode == 86) {
            window.open("version.html");
        }
        else {
            situation = 1;
        }
    }

})

addEventListener("click", () => {
    if (situation == 0) {
        situation = 0.5;
    }
    else if (situation == 0.5) {
        situation = 1;
    }
})

addEventListener("keypress", () => {
    if (situation == 2) {
        location.reload();
    }
})

addEventListener("dblclick", () => {
    if (situation == 2) {
        location.reload();
    }
})


//開始進行
setInterval(() => {

    if (situation == 1) {
        playing_sound.play();
        update();
        if (renewJet_y <= 0 || changeColor || changeColor2) {
            renewJet_x = jet.x;
            renewJet_y = jet.y;
        }
        else if (!changeColor || !changeColor2) {
            renewJet_y -= 10;
        }
        touchOrNot();
        touchOrNot2();
        if (times >= 10) {    //勝利條件
            situation = 2;
        }
    }
    else if (situation == 0) {
        drawInitPicture();
    }
    else if (situation == 2) {
        youwin()
    }
    else if (situation == 0.5) {
        drawRulePicture();
    }
}, 30)


setInterval(() => {
    if (situation == 1) {
        time++
    }
}, 1000)