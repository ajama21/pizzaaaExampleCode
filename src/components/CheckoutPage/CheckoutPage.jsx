import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Header from '../Header/Header';


// Things that need to happen when we click "next".
// 1) Package up all the information for our order.
//      Look at what the server needs us to send, and the structure it expects us to use.
// 2) Send it to the server. <- this means axios
// 3) Clear out our reducers, so the next order starts fresh. <- this means dispatch
// 4) Send the customer back to the order page.

function CheckoutPage() {

    // We may need to change some stuff in redux, so we need this.
    const dispatch = useDispatch();

    // We will need to send the user to another page when they click 'next'.
    // We need to to a bunch of stuff when they click next too, so we'll use this to send them to the other page when it's time.
    const history = useHistory();

    // We get the customer's address and order info from our reducers.
    // We have useSelector to get information from reducers.
    const address = useSelector(store => store.address);
    const orderItems = useSelector(store => store.orderItems);
    const orderTotal = useSelector(store => store.orderTotal);


    const submitOrder = () => {

        // 1) Package up all the information for our order.
        let order =
        {
            customer_name: address.name,
            street_address: address.streetAddress,
            city: address.city,
            zip: address.zip,
            total: orderTotal,
            type: address.isDelivery ? 'Delivery' : 'Pickup',
            pizzas: orderItems
        };

        console.log("address.isDelivery", address.isDelivery);

        // 2) Send it to the server.
        axios.post('/api/order', order)
            .then((result) => {
                console.log('POST /api/order success', result.data);
            })
            .catch((err) => {
                console.log('POST /api/order fail', err);
            })
    }


    const handleSubmit = () => {

        submitOrder();

        // 3) Clear reducers, so we start fresh for the new order.
        dispatch({
            type: 'ORDERITEMS_RESET'
        });

        dispatch({
            type: 'ADDRESS_RESET'
        });

        dispatch({
            type: 'ORDERTOTAL_RESET'
        });

        // 4) Send the customer back to the order page.
        history.push('/order');
    }

    return (
        <>
            <Header pageName="Prime Pizza" showTotal={false} />

            <h3>Step 3: Checkout</h3>

            <section id="order-address">
                <p>{address.name}</p>
                <p>{address.streetAddress}</p>
                <p>{address.city}, MN {address.zip}</p>
                {address.isDelivery ? <p>For Delivery</p> : <p>For Pickup</p>}
            </section>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {orderItems.map((orderItem, index) => {
                        return (
                            <tr key={index}>
                                <td>{orderItem.name}</td>
                                <td>{orderItem.price}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <h2>Total: {orderTotal}</h2>

            <button onClick={() => handleSubmit()}>CHECKOUT</button>

        </>
    );
}

export default CheckoutPage;
