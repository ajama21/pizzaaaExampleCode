import { useState } from 'react';
import { useDispatch } from 'react-redux';

function MenuItem({ menuItem }) {

    const { description, id, image_path, name, price } = menuItem;

    // We may need to change some stuff in redux, so we need this.
    const dispatch = useDispatch();

    // A place to keep track if we've orderd a given item.
    // We only want to let people order one of everything.
    // This could be removed later.
    // This starts out false, since nothing is automatically added.
    // We update this to be true if they add the item.
    // We update it again to be false, if they remove it.
    const [hasBeenAddedToOrder, setHasBeenAddedToOrder] = useState(false);

    const addItemToOrder = (menuItem) => {
        // Mark the item as added, so we show the remove button.
        // We can remove this if we want to let users order more than one of something.
        setHasBeenAddedToOrder(!hasBeenAddedToOrder);

        // Add a menu item to the list of items on the order.
        dispatch({
            type: 'ORDERITEMS_ADD_ITEM',
            payload: menuItem
        });

        // Update the order total, now that the item has been added to the order.
        dispatch({
            type: 'ORDERTOTAL_ADD',
            payload: menuItem.price
        });
    }

    const removeItemFromOrder = (id, price) => {
        // Mark the item as removed, so we show the add button.
        // We can remove this if we want to let users order more than one of something.
        setHasBeenAddedToOrder(!hasBeenAddedToOrder);

        // Remove a menu item from the the order.
        dispatch({
            type: 'ORDERITEMS_REMOVE_ITEM',
            payload: id
        });

        // Update the order total, now that the item has been removed from the order.
        dispatch({
            type: 'ORDERTOTAL_REMOVE',
            payload: price
        });
    }

    return (
        <div className="MenuOption-item">
            <img src={image_path} alt={"image of " + description} width={100} height={100}></img>
            <h3>{name}</h3>
            <p>{description}</p>
            <p>{price}</p>

            {/* For now, we only want users to be able to order one of something. */}
            {/* So we'll only show the add/remove buttons when appropriate */}
            {/* We keep track of weather or not an item has been added to an order with hasBeenAddedToOrder */}
            {/* If the item hasn't been added, we show the 'add' button.  If the item has been added, we show the remove button. */}
            {hasBeenAddedToOrder ?
                <button onClick={() => removeItemFromOrder(id, price)}>Remove</button> :
                <button onClick={() => addItemToOrder(menuItem)}>Add</button>
            }
        </div>
    );
}

export default MenuItem;
