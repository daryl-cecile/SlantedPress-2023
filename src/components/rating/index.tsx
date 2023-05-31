import styles from "./styles.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';

type RatingProps = {
    max?: number,
    value: number
}

export default function Rating(props:RatingProps) {
    const hasHalfStars = (props.value % 0.5) === 1
    const wholeStars = (hasHalfStars ? props.value - 0.5 : props.value);
    
    const stars = new Array(wholeStars).fill(1);
    if (hasHalfStars) stars.push(0.5);
    while (stars.length < (props.max ?? 5)) stars.push(0);

    return (
        <p className={styles.rating}>
            Rating:
            {stars.map((v) => {
                if (v === 1) return <FontAwesomeIcon icon={faStar} />
                if (v === 0.5) return <FontAwesomeIcon icon={faStarHalf} />
                if (v === 0) return <FontAwesomeIcon icon={faRegularStar} />
            })}
        </p>
    )
}
