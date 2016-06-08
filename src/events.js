/**
 * Returns true if a prop is an event hander, e.g. it starts with "on"
 * @param {String} name
 * @return {Boolean}
 */
export function isEventProp(name) {
    return /^on/.test(name);
}

export function addEventListeners($target, props) {
    Object.keys(props).forEach(name => {
        if (isEventProp(name)) {
            $target.addEventListener(
                extractEventName(name),
                props[name]
            );
        }
    });
}

function extractEventName(name) {
    return name.slice(2).toLowerCase();
}