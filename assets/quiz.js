document.querySelectorAll("[data-quiz]").forEach((quiz, index) => {
  const button = quiz.querySelector("button");
  const feedback = quiz.querySelector(".quiz-feedback");
  const name = `quiz-${index}`;

  quiz.querySelectorAll("input[type='radio']").forEach((input) => {
    input.name = name;
  });

  button.addEventListener("click", () => {
    const selected = quiz.querySelector("input[type='radio']:checked");
    if (!selected) {
      feedback.textContent = "先选一个答案。";
      feedback.className = "quiz-feedback bad";
      return;
    }

    const isCorrect = selected.dataset.correct === "true";
    feedback.textContent = isCorrect
      ? selected.dataset.ok
      : selected.dataset.bad;
    feedback.className = `quiz-feedback ${isCorrect ? "ok" : "bad"}`;
  });
});

document.querySelectorAll("[data-practice]").forEach((practice, index) => {
  const key = practice.dataset.storageKey || `practice-${index}`;
  const textarea = practice.querySelector("textarea");
  const saveButton = practice.querySelector("[data-save]");
  const revealButton = practice.querySelector("[data-reveal]");
  const feedback = practice.querySelector(".practice-feedback");
  const answer = practice.querySelector(".model-answer");

  textarea.value = localStorage.getItem(key) || "";

  saveButton.addEventListener("click", () => {
    localStorage.setItem(key, textarea.value);
    feedback.textContent = textarea.value.trim()
      ? "已保存。现在可以把这段话发给老师，让他帮你改成更适合讲给别人的版本。"
      : "还没有内容。先试着写 2-4 句话。";
  });

  revealButton.addEventListener("click", () => {
    answer.classList.toggle("visible");
    revealButton.textContent = answer.classList.contains("visible")
      ? "隐藏参考答案"
      : "查看参考答案";
  });
});
