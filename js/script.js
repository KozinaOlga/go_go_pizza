'use strict'

import { modalController } from "./modules/modalController.js";
import { renderPizzas } from "./modules/renderPizzas.js"; /* точка/ это текущая папка*/
import { renderToppings } from "./modules/renderToppings.js";
import { toppingsToogle } from "./modules/toppingToggle.js";
import { modalCartController } from "./modules/modalCartController.js";



const init = () => {
  toppingsToogle();
  renderToppings();
  renderPizzas(); /*ctrl+пробел,и импортируется код на первую строку import { renderPizzas } from "./modules/renderPizzas";*/
  modalController( {
    modal: '.modal-cart',
    btnOpen: '.header__cart',
    btnClose: '.modal__close',
    cbOpen() {
      modalCartController();
    }
  });

  modalController( {
    modal: '.modal-cart',
    btnOpen: '.hero__order',
    btnClose: '.modal__close',
    cbOpen() {
      modalCartController();
    }
  });
}; 

init();