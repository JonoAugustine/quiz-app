const second = 1000;
const default_timer = 100;
const default_timout = 1 * second;
// TODO I don't like having this be a top-level
// variable but im not sure how to handle passing it to new components
var timer_value = null; // TODO reset to null

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

const div = todo => document.createElement("div");

const contentDiv = width =>
  elementOf("div", {
    margin: "5% auto 0 auto",
    width: width == null ? "70%" : width
  });

const headerOf = (level, text, style, scope) =>
  elementOf(
    "h" + (level == null ? 1 : level),
    style == null ? {} : style,
    h => {
      h.textContent = text;
      if (typeof scope == "function") scope(h);
    }
  );

const button = (text, centered, onClick) =>
  elementOf(
    "button",
    {
      width: "150px",
      height: "25px",
      "border-color": "black",
      "background-color": "white",
      margin: centered ? "0 auto" : "",
      display: "block"
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
    text: "What is a number?",
    choices: ["a string", "a flamingo", "a digit", "fake news"],
    answer: "fake news"
  },
  {
    text: "What is javascript",
    choices: ["witchcraft", "java", "technobabel", "fake news"],
    answer: "fake news"
  },
  {
    text: "Why is Gamora?",
    choices: ["because", "uhh", "ÿes"],
    answer: "ÿes"
  }
];
