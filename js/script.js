'use strict'

const toppingsToogle = () => {
  const toppingsButton = document.querySelector('.toppings__button');
  const toppingsList = document.querySelector('.toppings__list');

  toppingsButton.addEventListener('click', () => {
    if (!toppingsList.classList.contains('toppings__list_show')) {
      toppingsList.classList.add('toppings__list_show');
      toppingsButton.classList.add('toppings__button_active');

      toppingsList.style.maxHeight = toppingsList.scrollHeight + 'px';
    } else {
      toppingsButton.classList.remove('toppings__button_active');
      toppingsList.style.maxHeight = null;

      setTimeout(() => {
        toppingsList.classList.remove('toppings__list_show');
      }, 300);
    }
});
};

const getPizzas = async () => {

  try { /*если сервер упадет, используем try и catch, т.е. сайт сломался*/
    const response = await fetch('https://scented-tremendous-discovery.glitch.me/api/products');
    if (!response.ok) {
      throw new Error('Failed to fetch pizza products')
    }

    return await response.json()

  } catch (error) {
    console.error(`Error fetching pizza products: ${error}`)
  }
};

const renderPizzas = async () => {
  const pizzas = await getPizzas();
};

const init = () => {
  toppingsToogle();

  renderPizzas();
};

init();