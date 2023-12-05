import { deleteCookie, getCookie, setCookie } from "cookies-next";


export function storeTokenInCookie(token) {
    setCookie("token", token, {
      httpOnly: process.env.PRODUCTION,  //sunucuya geçince burayı true yapmak guvenlık acıdan  gereklı... process.env.PRODUCTION şuan env de bu yok ya false kabul goruluyor yanı yanıt aslında false canlıya gecınce true olmalı
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
      secure: true,
    });
  }
  
  export function getTokenFromCookie() {
    // return localStorage.getItem("token");
    return getCookie("token");
  }
  
  export function deleteTokenFromCookie() {
    // return localStorage.getItem("token");
    deleteCookie("token");
  }


  //httpOnly özelliğini process.env.PRODUCTION ile ayarladığınızda, bu ayar true veya false olabilir. httpOnly çerezi tarayıcı tarafından okunamaz hale getirir, bu nedenle sadece sunucu tarafından erişilebilir. Bu nedenle, httpOnly özelliğini yalnızca üretim (production) ortamında true yapmak, güvenlik açısından daha iyidir.

//Eğer process.env.PRODUCTION true ise, httpOnly özelliği true olarak ayarlanacak ve çerez tarayıcı tarafından okunamaz hale gelecektir. Bu, çerezi kötü niyetli kodların veya tarayıcı üzerinden erişmek isteyenlerin korumasına yardımcı olabilir. Ancak, geliştirme sırasında httpOnly özelliğini false yaparak çerezin tarayıcı tarafından okunabilir olmasını sağlayabilirsiniz, bu da hata ayıklamayı kolaylaştırabilir.

//Bu nedenle, httpOnly ayarını process.env.PRODUCTION ile kontrol etmek, üretim ve geliştirme ortamlarına göre çerez ayarlarını daha iyi yönetmenizi sağlar.