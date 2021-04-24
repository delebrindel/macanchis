import Card from '../UI/Card';
import AvailableMeals from './AvailableMeals';
import styles from './Meals.module.scss';

export const Meals = () => {
  return (
    <Card className={styles['meal-selector']}>
      <AvailableMeals />
    </Card>
  )
}

export default Meals;
