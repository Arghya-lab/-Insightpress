import { Formik, Form, Field } from "formik";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import EditorToolbar, { modules, formats } from "../Components/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";

function CreateBlog() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const blogSubmitApi = `${apiBaseUrl}/api/blog`;

  const handleBlogSubmit = async (values, actions) => {
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
  };

  return (
    <div>
      <Navbar />
      <div className="px-[calc((100vw-1280px)/2)] mx-4 my-16">
        <Formik
          initialValues={{ title: "", summary: "", content: "" }}
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
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default CreateBlog;
