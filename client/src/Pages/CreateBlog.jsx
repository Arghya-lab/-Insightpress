import { Formik, Form, Field } from "formik";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import EditorToolbar, { modules, formats } from "../Components/EditorToolbar";
import "react-quill/dist/quill.snow.css";

function CreateBlog() {  
  const userId = useSelector((state)=> state.auth.id)
  const author = useSelector((state)=> state.auth.name)
  const navigate = useNavigate()

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
  const blogSubmitApi = `${apiBaseUrl}/api/blog`


  const handleBlogSubmit = async (values, actions) => {
    console.log(values);
    const blogData = {userId, author, ...values }
    const res = await fetch(blogSubmitApi, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(blogData),
    })
    if (res.ok) {
      actions.setSubmitting(false);
      console.log("Blog uploaded sucessful");
      navigate("/")
    } else {
      console.log("wrong credentials");
    }
    setTimeout(() => {
      alert(JSON.stringify(blogData))
    }, 1000);
  }

  return (
    <div>
      <Navbar />
      <div className="px-[calc((100vw-1024px)/2)] mx-10 my-16">
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
                    style={{height: 400 }}
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
