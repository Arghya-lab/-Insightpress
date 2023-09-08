import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./Pages/Login";
import BlogPage from "./Pages/BlogPage";
import AuthorPage from "./Pages/AuthorPage";
import CreateBlog from "./Pages/CreateBlog";

function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <div className="text-center font-serif font-medium">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Login" element={<Login />} />
        <Route path="blog/:id" element={<BlogPage />} />

        {token ? <Route path="create" element={<CreateBlog />} /> : undefined}
        <Route path="author/:id" element={<AuthorPage />} />
      </Routes>
    </div>
  );
}

export default App;
