function slider() {
  // slider
  const sliderWrapper = document.querySelector(`.offer__slider-wrapper`);
  const slidesField = document.querySelector(`.offer__slider-wrapper-inner`);
  const slider = sliderWrapper.querySelectorAll(`.offer__slide`);
  const width = window.getComputedStyle(sliderWrapper).width;
  const currentSlideTxt = document.querySelector(`#current`);
  const totalSlidesTxt = document.querySelector(`#total`);
  const btnPrev = document.querySelector(`.offer__slider-prev`);
  const btnNext = document.querySelector(`.offer__slider-next`);
  const dots = document.querySelector(".offer__slider .dots");

  slider.forEach((slide) => {
    slide.style.width = width;
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dots.appendChild(dot);
  });

  let offset = 0;
  let slideIndex = 1;
  currentSlideTxt.innerHTML = `01`;
  dots.childNodes[0].classList.add("dot-active");

  function totalSlides(slider) {
    for (let i = 0; i < slider.length; i++) {
      if (slider.length < 10) {
        totalSlidesTxt.innerHTML = `0${i + 1}`;
      } else {
        totalSlidesTxt.innerHTML = `${i + 1}`;
      }
    }
  }
  totalSlides(slider);

  function checkSlideIndex(n) {
    if (n < 10) {
      currentSlideTxt.innerHTML = `0${slideIndex}`;
    } else {
      currentSlideTxt.innerHTML = `${slideIndex}`;
    }
  }

  slidesField.style.cssText = `display: flex;`;
  slidesField.style.width = 100 * slider.length + "%";
  // slidesField.style.width = 650 * slider.length + "px";
  slidesField.style.transition = `0.5s all`;
  sliderWrapper.style.overflow = `hidden`;

  dots.childNodes.forEach((dot, i) => {
    dot.addEventListener("click", (e) => {
      dots.childNodes.forEach((dot) => dot.classList.remove("dot-active"));
      e.target.classList.add("dot-active");
      offset = +width.slice(0, width.length - 2) * i;

      slidesField.style.transform = `translateX(-${offset}px)`;

      slideIndex = i + 1;
      checkSlideIndex(i + 1);
    });
    dot.addEventListener(`mouseover`, (e) => {
      if (e.target) {
        dots.childNodes.forEach((dot) => {
          dot.classList.remove(`dot-active`);
        });
        dot.classList.add("dot-active");
      }
    });
  });

  function nextSlide() {
    if (offset >= width.slice(0, width.length - 2) * (slider.length - 1)) {
      offset = 0;
      slidesField.style.transform = `translateX(-${offset}px)`;

      dots.childNodes.forEach((dot) => dot.classList.remove("dot-active"));
      dots.childNodes[0].classList.add("dot-active");

      slideIndex = 1;
      checkSlideIndex(slideIndex);
    } else {
      offset += +width.slice(0, width.length - 2);
      slidesField.style.transform = `translateX(-${offset}px)`;

      dots.childNodes.forEach((dot) => dot.classList.remove("dot-active"));
      dots.childNodes[slideIndex].classList.add("dot-active");

      slideIndex++;
      checkSlideIndex(slideIndex);
    }
  }
  function prevSlide() {
    if (offset == 0) {
      offset = width.slice(0, width.length - 2) * (slider.length - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;

      slideIndex = slider.length;
      checkSlideIndex(slideIndex);

      dots.childNodes.forEach((dot) => dot.classList.remove("dot-active"));
      dots.childNodes[slideIndex - 1].classList.add("dot-active");
    } else {
      offset -= +width.slice(0, width.length - 2);
      slidesField.style.transform = `translateX(-${offset}px)`;

      slideIndex--;
      checkSlideIndex(slideIndex);

      dots.childNodes.forEach((dot) => dot.classList.remove("dot-active"));
      dots.childNodes[slideIndex - 1].classList.add("dot-active");
    }
  }

  btnNext.addEventListener("click", nextSlide);
  btnPrev.addEventListener("click", prevSlide);
}

module.exports = slider;
