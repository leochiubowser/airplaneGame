//基本變數設定

var button_start = document.getElementById("button_start");
var bullet = document.getElementById("bullet");
var jet = document.getElementById("jet");
var situation = 0;

//位置變數

var bullet_height = bullet.style.bottom;
var jet_height = jet.style.bottom;

var bullet_right = 50;
var jet_right = 50;

//聲音class模板

class sound {
    constructor(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.style.display = "none";
        this.play = function () {
            this.sound.play();
        }
        this.stop = function () {
            this.sound.pause();
        }
    }
}

//偵測開始遊戲按鈕

button_start.addEventListener("click", () => {
    if (situation == 0) {
        button_start.style.display = "none";
        jet.style.display = "block";
        bullet.style.display = "block";
        situation = 1;
    }
    mySound = new sound("sound1.mp3");
    mySound.play();
})

//開始遊戲按鍵顏色特效

button_start.addEventListener("mousemove", () => {
    button_start.style.backgroundColor = "yellow";
})
button_start.addEventListener("mouseleave", () => {
    button_start.style.backgroundColor = "lightblue";
})

//飛機左右控制偵測right==39 left==37

addEventListener("keydown", (e) => {
    if (e.keyCode == 37) {
        if (jet_right < 100) {
            jet_right = jet_right + 1;
            jet.style.right = jet_right + "%";
            jet.style.left = (100 - jet_right) + "%";
        }
    } else if (e.keyCode == 39) {
        if (jet_right > 10) {
            jet_right = jet_right - 1;
            jet.style.right = jet_right + "%";
            jet.style.left = (100 - jet_right) + "%";
        }
    }
})

//子彈發射

setInterval(() => {
    if (bullet_height >= 100) {
        bullet_height = 20;
    }
    else {
        bullet_height = bullet_height + 2;
        bullet.style.bottom = bullet_height + "%";
        bullet.style.right = jet_right + "%";
        bullet.style.left = (100 - jet_right) + "%";
    }
}, 10)