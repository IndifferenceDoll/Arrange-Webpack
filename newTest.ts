// interface Param{
//     name:string;
//     age:number;
// }
// function fun(param:Param){//接口的名字和参数的名字无特殊关联
//     return param.name + 'is' + param.age + 'year ago!';
// }
// class ParamClass{
//     description:string;
//     constructor(public name,public age){
//         this.description = `${name} is ${age} year ago!`;
//     }
// }
// let obj = new ParamClass('marry',15);
// const result = fun(obj);
// console.log(result);

// enum Car {BigCar,SmallCar=5,CuteCar};
// let car : Car = Car.CuteCar;
// console.log(car)

// console.log(Car[1])
// function returnVal( ) : void{
//     return true;
// }
// console.log(returnVal())


// let value : object = {a:1};
// try {

// } catch(e){
//     var a = 2;
// }
// console.log(a)

// function foo() {
//     return xx;
// }

// foo();

// let xx;

// let o = {a:1,b:2,c:3};
// let {a:x, b:y, c:z} : {x:number, y:number , z:number} = o;

// function fun(b?:string){
//     return b;
// }

// fun();

var fun : Function = function(){

}