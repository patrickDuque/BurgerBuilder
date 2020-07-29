import React from 'react';

export default props => {
  const ingredients = Object.keys(props.order.ingredients).map(ing => [
    ing,
    props.order.ingredients[ing]
  ]);
  console.log(ingredients);

  return (
    <div id='Order'>
      <p>
        Ingredients:
        {ingredients.map(ing => (
          <span key={ing[0] + props.id}>
            {ing[0]} ({ing[1]})
          </span>
        ))}
      </p>
      <p>
        Price: <strong>&#8369;{props.order.price}</strong>
      </p>
    </div>
  );
};
