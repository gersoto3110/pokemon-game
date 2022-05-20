import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Game, SignIn, SignUp } from "./pages";
import { Layout } from "./components";

import useAuth from "./auth/useAuth";
import GameBattleProvider from "./contexts/GameBattle/GameBattleProvider";

const ProtectedRoute = ({ children }) => {
  const { isLogged } = useAuth();

  return isLogged ? <>{children}</> : <Navigate to="/" />;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SignIn />} />
          <Route path="registro" element={<SignUp />} />
          <Route
            path="juego-pokemon"
            element={
              <ProtectedRoute>
                <GameBattleProvider>
                  <Game />
                </GameBattleProvider>
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<div>404| Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
