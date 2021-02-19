let html = document.querySelector("#html");
let string = `/* 你好，我是前端新人
接下来我要加样式了 */   
#div1 {
    width: 200px;
    height: 200px;
}
/* 变成一个八卦图 */
#div1{
    border-radius: 50%;
    box-shadow: 0 0 3px rgba(0,0,0,0.5);
    border: none;
}
/* https://cssgradient.io/ */
#div1{
    background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 50%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 100%);
}
/* 加球 */
#div1::before{
    width: 100px;
    height: 100px;

    /* 居中上 */ 
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    /* 圆形里变色 */
    background: radial-gradient(circle, rgba(255,255,255,1) 23%, rgba(0,0,0,1) 23%, rgba(0,0,0,1) 100%);

    /* 变成一个圆形 */
    border-radius: 50%; 
}
#div1::after{
    width: 100px;
    height: 100px;

    /* 居中下 */ 
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    /* 圆形里变色 */
    background: radial-gradient(circle, rgba(0,0,0,1) 23%, rgba(255,255,255,1) 23%, rgba(255,255,255,1) 100%);

    /* 变成一个圆形 */
    border-radius: 50%; 
}
`;
let string2 = ""; //缓存
let n = 0;

let step = () => {
  setTimeout(() => {
    if (string[n] === "\n") {
      //如果是回车，就照搬
      string2 += "<br>";
    } else if (string[n] === " ") {
      string2 += "&nbsp";
    } else {
      //如果不是回车，就照搬
      string2 += string[n];
    }
    html.innerHTML = string2;
    style.innerHTML = string.substring(0, n); // style 里去除 <br> 和 nbsp 等 html

    /* PC: 自动滚动到最后一行 */
    window.scrollTo(0, 9999);
    /* 手机: 自动滚动到最后一行 */
    html.scrollTo(0, 9999);

    if (n < string.length - 1) {
      n += 1;
      step();
    }
  }, 5);
};

step();
