import _ from 'lodash';
import './style.css';
import icon from '$assets/icon.png';
import Data from '$assets/data.xml';
import printMe from './print';
import { hexSha1 } from './hash';
import qs from 'query-string';
import { cube } from './math';
// import txtStr from '$assets/test.txt';
import cssSprites from '$assets/css_sprites.png';

function throttle(fn, threshhold = 3000) {
  let timeout;
  let isNotAllow = false;
  return function () {
    if (isNotAllow) return;
    isNotAllow = true;
    fn();
    timeout = setTimeout(() => {
      clearTimeout(timeout);
      timeout = null;
      isNotAllow = false;
    }, threshhold);
  };
}
const mousemove = throttle((e) => {
  console.log(1);
});

function component() {
    // var element = document.createElement('div');
    var element = document.getElementById('app');
    var btn = document.createElement('button');
  
    // Lodash（目前通过一个 script 脚本引入）执行这一行是必需的
    element.innerHTML = _.join(['Hello webpack 前端开发','5 cubed is equal to ' + cube(5)], '\n\n');
    element.classList.add('hellow');

    btn.innerHTML = 'Click me and check the console!';
    // btn.onclick = printMe;
    btn.onclick = mousemove;

    element.appendChild(btn);

    // var myIcon = new Image();
    // myIcon.src = icon;


    // var myIcon2 = new Image();
    // myIcon2.src ="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 4'%3E%3Cpath fill='none' stroke='%23ff3300' d='M0 3.5c5 0 5-3 10-3s5 3 10 3 5-3 10-3 5 3 10 3'/%3E%3C/svg%3E";

    // element.appendChild(myIcon);
    // element.appendChild(myIcon2);

    console.log(Data);
    console.log('index',qs.parse(window.location.search));
    // console.log('txtStr',txtStr);


  
    return element;
  }

  function testRequesrAnimationFrame(){
    var element = document.getElementById('app');
    var deg = 0;
    var id;
    var div = document.createElement("div");
    div.style.width = '20px';
    div.style.height = '20px';
    div.style.background = 'red';
    div.addEventListener('click', function () {
        var self = this;
        requestAnimationFrame(function change() {
            self.style.transform = 'rotate(' + (deg++) + 'deg)';
            id = requestAnimationFrame(change);
            console.log('id',id);
        });
    });
    var btn = document.createElement('button')
    btn.innerHTML = "stop";
    btn.onclick = function () {
        cancelAnimationFrame(id);
    };
    element.appendChild(div);
    element.appendChild(btn);
  }

  class kingcat{
    static name='kingcat';
  }

  function testSprites(){
    var style = document.createElement("style");
    document.head.appendChild(style);
    var sheet = style.sheet;
    sheet.insertRule('@keyframes gift{ 0%{ background-position:-10px -10px;} 16.6%{ background-position:-331px -10px;} 33.2%{ background-position:-10px -330px;} 49.8%{ background-position:-331px -330px;} 66.4%{ background-position:-652px -10px} 83%{ background-position:-652px -330px;} 100%{ background-position:-10px -10px;} }', 0);
    var element = document.getElementById('app');
    var div = document.createElement("div");
    div.style.width = '301px';
    div.style.height = '300px';
    div.style.background = 'url(' + cssSprites + ')';
    div.style.backgroundPosition = '-10px -10px';
    div.style.backgroundSize = 'auto';
    div.id = "giftPlay";
    div.style.webkitAnimationName = 'gift';
    div.style.webkitAnimationDuration = '300ms';
    div.style.webkitAnimationTimingFunction = 'steps(1)';
    div.style.webkitAnimationDelay = '0';
    div.style.webkitAnimationPlayState = 'running';
    div.style.webkitAnimationFillMode	 = 'none';
    div.style.webkitAnimationIterationCount = 'infinite';
    div.style.webkitAnimationDirection = 'normal';

    // // var playArr = ['-10px -10px','-331px -10px','-10px -330px','-331px -330px','-652px -10px','-652px -330px'];
    // // var ind = 0;
    // // var element = document.getElementById('app');
    // // var div = document.createElement("div");
    // // div.style.width = '301px';
    // // div.style.height = '300px';
    // // div.style.background = 'url(' + cssSprites + ')';
    // // div.style.backgroundPosition = '-10px -10px';
    // // div.style.backgroundSize = 'auto';
    // // function callback(){
    // //   ind = ind >= playArr.length ? 0 : ind;
    // //   div.style.backgroundPosition = playArr[ind++];
    // //   requestAnimationFrame(callback);
    // // }
    // // requestAnimationFrame(callback);

    element.appendChild(div);
  }
  
  var ele = component();
  testRequesrAnimationFrame();
  testSprites();

  var url = location.href.split('#')[0];
  
  var signature = hexSha1(`jsapi_ticket=kgt8ON7yVITDhtdwci0qeaux7iTNRHfErONWE-kOXrgdnuWxSD9C_SgELpFpPgqlRdM1EksZZKu21_xOLEAsWQ&noncestr=Wm3WZYTPz0wzccnW&timestamp=1570698983&url=${url}`);

  document.body.appendChild(ele);

  wx.config({
  debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId: 'wx1c4e57eecadc7294', // 必填，公众号的唯一标识
  timestamp:1570698983, // 必填，生成签名的时间戳
  nonceStr: 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
  signature: signature,// 必填，签名 http://jinyue3.applinzi.com/
  jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表
});

function getAccess(){   
  wx.getLocation({
  type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
  success: function (res) {
    alert('成功获取权限');
    setTimeout(getAccess,5000);
  },
  cancel: function(err){
    alert('拒绝授权');
    setTimeout(getAccess,5000);
  },
  fail: function(err){
    alert('授权失败');
    setTimeout(getAccess,5000);
  }
});
}

  wx.ready(function(){  
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    getAccess();    
  });