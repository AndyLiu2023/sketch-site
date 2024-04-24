<script setup>
import {ref} from 'vue';
import Token from '../assets/apiconnect/checkToken';

const agreeChecked = ref(true); //已確認過使用者同意


//使用者同意瀏覽網站內容，將 cookie agree 設為 true
async function agree(){
    document.cookie = 'agree=true';
 
    await Token.getToken();
    
    agreeChecked.value = false;

}

//使用者同意瀏覽網站內容，將 cookie agree 設為 false
async function disagree(){
    document.cookie = 'agree=false';

    await Token.getToken();

    agreeChecked.value = false;
}



//// 確認目前 cookie agree 的值

const checkAgree = () => {

let currentAgree = document.cookie;

const agreeValue = 'agree='; 

if(!currentAgree.includes(agreeValue)){
  
    agreeChecked.value = true;
   
}else {
    agreeChecked.value = false;
}


}

//進首頁時，確認目前 cookie agree 的值

checkAgree();

</script>


<template >
    <div  v-if="agreeChecked" class="warnging-background-div" ref="warningDiv">
        <div class="warning-content-div">
            <h2>使用前，請留意！</h2>
            <p>
                此網站使用的圖片資源，包含成人、藝術性裸露內容，來源照片皆符合 Deviant Art 規範。
                未成年、無法接受者，可盡速迴避使用此網站。或是切換成狗狗模式，圖片來源會換成狗狗。
            </p>
            <button @click="agree">我已滿 18 歲，可接受網站內容</button>
            <button @click="disagree">不想看裸猿生物，轉為狗狗模式。</button>
        </div>
    </div>

</template>

<style scoped>

.warnging-background-div{
    color: var(--color-6);
    background-color: var(--color-5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  

}

.warning-content-div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--color-6);
    background-color: var(--color-4);
    width: 60%;

    padding: 2rem;

}

.warning-content-div button{
    margin: 0.5rem 0;

}

.warning-content-div p{
    padding: 0 2rem;
}


</style>../assets/apiconnect/checkToken.js