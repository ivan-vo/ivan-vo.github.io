console.log("Script was connected");

let rectangles = [
    { width: 1, height: 2, color: "red" },
    { width: 2, height: 3, color: "yellow" },
    { width: 4, height: 4, color: "red" },
    { width: 2, height: 5, color: "black" },
    { width: 5, height: 5, color: "black" },
    { width: 1, height: 4, color: "white" },
    { width: 3, height: 3, color: "black" },
    { width: 1, height: 3, color: "red" },
    { width: 4, height: 4, color: "black" }
];

let hasColor = c => rectangle => rectangle.color == c;
let isSqure = rectangle => rectangle.width == rectangle.height;
let calcArea = rectangle => rectangle.width * rectangle.height;
let calcPerimeter = rectangle => (rectangle.width + rectangle.height) * 2;

let sum = elements => elements.reduce((a, b) => a + b, 0);
let max = elements => elements.reduce((a, b) => a >= b ? a : b);

let map = mapFunc => figureArray => figureArray.map(mapFunc);
let filter = filterFunc => figureArray => figureArray.filter(filterFunc);
let reduce = (reduceFunc, initValue) => figureArray => figureArray.reduce(reduceFunc, initValue);

let flow = (...funcs) => data => funcs.reduce((result, func) => func(result), data);
let combine = (...funcs) => data => funcs.reduceRight((result, func) => func(result), data);

let or = (fn1, fn2) => data => fn1(data) || fn2(data);
let and = (fn1, fn2) => data => fn1(data) && fn2(data);
let all = (...funcs) => data => funcs.reduce((result, func) => func(data) && result, true);
let any = (...funcs) => data => funcs.reduce((result, func) => func(data) || result, false); 

let maxAreaBlackSquareFlow = flow(
    filter(all(hasColor('black'), isSqure)),
    map(calcArea),
    max
);
let sumPerimetersRedSquares = flow(
    filter(hasColor('red')),
    map(calcPerimeter),
    sum
);
console.log("maxAreaBlackSquareFlow :" + maxAreaBlackSquareFlow(rectangles));
console.log("sumPerimetersRedSquares is:" + sumPerimetersRedSquares(rectangles));