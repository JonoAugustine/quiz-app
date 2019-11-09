/** The questions used in the Quiz. */
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

/** A second in milliseconds */
const second = 1000;
/** Default timout for notifications (ie correct/incorrect during quiz) */
const default_timout = 1 * second;

/** Time allotted for each question. */
const time_per_question = 15;
/** Default quiz time limit */
const default_timer = questions.length * time_per_question;
/** Seconds to remove for incorrect answers */
const question_penalty = 10;

const storage_location = "scores";

/**
 * TODO I don't like having this be a top-level
 * TODO variable but im not sure how to handle passing it to new components
 */
var timer_value = null;
var timer_interval = null;
