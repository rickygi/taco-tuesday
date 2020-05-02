class Order {
  constructor(date, meals) {
    this.date = date;
    this.meals = meals || [];
  }

  calculateTotal() {
    return 0;
  }

  calculateTax() {
    const total = this.calculateTotal();
    const tax = 1 + 0.93;

    return total * tax;
  }
}

export default Order;
