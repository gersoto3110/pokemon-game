import "./Header.css";

import { Link } from "react-router-dom";
import useAuth from "../../auth/useAuth";

const Header = () => {
  const { isLogged, handleSingOut } = useAuth();

  return (
    <>
      <header>
        <h1>Batalla Pokemon</h1>
        <nav className="links">
          {!isLogged ? (
            <>
              <Link to="/">
                <span className="auth-type">Iniciar sesión</span>
                <img src="/img/auth-icons/login.svg" alt="login" className="auth-icon"/>
              </Link>
              <Link to="/registro">
                <span className="auth-type">Registrarse</span>
                <img src="/img/auth-icons/add-user.svg" alt="register" className="auth-icon" />
              </Link>
            </>
          ) : (
            <Link to="/" onClick={() => handleSingOut()}>
              <span className="auth-type">Cerrar sesión</span>
              <img src="/img/auth-icons/logout.svg" alt="register" className="auth-icon" />
            </Link>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
