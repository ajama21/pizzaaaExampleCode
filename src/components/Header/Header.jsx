import { useSelector } from 'react-redux';

function Header({ pageName, showTotal }) {

    // Get the total from redux.
    const orderTotal = useSelector(store => store.orderTotal);

    return (
        <header className='App-header'>
            <h1 className='App-title'>{pageName}</h1>

            {/* Only show the total in the header, if showTotal was passed in (via props) as true */}
            {
                showTotal &&
                <span id='total-span'>
                    <img src="images/shopping_cart_image.svg" height={20} width={20}></img>
                    <p>Total: ${orderTotal}</p>
                </span>
            }

        </header>
    );

}

export default Header;
