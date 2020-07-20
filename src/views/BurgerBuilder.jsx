import React, { Component } from 'react';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls';
import Aux from '../hoc/Auxilliary';

const INGREDIENT_PRICES = {
  salad  : 12,
  cheese : 15,
  meat   : 20,
  bacon  : 17
};

export default class extends Component {
  state = {
    ingredients : {
      salad  : 0,
      cheese : 0,
      meat   : 0,
      bacon  : 0
    },
    price       : 15
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.price;
    const newPrice = oldPrice + priceAddition;
    this.setState({ ingredients: updatedIngredients, price: newPrice });
  };

  subtractIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.price;
    const newPrice = oldPrice - priceAddition;
    this.setState({ ingredients: updatedIngredients, price: newPrice });
  };

  render() {
    const disabledInfoSub = { ...this.state.ingredients };
    for (let key in disabledInfoSub) {
      disabledInfoSub[key] = disabledInfoSub[key] <= 0;
    }

    const disabledInfoAdd = { ...this.state.ingredients };
    for (let key in disabledInfoAdd) {
      disabledInfoAdd[key] = disabledInfoAdd[key] >= 4;
    }

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          price={this.state.price}
          disabledSub={disabledInfoSub}
          disabledAdd={disabledInfoAdd}
          ingredientAdd={this.addIngredientHandler}
          ingredientSubtract={this.subtractIngredientHandler}
        />
      </Aux>
    );
  }
}
