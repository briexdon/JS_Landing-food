function modal() {
  // // modal

  const modal = document.querySelector(".modal"),
    btn = document.querySelectorAll("[data-modal]");
  // close = document.querySelector("[data-close]");

  btn.forEach((item) => {
    item.addEventListener("click", () => {
      openModal();
    });
  });

  function openModal() {
    modal.classList.remove("hide");
    modal.classList.add("show");
    document.body.style.overflow = "";
    // clearInterval(showModal);
  }
  function closeModal() {
    modal.classList.remove("show");
    modal.classList.add("hide");
    document.body.style.overflow = "";
  }

  // const showModal = setTimeout(openModal, 1000);

  document.addEventListener("keydown", (e) => {
    if (e.code === `Escape` && modal.classList.contains(`show`)) {
      closeModal();
    }
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute(`data-close`) == ``) {
      closeModal();
    }
  });

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal();
      // clearInterval(showModal);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  // window.addEventListener("scroll", showModalByScroll);
}

module.exports = modal;
