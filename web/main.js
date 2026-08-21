// SPA entry point. `__APP.ready` is intentionally kept for the template's e2e tests.
const moves = {
  rock: { label: "אבן", icon: "✊", beats: "scissors" },
  paper: { label: "נייר", icon: "✋", beats: "rock" },
  scissors: { label: "מספריים", icon: "✌️", beats: "paper" },
};

const state = { player: 0, computer: 0, round: 1 };
const $ = (selector) => document.querySelector(selector);

function renderScores() {
  $("#player-score").textContent = state.player;
  $("#computer-score").textContent = state.computer;
  $("#round-number").textContent = state.round;
}

function play(playerChoice) {
  const computerChoice = Object.keys(moves)[Math.floor(Math.random() * 3)];
  const player = moves[playerChoice];
  const computer = moves[computerChoice];
  $("#player-move").textContent = player.icon;
  $("#computer-move").textContent = computer.icon;

  if (playerChoice === computerChoice) {
    $("#status").textContent = "תיקו — נסו שוב!";
  } else if (player.beats === computerChoice) {
    state.player += 1;
    $("#status").textContent = `${player.label} מנצחת את ${computer.label} — ניצחתם!`;
  } else {
    state.computer += 1;
    $("#status").textContent = `${computer.label} מנצחת את ${player.label} — המחשב ניצח.`;
  }
  state.round += 1;
  renderScores();
}

document.querySelectorAll("[data-move]").forEach((button) => {
  button.addEventListener("click", () => play(button.dataset.move));
});

$("#reset-game").addEventListener("click", () => {
  Object.assign(state, { player: 0, computer: 0, round: 1 });
  $("#player-move").textContent = "?";
  $("#computer-move").textContent = "?";
  $("#status").textContent = "בחרו מהלך כדי להתחיל";
  renderScores();
});

window.__APP = { ready: true };
