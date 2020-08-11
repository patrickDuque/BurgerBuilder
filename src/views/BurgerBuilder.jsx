// Dependencies
import React, { useState, useEffect, useCallback } from 'react';
import axios from '../axios';
import { useDispatch, useSelector } from 'react-redux';

// Store
import { ingredientsActions } from '../store/actions/ingredients';

// Components
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls';
import Aux from '../hoc/Auxilliary';
import Modal from '../components/UI/Modal';
import OrderSummary from '../components/Burger/OrderSummary';
import Spinner from '../components/UI/Spinner';
import withErrorHandler from '../hoc/withErrorHandler';

export default withErrorHandler(props => {
  const dispatch = useDispatch();
  // State
  const [ order, setOrder ] = useState(false);
  const ingredients = useSelector(state => state.ingredients.ingredients);
  const price = useSelector(state => state.ingredients.price);
  const loading = useSelector(state => state.ingredients.loading);

  // Dispatch
  const onAddIngredient = type => dispatch(ingredientsActions.addIngredient(type));
  const onRemoveIngredient = type => dispatch(ingredientsActions.subIngredient(type));
  const onGetIngredients = useCallback(() => dispatch(ingredientsActions.getIngredients()), [ dispatch ]);
  const onOrder = () => dispatch(ingredientsActions.goToOrder());

  // Effect
  useEffect(
    () => {
      onGetIngredients();
    },
    [ onGetIngredients ]
  );

  // Handlers
  const updatePurchaseState = () => {
    const sum = Object.values(ingredients).reduce((a, b) => a + b, 0);
    return sum > 0;
  };

  const orderHandler = useCallback(() => {
    setOrder(true);
  }, []);

  const continueToCheckoutHandler = () => {
    onOrder();
    props.history.push('/checkout');
  };

  const removeModalHandler = useCallback(() => {
    setOrder(false);
  }, []);

  // Variables
  const disabledInfoSub = { ...ingredients };
  for (let key in disabledInfoSub) {
    disabledInfoSub[key] = disabledInfoSub[key] <= 0;
  }

  const disabledInfoAdd = { ...ingredients };
  for (let key in disabledInfoAdd) {
    disabledInfoAdd[key] = disabledInfoAdd[key] >= 4;
  }

  let orderSummary = (
    <OrderSummary
      cancel={removeModalHandler}
      price={price}
      ingredients={ingredients}
      continue={continueToCheckoutHandler}
    />
  );

  if (loading) {
    orderSummary = <Spinner />;
  }

  let burger = <Spinner />;

  if (ingredients) {
    burger = (
      <Aux>
        <Burger ingredients={ingredients} />
        <Modal show={order} removeModal={removeModalHandler}>
          {orderSummary}
        </Modal>
        <BuildControls
          price={price}
          disabledSub={disabledInfoSub}
          disabledAdd={disabledInfoAdd}
          ingredientAdd={onAddIngredient}
          ingredientSubtract={onRemoveIngredient}
          purchaseable={updatePurchaseState()}
          order={orderHandler}
        />
      </Aux>
    );
  }

  return burger;
}, axios);
