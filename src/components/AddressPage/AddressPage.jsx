import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Header from '../Header/Header';

// Things that need to happen when we click "next"
// 1) Get the info from the form
// 2) a) package it up
// 2) b) send it where it needs to go
//        side note, you'll need to set up a palce for this to go in redux
//        and an 'action' to use, to send it
// 3) route us to the next page

function AddressPage() {

    // We may need to change some stuff in redux, so we need this.
    const dispatch = useDispatch();

    // We will need to send the user to another page when they click 'next'.
    // We need to to a bunch of stuff when they click next too, so we'll use this to send them to the other page when it's time.
    const history = useHistory();

    // We are going to set up a place to keep track of the data the user gives us.
    // We need a place to store and track it, while the use is typing.
    // Storing it here, temperarily, lets us connect step 1 to step 2
    const [name, setName] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [isDelivery, setIsDelivery] = useState('');

    // 2) Package up the data, to send it to redux, where it will be used later in our confirmation page.
    const handleSubmit = event => {
        event.preventDefault();
        // 2) a) Package up the data
        let deliveryAddress = {
            name: name,
            streetAddress: streetAddress,
            city: city,
            zip: zip,
            isDelivery: isDelivery
        };

        // 2) b) send it where it needs to go
        dispatch({
            type: 'ADDRESS_CREATE',
            payload: deliveryAddress
        });

        // console.log("deliveryAddress", deliveryAddress);

        // 3)  route us to next screen (checkout)
        history.push('/checkout');


    }

    return (
        <>
            <Header pageName="Prime Pizza" showTotal={true} />

            <h3>Step 2: Customer Information</h3>

            {/* step 1, a form from which we will get info that we want */}
            <form onSubmit={handleSubmit}>
                <input value={name} placeholder="Name" onChange={(event) => setName(event.target.value)}></input>
                <input value={streetAddress} placeholder="Street Address" onChange={(event) => setStreetAddress(event.target.value)}></input>
                <input value={city} placeholder="City" onChange={(event) => setCity(event.target.value)}></input>
                <input value={zip} placeholder="Zip" onChange={(event) => setZip(event.target.value)}></input>

                <input type="radio" name="pickup_or_delivery" value={false} id="is-not-delivery" onClick={(event) => setIsDelivery(false)} />
                <label htmlFor="is-not-delivery">Pickup</label>

                <input type="radio" name="pickup_or_delivery" value={true} id="is-delivery" onClick={(event) => setIsDelivery(true)} />
                <label htmlFor="is-delivery">Delivery</label>

                <button type='submit'>NEXT</button>
            </form >
        </>
    );
}

export default AddressPage;


