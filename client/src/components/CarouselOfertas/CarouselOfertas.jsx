import styles from './CarouselOfertas.module.css'
import { Carousel } from 'react-responsive-carousel';

export default function CarouselOfertas() {
    return (
        <Carousel
            className={styles.carousel}
            showStatus={false}
            showArrows={true}
            infiniteLoop={true}
            autoPlay={true}
            showThumbs={false}
            interval={6000}
            transitionTime={2000}
        >
            <img src="OfertasCarousel1.png" className={styles.image} alt="offer" />
            <img src="OfertasCarousel2.png" className={styles.image} alt="offer" />
            <img src="OfertasCarousel3.png" className={styles.image} alt="offer" />
        </Carousel>
    )
}