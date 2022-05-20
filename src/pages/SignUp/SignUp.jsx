import "./SignUp.css";

import { useNavigate, Link } from "react-router-dom";
import { useReducer } from "react";
import useAuth from "../../auth/useAuth";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const reducer = (state, action) => {
  return { ...state, ...action };
};

const SignUp = () => {
  const { handleSignUp } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    dispatch({ [e.target.name]: e.target.value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    await handleSignUp(state.name, state.email, state.password);
    navigate("/");
  };

  return (
    <section className="sign-up">
      <h2>Registrarse</h2>
      <form onSubmit={registerSubmit} className="register-form">
        <input
          className="name"
          type="text"
          name="name"
          placeholder="Nombre"
          value={state.name}
          onChange={handleChangeInput}
          required
        />
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
          Registrarse
        </button>
        <Link className="login" to={"/"}>
          Iniciar Sesión
        </Link>
      </form>
    </section>
  );
};

export default SignUp;
