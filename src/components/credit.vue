<script setup>
import {ref} from 'vue';
import { galleryData } from '../../apiconnect/imgManagement';
import { galleryDataDog } from '../../apiconnect/imgManagement';

const uniqueGalleryData = ref([]); //變數，移除重複物件後儲存用
const creditUl = ref(null); 
const creditLi = ref(null);

const galleryDataMix = [...galleryData, ... galleryDataDog]; //合併兩個人 / 狗 陣列


// 把 galleryData 重複的作者名與帳號連結移除，因為同個作者有不同資料夾
function nonrep(data, key){
  return [
    ... new Map(
      data.map( x => [key(x), x])
    ).values()
  ]
}


uniqueGalleryData.value = nonrep(galleryDataMix, it => it.artist);

// 移動li 
function Carouselnavi(positive = true){
  
  // 變數，li的寬度，以寬度為 1 個單位 
  const slideWidth = creditLi.value[0].clientWidth;

  // 外層UL的最左邊為起始點，若值為 true 加一個單位，false 則減一個單位
  creditUl.value.scrollLeft = 
  positive ? creditUl.value.scrollLeft + slideWidth : 
  creditUl.value.scrollLeft -slideWidth;


}


</script>

<template>
    <h2>速寫照片來源</h2>
    <p>
        本站速寫的參考照片皆透過 DeviantArt 的 API
        ，依據使用規範，
        引用照片的帳戶會列在下方：
    </p>
    <div>
    <ul class="credit-ul" ref="creditUl">
       <li v-for="data in uniqueGalleryData" class="credit-li" ref="creditLi">
        <div class="avatar-div"><img src="../assets/marterials/deviantart_logo_icon.png" alt=""></div>
        <h4>{{ data.artist }}<span v-if= data.dog > &nbsp;<img src="../assets/marterials/pawprint.png" alt=""></span></h4>
        <button class="author-button" :href= data.src> 前往作者 DA </button>

       </li>
    </ul>
    <div class="arrow-div">
      <button class="arrow button" @click="Carouselnavi(false)">&#8249;</button>
      <button class="arrow button" @click="Carouselnavi">&#8250;</button>
    </div>

    </div>


</template>

<style scoped>

.credit-ul{
  display: flex;
  flex-direction: row;
  gap: 10px;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  height: 200px;
  scroll-behavior: smooth;


}

.credit-li{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  flex: 1 0 90%;
  scroll-snap-align: center;
  background-color: var(--color-2);
  box-shadow: 5px 5px 10px var(--color-5);
}

.credit-li h4{
  margin: 0.5rem 0;
}

.author-button{
  font-size: 1rem;

}

.avatar-div{
  height: 5rem;
  width: 5rem;
  border-radius: 10px;
  
}

.avatar-div img{
  width: 100%;
  height: 100%;
  object-fit: fill;
}

.arrow-div{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

}

.credit-ul::-webkit-scrollbar {
  height: 8px;
}
.credit-ul::-webkit-scrollbar-thumb {
  background: var(--color-5);
}
.credit-ul::-webkit-scrollbar-track {
  background: var(--color-3);
}
.credit-ul::-webkit-scrollbar-track-piece:start {
  background: var(--color-5);
}


@media (min-width: 800px){

  .credit-li{
    flex: 1 0 30%;
  }



}


</style>../assets/apiconnect/imgManagement../assets/apiconnect/imgManagement