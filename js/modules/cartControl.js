export const cartControl = {
  cartData: JSON.parse(localStorage.getItem('cart') || '[]'),
  addCart(product) {
    this.cartData.push(product);
    localStorage.setItem('cart', JSON.stringify(this.cartData));
  },
  removeCart(cartId) {
    //!todo написать метод удаления товара из корзины
    this.cartData = this.cartData.filter(item => item.cartId !== cartId);
    localStorage.setItem('cart', JSON.stringify(this.cartData));
  },
  clearCart () {
    this.cartData = [];
    localStorage.setItem('cart', JSON.stringify(this.cartData))
  }
}