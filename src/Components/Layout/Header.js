import { Fragment } from "react";
import HeaderCartButton from "./HeaderCartButton";
import mealsImage from '../../Assets/meals.jpg';
import classes from './Header.module.css';
const Header=props=>{
    return (<Fragment>
        <header className={classes.header}>
            <h1>React Meals</h1>
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="imgs"/>

            </div>
        
    </Fragment>
    );
};
export default Header;