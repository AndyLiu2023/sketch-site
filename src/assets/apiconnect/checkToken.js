const DA = {
    clientID: import.meta.env.VITE_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CLIENT_SECRET,
}


 async function getToken(){



    let currentToken = document.cookie;
    let checkResult ='';

    // 因為 cookie 後來加入新的 key，再取得Token前，先把字串整理好，留下 Token 值部分

    const regx = /(agree=\w*;)|(;\sagree=\w*)/;

    const a = currentToken.replace(regx, '').trim().slice(6);
    currentToken = a;
  

    try{

       checkResult = await fetch(`/DAapi/api/v1/oauth2/placebo?access_token=${currentToken}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    }catch(error){
        console.log('驗證錯誤發生', error);
    }


   if(!checkResult.ok){
        
        try{
            const tokendata = await  fetch(`/DAapi/oauth2/token?grant_type=client_credentials&client_id=${DA.clientID}&client_secret=${DA.clientSecret}`, {
                            method: 'POST',
                            headers: {
                            'Content-Type': 'application/json' }
                     })
            const generatedToken = await tokendata.json();
            document.cookie = 'Token=' + generatedToken.access_token;

        }catch(error){
        console.log('產生錯誤發生', error);
    }

   }else{

        console.log('Token OK!');

   }
    

}

export default {getToken};