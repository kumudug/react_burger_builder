import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: 'Name1 Surname',
            street: 'Test Str1',
            zipCode: '123',
            country: 'AU',
            email: 'someone@somewhere.com',
            deliveryMethod: 'drone'
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price
        };

        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({ loading: false });
                alert("Purchase Complete!");
                //In checkout we spread the props {...props} without that location data won't come here and this history.push won't work
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false });
                alert(`Something went wrong: ${error}`);
            });
    }

    render() {
        let form = (
            <form>
                <Input inputtype="input" type="email" name="email" placeholder="Your email" />
                <Input inputtype="input" type="email" name="email" placeholder="Your email" />
                <Input inputtype="input" type="text" name="name" placeholder="Your name" />
                <Input inputtype="input" type="text" name="street" placeholder="Street" />
                <Input inputtype="input" type="text" name="postcode" placeholder="Post Code" />
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;