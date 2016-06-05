'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = render;
function render($parent, newNode, oldNode) {
    var index = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

    if (!oldNode) {
        $parent.appendChild(createElement(newNode));
    } else if (!newNode) {
        $parent.removeChild($parent.childNodes[index]);
    } else if (changed(newNode, oldNode)) {
        $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
    } else if (newNode.type) {
        var newLength = newNode.children.length;
        var oldLength = oldNode.children.length;
        for (var i = 0; i < newLength || i < oldLength; i++) {
            render($parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
        }
    }
}

function createElement(node) {
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }

    var $el = document.createElement(node.type);
    node.children.map(createElement).forEach($el.appendChild.bind($el));
    return $el;
}

function changed(node1, node2) {
    return (typeof node1 === 'undefined' ? 'undefined' : _typeof(node1)) !== (typeof node2 === 'undefined' ? 'undefined' : _typeof(node2)) || typeof node1 === 'string' && node1 !== node2 || node1.type !== node2.type;
}