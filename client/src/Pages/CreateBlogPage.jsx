import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "react-quill/dist/quill.snow.css";
import Navbar from "../Components/Navbar";
import Dropzone from "../Components/Dropzone";
import { closeSlide } from "../features/info/infoSlice";
import EditorToolbar, { modules, formats } from "../Components/EditorToolbar";

const BlogSchema = Yup.object().shape({
  title: Yup.string()
    .min(15, "Too Short! It should be at least 15 in characters.")
    .max(70, "Too Long! Bio have to within 70 characters.")
    .required("Title is required"),
  summary: Yup.string()
    .min(40, "Summary is too Short! It should be at least 40 in characters.")
    .max(100, "Too Long! Bio have to within 100 characters.")
    .required("Summary is required"),
  content: Yup.string()
    .min(1000, "Too Short!")
    .max(30000, "Too Long!")
    .required("Content is required"),
});

function CreateBlogPage() {
  const [isEditPage, setIsEditPage] = useState(false);
  const [featuredImg, setFeaturedImg] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  //  initial values for create blog form
  let title = "";
  let summary = "";
  let content = "";

  // location.state contains =>  isEditPurpose, blogId, title, summary, content
  if (location.state) {
    title = location.state.title;
    summary = location.state.summary;
    content = location.state.content;
  }

  const handleDropzoneValue = (value) => {
    setFeaturedImg(value);
    console.log(value);
  };

  const handleBlogSubmit = async (values, actions) => {
    const formData = new FormData();
    for (const value in values) {
      formData.append(value, values[value]);
    }

    if (!isEditPage) {
      if (featuredImg) {
        formData.append("featuredImg", featuredImg);
        formData.append("featuredImgName", featuredImg.name);
      }
      const res = await fetch(`${apiBaseUrl}/api/blog`, {
        method: "POST",
        headers: { "auth-token": token },
        body: formData,
      });
      if (res.ok) {
        actions.setSubmitting(false);
        console.log("Blog uploaded successful");
        dispatch(closeSlide());
        navigate("/");
      } else {
        console.log("wrong credentials");
      }
    } else {
      const res = await fetch(
        `${apiBaseUrl}/api/blog/${location.state.blogId}`,
        {
          method: "PUT",
          headers: { "auth-token": token },
          body: formData,
        }
      );
      if (res.ok) {
        actions.setSubmitting(false);
        console.log("Blog Edited successful");
        dispatch(closeSlide());
        navigate("/");
      } else {
        console.log("wrong credentials");
        console.log(res);
      }
    }
  };

  useEffect(() => {
    setIsEditPage(location.state ? location.state.isEditPurpose : false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navbar />
      <div className="px-[calc((100vw-1280px)/2)] mx-4 my-16">
        <Formik
          initialValues={{ title, summary, content }}
          validationSchema={BlogSchema}
          onSubmit={handleBlogSubmit}>
          {({ errors, touched }) => (
            <Form className="grid">
              <Field
                type="text"
                name="title"
                placeholder="Write title here..."
                className="w-full px-4 h-10 border-2 border-zinc-400 dark:border-stone-600 text-zinc-700 dark:text-stone-300 text-base dark:bg-stone-950"
                style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              />
              <div className="h-6 font-mono text-left ml-4 mb-4">
                {touched.title && errors.title && (
                  <p className="text-red-500">{errors.title}</p>
                )}
              </div>
              <Field
                type="text"
                name="summary"
                placeholder="Write content here..."
                className="w-full px-4 h-10 border-2 border-zinc-400 dark:border-stone-600 text-zinc-700 dark:text-stone-300 text-base dark:bg-stone-950"
                style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              />
              <div className="h-6 font-mono text-left ml-4 mb-4">
                {touched.summary && errors.summary && (
                  <p className="text-red-500">{errors.summary}</p>
                )}
              </div>
              {isEditPage ? undefined : (
                <Dropzone
                  isAvatar={false}
                  onDropzoneValue={handleDropzoneValue}
                />
              )}
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
                      style={{
                        overflow: "visible",
                        backgroundColor: "whitesmoke",
                      }}
                    />
                  </div>
                )}
              </Field>
              <div className="h-6 font-mono  text-left ml-4 mb-4">
                {touched.content && errors.content && (
                  <p className="text-red-500">{errors.content}</p>
                )}
              </div>
              <button
                type="submit"
                className="btn my-16 bg-zinc-950 dark:bg-stone-100 text-white dark:text-stone-950 hover:bg-zinc-800 hover:dark:bg-stone-300">
                {isEditPage ? "Confirm Edit" : "Create Blog"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default CreateBlogPage;
