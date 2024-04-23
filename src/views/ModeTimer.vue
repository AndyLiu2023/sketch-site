<script setup>
import { ref } from 'vue';
import Token from '../../apiconnect/checkToken.js';
import {getImg} from '../../apiconnect/imgManagement.js';
import {shuffle} from '../../apiconnect/imgManagement.js';
import {dogMode} from '../../apiconnect/imgManagement.js';

Token.getToken();


const loading = ref(false) //載入狀態

const imgStockDA = ref([]); // 回傳後，僅剩圖片網址的陣列

const imgAdress = ref(''); // 變數，綁定 img src

const startButtonmsg = ref('開始速寫')

const countDown = ref(''); // 倒數秒數設定
const remainTime = ref(''); //倒數中，剩餘秒數

const blinkEffect = ref(false); //toggle 閃爍 css 效果
const FullscreenMode = ref(false); // toggle 全螢幕狀態(開啟/關閉) css 效果
const lastreminder = ref(false); // toggle 倒數提醒 css 效果

const dog = ref(false); //狗狗模式

let i = 0; // imgStockDA 陣列使用變數

let intervalId = ''; //變數，給倒數功能用(setInterval)



 // 設定倒數功能，拿到秒數後，每秒扣 1，扣到 0 後，中止。
 function startTimer(duration){
            let timer = duration;

            clearInterval(intervalId);
            blinkEffect.value = false; 
            lastreminder.value = false; 
            intervalId = setInterval(function(){

                let minutes = parseInt(timer / 60, 10);
                let seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                remainTime.value = minutes + ":" + seconds;

                timer --;

                //剩下 2 時(實際上會是剩 3 秒，播放提醒音效，倒數數字轉為紅色)，
                if(timer === 2){
                    playNotification();
                    lastreminder.value  = true;
                }
                else if (timer < 0) {
                    timer = duration;
                    lastreminder.value = false;
                    nextImg();
                }

            }, 1000);


        }

//暫停倒數
function pauseTimer(){

        if(!countDown.value ){
            alert('選擇秒數');
            return
        }else if(!imgAdress.value){
            alert('請先點擊「開始速寫」取圖');
            return
        }
        
        clearInterval(intervalId);
        
        blinkEffect.value = true; 

    }

//給倒數結束時，要播放的提醒音效

function playNotification(){

    const notiSound = new Audio('../../assets/notification_sound.wav');
    notiSound.loop = false;
    notiSound.play(); 

}



/// 開始速寫功能，api呼叫圖片，將陣列 index 設為 0，確保每次開始速寫都從第零張開始。

async function start(){

    i = 0;

    loading.value = true;
    imgAdress.value = ''; 
    clearInterval(intervalId);
    intervalId = '';

    try{


        if(countDown.value){
            

            imgStockDA.value = await getImg();

            shuffle(imgStockDA.value);

            imgAdress.value = imgStockDA.value[0].src;

            startTimer(countDown.value);

            startButtonmsg.value = '重新抓圖';

        }else{
            alert('選擇秒數');
        }
        


    }catch(error){
        alert('發生錯誤！');

    }finally{
        loading.value = false;
    }
    



  
}

// 切換下一張圖片

function nextImg(){
    
    const aa = imgStockDA.value.length - 1;
    blinkEffect.value = false;

    if(imgStockDA.value.length === 0){
        console.log('請按下開始');

    }else if( i  === aa ){
        console.log('沒圖了');
        clearInterval(intervalId);
        start();
      
    }else{
        i++;
        imgAdress.value = imgStockDA.value[i].src;
        clearInterval(intervalId);
        startTimer(countDown.value);
    }
    
    
}

// 切換上一張圖片

function preImg(){

    blinkEffect.value = false;

    if(i <= 0){
        clearInterval(intervalId);
        
        console.log('沒圖了')
        
    }else{
        i --;
        imgAdress.value = imgStockDA.value[i].src;
        clearInterval(intervalId);
        startTimer(countDown.value);
    }


    
}

