import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dropzone from 'react-dropzone'
import { setAuth } from "../features/auth/authSlice";

function Login() {
  const [isLoginPage, setIsLoginPage] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginPageInitialValues = { email: "", password: "" }
  const SignupPageInitialValues = { name: "", email: "", avatarImg: "", password: "" }

  const handleSubmit = async (values, actions) => {
    console.log(values);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const signupApi = `${apiBaseUrl}/api/auth/signup`;
    const loginApi = `${apiBaseUrl}/api/auth/login`;

    if (isLoginPage) {
      const res = await fetch(loginApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      console.log(res);
      if (res.ok) {
        const data = await res.json();
        dispatch(setAuth(data));
        actions.setSubmitting(false);
        navigate("/");
      } else {
        console.log("wrong credentials");
      }
    } else {
      // This allows us to send form info with image
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value])
      }
      formData.append("avatarImgName", values.avatarImg.name)
      console.log(formData);

      const res = await fetch(signupApi, {
        method: "POST",
        body: formData,
      });
      console.log(res);
      if (res.ok) {
        const data = await res.json();
        dispatch(setAuth(data));
        actions.setSubmitting(false);
        navigate("/");
      } else {
        console.log("wrong credentials");
      }
    }

    // const res = await fetch(isLoginPage ? loginApi : signupApi, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(values),
    // });
    // console.log(res);
    // if (res.ok) {
    //   const data = await res.json();
    //   dispatch(setAuth(data));
    //   actions.setSubmitting(false);
    //   navigate("/");
    // } else {
    //   console.log("wrong credentials");
    // }
  };

  return (
    <>
      <h1 className="text-white bg-black font-serif text-4xl p-4">
        Insight Social
      </h1>
      <Formik
        initialValues={isLoginPage?loginPageInitialValues:SignupPageInitialValues}
        onSubmit={handleSubmit}>
        {(props) => (
          <Form className="mt-28 flex flex-col items-center gap-6">
            {isLoginPage ? undefined : (
              <Field
                type="text"
                name="name"
                placeholder="Full Name"
                className="inputField"
              />
            )}
            {isLoginPage ? undefined : (
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) =>
                  // eslint-disable-next-line react/prop-types
                  props.setFieldValue("avatarImg", acceptedFiles[0])
                }>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>
                        Drag & drop some files here, or click to select files
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
            )}

            <Field
              type="email"
              name="email"
              placeholder="email"
              className="inputField"
            />
            <Field
              type="password"
              name="password"
              placeholder="password"
              className="inputField"
            />
            <button type="submit" className="btn w-10/12 max-w-xl h-10">
              {isLoginPage ? "Login" : "Signup"}
            </button>
          </Form>
        )}
      </Formik>
      <button
        type="button"
        onClick={() => setIsLoginPage(!isLoginPage)}
        className="mt-16 w-2/3 max-w-xl h-8 bg-transparent text-black hover:text-zinc-600 font-Roboto">
        {isLoginPage
          ? "Don’t have an account? Join"
          : "Already have an account? Login"}
      </button>
    </>
  );
}

export default Login;
