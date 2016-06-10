/** @jsx createElement */

import {createElement, render} from './../../dist/index.js';;

let counter = 0;
let lastActionClass = "";
let lastAction = "";
let size = "11px";

const counterJSX = (counter) => (
    <div>
        <h2>Counter</h2>
        <div>
            The number is: <span>{counter}</span>
            {lastAction && lastActionClass && (
                <div style={{fontSize: size}}>
                    The last action was... <span className={lastActionClass}>{lastAction}</span>
                </div>
            )}
        </div>
        <button id="increase" onClick={increase}>Increase value</button>
        <button id="decrease" onClick={decrease}>Decrease value</button>
    </div>
);

const $root = document.getElementById('root');

const $increase = document.getElementById('increase');
const $decrease = document.getElementById('decrease');

render($root, counterJSX(counter));

function increase() {
    counter++;
    size = "14px";
    lastAction = "Increase";
    lastActionClass = "action-increase";
    render($root, counterJSX(counter));
};

function decrease() {
    counter--;
    size = "8px";
    lastAction = "Decrease";
    lastActionClass = "action-decrease";
    render($root, counterJSX(counter));
};