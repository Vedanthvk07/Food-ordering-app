import { useContext } from 'react';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import CartContext from '../../store/cart-context';
const Mealitem= props =>{
    const cartCtx=useContext(CartContext);
    const price=`$${props.price.toFixed(2)}`;

    const addToCartHandler=(amount) =>{
        cartCtx.addItem({
            id:props.id,
            name:props.name,
            amount:amount,
            price:props.price
        });
};
    return <li className={classes.meal}>
        <div>
            <h3>{props.name}</h3>
            <div>{props.description}</div>
            <div>{price}</div>
        </div>
        <div>
            <MealItemForm id={props.id}onAddToCart={addToCartHandler}/>
        </div>
    </li>
};

export default Mealitem;