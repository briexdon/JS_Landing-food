function timer() {
  // timer

  // function getTimer(selector) {
  //   const timer = document.querySelector(selector),
  //     days = timer.querySelector("#days"),
  //     hours = timer.querySelector(`#hours`),
  //     minutes = timer.querySelector(`#minutes`),
  //     seconds = timer.querySelector(`#seconds`);
  // }

  function pageTimer() {
    // кінець таймера по даті
    const deadline = new Date(2022, 10, 20, 17, 59);

    // різниця в часі між дедлайном і зараз
    function differenceTime(endtime) {
      const diff = Date.parse(endtime) - Date.parse(new Date());
      let days, hours, minutes, seconds;
      // якщо різниця в  часі дорівнює нулю, або менша, тоді записуємо 00
      if (diff <= 0) {
        days = "00";
        hours = "00";
        minutes = "00";
        seconds = "00";
      } else {
        (days = Math.floor(diff / (1000 * 60 * 60 * 24))),
          (hours = Math.floor((diff / (1000 * 60 * 60)) % 60)),
          (minutes = Math.floor((diff / (1000 * 60)) % 60)),
          (seconds = Math.floor((diff / 1000) % 60));
      }

      return {
        totalTime: diff,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      };
    }

    const timer = document.querySelector(`.timer`),
      days = timer.querySelector("#days"),
      hours = timer.querySelector(`#hours`),
      minutes = timer.querySelector(`#minutes`),
      seconds = timer.querySelector(`#seconds`);

    //  коректировка часу
    const textDays = timer.querySelector(`.span_days`);
    const arrDays = [`день`, `дня`, `дней`];

    function setSpanText(idName, text) {
      return `<span id=${idName}></span> ${text}`;
    }

    function correctDays(num) {
      if (num === 1 || num === 21) {
        textDays.innerHTML = setSpanText("days", arrDays[0]);
      } else if ((num > 1 && num < 5) || (num > 21 && num < 25)) {
        textDays.innerHTML = setSpanText("days", arrDays[1]);
      } else {
        textDays.innerHTML = setSpanText("days", arrDays[2]);
      }
    }
    // function correctHours(num) {}
    // function correctMinutes(num) {}
    // function correctSeconds(num) {}

    //  встановлюємо інтервал кожну секунду
    const interval = setInterval(updateTimer, 1000);

    updateTimer();
    // обновлюємо кожну секунду
    function updateTimer() {
      // получаєм різницю в часі
      const getDiffTime = differenceTime(deadline);
      // якщо різниця в  часі  дорівнює 0 або менша,  зупиняємо таймер
      if (getDiffTime.totalTime <= 0) {
        clearInterval(interval);
      }

      days.textContent = getDiffTime.days;
      hours.textContent = getDiffTime.hours;
      minutes.textContent = getDiffTime.minutes;
      seconds.textContent = getDiffTime.seconds;

      correctDays(getDiffTime.days);
    }
  }
  pageTimer();
}

module.exports = timer;
