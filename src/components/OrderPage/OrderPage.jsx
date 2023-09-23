import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import Header from '../Header/Header';
import MenuItem from '../MenuItem/MenuItem';

function OrderPage() {

    // Get the menu from redux.
    // It didn't have to live in redux, but didn't plan very well and thought I may need to use it othe rplaces.
    // So I put it in redux.
    // By the time I realised I only use it here, there was no point in redoing it as a react variable here.
    const menu = useSelector(store => store.menu);

    console.log('menu', menu);

    return (
        <>
            <Header pageName="Prime Pizza" showTotal={true} />

            <h3>Step 1: Select Your Pizza</h3>

            {/* Loop over the menu, and call a MenuItem component for each menu option. */}
            <ul>
                {menu.map((menuItem, index) =>
                    <MenuItem key={menuItem.id} menuItem={menuItem} />
                )}
            </ul>
            <Link to="/address">NEXT</Link>
        </>
    );
}

export default OrderPage;