// 將指定元素切換為全螢幕
function fullscreen(){
    let area = document.getElementById('navDiv');

    area.requestFullscreen();
    FullscreenMode.value = true;
;
}

// 解除全螢幕
function quitFullscreen(){
  
      document.exitFullscreen();
      FullscreenMode.value = false; 
      

}

// 瀏覽器預設esc鍵可以退出全螢幕，但會造成 FullscreenMode 的值維持 true，因此設定 listener 監聽全螢幕狀態

function fullscreenchanged(){

    if(!document.fullscreenElement){
        FullscreenMode.value = false; 
    }

}

document.addEventListener("fullscreenchange", fullscreenchanged);


// 切換 變數 dog true/false 值

function switchDogMode(){

dog.value = dogMode();

}

// 載入頁面時，依 cookie 內容決定按鈕初始樣子 

function checkDogMode(){

let currentCookie = document.cookie;

if(currentCookie.includes('agree=true')){

dog.value = false;

 }else{

dog.value = true;
}


}

checkDogMode();


</script>

<template>
    <div class="title-div">
        <h1>速寫模式</h1>
        <button class="dog-button" v-if="dog" @click="switchDogMode">狗狗 ON</button>
    <button class="dog-button" v-else @click="switchDogMode">狗狗 OFF</button>
    </div>
    
    <label for="timerSetting">設定停留時間：</label>
    
    <select id="timerSetting" v-model="countDown">
        <option disabled value="">選擇秒數</option>
        <option value="30">30 秒</option>
        <option value="60">60 秒</option>
        <option value="90">90 秒</option>
        <option value="120">120 秒</option>
    </select>
    <button class="start-button" @click="start">{{startButtonmsg}}</button>
    <button class="start-button" @click="fullscreen">全螢幕</button>
    <a href="/">首頁</a>
    <div id="navDiv" class="nav-div">
        <button class="nav-button" @click="preImg">&xlArr;</button>
        <button class="nav-button" @click="nextImg">&xrArr;</button>
        <button class="nav-button" @click="startTimer(countDown)">&olarr;</button>
        <button class="nav-button" :class ="{ blink: blinkEffect }" @click="pauseTimer">&#10073;&#10073;</button>
        <button v-if="FullscreenMode" class="nav-button" @click="quitFullscreen">X</button>
        <div class="timerdigi"> <span id="time"  :class ="{ blink: blinkEffect, fullscreen: FullscreenMode, lastreminder: lastreminder}" >{{remainTime}}</span> </div>
        <div v-if="loading" class="loading">
            <p>隨機挑圖，載入中...</p>
        </div>
        
        <div v-show="imgAdress" class="img-div">
            <img :src=imgAdress  alt="">
        </div>
       
    </div>
</template>

<style scoped>

.img-div{
    width: 100%;
    margin: 0 auto;
}

.img-div img{
    width: 100%;
    height: 100%;
    object-fit: contain;
   
}

.nav-div{
    margin: 0 auto;
    text-align: center;

}

.start-button{
    margin: 0 0.5rem;
    padding: 0 0.5rem;
}

.nav-button{
    font-size: 2rem;
    margin: 1rem 0.5rem;
    padding: 0 0.5rem;
}

.timerdigi{
    font-size: 1.5rem;
    margin: 0.5rem 0;
}


.blink{
    color: var(--color-6);
    animation: blink 1.5s linear infinite;
    background-color: var(--color-4);
}

.fullscreen{
    color: var(--color-6);
}

.lastreminder{
    color: red;
}

@keyframes blink {
        0% {
          opacity: 0;
        }
        25%{
            opacity: .25;
        }

        50% {
          opacity: .5;
        }

        75%{
            opacity: .75;
        }

        100% {
          opacity: 1;
        }
      }


@media (min-width: 1024px) {

    .img-div{
    width: 1000px;
    height: 550px;
}


}



</style>







