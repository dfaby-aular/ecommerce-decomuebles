import { FaShoppingCart } from 'react-icons/fa';

function CartWidget() {
  return (
    <div>
      <FaShoppingCart size={25} color="#605d5d"/>
      <span className="cart-notification">2</span>
    </div>
  );
}

export default CartWidget;
