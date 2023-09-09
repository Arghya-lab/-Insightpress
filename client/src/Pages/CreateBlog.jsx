import { useState } from "react";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import EditorToolbar, { modules, formats } from "../Components/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { useEffect } from "react";

function CreateBlog() {
  const [isEditPage, setIsEditPage] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const blogSubmitApi = `${apiBaseUrl}/api/blog`;

  //  initial values for create blog form
  let title = "";
  let summary = "";
  let content = "";

  // location.state contains =>  isEditPurpose, blogId, title, summary, content
  if (location.state) {
    // console.log(location.state);
    title = location.state.title;
    summary = location.state.summary;
    content = location.state.content;
  }

  useEffect(() => {
    setIsEditPage(location.state?location.state.isEditPurpose:false);
  }, []);

  const handleBlogSubmit = async (values, actions) => {
    // console.log(values);
    if (!isEditPage) {
      const res = await fetch(blogSubmitApi, {
        method: "POST",
        headers: { "Content-Type": "application/json", "auth-token": token },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        actions.setSubmitting(false);
        console.log("Blog uploaded sucessful");
        navigate("/");
      } else {
        console.log("wrong credentials");
      }
    } else {
      const res = await fetch(`${apiBaseUrl}/api/blog/${location.state.blogId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "auth-token": token },
        body: JSON.stringify(values),
      });
      console.log(res);
      if (res.ok) {
        actions.setSubmitting(false);
        console.log("Blog Edited sucessful");
        navigate("/");
      } else {
        console.log("wrong credentials");
        console.log(res);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="px-[calc((100vw-1280px)/2)] mx-4 my-16">
        <Formik
          initialValues={{ title, summary, content }}
          onSubmit={handleBlogSubmit}>
          <Form className="grid gap-4">
            <Field
              type="text"
              name="title"
              placeholder="Write title here..."
              className="w-full px-4 h-10 border-2 border-zinc-400 text-zinc-700 text-base"
            />
            <Field
              type="text"
              name="summary"
              placeholder="Write content here..."
              className="w-full px-4 h-10 border-2 border-zinc-400 text-zinc-600 text-base"
            />
            <Field type="text" name="content">
              {({
                field, // { name, value, onChange }
              }) => (
                <div className="text-editor">
                  <EditorToolbar />
                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    placeholder={"Write something awesome..."}
                    value={field.value}
                    onChange={field.onChange(field.name)}
                    style={{ height: 400 }}
                  />
                </div>
              )}
            </Field>
            <button type="submit" className="btn my-16">
              {isEditPage ? "Confirm Edit" : "Create Blog"}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default CreateBlog;