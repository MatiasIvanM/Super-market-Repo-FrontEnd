

function Card ({ Product_ID, Product_name, Description, Price, stock, Image, expirationDate, Categories, rating }) {
  return (
    <div>
      <div>
        <img src={Image} alt="img product" />
      </div>
      {Product_name ? (
        <>
          <div >
            <h3> {Product_name}</h3>
            <br />
            <h4> {Description} </h4>
            <br />
            <h3> {Price}</h3>
            <br />
            { stock >= 1 ? <h4>Disponible</h4> : <h4>Agotado</h4> }
            { stock >= 1
             ?  <Link to={`/DetailProduct/${Product_ID}`}>
                    <button> Agregar al Carro</button> 
                </Link>
             :  <Link to={`/DetailProduct/${Product_ID}`}>
                    <button disabled> Agregar al Carro</button> 
                </Link>
            }
              {/* { rating ★ } */}
          </div>
        </>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
};

export default Card;
