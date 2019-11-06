/** Root/parent div element. */
const root = document.querySelector("#root");

/**
 * Converts a style object into a string to be used with setAttribute.
 * @param {Object} style The style object in form `{ style: "val", "two-part": "val"}`
 */
const readStyle = style => {
  if (style === null) return "";
  let s = "";
  for (var k in style) {
    s = s + k + ":" + style[k] + ";";
  }
  return s;
};

/**
 * Convienence funtion for building a DOM Element.
 * @param {String} tag The element tag. div, h1, etc.
 * @param {Object} style A style object to be applied to the newly created element.
 * ```
 * {
 *    prop: "val",
 *     "two-part": "val"
 * }
 * ```
 * @param {function} scope A callback scope for any additional modification
 * of the new element before returning.
 */
const elementOf = (tag, style, scope) => {
  const e = document.createElement(tag);
  if (style !== null) {
    e.setAttribute("style", readStyle(style));
  }
  if (typeof scope == "function") {
    scope(e);
  }
  return e;
};

/** Get a plain div. */
const divOf = style => elementOf("div", style);

/**
 * Get a centered div.
 * @param {String} width The centered width of the div. will be `70%` if null.
 */
const containerOfWidth = (width, appendStyle) =>
  elementOf("div", {
    margin: "5% auto 0 auto",
    width: width == null ? "70%" : width,
    ...appendStyle
  });

/**
 * Get a header element of the given level with the given text.
 * @param {Number} level The header level.
 * @param {String} text The text content on the header.
 * @param {*} style Style object to apply to this
 * @param {function} scope A callback scope for any additional modification
 * of the new element before returning.
 */
const headerOf = (level, text, style, scope) =>
  elementOf(
    "h" + (level == null ? 1 : level),
    style == null ? {} : style,
    h => {
      h.textContent = text;
      if (typeof scope == "function") scope(h);
    }
  );

/**
 * Get a button element with the given text.
 * @param {String} text The text content of the button.
 * @param {boolean} centered whether the button should be centered.
 * @param {function} onClick The function to call on click.
 */
const buttonOf = (text, centered, onClick, appendStyle) =>
  elementOf(
    "button",
    {
      "border-color": "black",
      "background-color": "white",
      margin: `0.5em ${centered ? "auto" : "0.5em"}`,
      display: "block",
      ...appendStyle
    },
    e => {
      e.innerHTML = text;
      e.onclick = onClick;
    }
  );

/**
 * Clear the given DOM element or the root if none is provided.
 * @param {*} element The DOM element to clear.
 */
const clear = element => {
  const e = element == null ? root : element;
  while (e.firstChild !== null) {
    e.removeChild(e.firstChild);
  }
};

/**
 * Append an array of DOM Elements to the given base.
 * @param {*} baseElement The element to append to.
 * @param {*} childElements An array of child elements.
 * @returns The base element.
 */
const build = (baseElement, ...childElements) => {
  childElements.forEach(e => baseElement.appendChild(e));
  return baseElement;
};

/**
 * Display the given child DOM element in the root.
 * @param {*} child The DOM element to append to the root.
 * @param {*} clearRoot Whether to clear the root.
 */
const show = (child, clearRoot) => {
  if (clearRoot !== false) clear();
  build(root, child);
};

/**
 * Writes an object to localStorage at key storage+location.
 * @param {*} object The object to be written to local storage
 */
const saveLocal = object => {
  let s = JSON.stringify(object);
  localStorage[storage_location] = s;
  console.log('write as: "' + s + '"');
};

/**
 * @returns an array of saved score objects `{initials: string, }`
 */
const loadLocal = () => {
  let s = localStorage[storage_location];
  if (s == null) {
    console.log("load failed. making new save");
    s = [];
    saveLocal(s);
  } else {
    s = JSON.parse(s);
    console.log("read as: ", s);
  }
  return s;
};
