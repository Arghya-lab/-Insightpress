import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./Pages/Login";
import AuthorProfile from "./Pages/AuthorProfile";

function App() {
  return (
    <div className="text-center font-serif font-medium">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Login" element={<Login />} />
        <Route path="author/:id" element={<AuthorProfile />} />
      </Routes>
    </div>
  );
}

export default App;
