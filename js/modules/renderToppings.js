'use strict';
/*запрашивает данные с сервера, формирует li элементы*/
import { getData } from './getData.js';
import { renderPizzas } from './renderPizzas.js';

export const renderToppings = async () => {
  const { en: enToppings, ru: ruToppings } = await getData('https://scented-tremendous-discovery.glitch.me/api/toppings');

  const toppingsList = document.querySelector('.toppings__list');
  toppingsList.textContent = ''; /*почистили списсок*/

  const items = enToppings.map((enName, i) => {
    const item = document.createElement('li');
    item.classList.add('toppings__item');
    item.innerHTML = `
    <input class="toppings__checkbox" id="${enName}" type="checkbox" name="topping" value="${enName}">
    <label class="toppings__label" for="${enName}">${ruToppings[i][0].toUpperCase()}${ruToppings[i].slice(1).toLowerCase()}</label>
    `;

    return item;
  });

  toppingsList.append(...items);


  /*создаем кнопку, для этого <ul></ul> в HTML обернем в <form>*/
  const itemReset = document.createElement('li');
  itemReset.classList.add('toppings__item');
  const btnReset = document.createElement('button');
  btnReset.classList.add('toppings__reset');
  btnReset.textContent = 'Сбросить'
  btnReset.type = "reset";
  itemReset.append(btnReset);  /*вставим кнопку */
  /*toppingsList.append(...items, itemReset); проверили работу кнопки.*/

  const toppingsForm = document.querySelector('.toppings__form');

  toppingsForm.addEventListener('change', (event) => {
    const formData = new FormData(toppingsForm);
    const checkedToppings = [];

    for (const [, value] of formData.entries()) {
      checkedToppings.push(value)
    }

    renderPizzas(checkedToppings)

  })


}