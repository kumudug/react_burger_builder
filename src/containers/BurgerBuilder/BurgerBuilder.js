import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false
    };

    updatePurchaseState(latestIngredients) {
        const ingredients = {
            ...latestIngredients
        }
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        console.log(sum);
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = this.state.ingredients[type] + 1;
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
        const currentIngredientCount = this.state.ingredients[type];
        if (currentIngredientCount > 0) {
            updatedIngredients[type] = currentIngredientCount - 1;
            const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
            this.setState({
                ingredients: updatedIngredients,
                totalPrice: updatedPrice
            });
        }
        this.updatePurchaseState(updatedIngredients);
    };

    render() {
        const emptyIngredientInfo = {
            ...this.state.ingredients
        };
        for (let key in emptyIngredientInfo) {
            emptyIngredientInfo[key] = emptyIngredientInfo[key] <= 0;
        }

        return (
            <React.Fragment>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    emptyIngredientInfo={emptyIngredientInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable} />
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;