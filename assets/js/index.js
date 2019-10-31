// Components

const nav = () =>
  build(
    div({
      top: 0,
      height: "30px",
      padding: "10px 10px 0 10px",
      "border-bottom": "1px solid grey"
    }),
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
    ),
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

const home = () =>
  build(
    div(),
    nav(),
    build(
      contentDiv(),
      headerOf(1, "Coding Quiz Challenge", { "text-align": "center" }),
      elementOf(
        "h4",
        {
          "text-align": "center"
        },
        e => {
          e.textContent = "Click to start a new quiz";
        }
      ),
      button("Start Quiz", true, () => show(quizPage()))
    )
  );

const quizQuestion = (question, nextQ, footer) => {
  const footerNotif = (right, timout) => {
    clear(footer);
    build(
      footer,
      headerOf(
        3,
        (right ? "Correct" : "Wrong") + "!",
        { "text-align": "center" },
        e => {
          setTimeout(() => {
            e.textContent = "";
          }, timout);
        }
      )
    );
  };

  const base = build(
    div(),
    headerOf(2, question.text, { "text-align": "center" })
  );

  for (var i = 0; i < question.choices.length; i++) {
    const rep = i;
    build(
      base,
      button(question.choices[i], true, () => {
        if (question.choices[rep] != question.answer) {
          timer_value = timer_value - question_penalty;
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
  const base = build(div(), nav());

  const content = contentDiv("40%");
  build(base, content);

  // Make a footer to show answer results
  const footer = contentDiv("30%");
  build(base, footer);

  let availableQ = questions;

  const nextQ = () => {
    if (availableQ.length == 0) {
      show(quizEndPage());
    } else {
      clear(content);
      let r = Math.floor(Math.random() * availableQ.length);
      let randQ = availableQ[r];
      availableQ.splice(r, 1);
      build(content, quizQuestion(randQ, nextQ, footer));
    }
  };

  nextQ();

  return base;
};

const quizEndPage = () =>
  build(
    div(),
    build(
      contentDiv("35%"),
      headerOf(2, "All Done!"),
      headerOf(4, "Here's your score: " + timer_value),
      build(
        elementOf(
          "form",
          {
            display: "flex",
            height: "20px"
          },
          e => {
            e.action = "javascript:saveResults();";
          }
        ),
        headerOf(5, "You'r Initials: ", { margin: "2px 10px 0 0" }),
        elementOf("input", {}, e => {
          e.setAttribute("id", "form_in");
        }),
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
      )
    )
  );

const highscores = () => {
  const content = build(contentDiv("35%"), headerOf(2, "HighScores"));

  loadLocal()
    .sort((a, b) => a.score - b.score)
    .forEach(score =>
      build(
        content,
        build(
          div({ width: "100%", height: "20px", "background-color": "steel" }),
          headerOf(5, score.initials + ": " + score.score, { margin: "10px 0" })
        )
      )
    );

  return build(
    div(),
    build(content),
    build(
      contentDiv("35%"),
      button("Back to Main Menu", null, () => show(home()))
    )
  );
};

// API

const saveResults = () => {
  const initials = document.getElementById("form_in").value;
  if (initials.length > 0) {
    let s = loadLocal();
    s.push({ initials: initials, score: timer_value });
    saveLocal(s);
    show(highscores());
  }
};

show(highscores());
