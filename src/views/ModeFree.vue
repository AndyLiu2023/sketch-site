<script setup>
import { ref } from 'vue';
import Token from '../assets/apiconnect/checkToken.js';
import {getImg} from '../assets/apiconnect/imgManagement.js';
import {shuffle} from '../assets/apiconnect/imgManagement.js';
import {dogMode} from '../assets/apiconnect/imgManagement.js';

const imgStock = [
    '../../demo_pic/001.jpg',
    '../../demo_pic/002.jpg',
    '../../demo_pic/003.jpg'
]

Token.getToken();

initStorage();

const loading = ref(false) //載入狀態

const imgStockDA = ref([]); // 回傳後，僅剩圖片網址、圖片長寬的陣列


const galleryUl = ref(null); //圖片 li 的上一層 ul

const lightboxImg = ref(null); //指定開啟單一圖片時存取的值

const liked = ref(false); //圖片的收藏狀態

const likeState = ref('收藏'); //圖片的收藏按鈕顯示文字，未收藏時，文字為收藏，收藏時，文字為已收藏

const dog = ref(false); //狗狗模式



//發出請求，抓取圖片，加入imgStockDA陣列
async function fetchImg(){

    loading.value = true;

    try{

        if(imgStockDA.value.length > 0){

            const newBatchImg  = await getImg();
            
            shuffle(newBatchImg);

            newBatchImg.forEach(element => {
            element.height = checkImgSize(element.height);
            element.width = checkImgSize(element.width);

            imgStockDA.value.push(element);
            
        });


        }else{

            imgStockDA.value = await getImg();
            console.log('imgStockDA:' + imgStockDA.value);
           
            shuffle(imgStockDA.value);

            imgStockDA.value.forEach(
                (element) => {

                    element.height = checkImgSize(element.height);
                    element.width = checkImgSize(element.width);


                }
            )
            

        }


    }catch(error){
        
        alert('發生錯誤！');

    }finally{

        loading.value = false;
    }
}



// 節流，避免監聽scroll送出太頻繁。

let throttleTimer;
const throttle = (callback, time) => {

  if (throttleTimer) return;
    throttleTimer = true;
    setTimeout(() => {
        callback();
        throttleTimer = false;
    }, time);

}


  window.addEventListener("scroll", () => {throttle(checkBottom, 1500)})




 // 檢查是否 div 已經到最底部，如果是，執行函式push()
 const checkBottom = (e) => {
  let element = galleryUl.value;
  let bottom = element.scrollHeight - window.scrollY - window.innerHeight;


  if (bottom < 0) {
    fetchImg()
  }
}

// 將圖片原尺寸換算給 css 使用

function checkImgSize(size){
    
    if(size> 4000){
        return 5
    }else if (size > 3000 ) {
        return 4
    }else if(size > 2000){
        return 3
    }else if(size > 1000){
        return 2
    }else{
        return 1
    }

        
}

// 避免lightbox開啟中，視窗大小有變動，導致lightbox不正常關閉，監聽 resize 事件。
window.addEventListener('resize', function(){
    lightboxOff()

});


//開啟放大單一圖片
 function lightboxOn(src){

    lightboxImg.value.setAttribute("src", src);
    document.querySelector('.lightbox').style.display = 'flex';

    const key = 'favoriteItem'

    const item = src

    const itemArray = JSON.parse( localStorage.getItem(key));

    // 檢查是否已加入，有加入，css 相關 class 轉 true

    if(itemArray.includes(item)){
        liked.value = true;
        likeState.value = '已收藏'
    }


}

//關閉單一圖片
function lightboxOff(){
    lightboxImg.value.removeAttribute("src");
    document.querySelector('.lightbox').style.display = 'none';
    
    liked.value = false;
    likeState.value = '收藏'
}

// 先在 localstorage 建立一個空陣列，供之後加入元素使用

function initStorage(){

    const key = 'favoriteItem'
    const value = localStorage.getItem(key);

    if(value == null){
        const initArray = [];
        const blankArrayJson = JSON.stringify(initArray);

        localStorage.setItem(key, blankArrayJson);


    }

}

// 收藏圖片，將圖片位址加入陣列，存入localstorage

function saveToFavorite(){

    const key = 'favoriteItem'

    const item = lightboxImg.value.src
    
    const itemArray = JSON.parse( localStorage.getItem(key));

// 檢查是否已加入，避免重複加入，若已加入則移除。等於是按第一次加入、第二次取消加入

    if(itemArray.includes(item)){
        const itemIndex = itemArray.indexOf(item);
        itemArray.splice(itemIndex, 1);
        localStorage.setItem(key, JSON.stringify(itemArray));
        liked.value = false;
        likeState.value = '收藏'
        return
    }


    itemArray.push(item);

    localStorage.setItem(key, JSON.stringify(itemArray));

    liked.value = true;
    likeState.value = '已收藏'
    
    
    

}

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
    <h1>自由模式</h1>
    <button class="dog-button" v-if="dog" @click="switchDogMode">狗狗 ON</button>
    <button class="dog-button" v-else @click="switchDogMode">狗狗 OFF</button>
</div>


<button class="start-button" @click="fetchImg">開始取圖</button>
<a  class="nav-a" href="/favorite">查看已收藏</a>
<a  class="nav-a" href="/">首頁</a>



<div class="gallery-div">
    <div class="lightbox" >
        
        <div class="lightbox-content">
            <img  src="" alt="" ref="lightboxImg">
        </div>
        <span class="closesign" @click="lightboxOff">&times;</span>
        <button class="favorite" @click="saveToFavorite" :class="{liked: liked}">{{ likeState}}</button>
    </div>

    <ul  class="gallery-ul" ref="galleryUl">

        <li v-for="img in imgStockDA" class="gallery-li" ref="galleryLi" :style="{'grid-column-end': 'span'+' ' + img.width, 'grid-row-end': 'span'+' ' + img.height}">
            <img  :src="img.src"   @click="lightboxOn(img.src)">
        </li>
       
    </ul>

    <div v-if="loading" class="loading">
        <p>隨機挑圖，載入中...</p>
    </div>
   
  

</div>

</template>

<style scoped>



</style>