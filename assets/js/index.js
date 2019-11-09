// Components

const nav = start_timer =>
  build(
    divOf({
      top: 0,
      display: "flex",
      "font-size": "4vw",
      padding: "10px 10px 0 10px",
      "border-bottom": "1px solid grey"
    }),
    elementOf("a", { cursor: "pointer" }, e => {
      e.textContent = "View HighScores";
      e.setAttribute("onClick", "show(highscores())");
    }),
    elementOf(
      "div",
      {
        "margin-left": "55%"
      },
      e => {
        e.textContent = "Time: " + (timer_value == null ? 0 : timer_value);
        if (start_timer) {
          timer_interval = setInterval(() => {
            timer_value--;
            e.textContent = "Time: " + timer_value;
            if (timer_value <= 0) {
              show(quizEndPage());
              clearInterval(timer);
            }
          }, second);
        }
      }
    )
  );

const home = () =>
  build(
    divOf(),
    nav(),
    headerOf(1, "Coding Quiz Challenge", { "text-align": "center" }),
    build(
      containerOfWidth(),
      elementOf(
        "h4",
        { "text-align": "center" },
        e => (e.textContent = "Click to start a new quiz")
      ),
      elementOf(
        "p",
        { "font-size": "0.6em" },
        e =>
          (e.textContent = `You will have 15 seconds
      for each question. Each incorrectly answered 
      question will deduct 10 seconds from the timer.`)
      ),
      buttonOf("Start Quiz", true, () => show(quizPage()))
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
    divOf(),
    headerOf(2, question.text, { "text-align": "center" })
  );

  for (var i = 0; i < question.choices.length; i++) {
    const rep = i;
    build(
      base,
      buttonOf(
        question.choices[i],
        true,
        () => {
          if (question.choices[rep] != question.answer) {
            timer_value = timer_value - question_penalty;
          }
          footerNotif(question.choices[rep] == question.answer, default_timout);
          nextQ();
        },
        {
          width: "50%"
        }
      )
    );
  }

  return base;
};

const quizPage = () => {
  timer_value = default_timer;
  const base = build(divOf(), nav(true));

  const content = containerOfWidth("50%");
  build(base, content);

  // Make a footer to show answer results
  const footer = containerOfWidth("30%");
  build(base, footer);

  let currentQ = 0;

  const nextQ = () => {
    if (currentQ == questions.length) {
      show(quizEndPage());
    } else {
      clear(content);
      build(content, quizQuestion(questions[currentQ++], nextQ, footer));
    }
  };

  nextQ();

  return base;
};

const quizEndPage = () => {
  clearInterval(timer_interval);
  return build(
    containerOfWidth("80%"),
    headerOf(2, "All Done!"),
    headerOf(4, "Here's your score: " + timer_value),
    build(
      elementOf("form", { display: "flex" }, e => {
        e.action = "javascript:saveResults();";
      }),
      headerOf(5, "You'r Initials: ", { margin: "2px 10px 0 0" }),
      elementOf(
        "input",
        {
          width: "100px",
          "font-size": "0.7em",
          border: "none",
          "border-bottom": "1px solid white",
          color: "white",
          "background-color": "transparent"
        },
        e => {
          e.setAttribute("id", "form_in");
        }
      ),
      elementOf(
        "button",
        {
          padding: "10px",
          margin: "0 0 0 10px",
          border: "none",
          "font-size": "0.6em",
          color: "white",
          "background-color": "forestgreen"
        },
        e => {
          e.textContent = "Submit";
          e.type = "submit";
        }
      )
    )
  );
};

const highscores = () => {
  const scoreDiv = divOf();

  const refresh = () => {
    clear(scoreDiv);
    loadLocal()
      .sort((a, b) => a.score - b.score)
      .forEach(score =>
        build(
          scoreDiv,
          build(
            divOf({
              width: "100%",
              height: "20px",
              "background-color": "steel"
            }),
            headerOf(5, score.initials + ": " + score.score, {
              margin: "10px 0"
            })
          )
        )
      );
  };

  refresh();

  return build(
    divOf(),
    build(containerOfWidth("35%"), headerOf(2, "HighScores"), scoreDiv),
    build(
      containerOfWidth("35%"),
      build(
        divOf({ display: "inline-block" }),
        buttonOf("Back to Main Menu", null, () => show(home())),
        buttonOf("Clear All HighScores", null, () => {
          // clear saves
          saveLocal([]);
          refresh();
        })
      )
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
  timer_value = null;
};

show(home());
