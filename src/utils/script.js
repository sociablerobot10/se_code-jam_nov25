import { enableValidation, disableBtnElement } from "../validation.js";

import { settings, data } from "./constants.js";

const questionElement = document.querySelector(".test__question");
const cardsList = document.querySelector(".cards__list");
const buttonElement = document.querySelector(".submit__btn");
const quizzForm = document.querySelector(".test__form");
const cardTemplate = document
  .querySelector(".test-answer-template")
  .content.querySelector(".card");
const personalityResult = document.querySelector(".final-results__personality");
const personalityResultImg = document.querySelector(".final-results__img");
const modal = document.querySelector(".modal");
const startBtn = modal.querySelector(".modal__start");
const finalResultsDescription = document.querySelector(
  ".final-results__description"
);

let totalPlannerScore = 0;
let totalSaverScore = 0;
let totalImpulseScore = 0;
let totalSplurgerScore = 0;
let questionNumber = 0;
const questionData = data["const_data"];
const inpulseBuyerDescription = data["rules"]["Impulse Buyer"]["description"];
const splurgerDescription = data["rules"]["Splurger"]["description"];
const saverDescription = data["rules"]["Saver"]["description"];
const plannerDescription = data["rules"]["Planner"]["description"];

function getAnswers(number) {
  const answerArray = questionData[number].answer;

  function getAnswerInput(answer, index) {
    const cardElement = cardTemplate.cloneNode(true);
    const answerElement = cardElement.querySelector(".card__answers");
    const answerInput = cardElement.querySelector(".test__answer");
    const labelElement = cardElement.querySelector("label");

    answerElement.textContent = answer;
    answerInput.id = `testAnswer${number}-${index + 1}`;
    answerInput.plannerScore = questionData[0].planner[index];
    answerInput.saverScore = questionData[0].saver[index];
    answerInput.impulseScore = questionData[0].impulse[index];
    answerInput.splurgerScore = questionData[0].splurger[index];
    labelElement.setAttribute("for", `testAnswer${number}-${index + 1}`);

    return cardElement;
  }

  answerArray.forEach((answer, index) => {
    cardsList.append(getAnswerInput(answer, index));
  });

  disableBtnElement(buttonElement, settings);
}

quizzForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const checkedCard = cardsList.querySelector(":checked");

  if (checkedCard) {
    const answerPlannerScore = Number(checkedCard.plannerScore);
    totalPlannerScore += answerPlannerScore;
    const answerSaverScore = Number(checkedCard.saverScore);
    totalSaverScore += answerSaverScore;
    const answerImpulseScore = Number(checkedCard.impulseScore);
    totalImpulseScore += answerImpulseScore;
    const answerSplurger_score = Number(checkedCard.splurgerScore);
    totalSplurgerScore += answerSplurger_score;
    if (buttonElement.textContent === "Submit") {
      const results = [
        totalPlannerScore,
        totalSaverScore,
        totalImpulseScore,
        totalSplurgerScore,
      ];
    }
  }

  const oldCards = cardsList.querySelectorAll(".card");
  oldCards.forEach((card) => {
    card.remove();
  });

  questionNumber += 1;

  if (questionNumber <= questionData.length - 1) {
    getAnswers(questionNumber);
    questionElement.textContent = questionData[questionNumber].question;
    buttonElement.textContent =
      questionNumber === questionData.length - 1 ? "Submit" : "Next";
  } else {
    questionElement.textContent = "YOUR FINAL RESULTS";
    personalityResult.style.display = "block";
    let maxValue = Math.max(
      totalPlannerScore,
      totalSaverScore,
      totalImpulseScore,
      totalSplurgerScore
    );
    let finalResult;
    buttonElement.style.display = "none";
    if (maxValue === totalPlannerScore) {
      finalResult = "The Planner!";
      personalityResult.textContent = finalResult;
      personalityResultImg.style.display = "block";
      finalResultsDescription.textContent = plannerDescription;
      personalityResultImg.src = "./images/planner.png";
    } else if (maxValue === totalSaverScore) {
      finalResult = "The Saver";
      personalityResult.textContent = finalResult;
      personalityResultImg.style.display = "block";
      personalityResultImg.src = "./images/saved-money.png";
      finalResultsDescription.textContent = saverDescription;
    } else if (maxValue === totalImpulseScore) {
      finalResult = "Impulse Buyer";
      personalityResult.textContent = finalResult;
      personalityResultImg.style.display = "block";
      personalityResultImg.src = "./images/empty-wallet.png";
      finalResultsDescription.textContent = inpulseBuyerDescription;
    } else {
      finalResult = "The Splurger";
      finalResultsDescription.textContent = splurgerDescription;
      personalityResult.textContent = finalResult;
      personalityResultImg.style.display = "block";
      personalityResultImg.src = "./images/empty-wallet.png";
    }
  }

  disableBtnElement(buttonElement, settings);
  enableValidation(settings);
});

getAnswers(questionNumber);
questionElement.textContent = questionData[0].question;

startBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

enableValidation(settings);
