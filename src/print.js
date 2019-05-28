import _ from 'lodash';
import qs from 'query-string';

export default function printMe() {
    console.log( _.join(['Hellow', 'webpack', '前端开发'], '/'));
    console.log('print',qs.parse(window.location.search));
    // console.error('an error');
}