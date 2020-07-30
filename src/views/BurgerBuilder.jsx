// Dependencies
import React, { Component } from 'react';
import axios from '../axios';
import { connect } from 'react-redux';

// Constants
import * as actionTypes from '../store/actions';

// Components
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls';
import Aux from '../hoc/Auxilliary';
import Modal from '../components/UI/Modal';
import OrderSummary from '../components/Burger/OrderSummary';
import Spinner from '../components/UI/Spinner';
import withErrorHandler from '../hoc/withErrorHandler';

const mapStateToProps = state => {
  return {
    ingredients : state.ingredients,
    price       : state.price
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient    : type => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientType: type }),
    onRemoveIngredient : type => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientType: type })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(
    class extends Component {
      state = {
        order   : false,
        loading : false
      };

      componentDidMount() {
        // axios
        //   .get('/ingredients.json')
        //   .then(response => {
        //     this.setState({ ingredients: response.data });
        //   })
        //   .catch(err => console.log(err));
      }

      updatePurchaseState = () => {
        const sum = Object.values(this.props.ingredients).reduce((a, b) => a + b, 0);
        return sum > 0;
      };

      orderHandler = () => {
        this.setState({ order: true });
      };

      continueToCheckoutHandler = () => {
        this.props.history.push('/checkout');
      };

      removeModalHandler = () => {
        this.setState({ order: false });
      };

      render() {
        const disabledInfoSub = { ...this.props.ingredients };
        for (let key in disabledInfoSub) {
          disabledInfoSub[key] = disabledInfoSub[key] <= 0;
        }

        const disabledInfoAdd = { ...this.props.ingredients };
        for (let key in disabledInfoAdd) {
          disabledInfoAdd[key] = disabledInfoAdd[key] >= 4;
        }

        let orderSummary = (
          <OrderSummary
            cancel={this.removeModalHandler}
            price={this.props.price}
            ingredients={this.props.ingredients}
            continue={this.continueToCheckoutHandler}
          />
        );

        if (this.state.loading) {
          orderSummary = <Spinner />;
        }

        let burger = <Spinner />;

        if (this.props.ingredients) {
          burger = (
            <Aux>
              <Burger ingredients={this.props.ingredients} />
              <Modal show={this.state.order} removeModal={this.removeModalHandler}>
                {orderSummary}
              </Modal>
              <BuildControls
                price={this.props.price}
                disabledSub={disabledInfoSub}
                disabledAdd={disabledInfoAdd}
                ingredientAdd={this.props.onAddIngredient}
                ingredientSubtract={this.props.onRemoveIngredient}
                purchaseable={this.updatePurchaseState()}
                order={this.orderHandler}
              />
            </Aux>
          );
        }

        return burger;
      }
    },
    axios
  )
);
