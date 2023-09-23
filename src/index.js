import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import './index.css';
import App from './components/App/App';

const menu = (state = [], action) => {
    if (action.type === 'MENU_REFRESH') {
        return action.payload
    }

    return state;
}

const orderItems = (state = [], action) => {
    // Add a menu item to the list of items on the order.
    if (action.type === 'ORDERITEMS_ADD_ITEM') {
        // Create a new array, with the new item we want to add, and all the items from the old array.
        let newOrderItem = action.payload
        // For now, hard code the quantity to 1.  We could change this logic later if we need.
        newOrderItem.quantity = 1;
        let newOrderList = [newOrderItem, ...state];
        return newOrderList;
    }

    // Remove a menu item from the list of items on the order.
    if (action.type === 'ORDERITEMS_REMOVE_ITEM') {
        // Find the index of the first item in the order list, who's item id matches the id of the item we've been asked to remove.
        let indexOfItemToRemove = state.findIndex(orderItem => orderItem.id === action.payload);
        // Make a new list of order items, without the item who's index matches the one we are looking for.
        let newOrderList = state.filter((orderItem, index) => { if (index !== indexOfItemToRemove) { return orderItem } });
        return newOrderList;
    }

    if (action.type === 'ORDERITEMS_RESET') {
        return [];
    }

    return state;
}

const orderTotal = (state = 0, action) => {
    if (action.type === 'ORDERTOTAL_ADD') {
        return state + Number(action.payload);
    }

    if (action.type === 'ORDERTOTAL_REMOVE') {
        return state - Number(action.payload);
    }

    if (action.type === 'ORDERTOTAL_RESET') {
        return 0;
    }

    return state;
}

const address = (state = {}, action) => {

    if (action.type === 'ADDRESS_CREATE') {
        return action.payload;
    }

    if (action.type === 'ADDRESS_RESET') {
        return {};
    }

    return state;
}

const reduxStore = createStore(
    combineReducers({
        address,
        menu,
        orderItems,
        orderTotal
    }),
    applyMiddleware(logger)
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={reduxStore}>
            <App />
        </Provider>
    </React.StrictMode>
);
