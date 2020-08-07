// Dependencies
import React, { Component } from 'react';
import axios from '../axios';
import { connect } from 'react-redux';

// Redux
import { ingredientsActions } from '../store/actions/ingredients';

// Components
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls';
import Aux from '../hoc/Auxilliary';
import Modal from '../components/UI/Modal';
import OrderSummary from '../components/Burger/OrderSummary';
import Spinner from '../components/UI/Spinner';
import withErrorHandler from '../hoc/withErrorHandler';

const mapStateToProps = state => {
  const { ingredients, price, loading, ordered } = state.ingredients;
  return {
    ingredients,
    price,
    loading,
    ordered,
    token       : state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient    : type => dispatch(ingredientsActions.addIngredient(type)),
    onRemoveIngredient : type => dispatch(ingredientsActions.subIngredient(type)),
    onGetIngredients   : () => dispatch(ingredientsActions.getIngredients()),
    onOrder            : () => dispatch(ingredientsActions.goToOrder())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(
    class extends Component {
      state = {
        order : false
      };

      componentDidMount() {
        this.props.onGetIngredients();
      }

      updatePurchaseState = () => {
        const sum = Object.values(this.props.ingredients).reduce((a, b) => a + b, 0);
        return sum > 0;
      };

      orderHandler = () => {
        this.setState({ order: true });
      };

      continueToCheckoutHandler = () => {
        this.props.onOrder();
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

        if (this.props.loading) {
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
