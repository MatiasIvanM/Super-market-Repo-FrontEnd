import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import { ImStarEmpty, ImStarHalf, ImStarFull } from 'react-icons/im';
import style from './Carrusel.module.css';

function renderRatingStars(calification) {
  const MAX_STARS = 5; // Número máximo de estrellas
  const stars = [];

  // Calcular la cantidad de estrellas llenas y medias
  const fullStars = Math.floor(calification);
  const hasHalfStar = calification % 1 !== 0;

  // Generar las estrellas llenas
  for (let i = 0; i < fullStars; i++) {
    stars.push(<ImStarFull key={`star-full-${i}`} />);
  }

  // Generar la estrella a medias si es necesario
  if (hasHalfStar) {
    stars.push(<ImStarHalf key={`star-half`} />);
  }

  // Completar con estrellas vacías si es necesario
  const emptyStars = MAX_STARS - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<ImStarEmpty key={`star-empty-${i}`} />);
  }

  return stars;
}

function CommentCarousel({ productComments ,getName }) {
  return (
    <Carousel
      className={style.carousel}
      showStatus={false}
      showArrows={false}
      infiniteLoop={true}
      autoPlay={true}
      interval={3000}
      transitionTime={1000}
      showThumbs={false}
    >
      {productComments.map((comment) => (
        <div key={comment.id} className={style.commentSlide}>
          <div className={style.userInfo}>
          <h4>{comment.Customer ? comment.Customer.name : 'Nombre no disponible'}</h4>
          </div>
          <div className={style.reactIcons}>{renderRatingStars(comment.calification)}</div>
          <div className={style.commentDetails}>
            <p>{comment.content}</p>
          </div>
        </div>
      ))}
    </Carousel>
  );
}

export default CommentCarousel;
