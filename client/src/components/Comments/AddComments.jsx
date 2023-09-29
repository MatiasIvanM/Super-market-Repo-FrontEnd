import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../../redux/Actions/actionsComments';
import { Form, Button, Alert, Col, Row } from 'react-bootstrap';
import RatingSelector from './RatingSelector';
import style from './Comment.module.css'

function Comments(props) {
    const { productId,customerId } = props;

    // const customer = useSelector((state) => state.customerId);
    // const customerId = customer.id;

    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comments);
    const [comment, setComment] = useState('');
    const [calification, setCalification] = useState(0);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

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
        setShowSuccessAlert(true);

        setTimeout(() => {
            setShowSuccessAlert(false);
        }, 3000);
    };

    //rating selector
    const handleRatingChange = (newRating) => {
        setCalification(newRating);
    };

    return (
        <div className={style.commentContainer}>
            <h3>Deja tu comentario</h3>
            <div className={style.ratingSelector}>
                <RatingSelector onChange={setCalification}/>
            </div>
            <Form.Group controlId="commentForm">
                <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Escribe tu comentario..."
                    value={comment}
                    onChange={handleCommentChange}
                />
            <div className={style.commentFooter}>
                <Row>
                    <Col>
                    <Button variant="primary" onClick={handleAddComment} className={style.customButton}>
                        Enviar comentario
                    </Button>
                    </Col>
                    <Col>
                    {showSuccessAlert && (
                            <Alert variant="success" className={style.customAlert}>
                                <div className={style.alertContent}>
                                    Comentario enviado !
                                </div>
                            </Alert>
                        )}
                    </Col>
                </Row>
            </div>
            </Form.Group>
        </div>
    );
}

export default Comments;
