function cards() {
  // classes constructor

  class MenuCard {
    constructor(src, alt, tittle, descr, price, parentSelector, ...classes) {
      (this.src = src),
        (this.alt = alt),
        (this.tittle = tittle),
        (this.descr = descr),
        (this.price = price),
        (this.transfer = 27),
        (this.parent = document.querySelector(parentSelector)),
        (this.classes = classes),
        this.changeToUAH();
    }
    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    setCard() {
      const card = document.createElement(`div`);

      if (this.classes.length === 0) {
        this.card = `menu__item`;
        card.classList.add(this.card);
      } else {
        this.classes.forEach((className) => card.classList.add(className));
      }

      card.innerHTML = `
        <img src=${this.src} alt=${this.alt} />
        <h3 class="menu__item-subtitle">${this.tittle}"</h3>
        <div class="menu__item-descr">
        ${this.descr}
        </div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> $день</div>
        </div> `;

      this.parent.append(card);
    }
  }
  // set card

  // const getData = async (url) => {
  //   const res = await fetch(url);
  //   //  свойства, які є в проміса, який вертається з феч  -   .ok  .status
  //   if (!res.ok) {
  //     throw new Error(`Could not fetch ${url} status: ${res.status}`);
  //   }

  //   return await res.json();
  // };

  axios
    .get(`http://localhost:3000/menu`)
    .then((data) => data.data)
    .then((data) => {
      const response = data;
      // console.log(response);
      response.forEach(({ img, altimg, title, descr, price }) => {
        new MenuCard(img, altimg, title, descr, price, ".menu .container").setCard();
      });
    });

  // Forms

  const forms = document.querySelectorAll("form");
  const message = {
    loading: "../img/svg/Web-Preloader.svg",
    success: "Спасибо! Скоро мы с вами свяжемся",
    successImg: "../icons/done.jpg",
    failure: "Что-то пошло не так...",
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

  // const postData = async (url, data) => {
  //   const res = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: data,
  //   });
  //   return await res.json();
  // };

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
                    display: block;
                    margin: 0 auto;
                `;
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form); //  сформовано форм  дату

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      axios
        .post(`http://localhost:3000/requests`, json)
        .then((data) => data.data)
        .then((data) => {
          // console.log(data);
          showThanksModal(message.success, message.successImg);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure, message.successImg);
        })
        .finally(() => {
          form.reset();
        });
    });
  }
  function showThanksModal(message, img) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
                <div class="modal__content">
                    <div class="modal__close" data-close>×</div>
                    <div class="modal__title">${message}</div>
                    <div class="modal__title"><img style="height: 100px" src=${img} alt="thanks"></div>
                </div>
            `;
    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }
}

module.exports = cards;
