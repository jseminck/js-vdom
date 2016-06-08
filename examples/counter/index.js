/** @jsx createElement */

import {createElement, render} from './../../dist/index.js';;

let counter = 0;

const counterJSX = (counter) => (
    <div>
        The number is: <span>{counter}</span>
    </div>
);

const $root = document.getElementById('root');
const $increase = document.getElementById('increase');

render($root, counterJSX(counter));
$increase.addEventListener('click', () => {
    counter++;
    render($root, counterJSX(counter));
});