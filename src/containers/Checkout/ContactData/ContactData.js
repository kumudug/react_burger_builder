import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
                this.setState({ loading: false });
                alert("Purchase Complete!");
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
                <input className={styles.Input} type="email" name="email" placeholder="Your email" />
                <input className={styles.Input} type="email" name="email" placeholder="Your email" />
                <input className={styles.Input} type="text" name="name" placeholder="Your name" />
                <input className={styles.Input} type="text" name="street" placeholder="Street" />
                <input className={styles.Input} type="text" name="postcode" placeholder="Post Code" />
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