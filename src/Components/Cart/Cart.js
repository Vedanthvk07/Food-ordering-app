
import React,{ useContext,useState } from 'react';


import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout.js';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const [isClicked, setClicked]=useState(false);
  const [isSubmit,setIsSubmitting]= useState(false);
  const [didSubmit,setDidSubmitting]= useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const clickHandler=()=>{
    setClicked(true);
  }

  const submitOrderHandler= async (userData)=>{
    setIsSubmitting(true);
    
    await fetch('https://food-order-28ada-default-rtdb.firebaseio.com/orders.json',{
      method:'POST',
      body:JSON.stringify({
        user:userData,
        orderedItems:cartCtx.items
      })
    });

    setIsSubmitting(false);
    setDidSubmitting(true);
    cartCtx.clearCart();

  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

 const cartModalContent=( 
  <React.Fragment>{cartItems}
  <div className={classes.total}>
    <span>Total Amount</span>
    <span>{totalAmount}</span>
  </div>
  {isClicked && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
  {!isClicked &&
  <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>
      Close
    </button>
    {hasItems && <button className={classes.button} onClick={clickHandler}>Order</button>}
    
  </div>}
  </React.Fragment>);

  const isSubmittingModalContent=<p>Sending order data...</p>;

  const didSubmitModalContent=(
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>
      Close
    </button>
  
    
  </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
     {!isSubmit && !didSubmit && cartModalContent}
      {isSubmit && isSubmittingModalContent}
      {!isSubmit && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
