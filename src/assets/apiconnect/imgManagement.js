
// 使用DA帳號相關資料，帳戶名稱、資料夾ID、資料夾檔案數量
export const galleryData = [
  {artist: 'theposearchives', folder: 'DA9568BE-DD1A-0A37-464C-E88672090CE0', size: 670, src: 'https://www.deviantart.com/theposearchives'},
  {artist: 'TheMaleNudeStock', folder: '79ABF400-30A0-127C-CC7E-9450EF329287', size: 323, src: 'https://www.deviantart.com/themalenudestock'},
  {artist: 'giovannidallorto', folder: '89A170E3-6343-332D-FC4F-E338BB49CA0E', size: 3187, src: 'https://www.deviantart.com/giovannidallorto'},
  {artist: 'AlexanderCollas', folder:'F3BEFBD5-82B2-D097-DB82-8AC767B14301', size: 172, src: 'https://www.deviantart.com/alexandercollas'},
  {artist: 'dAPoses', folder:'7384DE9B-50DA-F1FC-BE1B-80BA4AB923E5', size: 1082, src: 'https://www.deviantart.com/daposes'},
  {artist: 'ManStock', folder:'BE2C1812-9167-9962-83C9-3562F53B56A8', size: 2529, src: 'https://www.deviantart.com/manstock'},
  {artist: 'philippe-art', folder:'A372B7D3-74D3-BAFE-77D9-1AAB48A86573',size: 2112, src: 'https://www.deviantart.com/philippe-art'},
  {artist: 'ArtReferenceSource', folder:'D26DD9F6-572F-8992-C52A-364A275BDDAA', size: 488, src: 'https://www.deviantart.com/artreferencesource'},
  {artist: 'JookpubStock', folder:'FA8EC711-2841-1B3F-69DA-9A333B2894F6', size: 307, src: 'https://www.deviantart.com/jookpubstock'},
  {artist: 'JookpubStock', folder:'335F2027-DDD5-3C65-EF54-D4A799614C1B', size: 258, src: 'https://www.deviantart.com/jookpubstock'},
  {artist: 'Skemmerbjorn', folder:'B5DF88AC-3EBD-AAAC-A7E7-ED0BA0F59888', size: 99, src: 'https://www.deviantart.com/skemmerbjorn'},
  {artist: 'mjranum-stock', folder:'BDAD8349-2BDC-5B8E-FF87-485421E66517', size: 118, src: 'https://www.deviantart.com/mjranum-stock'}
]

export const galleryDataDog = [
  {artist: 'Jaded-Night-Stock', folder: '861283F3-CB46-F2D6-BC9C-B3D6CF6EBD45' , size: 388, src: 'https://www.deviantart.com/jaded-night-stock', dog: true},
  {artist: 'WhisperedLitanystock', folder: '94CA95B9-8287-C619-1719-952DB3615835', size: 101, src:'https://www.deviantart.com/whisperedlitanystock',dog: true},
  {artist: 'Czertice', folder: '24796294-0F87-7051-C412-B876F68D74F8', size: 1153, src: 'https://www.deviantart.com/czertice', dog: true},
  {artist: 'CastleGraphics', folder: '68DD730F-2864-9D64-0E52-CD9F06C9DDE8', size: 2512, src: 'https://www.deviantart.com/castlegraphics', dog: true},
  {artist: 'Lakela', folder: 'F2236C61-55F1-0BD2-9F7A-3059402CE7AC', size: 477, src: 'https://www.deviantart.com/lakela', dog: true},
  {artist: 'Mouselemur', folder: 'AB0E98D6-290D-208A-A27D-8AEC4B6F0EBE', size: 104, src:'https://www.deviantart.com/mouselemur', dog: true},
  {artist: 'Allerlei', folder: '7906AA0B-350F-C9FC-606D-CAFC0CC56287', size: 151, src: 'https://www.deviantart.com/allerlei', dog: true},
  {artist: 'Khalliysgraphy', folder: 'A707E597-A514-38BA-0D0D-B38F9A607769', size: 272, src: 'https://www.deviantart.com/khalliysgraphy', dog: true},
  {artist: 'woxys' , folder: '759D429D-25B9-5AFE-F5F0-E2A889F890BB', size: 840, src: 'https://www.deviantart.com/woxys', dog: true}

]

let offsetNum = null; //api 使用，指定從起始檔案位置。
let randomPickFolder = [];

//隨機生成數字
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }


  // fetch 圖片資料
