import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../../redux/Actions/actionsComments';
import { Form, Button } from 'react-bootstrap';
import RatingSelector from './RatingSelector';

function Comments(props) {
    const { productId } = props;

    const customer = useSelector((state) => state.customerId);
    const customerId = customer.id;

    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comments);
    const [comment, setComment] = useState('');
    const [calification, setCalification] = useState(0);

    //comment form
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleAddComment = () => {
        if (comment.trim() === '') {
            return;
        }

        const newComment = {
            content: comment,
            calification: calification, // Utiliza la calificación del estado local
            customerId: customerId,
            productId: productId,
        };
        console.log("🚀 ~ file: Comments.jsx:34 ~ handleAddComment ~ newComment:", newComment)

        dispatch(addComment(newComment));

        setComment('');
    };

    //rating selector
    const handleRatingChange = (newRating) => {
        setCalification(newRating);
    };

    return (
        <div>
            <h2>Deja un comentario</h2>
            <RatingSelector onChange={setCalification} />

            <Form.Group controlId="commentForm">
                <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Escribe tu comentario..."
                    value={comment}
                    onChange={handleCommentChange}
                />
                <Button variant="primary" onClick={handleAddComment}>
                    Agregar Comentario
                </Button>
            </Form.Group>
        </div>
    );
}

export default Comments;
