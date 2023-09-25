import styles from './Carousel.module.css'
import Carousel from 'react-bootstrap/Carousel';

export default function CarouselOfertas() {
    return (
        <Carousel indicators={false} variant='dark' className={styles.carousel}>
            <Carousel.Item>
                <img src="OfertaSMH.jpg" className={styles.image} alt="offer" />
            </Carousel.Item>
            <Carousel.Item>
                <img src="OfertaSMH.jpg" className={styles.image}  alt="offer" />
            </Carousel.Item>
            <Carousel.Item>
                <img src="OfertaSMH.jpg" className={styles.image}  alt="offer" />
            </Carousel.Item>
        </Carousel>
    )
}