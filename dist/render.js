'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = render;

var _props = require('./props');

var oldNode = undefined;

function render($parent, newNode) {
    // TODO... Not working
    updateElement($parent, newNode, oldNode);
    oldNode = newNode;
}

function updateElement($parent, newNode, oldNode) {
    var index = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

    if (oldNode === undefined) {
        $parent.appendChild(createElement(newNode));
    } else if (newNode === undefined) {
        $parent.removeChild($parent.childNodes[index]);
    } else if (changed(newNode, oldNode)) {
        $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
    } else if (newNode.type) {
        (0, _props.updateProps)($parent.childNodes[index], newNode.props, oldNode.props);

        var newLength = newNode.children.length;
        var oldLength = oldNode.children.length;
        for (var i = 0; i < newLength || i < oldLength; i++) {
            updateElement($parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
        }
    }
}

function createElement(node) {
    if (typeof node === 'string' || typeof node === 'number') {
        return document.createTextNode(node);
    }

    var $el = document.createElement(node.type);
    (0, _props.setProps)($el, node.props);

    node.children.map(createElement).forEach($el.appendChild.bind($el));
    return $el;
}

function changed(node1, node2) {
    return (typeof node1 === 'undefined' ? 'undefined' : _typeof(node1)) !== (typeof node2 === 'undefined' ? 'undefined' : _typeof(node2)) || typeof node1 === 'string' && node1 !== node2 || typeof node1 === 'number' && node1 !== node2 || node1.type !== node2.type;
}