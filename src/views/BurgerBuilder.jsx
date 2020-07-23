import React, { Component } from 'react';
import axios from '../axios';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls';
import Aux from '../hoc/Auxilliary';
import Modal from '../components/UI/Modal';
import OrderSummary from '../components/Burger/OrderSummary';
import Spinner from '../components/UI/Spinner';
import withErrorHandler from '../hoc/withErrorHandler';

const INGREDIENT_PRICES = {
  salad  : 12,
  cheese : 15,
  meat   : 20,
  bacon  : 17
};

export default withErrorHandler(
  class extends Component {
    state = {
      ingredients  : null,
      price        : 15,
      purchaseable : false,
      order        : false,
      loading      : false
    };

    componentDidMount() {
      axios
        .get('/ingredients.json')
        .then(response => {
          this.setState({ ingredients: response.data });
        })
        .catch(err => console.log(err));
    }

    updatePurchaseState = ingredients => {
      const sum = Object.values(ingredients).reduce((a, b) => a + b, 0);
      this.setState({ purchaseable: sum > 0 });
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
      this.updatePurchaseState(updatedIngredients);
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
      this.updatePurchaseState(updatedIngredients);
    };

    orderHandler = () => {
      this.setState({ order: true });
    };

    continueToCheckoutHandler = () => {
      this.setState({ loading: true });
      const time = new Date();
      const data = {
        ingredients : this.state.ingredients,
        price       : this.state.price,
        customer    : {
          name        : 'Patrick',
          address     : {
            street : 'Ruby',
            town   : 'Pandayan',
            city   : 'Meycauayan'
          },
          phoneNumber : '09176365214'
        },
        timeOrdered : `${time.getHours()}:${time.getMinutes()}`
      };
      axios
        .post('/orders.json', data)
        .then(res => {
          console.log(res);
          this.setState({
            ingredients : {
              salad  : 0,
              cheese : 0,
              meat   : 0,
              bacon  : 0
            },
            order       : false,
            loading     : false,
            price       : 15
          });
        })
        .catch(err => {
          console.log(err);
          this.setState({ loading: false });
        });
    };

    removeModalHandler = () => {
      this.setState({ order: false });
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

      let orderSummary = (
        <OrderSummary
          cancel={this.removeModalHandler}
          price={this.state.price}
          ingredients={this.state.ingredients}
          continue={this.continueToCheckoutHandler}
        />
      );

      if (this.state.loading) {
        orderSummary = <Spinner />;
      }

      let burger = <Spinner />;

      if (this.state.ingredients) {
        burger = (
          <Aux>
            <Burger ingredients={this.state.ingredients} />
            <Modal show={this.state.order} removeModal={this.removeModalHandler}>
              {orderSummary}
            </Modal>
            <BuildControls
              price={this.state.price}
              disabledSub={disabledInfoSub}
              disabledAdd={disabledInfoAdd}
              ingredientAdd={this.addIngredientHandler}
              ingredientSubtract={this.subtractIngredientHandler}
              purchaseable={this.state.purchaseable}
              order={this.orderHandler}
            />
          </Aux>
        );
      }

      return burger;
    }
  },
  axios
);
