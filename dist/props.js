'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setProps = setProps;
exports.updateProps = updateProps;

var _events = require('./events');

/**
 * Set properties for a given HTML Element
 * @param {HTMLElement} $target
 * @param {Array} props
 */
function setProps($target, props) {
    Object.keys(props).forEach(function (name) {
        setProp($target, name, props[name]);
    });
}

/**
 * Update properties for a given HTML Element
 * @param {HTMLElement} $target
 * @param {Array} newProps
 * @param {Array} [oldProps]
 */
function updateProps($target, newProps) {
    var oldProps = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var props = Object.assign({}, newProps, oldProps);
    Object.keys(props).forEach(function (name) {
        updateProp($target, name, newProps[name], oldProps[name]);
    });
}

function setProp($target, name, value) {
    if (isCustomProp(name)) {
        return;
    } else if (name === 'className') {
        $target.setAttribute('class', value);
    } else if (name === 'style') {
        setStyleProp($target, value);
    } else if (typeof value === 'boolean') {
        setBooleanProp($target, name, value);
    } else {
        $target.setAttribute(name, value);
    }
}

function setStyleProp($target, styles) {
    console.log("Setting styles: ", styles);
    $target.style.fontSize = "32px";
    Object.keys(styles).forEach(function (style) {
        console.log("Style: ", style);
        console.log("styles[style]: ", styles[style]);
        $target.style[style] = styles[style];
    });
}

function setBooleanProp($target, name, value) {
    if (value) {
        $target.setAttribute(name, value);
        $target[name] = true;
    } else {
        $target[name] = false;
    }
}

function isCustomProp(name) {
    return (0, _events.isEventProp)(name);
}

function removeProp($target, name, value) {
    if (isCustomProp(name)) {
        return;
    } else if (name === 'className') {
        $target.removeAttribute('class');
    } else if (typeof value === 'boolean') {
        removeBooleanProp($target, name);
    } else {
        $target.removeAttribute(name);
    }
}

function removeBooleanProp($target, name) {
    $target.removeAttribute(name);
    $target[name] = false;
}

function updateProp($target, name, newVal, oldVal) {
    if (!newVal) {
        removeProp($target, name, oldVal);
    } else if (!oldVal || newVal !== oldVal) {
        setProp($target, name, newVal);
    }
}