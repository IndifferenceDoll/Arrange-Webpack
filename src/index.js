import _ from 'lodash';
import './style.css';
import icon from '$assets/icon.png';
import Data from '$assets/data.xml';
import printMe from './print';
import qs from 'query-string';
import { cube } from './math';
import txtStr from '$assets/test.txt';
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
    console.log('txtStr',txtStr);


  
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
    var playArr = ['-10px -10px','-331px -10px','-10px -330px','-331px -330px','-652px -10px','-652px -330px'];
    var ind = 0;
    // var style = document.createElement("style");
    // document.head.appendChild(style);
    // var sheet = style.sheet;
    // sheet.insertRule('@keyframes gift{ 0%{ background-position:-10px -10px;} 16.6%{ background-position:-331px -10px;} 33.2%{ background-position:-10px -330px;} 49.8%{ background-position:-331px -330px;} 66.4%{ background-position:-652px -10px} 83%{ background-position:-652px -330px;} 100%{ background-position:-10px -10px;} }', 0);
    var element = document.getElementById('app');
    var div = document.createElement("div");
    div.style.width = '301px';
    div.style.height = '300px';
    div.style.background = 'url(' + cssSprites + ')';
    div.style.backgroundPosition = '-10px -10px';
    div.style.backgroundSize = 'auto';
    // div.id = "giftPlay";
    // div.style.webkitAnimationName = 'gift';
    // div.style.webkitAnimationDuration = '1000ms';
    // div.style.webkitAnimationTimingFunction = 'linear';
    // div.style.webkitAnimationDelay = '0';
    // div.style.webkitAnimationPlayState = 'running';
    // div.style.webkitAnimationFillMode	 = 'none';
    // div.style.webkitAnimationIterationCount = 'infinite';
    // div.style.webkitAnimationDirection = 'normal';

    function callback(){
      ind = ind >= playArr.length ? 0 : ind;
      div.style.backgroundPosition = playArr[ind++];
      requestAnimationFrame(callback);
    }
    requestAnimationFrame(callback);

    element.appendChild(div);
  }
  
  var ele = component();
  testRequesrAnimationFrame();
  testSprites();

  document.body.appendChild(ele);