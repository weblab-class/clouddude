/// Listens for keyboard inputs
window.addEventListener(
  "keyup",
  (event) => {
    Key.onKeyup(event);
  },
  false
);
window.addEventListener(
  "keydown",
  (event) => {
    Key.onKeydown(event);
  },
  false
);

// Listens for mouse inputs
document.body.onmousedown = () => {
  Key.onKeydown({ keyCode: 1 });
};

document.body.onmouseup = () => {
  Key.onKeyup({ keyCode: 1 });
};

// Structure logging currently pressed keys
const Key = {
  // Set of currently pressed keys
  _pressed: {},

  // Recognized keyCodes
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  R: 82,
  A: 65,
  D: 68,
  W: 87,
  S: 83,
  MOUSE: 1,

  // Checks if keyCode is currently pressed
  isDown(keyCode) {
    return this._pressed[keyCode];
  },

  // Adds pressed key to currently pressed
  onKeydown(event) {
    this._pressed[event.keyCode] = true;
  },

  // Removes pressed key from currently pressed
  onKeyup(event) {
    delete this._pressed[event.keyCode];
  },
};

export default Key;
