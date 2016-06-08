"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isEventProp = isEventProp;
exports.addEventListeners = addEventListeners;
/**
 * Returns true if a prop is an event hander, e.g. it starts with "on"
 * @param {String} name
 * @return {Boolean}
 */
function isEventProp(name) {
    return (/^on/.test(name)
    );
}

function addEventListeners($target, props) {
    Object.keys(props).forEach(function (name) {
        if (isEventProp(name)) {
            $target.addEventListener(extractEventName(name), props[name]);
        }
    });
}

function extractEventName(name) {
    return name.slice(2).toLowerCase();
}