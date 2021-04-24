import DUMMY_MEALS from '../../enums/dummy-meals';

import MealItem from './MealItem/MealItem';

const AvailableMeals = (props)=>{

  const mealsList = DUMMY_MEALS.map(meal => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price}></MealItem>);

  return(
    <section>
      <ul>
        {mealsList}
      </ul>
    </section>
  )
}

export default AvailableMeals;