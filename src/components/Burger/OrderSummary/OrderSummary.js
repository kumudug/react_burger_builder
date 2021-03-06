import React, { useEffect } from 'react';

import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    useEffect(() => {
        console.log('Order Summary rendered');
    });

    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{ textTransform: 'capitalize' }}>
                    {igKey}
                </span>
                : {props.ingredients[igKey]}</li>
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the fallowing ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Price: ${props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.cancel}>Cancel</Button>
            <Button btnType="Success" clicked={props.continue}>Continue</Button>
        </React.Fragment>
    )
};

export default orderSummary;