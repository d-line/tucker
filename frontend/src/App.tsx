import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Stories from "./pages/Stories";
import Feeds from "./pages/Feeds";
import Subscribe from "./pages/Subscribe";

function App() {
  const auth = useAuth();

  return (
    <main>
      { auth?.isLoggedIn && <Header /> }
      <Routes>
        {auth?.isLoggedIn ? (
          <>
          <Route path="/" element={<Stories />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/feeds" element={<Feeds />} />
          <Route path="/subscribe" element={<Subscribe />} />
          </>
          ) : (
          <Route path="/" element={<Login />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
