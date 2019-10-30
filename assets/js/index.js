// Templates

const nav = () => {
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
    headerOf(1, "Coding Quiz Challenge", { "text-align": "center" })
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
  content.appendChild(button("Start Quiz", true, () => startQuiz()));
  return base;
};

const quizQuestion = (question, nextQ, footer) => {
  const footerNotif = (right, timout) => {
    footer.appendChild(
      elementOf(
        "h3",
        {
          /* todo */
        },
        e => {
          e.textContent = (right ? "Correct" : "Wrong") + "!";
          setTimeout(() => {
            e.textContent = "";
          }, timout);
        }
      )
    );
  };

  const base = div();

  base.appendChild(
    elementOf("h2", {}, e => {
      e.textContent = question.text;
    })
  );

  for (var i = 0; i < question.choices.length; i++) {
    const rep = i;
    base.appendChild(
      button(question.choices[i], false, () => {
        console.log(question, rep);
        if (question.choices[rep] != question.answer) {
          timer_value = timer_value - 10;
        }
        footerNotif(question.choices[rep] == question.answer, default_timout);
        nextQ();
      })
    );
  }

  return base;
};

const quizPage = () => {
  timer_value = default_timer;
  const base = div();
  base.appendChild(nav(timer_value));

  const content = contentDiv("40%");
  content.setAttribute("id", "content");
  base.appendChild(content);

  // Make a footer to show answer results
  const footer = contentDiv("30%");
  base.appendChild(footer);

  let availableQ = questions;

  const nextQ = () => {
    if (availableQ.length == 0) {
      return endQuiz(timer_value);
    }
    clear(content);
    let r = Math.floor(Math.random() * availableQ.length);
    let randQ = availableQ[r];
    availableQ.splice(r, 1);
    console.log(r);
    content.appendChild(quizQuestion(randQ, nextQ, footer));
  };

  nextQ();

  return base;
};

const quizEndPage = () => {
  const base = div();
  const content = contentDiv("35%");
  base.appendChild(content);

  content.appendChild(headerOf(2, "All Done!"));
  content.appendChild(headerOf(4, "Here's your score: " + timer_value));

  const form = elementOf(
    "form",
    {
      display: "flex",
      height: "20px"
    },
    e => {
      e.action = "javascript:saveResults();";
    }
  );
  form.appendChild(headerOf(5, "You'r Initials: ", { margin: "2px 10px 0 0" }));
  form.appendChild(
    elementOf("input", {}, e => {
      e.setAttribute("id", "form_in");
    })
  );
  form.appendChild(
    elementOf(
      "button",
      {
        width: "100px",
        height: "20px",
        margin: "0 0 0 10px",
        "border-color": "black",
        "background-color": "white"
      },
      e => {
        e.textContent = "Submit";
        e.type = "submit";
      }
    )
  );
  content.appendChild(form);
  return base;
};

const highscores = () => {
  const base = div(true);
  base.appendChild(button("Back to Main Menu", "green", () => show(home())));
  return base;
};

// API

const saveResults = () => {
  const initials = document.getElementById("form_in").value;
  if (initials.length > 0) {
    // TODO save to localstorage https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
  }
};

const startQuiz = () => {
  show(quizPage());
};

const endQuiz = () => {
  console.log("Quiz Ended, score " + timer_value);
  show(quizEndPage());
};

show(home(), false);
