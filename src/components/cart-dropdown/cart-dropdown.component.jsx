import './cart-dropdown.styles.scss';
import Button from '../button/button.component';


export default function CartDropdown(){
    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                <Button>Go To Checkout</Button>
            </div>
        </div>
    )
}