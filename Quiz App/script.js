const btnStart = document.querySelector(".btn-start");
const btnNext = document.querySelector(".next-btn");
const btnReplay = document.querySelector(".btn-replay");
const btnQuit = document.querySelector(".btn-quit");
const questionText = document.querySelector(".question-text");
const questionIndex = document.querySelector(".question-index");
const optionList = document.querySelector(".option-list");
const quizBox = document.querySelector(".quiz-box");
const scoreBox = document.querySelector(".score-box");
const scoreText = document.querySelector(".score-text");
const timeText = document.querySelector(".time-text");
const timeSecond = document.querySelector(".time-second");
const timeLine = document.querySelector(".time-line");
const correctIcon = '<div class="icon"><i class="fas fa-check"></i></div>';
const incorrectIcon = '<div class="icon"><i class="fas fa-times"></i></div>';

btnStart.addEventListener("click", function () {
  quizBox.classList.add("active");
  startTimer(10);
  startTimerLine();
  soruGoster(quiz.soruGetir());
  soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
  btnNext.classList.remove("show");
});

btnNext.addEventListener("click", function () {
  if (quiz.sorular.length != quiz.soruIndex + 1) {
    quiz.soruIndex += 1;
    clearInterval(counter);
    clearInterval(counterLine);
    timeLine.style.animationDelay = 13;
    startTimer(10);
    startTimerLine();
    soruGoster(quiz.soruGetir());
    soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
    btnNext.classList.remove("show");
  } else {
    scoreBox.classList.add("active");
    quizBox.classList.remove("active");
    skoruGoster(quiz.sorular.length, quiz.dogruCevapSayisi);
    clearInterval(counter);
    clearInterval(counterLine);
  }
});

btnQuit.addEventListener("click", function () {
  window.location.reload();
});

btnReplay.addEventListener("click", function () {
  quiz.soruIndex = 0;
  quiz.dogruCevapSayisi = 0;
  btnStart.click();
  scoreBox.classList.remove("active");
});

function soruGoster(soru) {
  let question = `<span>${soru.soruMetni}</span>`;
  let options = "";
  for (let cevap in soru.cevaplar) {
    options += `<div class="option">
        <span><b>${cevap}</b>: ${soru.cevaplar[cevap]}</span>
      </div>`;
  }
  questionText.innerHTML = question;
  optionList.innerHTML = options;
  const option = document.querySelectorAll(".option");
  for (let opt of option) {
    opt.setAttribute("onclick", "optionSelected(this)");
  }
}

function optionSelected(option) {
  var element = document.getElementsByClassName("time-line")[0];
  element.style.animationPlayState = 'paused';

  clearInterval(counter);
  clearInterval(counterLine);
  let cevap = option.querySelector("span b").textContent;
  let soru = quiz.soruGetir();
  if (soru.cevapKontrolu(cevap)) {
    quiz.dogruCevapSayisi += 1;
    option.classList.add("correct");
    option.insertAdjacentHTML("beforeend", correctIcon);
  } else {
    option.classList.add("incorrect");
    option.insertAdjacentHTML("beforeend", incorrectIcon);
  }
  for (let i = 0; i < optionList.children.length; i++) {
    optionList.children[i].classList.add("disabled");
  }
  btnNext.classList.add("show");
}

function soruSayisiniGoster(soruSirasi, toplamSoru) {
  let tag = `<span class="badge bg-warning">${soruSirasi} / ${toplamSoru}</span>`;
  questionIndex.innerHTML = tag;
}

function skoruGoster(soruAdeti, dogruSayisi) {
  let tag = `Toplam ${soruAdeti} sorudan ${dogruSayisi} doğru cevap verdiniz.`;
  scoreText.innerHTML = tag;
}

let counter;
function startTimer(time) {
  counter = setInterval(timer, 995);
  function timer() {
    timeSecond.textContent = time;
    time--;
    if (time < 0) {
      clearInterval(counter);
      btnNext.classList.add("show");
      timeSecond.innerHTML = `<div class="text-danger">Süre bitti!</div>`;
      let cevap = quiz.soruGetir().dogruCevap;
      for (let opt of optionList.children) {
        if (opt.querySelector("span b").textContent == cevap) {
          opt.classList.add("correct");
          opt.insertAdjacentHTML("beforeend", correctIcon);
        }
        opt.classList.add("disabled");
      }
    }
  }
}

let counterLine;
function startTimerLine() {

  var element = document.getElementsByClassName("time-line")[0];
  element.classList.remove("time-line"); 
  void element.offsetWidth;             //reflow animation
  element.classList.add("time-line");
  element.style.animationPlayState = 'running';  //run animation (we did stop when clicked an option)

  let lineWidth = 0;
  counterLine = setInterval(timer, 21);
  function timer() {
    lineWidth += 1;
    timeLine.style.width = lineWidth + "px";
    if (lineWidth > 498) {
      clearInterval(counterLine);
    }
  }
}
