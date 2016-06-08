/** @jsx createElement */

import {createElement, render} from './../../dist/index.js';;

let counter = 0;
let lastActionClass = "";
let lastAction = "";

const counterJSX = (counter) => (
    <div>
        <h2>Counter</h2>
        The number is: <span>{counter}</span>
        {lastAction && lastActionClass && (
            <div>
                The last action was... <span className={lastActionClass}>{lastAction}</span>
            </div>
        )}
    </div>
);

const $root = document.getElementById('root');

const $increase = document.getElementById('increase');
const $decrease = document.getElementById('decrease');

render($root, counterJSX(counter));

$increase.addEventListener('click', () => {
    counter++;
    lastAction = "Increase";
    lastActionClass = "action-increase";
    render($root, counterJSX(counter));
});

$decrease.addEventListener('click', () => {
    counter--;
    lastAction = "Decrease";
    lastActionClass = "action-decrease";
    render($root, counterJSX(counter));
});