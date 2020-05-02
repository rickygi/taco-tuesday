class Meal {
  constructor(params) {
    this.name = params.name;
    this.quantity = params.quantity;
    this.tortilla = params.tortilla;
    this.filling = params.filling;
    this.rice = params.rice;
    this.beans = params.beans;
    this.toppings = params.toppings || [];
  }

  totalCalories() {
    return 0;
  }

  totalPrice() {
    return 0;
  }
}

export default Meal;
