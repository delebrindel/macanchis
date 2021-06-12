import { useState, useEffect } from 'react';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const [dummyMeals, setDummyMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [backendError, setBackendError] = useState('');

  useEffect(() => {
    const fetchMeals = async () => {
      setBackendError('');
      const mealsRequest = await fetch('https://macanchis-990a2-default-rtdb.firebaseio.com/meals.json');
      if (!mealsRequest.ok) {
        throw new Error('Something went wrong while fetching data from firebase');
      }
      const meals = await mealsRequest.json();
      const mealsArray = [];
      for (const key in meals) {
        mealsArray.push({
          id: key,
          name: meals[key].name,
          description: meals[key].description,
          price: meals[key].price,
        })
      }
      setDummyMeals(mealsArray);
      setIsLoading(false);
    }

    fetchMeals().catch(error => {
      setIsLoading(false);
      setBackendError(error.message);
    })
  }, [])

  const mealsList = dummyMeals && dummyMeals.map(meal => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price}></MealItem>);

  return (
    <section>
      {isLoading && 'Loading...'}
      {!isLoading && backendError !== '' && backendError}
      <ul>
        {!isLoading && backendError === '' && mealsList}
      </ul>
    </section>
  )
}

export default AvailableMeals;