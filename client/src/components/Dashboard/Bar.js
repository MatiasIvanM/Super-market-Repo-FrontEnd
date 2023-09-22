import { Link } from "react-router-dom";
import { AppBar, ToggleThemeButton, LocalesMenuButton,
    RefreshIconButton } from "react-admin";

// const navigate = useHistory();

const Bar = () => (
  <AppBar
    toolbar={
      <>
        {/* <LocalesMenuButton /> */}
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
