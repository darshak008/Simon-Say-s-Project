let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let body = document.querySelector("body");

document.addEventListener("keypress", () => {
  if (started == false) {
    console.log("Game is started");
    started = true;
    levelUp();
  }
});

let btns = ["yellow", "red", "purple", "green"];

function levelUp() {
  level++;
  h2.innerText = `Level ${level}`;

  userSeq = [];
  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  gameSeq.push(randColor);
  let randBtn = document.querySelector(`.${randColor}`);

  btnFlash(randBtn);

  if (h2.innerHTML === "Level 15") {
    body.classList.add("completed");
    setTimeout(() => {
      body.classList.remove("completed");
    }, 200);
    h2.innerText = "Congrats! You did it.";
    reset();
  }
}

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userPress");
  setTimeout(function () {
    btn.classList.remove("userPress");
  }, 250);
}

let allBtns = document.querySelectorAll(".btn");

for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  console.log(userSeq);
  checkAns(userSeq.length - 1);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `GAME OVER! Your score was <strong>${level}</strong><br>Press any key to start a new game`;
    reset();

    body.classList.add("wrong");
    setTimeout(() => {
      body.classList.remove("wrong");
    }, 150);
  }
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
