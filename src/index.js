import _ from 'lodash';
import './style.css';
import icon from '$assets/icon.png';
import Data from '$assets/data.xml';
import printMe from './print';
import qs from 'query-string';
import { cube } from './math';

function component() {
    // var element = document.createElement('div');
    var element = document.getElementById('app');
    var btn = document.createElement('button');
  
    // Lodash（目前通过一个 script 脚本引入）执行这一行是必需的
    element.innerHTML = _.join(['Hello webpack 前端开发','5 cubed is equal to ' + cube(5)], '\n\n');
    element.classList.add('hellow');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);

    var myIcon = new Image();
    myIcon.src = icon;


    var myIcon2 = new Image();
    myIcon2.src ="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 4'%3E%3Cpath fill='none' stroke='%23ff3300' d='M0 3.5c5 0 5-3 10-3s5 3 10 3 5-3 10-3 5 3 10 3'/%3E%3C/svg%3E";

    element.appendChild(myIcon);
    element.appendChild(myIcon2);

    console.log(Data);
    console.log('index',qs.parse(window.location.search));
  
    return element;
  }

  class kingcat{
    static name='kingcat';
  }
  
  document.body.appendChild(component());