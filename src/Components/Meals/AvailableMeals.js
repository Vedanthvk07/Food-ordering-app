import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import Mealitem from './MealItem';
import { useEffect, useState } from 'react';


const AvailableMeals=() =>{
const [meals,setMeals]= useState([]);

const[ isLoading, setIsLoading]= useState(true);

const [httpError,setHttpError]= useState();

  useEffect(()=>{
    const fetchMeals= async ()=>{
      const response=await fetch('https://food-order-28ada-default-rtdb.firebaseio.com/meals.json');

      if(!response.ok){
        throw new Error('Something went wrong!');
      }
      const responseData=await response.json();
      
      const loadedMeals=[];

      for(const key in responseData){
        loadedMeals.push({
          id:key,
          name:responseData[key].name,
          description:responseData[key].description,
          price:responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);

    };
  fetchMeals().catch((Error)=>{    //catches thrown error
    setIsLoading(false);
    setHttpError(Error.message);

  });
    },[]);
     if(isLoading){
      return(
        <section className={classes.mealsLoad}>
          <p>Loading...</p>
        </section>
      );
     }

     if(httpError){
      return(
        <section className={classes.errorLoad}>
          <p>{httpError}</p>
        </section>
      )
     }
  
            const mealsList=meals.map(meal=><Mealitem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price}/>);
    return (
        <section className={classes.meals}>
           <Card><ul>
                {mealsList}
            </ul>
            </Card> 
        </section>
    );

};
export default AvailableMeals;