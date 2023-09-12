import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../features/auth/authSlice";
import Dropzone from "../Components/Dropzone";

function Login() {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [avatarImg, setAvatarImg] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginPageInitialValues = { email: "", password: "" };
  const SignupPageInitialValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleDropzoneValue = (value) => {
    setAvatarImg(value);
  };

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
      console.log(values);
      console.log(avatarImg);
      // This allows us to send form info with image
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      formData.append("avatarImg", avatarImg);
      formData.append("avatarImgName", avatarImg.name);

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
  };

  return (
    <>
      <h1 className="text-white bg-black font-serif text-4xl p-4">
        Insight Social
      </h1>
      <Formik
        initialValues={
          isLoginPage ? loginPageInitialValues : SignupPageInitialValues
        }
        onSubmit={handleSubmit}>
        <Form
          className={`${
            isLoginPage ? "mt-24" : "mt-12"
          } flex flex-col items-center gap-6`}>
          {isLoginPage ? undefined : (
            <Dropzone isAvater={true} onDropzoneValue={handleDropzoneValue} />
          )}
          {isLoginPage ? undefined : (
            <Field
              type="text"
              name="name"
              placeholder="Full Name"
              className="inputField"
            />
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
          <button
            type="submit"
            className="btn bg-zinc-950 text-white hover:bg-zinc-800  w-10/12 max-w-xl h-10">
            {isLoginPage ? "Login" : "Signup"}
          </button>
        </Form>
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
