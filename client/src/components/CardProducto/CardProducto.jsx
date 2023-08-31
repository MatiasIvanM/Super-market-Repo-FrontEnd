import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import style from "./CardProduct.module.css"



function CardProduct(props) {

    let {Product_name, description, price, rating, stock, Existencias, Image} = props;

  return (
    <Card style={{  width: '16rem' } } bg='white' >
      <Card.Img variant="top" src={Image} style={{ width: '90%', alignItems: 'center' }}  />
      <Card.Subtitle className={style.rating}>★{rating}</Card.Subtitle>
      <Card.Body style={{ width: '98%' }} >
        <Card.Title>{Product_name}</Card.Title>
        <Card.Text style={{  fontSize:'0.7rem', color : 'gray', textAlign:'left'}}>{description} </Card.Text>
        <div className={style.containerPrice}>
          <Card.Title style={{  fontSize:'1.6rem', color : 'blue', textAlign:'left'}}>${price}</Card.Title>
          {Existencias 
            ? <Card.Text style={{  fontSize:'0.7rem', fontWeight:'bold', color : 'green'}}>Disponible </Card.Text> 
            : <Card.Text style={{  fontSize:'0.7rem', fontWeight:'bold', color : 'red'}}>Agotado </Card.Text> }
        </div>
        <Button variant="primary" style={{ width: '98%' }}>Agregar</Button>
      </Card.Body>
    </Card>
    // </>

  );
}

export default CardProduct;