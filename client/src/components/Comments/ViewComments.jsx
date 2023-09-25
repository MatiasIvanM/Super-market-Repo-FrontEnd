import React from 'react';
import { useSelector } from 'react-redux';

function ViewComments({ productId }) {
    const allComments = useSelector((state) => state.comments);
    const userName = useSelector((state) => state.customerId);
    
    const productComments = allComments.filter((comment) => comment.productId === productId);

    const getName = (customerId) => {
        if(customerId === userName.id){
            return userName.name;
        }
        return 'Aca deberia ir el nombre';
    }
    
    // Falta tarer el nombre correcto 

  return (
    <div>
      <h2>Comentarios</h2>
      <ul>
        {Array.isArray(productComments) &&
          productComments.map((comment) => (
            <li key={comment.id}>
              <strong>Calificación: {comment.calification}</strong>
              <p>{comment.content}</p>
              <p>Usuario: {getName(comment.customerId)}</p>
            </li>
          ))}
      </ul>
    </div>
  );
 
};

export default ViewComments;


