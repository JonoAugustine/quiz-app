const second = 1000;

const elementOf = (tag, style, scope) => {
  const e = document.createElement(tag);
  scope(e);
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
const div = () => document.createElement("div");

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

// Templates

const nav = timer_value => {
  const base = div();
  base.setAttribute(
    "style",
    readStyle({
      top: 0,
      height: "30px",
      padding: "10px 10px 0 10px",
      "border-bottom": "1px solid grey"
    })
  );
  base.appendChild(
    elementOf(
      "a",
      {
        color: "purple",
        float: "left"
      },
      e => {
        e.textContent = "View HighScores";
        e.setAttribute("onClick", "show(highscores())");
      }
    )
  );
  base.appendChild(
    elementOf(
      "div",
      {
        float: "right"
      },
      e => {
        if (timer_value != null) {
          let timer = setInterval(() => {
            timer_value--;
            e.textContent = "Time: " + timer_value;
            if (timer_value <= 0) {
              endQuiz(0);
              clearInterval(timer);
            }
          }, second);
        } else {
          e.textContent = "Time: 0";
        }
      }
    )
  );
  return base;
};

const home = () => {
  const base = div();
  base.appendChild(nav(10));
  base.appendChild(
    elementOf(
      "h1",
      {
        "text-align": "center"
      },
      e => {
        e.textContent = "Coding Quiz Challenge";
      }
    )
  );
  base.appendChild(
    elementOf(
      "h4",
      {
        "text-align": "center"
      },
      e => {
        e.textContent = "Click 'Begin' to start a new quiz";
      }
    )
  );
  return base;
};

const highscores = () => {
  return div();
};

// API

const endQuiz = timer_value => {};

show(home(), false);
