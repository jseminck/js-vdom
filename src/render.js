import {setProps, updateProps} from './props';
import {addEventListeners} from './evemts';

let oldNode = undefined;

export default function render($parent, newNode) {
    // TODO... Not working
    updateElement($parent, newNode, oldNode);
    oldNode = newNode;
}

function updateElement($parent, newNode, oldNode, index = 0) {
    if (oldNode === undefined) {
        $parent.appendChild(createElement(newNode));
    }
    else if (newNode === undefined) {
        $parent.removeChild($parent.childNodes[index]);
    }
    else if (changed(newNode, oldNode)) {
        $parent.replaceChild(createElement(newNode),$parent.childNodes[index]);
    }
    else if (newNode.type) {
        updateProps(
            $parent.childNodes[index],
            newNode.props,
            oldNode.props
        );

        const newLength = newNode.children.length;
        const oldLength = oldNode.children.length;
        for (let i = 0; i < newLength || i < oldLength; i++) {
            updateElement(
                $parent.childNodes[index],
                newNode.children[i],
                oldNode.children[i],
                i
            );
        }
    }
}

function createElement(node) {
    if (typeof node === 'string' || typeof node === 'number') {
        return document.createTextNode(node);
    }

    const $el = document.createElement(node.type);
    setProps($el, node.props);
    addEventListeners($el, node.props);

    node.children.map(createElement).forEach($el.appendChild.bind($el));
    return $el;
}

function changed(node1, node2) {
  return typeof node1 !== typeof node2 ||
         typeof node1 === 'string' && node1 !== node2 ||
         typeof node1 === 'number' && node1 !== node2 ||
         node1.type !== node2.type
}
