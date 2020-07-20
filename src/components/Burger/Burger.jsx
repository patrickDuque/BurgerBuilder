import React from 'react';
import BurgerIngredient from './BurgerIngredient';

export default props => {
  const ingredientsArr = Object.keys(props.ingredients)
    .map(igKey =>
      [
        ...Array(props.ingredients[igKey])
      ].map((_, i) => <BurgerIngredient key={igKey + i} type={igKey} />)
    )
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  return (
    <div id='Burger'>
      <BurgerIngredient type='bread-top' />
      {ingredientsArr.length === 0 ? <p>Please add ingredients</p> : ingredientsArr}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};
