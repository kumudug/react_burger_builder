import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Model from '../../components/UI/Model/Model';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

class BurgerBuilder extends Component {

    getStartingState() {
        return {
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 4,
            purchasable: false,
            purchasing: false,
            loading: false
        };
    }

    state = this.getStartingState();

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
    }

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
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCanceledHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Name1 Surname',
                address: {
                    street: 'Test Str1',
                    zipCode: '123',
                    country: 'AU'
                },
                email: 'someone@somewhere.com'
            },
            deliveryMethod: 'drone'
        };

        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState(this.getStartingState());
                alert("Purchase Complete!");
            })
            .catch(error => { 
                console.log(error);
                this.setState({ loading: false });
                alert(`Something went wrong: ${error}`);
             });
    }

    render() {
        const emptyIngredientInfo = {
            ...this.state.ingredients
        };
        for (let key in emptyIngredientInfo) {
            emptyIngredientInfo[key] = emptyIngredientInfo[key] <= 0;
        }
        let orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            cancel={this.purchaseCanceledHandler}
            continue={this.purchaseContinueHandler} />;
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <React.Fragment>
                <Model show={this.state.purchasing} cancel={this.purchaseCanceledHandler}>
                    {orderSummary}
                </Model>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    emptyIngredientInfo={emptyIngredientInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    orderBtnClicked={this.purchaseHandler} />
            </React.Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);