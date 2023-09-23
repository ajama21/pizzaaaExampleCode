import axios from 'axios';
import { useEffect, useState } from 'react';

import Header from '../Header/Header';

function AdminPage() {

    // Set up a place to store the orders in this component, after we get them.
    const [orders, setOrders] = useState([]);

    // When the page loads, get the orders
    useEffect(() => {
        getOrders()
    }, [])

    // Get the orders from the server
    const getOrders = () => {
        axios.get('/api/order')
            .then((result) => {
                console.log('GET /api/order success', result.data);
                // And save them in a react variable, in this component
                setOrders(result.data);
            })
            .catch((err) => {
                console.log('GET /api/order fail', err);
            })
    }

    // Date and time stuff sucks.  It's just part of our lives as programers.
    // This is NOT the best way to do it.
    // I got it working, and if I were shipping this I would refacter it to make it better.
    // Since this example code, I'm leaving you this to see a lot of the tools you can work with, and a lot of the options you have.
    const formatOrderTime = (dateTimeString) => {
        console.log("dateTimeString", dateTimeString);

        // Take the nasty looking datetime string the server sent us, which looks like this: 2023-10-04T06:02:31.675Z
        // and turn it into a dateTime object, because javascript has built in functions to work with dateTime objects.
        var dateTime = new Date(dateTimeString);

        let dateString = ((dateTime.getMonth() > 8) ? (dateTime.getMonth() + 1) : (dateTime.getMonth() + 1)) + '/' + ((dateTime.getDate() > 9) ? dateTime.getDate() : dateTime.getDate()) + '/' + dateTime.getFullYear();

        let hours = dateTime.getHours() % 12 === 0 ? 12 : dateTime.getHours() % 12;

        let minutes = dateTime.getMinutes() < 10 ? '0' + dateTime.getMinutes() : dateTime.getMinutes();

        let amOrPm = dateTime.getHours() >= 12 ? 'pm' : 'am';

        return dateString + ' at ' + hours + ':' + minutes + amOrPm;
    }

    // Display the orders to the admin
    return (
        <>
            <Header pageName="Prime Pizza Orders" showTotal={false} />

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Time Order Placed</th>
                        <th>Type</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => {
                        return (
                            <tr key={index}>
                                <td>{order.customer_name}</td>
                                <td>{formatOrderTime(order.time)}</td>
                                <td>{order.type}</td>
                                <td>${order.total}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    );
}

export default AdminPage;


