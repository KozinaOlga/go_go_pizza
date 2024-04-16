'use strict';

import { getData } from "./getData.js";
import { modalController } from "./modalController.js";
import { renderModalPizza } from "./renderModalPizza.js";
import { changeFirstUpperCase } from './helpers.js';

/*добавляем кнопку*/
const btnReset = document.createElement('button');
btnReset.classList.add('pizza__reset-toppings');
btnReset.textContent = 'Сбросить фильтр';
btnReset.type = 'reset';
btnReset.setAttribute('form', 'toppings');


const createCard = (data) => {
  const card = document.createElement('article'); /*саздаем article card, что в HTML*/
  card.classList.add('card', 'pizza__card');

  /*вставляем данные*/
  card.innerHTML = ` 
  <picture>
    <source srcset="${data.images[1]}" type="image/webp">
    <img class="card__image" src="${data.images[0]}" alt="${data.name.ru}">
  </picture>

  <div class="card__content">
    <h3 class="card__title">${changeFirstUpperCase(data.name['ru'])}</h3>

    <p class="card__info">
      <span class="card__price">${data.price['30cm']} ₽</span>
      <span>/</span>
      <span class="card__weight">25 см</span>
    </p>

    <button class="card__button" data-id="${data.id}">Выбрать</button>
  </div>
  `;

  return card;
};

export const renderPizzas = async (toppings) => {
  const pizzas = await getData(
    `https://scented-tremendous-discovery.glitch.me/api/products${
    toppings ? `?toppings=${toppings}` : ''
  }`,
  );
  const pizzaTitle = document.querySelector('.pizza__title');
  const pizzaList = document.querySelector('.pizza__list');
  pizzaList.textContent = ''; /*почистили списсок*/

  if (pizzas.length) {
    pizzaTitle.textContent = 'Пицца'
    btnReset.remove();
    const items = pizzas.map((data) => {
      const item = document.createElement('li');
      item.classList.add('pizza__item');
      const card = createCard(data)  /*создаем карточки*/
      item.append(card);
      return item;
    });
  
    pizzaList.append(...items);

    modalController({
      modal: '.modal-pizza',
      btnOpen: '.card__button',
      btnClose: '.modal__close',
      async cbOpen(btnOpen) {
        const pizza = await getData(
          `https://scented-tremendous-discovery.glitch.me/api/products/${btnOpen.dataset.id}`,
        );
          renderModalPizza(pizza);
          console.log('pizza: ', pizza);

      }
    });
  } else {
    pizzaTitle.textContent = 'Такой пиццы у нас нет :('
    pizzaTitle.after(btnReset);

  }
};

btnReset.addEventListener('click', () => {
  renderPizzas();
  document.querySelector('.toppings__reset').remove();
});

/*1 вариант (этот вариант не очень подходит, т.к. надо еще дописывать много)
if (toppings) {
  'https://scented-tremendous-discovery.glitch.me/api/products + toping'
} else {
  'https://scented-tremendous-discovery.glitch.me/api/products'
}

2вариант 
toppings ?
'https://scented-tremendous-discovery.glitch.me/api/products?topping=${toppings}':
'https://scented-tremendous-discovery.glitch.me/api/products'

3 вариант, работаем с этим вариантом, и вставляем этот код
const pizzas = await getData(строка 32)
`'https://scented-tremendous-discovery.glitch.me/api/products${toppings ? `?topping=${toppings}` : ''}`

*/