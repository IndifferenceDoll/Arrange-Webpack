import _ from 'lodash';
import './style.css';
import icon from '$assets/icon.png';
import Data from '$assets/data.xml';
import printMe from './print';
import qs from 'query-string';
import { cube } from './math';

function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');
  
    // Lodash（目前通过一个 script 脚本引入）执行这一行是必需的
    element.innerHTML = _.join(['Hello webpack 前端开发','5 cubed is equal to ' + cube(5)], '\n\n');
    element.classList.add('hellow');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);

    var myIcon = new Image();
    myIcon.src = icon;

    element.appendChild(myIcon);

    console.log(Data);
    console.log('index',qs.parse(window.location.search));
  
    return element;
  }
  
  document.body.appendChild(component());