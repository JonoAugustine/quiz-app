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
        e.textContent = "Time: " + (timer_value == null ? 0 : timer_value);
        if (timer_value != null) {
          let timer = setInterval(() => {
            timer_value--;
            e.textContent = "Time: " + timer_value;
            if (timer_value <= 0) {
              endQuiz(0);
              clearInterval(timer);
            }
          }, second);
        }
      }
    )
  );
  return base;
};

const home = () => {
  const base = div();
  base.appendChild(nav());
  const content = contentDiv();
  base.appendChild(content);
  content.appendChild(
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
  content.appendChild(
    elementOf(
      "h4",
      {
        "text-align": "center"
      },
      e => {
        e.textContent = "Click to start a new quiz";
      }
    )
  );
  content.appendChild(
    button("Start Quiz", true, () => startQuiz(default_timer))
  );
  return base;
};

const quizQuestion = question => {
  const base = div();

  base.appendChild(elementOf("h2", {}, e => { e.textContent = question.text }));

  return base;
};

const quizPage = timer_value => {
  const base = div();
  base.appendChild(nav(timer_value));

  const content = contentDiv();
  content.setAttribute("id", "content");
  base.appendChild(content);
  

  return base;
};

const highscores = () => {
  const base = div(true);
  base.appendChild(button("Back to Main Menu", "green", () => show(home())));
  return base;
};

// API

const startQuiz = timer_value => {
  show(quizPage(timer_value));
};

const randomQuestion = () => {
  
}

const endQuiz = timer_value => {};

show(quizPage(0), false); // TODO
