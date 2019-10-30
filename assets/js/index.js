const root = document.querySelector("#root");

const elementOf = (tag, style, scope) => {
  const e = document.createElement(tag);
  if (scope) scope(e);
  return e;
};

const templates = {
  home: () => {
    const header = (root.children = []);
  }
};

root.appendChild(elementOf("div", (e) => {
    e.textContent = "DIV"
}));
templates.home();
