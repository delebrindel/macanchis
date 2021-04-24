import classes from './Card.module.scss';

export const Card = (props)=>{
  return (
    <div className={classes.cardWrapper + ( props.className ? ` ${props.className}` : '')}>
      {props.children}
    </div>
  )
}

export default Card;