import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import BlogPage from "./Pages/BlogPage";
import AuthorPage from "./Pages/AuthorPage";
import CreateBlogPage from "./Pages/CreateBlogPage";
import BookmarkPage from "./Pages/BookmarkPage";
import FeedForMePage from "./Pages/FeedForMePage";

function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <div className="text-center font-serif font-medium">
      <Routes>
        {/* No need of Auth */}
        <Route path="/" element={<HomePage />} />
        <Route path="Login" element={<LoginPage />} />
        <Route path="blog/:id" element={<BlogPage />} />
        <Route path="author/:id" element={<AuthorPage />} />
        {/* Need Auth */}
        {token ? (
          <Route path="create" element={<CreateBlogPage />} />
        ) : undefined}
        {token ? (
          <Route path="bookmarks" element={<BookmarkPage />} />
        ) : undefined}
        {token ? (
          <Route path="feedForMe" element={<FeedForMePage />} />
        ) : undefined}
      </Routes>
    </div>
  );
}

export default App;
