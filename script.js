const options = ["Rock", "Paper", "Scissors"];

function getRandomComputerResult() {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

function hasPlayerWonTheRound(player, computer) {
  return (
    (player === "Rock" && computer === "Scissors") ||
    (player === "Scissors" && computer === "Paper") ||
    (player === "Paper" && computer === "Rock")
  );
}
const rockBtn = document.getElementById("rock-btn");
const paperBtn = document.getElementById("paper-btn");
const scissorsBtn = document.getElementById("scissors-btn");

let playerScore = 0;
let computerScore = 0;

function getRoundResults(userOption, computerResult) {
  if (hasPlayerWonTheRound(userOption, computerResult)) {
    playerScore++;
    return `Player wins! ${userOption} beats ${computerResult}`;
  } else if (computerResult === userOption) {
    return `It's a tie! Both chose ${userOption}`;
  } else {
    computerScore++;
    return `Computer wins! ${computerResult} beats ${userOption}`;
  }
}

const playerScoreSpanElement = document.getElementById("player-score");
const computerScoreSpanElement = document.getElementById("computer-score");
const roundResultsMsg = document.getElementById("results-msg");
const winnerMsgElement = document.getElementById("winner-msg");
const optionsContainer = document.querySelector(".options-container");
const resetGameBtn = document.getElementById("reset-game-btn");

function showResults(userOption) {
  const computerResult = getRandomComputerResult();

  disableOptions(true); // Disable buttons while waiting

  setTimeout(() => {
    const resultMessage = getRoundResults(userOption, computerResult);

    // Combine both messages in one line so computer choice is retained
    roundResultsMsg.textContent = `Computer chose ${computerResult}. ${resultMessage}`;

    playerScoreSpanElement.textContent = playerScore;
    computerScoreSpanElement.textContent = computerScore;

    if (playerScore === 3 || computerScore === 3) {
      winnerMsgElement.textContent = `${
        playerScore === 3 ? "Player" : "Computer"
      } has won the game!`;

      resetGameBtn.style.display = "block";
      optionsContainer.style.display = "none";
    } else {
      disableOptions(false); // Re-enable options for next round
    }
  }, 800); // Delay before showing the result
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;

  playerScoreSpanElement.textContent = playerScore;
  computerScoreSpanElement.textContent = computerScore;

  roundResultsMsg.textContent = "Let's play!";
  winnerMsgElement.textContent = "";

  optionsContainer.style.display = "flex";
  resetGameBtn.style.display = "none";
};
resetGameBtn.addEventListener("click", resetGame);

rockBtn.addEventListener("click", function () {
  showResults("Rock");
});

paperBtn.addEventListener("click", function () {
  showResults("Paper");
});

scissorsBtn.addEventListener("click", function () {
  showResults("Scissors");
});
function disableOptions(disabled) {
  rockBtn.disabled = disabled;
  paperBtn.disabled = disabled;
  scissorsBtn.disabled = disabled;
}
