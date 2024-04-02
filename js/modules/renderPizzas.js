'use strict';

import { getData } from "./getData.js";

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
    <h3 class="card__title">${data.name['ru'][0].toUpperCase()}${data.name['ru'].slice(1).toLowerCase()}</h3>

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
  const pizzaList = document.querySelector('.pizza__list');
  pizzaList.textContent = ''; /*почистили списсок*/

  const items = pizzas.map((data) => {
    const item = document.createElement('li');
    item.classList.add('pizza__item');
    const card = createCard(data)  /*создаем карточки*/
    item.append(card);
    return item;
  });

  pizzaList.append(...items);
};

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