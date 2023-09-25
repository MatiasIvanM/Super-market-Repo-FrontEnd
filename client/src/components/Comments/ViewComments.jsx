import React from 'react';
import { useSelector } from 'react-redux';
import CommentCarousel from './Carousel/Carrusel';

function ViewComments({ productId }) {
  const allCommentsResponse = useSelector((state) => state.comments);
  const userName = useSelector((state) => state.customerName);

  // Verifica si los comentarios existen y si la propiedad 'comments' está presente en la respuesta.
  const allComments = allCommentsResponse?.comments || [];

  const productComments = allComments.filter((comment) => comment.productId === productId);

  const getName = () => {
    return userName;
  };

  return (
    <div>
      {productComments.length > 0 ? (
        <CommentCarousel productComments={productComments} getName={getName} />
      ) : (
        <p>Aún no hay calificaciones para este producto.</p>
      )}
    </div>
  );
}

export default ViewComments;
