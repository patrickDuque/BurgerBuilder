// Dependencies
import React, { useState, useEffect } from 'react';
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
  withErrorHandler(props => {
    // State
    const [ order, setOrder ] = useState(false);

    // Effect
    useEffect(() => {
      props.onGetIngredients();
    }, []);

    // Handlers
    const updatePurchaseState = () => {
      const sum = Object.values(props.ingredients).reduce((a, b) => a + b, 0);
      return sum > 0;
    };

    const orderHandler = () => {
      setOrder(true);
    };

    const continueToCheckoutHandler = () => {
      props.onOrder();
      props.history.push('/checkout');
    };

    const removeModalHandler = () => {
      setOrder(false);
    };

    // Variables
    const disabledInfoSub = { ...props.ingredients };
    for (let key in disabledInfoSub) {
      disabledInfoSub[key] = disabledInfoSub[key] <= 0;
    }

    const disabledInfoAdd = { ...props.ingredients };
    for (let key in disabledInfoAdd) {
      disabledInfoAdd[key] = disabledInfoAdd[key] >= 4;
    }

    let orderSummary = (
      <OrderSummary
        cancel={removeModalHandler}
        price={props.price}
        ingredients={props.ingredients}
        continue={continueToCheckoutHandler}
      />
    );

    if (props.loading) {
      orderSummary = <Spinner />;
    }

    let burger = <Spinner />;

    if (props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={props.ingredients} />
          <Modal show={order} removeModal={removeModalHandler}>
            {orderSummary}
          </Modal>
          <BuildControls
            price={props.price}
            disabledSub={disabledInfoSub}
            disabledAdd={disabledInfoAdd}
            ingredientAdd={props.onAddIngredient}
            ingredientSubtract={props.onRemoveIngredient}
            purchaseable={updatePurchaseState()}
            order={orderHandler}
          />
        </Aux>
      );
    }

    return burger;
  }, axios)
);
