<script setup>

import { ref } from 'vue';
import Token from '../../apiconnect/checkToken.js';


Token.getToken();

const favArray = ref([]);

const galleryUl = ref(null);

const lightboxImg = ref(null);

const liked = ref(false);

const likeState = ref('收藏');



function getFavorite(){

    const key = 'favoriteItem'

    const itemArray = JSON.parse(localStorage.getItem(key));

    return itemArray
}


favArray.value = getFavorite();

console.log(favArray.value[0])


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

const loading = ref(true) //載入狀態



</script>

<template>
    <h1>已收藏</h1>
    <a  class="nav-a" href="/freemode">自由模式</a>
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

        <li v-for="img in favArray" class="gallery-li" ref="galleryLi">
            <img  :src="img"   @click="lightboxOn(img)">
        </li>
       
    </ul>

  

</div>
    

</template>


<style scoped>



@media (min-width: 800px){


    .gallery-ul{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(10%, 1fr));
        grid-template-rows: repeat(auto-fit, minmax(200px, 1fr));
        grid-auto-flow: dense;
        grid-gap: 0.5rem;
    }


}


</style>