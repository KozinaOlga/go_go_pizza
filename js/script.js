'use strict'

import { renderPizzas } from "./modules/renderPizzas.js"; /* точка/ это текущая папка*/
import { renderToppings } from "./modules/renderToppings.js";
import { toppingsToogle } from "./modules/toppingToggle.js";


const init = () => {
  toppingsToogle();
  renderToppings();
  renderPizzas(); /*ctrl+пробел, и импортируется код на первую строку import { renderPizzas } from "./modules/renderPizzas";
  */
}; 

init();