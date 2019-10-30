const second = 1000;
const default_timer = 90;

const elementOf = (tag, style, scope) => {
  const e = document.createElement(tag);
  if (typeof scope == "function") {
    scope(e);
  }
  if (style !== null) {
    e.setAttribute("style", readStyle(style));
  }
  return e;
};

const readStyle = style => {
  if (style === null) return "";
  let s = "";
  for (var k in style) {
    s = s + k + ":" + style[k] + ";";
  }
  return s;
};

const root = document.querySelector("#root");

const div = todo => {
  const e = document.createElement("div");
  if (todo) e.innerHTML = "TODO";
  return e;
};

const contentDiv = () => {
  return elementOf("div", {
    margin: "0 auto",
    width: "70%"
  });
};

const button = (text, centered, onClick) =>
  elementOf(
    "button",
    {
      width: "150px",
      height: "25px",
      "border-color": "black",
      "background-color": "white",
      margin: centered ? '0 auto' : '',
      display: 'block'
    },
    e => {
      e.innerHTML = text;
      e.onclick = onClick;
    }
  );

const clear = element => {
  const e = element == null ? root : element;
  while (e.firstChild !== null) {
    e.removeChild(e.firstChild);
  }
};

const show = (child, clearRoot) => {
  if (clearRoot !== false) {
    console.log("clearing root");
    clear();
  }
  root.appendChild(child);
};

const questions = [
    {
        text: '',
        choices: [],
        answer: ''
    }
]