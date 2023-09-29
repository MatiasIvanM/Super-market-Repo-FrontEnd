import { Link } from "react-router-dom";
import { AppBar, ToggleThemeButton, LocalesMenuButton,TitlePortal, 
    RefreshIconButton } from "react-admin";
import { Button } from 'react-bootstrap'   
 
    let usuario = JSON.parse(localStorage.getItem('customer'));


    
const Bar = () => (
  <AppBar
    toolbar={
      <>
      <span style={{margin:'5px'}}>
        SuperMarket
      </span>
        {/* <LocalesMenuButton /> */}
        <TitlePortal variant="body2" component="h3" />
        {/* <Search /> */}
        <Link to="/">
          <Button variant="outline-light">Volver al inicio</Button>{' '}
        </Link>
        <ToggleThemeButton />
        <RefreshIconButton />
      </>
    }
  />
);

export default Bar;

