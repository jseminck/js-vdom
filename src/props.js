import {isEventProp} from './events';

/**
 * Set properties for a given HTML Element
 * @param {HTMLElement} $target
 * @param {Array} props
 */
export function setProps($target, props) {
    Object.keys(props).forEach(name => {
        setProp($target, name, props[name]);
    });
}

/**
 * Update properties for a given HTML Element
 * @param {HTMLElement} $target
 * @param {Array} newProps
 * @param {Array} [oldProps]
 */
export function updateProps($target, newProps, oldProps = {}) {
    const props = Object.assign({}, newProps, oldProps);
    Object.keys(props).forEach(name => {
        updateProp($target, name, newProps[name], oldProps[name]);
    });
}

function setProp($target, name, value) {
    if (isCustomProp(name)) {
        return;
    }
    else if (name === 'className') {
        $target.setAttribute('class', value);
    } else if (typeof value === 'boolean') {
        setBooleanProp($target, name, value);
    } else {
        $target.setAttribute(name, value);
    }
}

function setBooleanProp($target, name, value) {
    if (value) {
        $target.setAttribute(name, value);
        $target[name] = true;
    }
    else {
        $target[name] = false;
    }
}

function isCustomProp(name) {
    return isEventProp(name);
}

function removeProp($target, name, value) {
    if (isCustomProp(name)) {
        return;
    }
    else if (name === 'className') {
        $target.removeAttribute('class');
    }
    else if (typeof value === 'boolean') {
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