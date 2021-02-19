// 引入 css.js 的字符串
// 这就是模块化. css.js 就是模块
import string from "./css.js";

const player = {
  id: undefined,
  time: 100,
  ui: {
    demo: document.querySelector("#demo"),
    demo2: document.querySelector("#demo2"),
  },
  events: {
    "#btnPause": "pause",
    "#btnPlay": "play",
    "#btnSlow": "slow",
    "#btnNormal": "normal",
    "#btnFast": "fast",
  },
  n: 1,

  // 初始化
  init: () => {
    player.ui.demo.innerText = string.substr(0, player.n);
    player.ui.demo2.innerHTML = string.substr(0, player.n);
    player.bindEvents();
    player.play();
  },
  bindEvents: () => {
    for (let key in player.events) {
      if (player.events.hasOwnProperty(key)) {
        const value = player.events[key]; // pause / play / slow
        document.querySelector(key).onclick = player[value];
      }
    }
  },
  run: () => {
    player.n += 1;
    if (player.n > string.length) {
      window.clearInterval(player.id);
      return;
    }
    player.ui.demo.innerText = string.substr(0, player.n);
    player.ui.demo2.innerHTML = string.substr(0, player.n);
    player.ui.demo.scrollTop = player.ui.demo.scrollHeight;
  },

  // 播放
  play: () => {
    window.clearInterval(player.id);
    player.id = setInterval(player.run, player.time);
  },

  // 暂停
  pause: () => {
    window.clearInterval(player.id);
  },

  // 慢速
  slow: () => {
    player.pause();
    player.time = 300;
    player.play();
  },

  // 正常速度
  normal: () => {
    player.pause();
    player.time = 100;
    player.play();
  },

  // 快速
  fast: () => {
    player.pause();
    player.time = 0;
    player.play();
  },
};

player.init();
