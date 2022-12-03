function calculator() {
  // calculate
  const totalCaclResult = document.querySelector(`.calculating__result span`);

  let sex, height, weight, age, ratio;

  if (localStorage.getItem(`sex`)) {
    sex = localStorage.getItem(`sex`);
  } else {
    sex = `female`;
  }

  if (localStorage.getItem(`ratio`)) {
    ratio = localStorage.getItem(`ratio`);
  } else {
    ratio = 1.375;
  }

  function initSettings(selectorData, activeClass) {
    const elements = document.querySelectorAll(selectorData);

    elements.forEach((elem) => {
      if (elem.getAttribute(`id`) === localStorage.getItem(`sex`)) {
        elements.forEach((elem) => elem.classList.remove(activeClass));
        elem.classList.add(activeClass);
      }
      if (elem.getAttribute(`data-ratio`) === localStorage.getItem(`ratio`)) {
        elements.forEach((elem) => elem.classList.remove(activeClass));
        elem.classList.add(activeClass);
      }
    });
  }
  initSettings(`[data-sex]`, `calculating__choose-item_active`);
  initSettings(`[data-ratio]`, `calculating__choose-item_active`);

  function totalCalc() {
    // console.log(ratio);
    // console.log(sex);
    if (!sex || !height || !weight || !age || !ratio) {
      totalCaclResult.textContent = `0`;
      return;
    }
    if (sex === `female`) {
      totalCaclResult.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      totalCaclResult.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }
  totalCalc();

  function chooseSex(selectorData, activeClass) {
    const elements = document.querySelectorAll(selectorData);

    elements.forEach((elem) => {
      elem.addEventListener(`click`, (e) => {
        if (elem.getAttribute(`data-sex`)) {
          elements.forEach((elem) => elem.classList.remove(activeClass));
          e.target.classList.add(activeClass);

          sex = e.target.getAttribute(`data-sex`);

          localStorage.setItem(`sex`, e.target.getAttribute(`data-sex`));
        }

        if (elem.getAttribute("data-ratio")) {
          elements.forEach((elem) => elem.classList.remove(activeClass));
          e.target.classList.add(activeClass);

          ratio = +e.target.getAttribute(`data-ratio`);

          localStorage.setItem(`ratio`, +e.target.getAttribute(`data-ratio`));
        }

        totalCalc();
      });
    });
  }
  chooseSex(`[data-sex]`, `calculating__choose-item_active`);
  chooseSex(`[data-ratio]`, `calculating__choose-item_active`);

  function deleteNoDigits(str) {
    return +str.replace(/\D/g, "");
  }

  function getHumanSettings(selector) {
    const elements = document.querySelectorAll(`input${selector}`);
    elements.forEach((elem) => {
      elem.addEventListener("input", (e) => {
        if (elem.value.match(/\D/g)) {
          elem.style.border = `2px solid red`;
        } else {
          elem.style.border = `none`;
        }

        switch (e.target.id) {
          case `height`:
            height = deleteNoDigits(elem.value);
            totalCalc();
            break;
          case `weight`:
            weight = deleteNoDigits(elem.value);
            totalCalc();
            break;
          case `age`:
            age = deleteNoDigits(elem.value);
            totalCalc();
            break;
        }
      });
    });
  }
  getHumanSettings(`.calculating__choose-item`);
}

module.exports = calculator;