async function fetchImgData(index, token){
  console.log(randomPickFolder);

  let response = await fetch (`/DAapi/api/v1/oauth2/gallery/${randomPickFolder[index].folder}?username=${randomPickFolder[index].artist}&mode=newest&offset=${offsetNum}&limit=20&mature_content=true&access_token=${token}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
   });


   if(!response.ok){

    alert('錯誤發生！重整頁面');
    return

   }

    return response.json();

 
}



// 重新隨機排列陣列順序

export function shuffle(array)  { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  }; 




// 收集圖片後，各資料夾抽取5張，並抽取url，打散所有圖片順序

export async function getImg(){

    
   
    let token = document.cookie;

    console.log(token);
    let imgData = null; //變數，裝回傳的原始 data
    let randomPick = []; // 同個資料夾中，從20張圖隨機挑5張
    let mergedResponse = []; // 蒐集所有資料夾隨機挑好的圖。
    let galleryDataCopy = [...galleryData]; //複製原來的資料夾池子，因為之後抽選會更動內容
    
    const AgreeCookie = document.cookie;
    const agreeState = 'agree=false'

    // 根據 cookie，決定要用的圖庫(人 / 狗)
    if(AgreeCookie.includes(agreeState)){

      galleryDataCopy = [...galleryDataDog];
    
    }else{
      galleryDataCopy = [...galleryData];
    }
    

    // 整理 cookie 內容，只取 token 值部分
    const regx = /(agree=\w*;)|(;\sagree=\w*)/;

    const a = token.replace(regx, '').trim().slice(6);
    token = a;

    console.log(token);

    try{
          randomPickFolder = []; //清空變數內容

          //從資料夾池中，隨機抽五個資料夾
          for(let f = 1; f <= 5; f++ ){

        const index = getRndInteger(0, galleryDataCopy.length - 1);
        randomPickFolder.push(galleryDataCopy[index]);
        galleryDataCopy.splice(index, 1);
  
      }
        
           for(let c = 0;  randomPickFolder.length > c ; c ++){
            
            let folderMaxSize = randomPickFolder[c].size; //為該資料夾的檔案數量，用於隨機抽數字使用
            

            offsetNum = getRndInteger(0, folderMaxSize); //隨機抽開始順位，如 5 的話，就是從第五張開始。

            imgData = await fetchImgData(c, token); //fetch 原始 data

            //因資料夾照片數量不同，若是回傳張數不足，需要重新 fetch

            if(imgData.results.length < 10){

              imgData = null;

              for(let counter = 1; counter <= 3; counter++ ){

                //目前設定重新要求 3 次，3次的 offsetNum都會隨機產生。

                console.log('artist:'+ c , 'retry:'+ counter);

                //降低 offset最大數
                folderMaxSize = folderMaxSize - 100;
                

                offsetNum = getRndInteger(0, folderMaxSize);
                imgData = await fetchImgData(c, token);

                if(imgData.results.length >= 10){
                  // 回傳張數充足，停止迴圈
                  console.log('retry success!');
                  imgData = await fetchImgData(c, token);
                  break;

                }else if(counter === 3){

                  //要求達 3 次，offsetNum直接降低隨機範圍，確保回傳張數足夠
                  console.log('retry fail! narrow down!');
                  offsetNum = getRndInteger(0, 200);

                  imgData = await fetchImgData(c, token);
                  

                }

              }

            }

            // 同個資料夾中，隨機挑五張。

            randomPick = [];
               
            let max = imgData.results.length - 1;
            let min = 0;
              
            for (let b = 0; b < 5 ; b++){
                
              // 回傳張數少於8張的資料夾，跳過
                if(imgData.results.length < 8){
                  break;
                }

              // 隨機 index，決定抽選位置
                const element = getRndInteger(min, imgData.results.length - 1);
                
                randomPick.push(imgData.results[element]); //抽出的圖片放進 randomPick裡
                imgData.results.splice(element, 1); // 減去原陣列的剛抽出的圖片
                max --; // 最大index 減 1

               }

               
              //  const extractUrl = randomPick.map(
              //   a =>  a.content.src
              //   );

              // 將DA回傳的資料，只取需要的部分，圖片位址、圖片長寬
                const extractUrl = randomPick.map(

                  ({content}) => (
                    {src: content.src, height: content.height, width: content.width})
                    
                  );

                mergedResponse.push(extractUrl);

                 
           }

             
            imgData = null; 
            console.log(mergedResponse);
            return mergedResponse.flat();

       
    }catch(error){
        console.log('請求圖庫錯誤發生', error);
    }

   
}

// 設定 cookie，切換狗狗模式
  
export function dogMode(){

  let currentCookie = document.cookie;

  if(currentCookie.includes('agree=true')){
    document.cookie ='agree=false';
    return true
  }else{

    document.cookie ='agree=true';
    return false
  }

 

}