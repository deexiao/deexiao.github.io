let canvas = document.getElementById("canvas");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
let ctx = canvas.getContext("2d");
let last;
let painting = false;
ctx.fillStyle = "black";
ctx.strokeStyle = "none";
function 坐标(x1, y1, x2, y2) {
  ctx.moveTo(x1, y1); //线条开始位置 第一个角
  ctx.lineTo(x2, y2); //线条经过点
  ctx.closePath(); //结束绘制线条，不是必须的
  ctx.lineWidth = 3; //设置线条宽度
  ctx.strokeStyle = "red"; //设置线条颜色
  ctx.stroke(); //用于绘制线条
  ctx.strokeStyle = "black";
  ctx.stroke();
}
// 判断设备
var isTouchDevice = "ontouchstart" in document.documentElement;
if (isTouchDevice) {
  /****** console.log(手机端)**********************/
  canvas.ontouchstart = e => {
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;
    last = [x, y];
  };
  canvas.ontouchmove = e => {
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;
    坐标(last[0], last[1], x, y);
    last = [x, y];
    ctx.lineWidth = 10;
    ctx.lineJoin = "round";
    ctx.stroke();
    ctx.fill();
  };
} else {
  /****** console.log( PC 端 )**********************/
  // 松开鼠标事件
  canvas.onmouseup = () => {
    painting = false;
  };
  // 鼠标点击事件
  canvas.onmousedown = e => {
    painting = true;
    last = [e.clientX, e.clientY];
    // console.log(last)
  };
  // 鼠标移动到画板上触发的事件
  canvas.onmousemove = e => {
    if (painting === true) {
      坐标(last[0], last[1], e.clientX, e.clientY);
      last = [e.clientX, e.clientY];
      ctx.lineWidth = 10;
      ctx.lineJoin = "round";
      ctx.stroke();
      ctx.fill();
    } else {
      console.log(1);
    }
  };
}
