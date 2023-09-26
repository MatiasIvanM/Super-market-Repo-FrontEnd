import { Link } from "react-router-dom";
import { AppBar, ToggleThemeButton, LocalesMenuButton,TitlePortal, 
    RefreshIconButton } from "react-admin";
 
const Bar = () => (
  <AppBar
    toolbar={
      <>
        {/* <LocalesMenuButton /> */}
        <TitlePortal variant="body2" component="h3" />
        {/* <Search /> */}
        <Link to="/">
            <button> Vista de Usuario </button> 
        </Link>
        <ToggleThemeButton />
        <RefreshIconButton />
      </>
    }
  />
);

export default Bar;
