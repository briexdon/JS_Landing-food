"use strict";

window.addEventListener("DOMContentLoaded", () => {
  const tabs = require(`./modules/tabs`);
  const timer = require(`./modules/timer`);
  const slider = require(`./modules/slider`);
  const modal = require(`./modules/modal`);
  const cards = require(`./modules/cards`);
  const calculator = require(`./modules/calculator`);

  tabs();
  timer();
  slider();
  modal();
  cards();
  calculator();
});
