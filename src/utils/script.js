const questionElement = document.querySelector(".test__question");
const cardsList = document.querySelector(".cards__list");
const buttonElement = document.querySelector(".submit__btn");
const quizzForm = document.querySelector(".test__form");
const cardTemplate = document
  .querySelector(".test-answer-template")
  .content.querySelector(".card");
const personalityResult = document.querySelector(".final-results__personality");
const personalityResultImg = document.querySelector(".final-results__img");
const data = [
  {
    question: "Do you have children?",
    answer: ["Yes, more than 1", "Yes, only 1", "Yes, one on the way", "No"],
    values: [1, 2, 3, 4],
  },
  {
    question: "Income level",
    answer: ["Low", "Medium", "High", "Very High"],
    values: [1, 2, 3, 4],
  },
  {
    question: "Spending level",
    answer: ["Save everything", "Moderate", "Spend freely", "Big spender"],
    values: [1, 2, 3, 4],
  },
  {
    question: "Online shopping habits",
    answer: ["Never", "Rarely", "Often", "Always"],
    values: [1, 2, 3, 4],
  },
];

let total = 0;
let questionNumber = 0;

function getAnswers(number) {
  const answerArray = data[number].answer;

  function getAnswerInput(answer, index) {
    const cardElement = cardTemplate.cloneNode(true);
    const answerElement = cardElement.querySelector(".card__answers");
    const answerInput = cardElement.querySelector(".test__answer");
    const labelElement = cardElement.querySelector("label");

    answerElement.textContent = answer;
    answerInput.id = `testAnswer${number}-${index + 1}`;
    answerInput.value = data[number].values[index];
    labelElement.setAttribute("for", `testAnswer${number}-${index + 1}`);

    return cardElement;
  }

  answerArray.forEach((answer, index) => {
    cardsList.append(getAnswerInput(answer, index));
  });
}

quizzForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const checkedCard = cardsList.querySelector(":checked");

  if (checkedCard) {
    const answerValue = Number(checkedCard.value);
    total += answerValue;
    console.log("Selected value:", answerValue);
    console.log("Total:", total);
  }

  const oldCards = cardsList.querySelectorAll(".card");
  oldCards.forEach((card) => {
    card.remove();
  });

  questionNumber += 1;

  if (questionNumber <= 3) {
    getAnswers(questionNumber);
    questionElement.textContent = data[questionNumber].question;
    buttonElement.textContent = questionNumber === 3 ? "Submit" : "Next";
  } else {
    questionElement.textContent = "YOUR FINAL RESULTS";
    personalityResult.style.display = "block";
    personalityResultImg.style.display = "block";
    buttonElement.style.display = "none";
  }
});

getAnswers(questionNumber);
questionElement.textContent = data[questionNumber].question;
