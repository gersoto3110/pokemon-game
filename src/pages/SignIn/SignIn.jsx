import "./SignIn.css";

import { useReducer } from "react";
import useAuth from "../../auth/useAuth";
import { Link, Navigate, useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

const reducer = (state, action) => {
  return { ...state, ...action };
};

const SignIn = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLogged, handleSignInWithGoogle, handleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    dispatch({ [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSignIn(state.email, state.password);
    navigate("/juego-pokemon");
  };

  const handleOnClick = async (e) => {
    await handleSignInWithGoogle();
    navigate("/juego-pokemon");
  };

  return (
    <>
      {isLogged ? (
        <Navigate to="/juego-pokemon" />
      ) : (
        <section className="sign-in">
          <h2>Iniciar sesión</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <input
              className="email"
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={state.email}
              onChange={handleChangeInput}
              required
            />
            <input
              className="password"
              type="password"
              name="password"
              placeholder="Contraseña"
              value={state.password}
              onChange={handleChangeInput}
              required
            />
            <button className="submit" type="submit">
              Ingresar
            </button>
            <Link className="register" to={"/registro"}>
              Registrarse
            </Link>
          </form>
          <button className="google" onClick={() => handleOnClick()}>
            Iniciar sesión con Google
          </button>
        </section>
      )}
    </>
  );
};

export default SignIn;
