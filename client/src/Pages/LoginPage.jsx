import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../features/auth/authSlice";
import { closeSlide } from "../features/info/infoSlice";
import Dropzone from "../Components/Dropzone";
import Navbar from "../Components/Navbar";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(20, "Too Long!")
    .required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  bio: Yup.string()
    .min(3, "Bio is too Short! It should be at least 3 in characters.")
    .max(100, "Too Long! Bio have to within 100 characters."),
  password: Yup.string().min(6, "Too Short!").required("Password required"),
});

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string().min(6, "Too Short!").required("Password required"),
});

function LoginPage() {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [avatarImg, setAvatarImg] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginPageInitialValues = { email: "", password: "" };
  const SignupPageInitialValues = {
    name: "",
    email: "",
    bio: "",
    password: "",
  };

  const handleDropzoneValue = (value) => {
    setAvatarImg(value);
  };

  const handleSubmit = async (values, actions) => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const signupApi = `${apiBaseUrl}/api/auth/signup`;
    const loginApi = `${apiBaseUrl}/api/auth/login`;

    if (isLoginPage) {
      const res = await fetch(loginApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        dispatch(setAuth(data));
        actions.setSubmitting(false);
        dispatch(closeSlide());
        navigate("/");
      } else {
        console.log("wrong credentials");
      }
    } else {
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
        dispatch(closeSlide());
        navigate("/");
      } else {
        console.log("wrong credentials");
      }
    }
  };

  return (
    <>
      <Navbar />
      <Formik
        initialValues={
          isLoginPage ? loginPageInitialValues : SignupPageInitialValues
        }
        validationSchema={isLoginPage ? LoginSchema : SignupSchema}
        onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form
            className={`${
              isLoginPage ? "mt-24" : "mt-8"
            } flex flex-col items-center`}>
            {isLoginPage ? undefined : (
              <Dropzone isAvatar={true} onDropzoneValue={handleDropzoneValue} />
            )}
            {isLoginPage ? undefined : (
              <>
                <Field
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="inputField"
                />
                <div className="h-6 font-mono">
                  {touched.name && errors.name && (
                    <p className="text-red-500">{errors.name}</p>
                  )}
                </div>
              </>
            )}
            <>
              <Field
                type="email"
                name="email"
                placeholder="email"
                className="inputField"
              />
              <div className="h-6 font-mono">
                {touched.email && errors.email && (
                  <p className="text-red-500">{errors.email}</p>
                )}
              </div>
            </>
            {isLoginPage ? undefined : (
              <>
                <Field
                  type="text"
                  as="textarea"
                  name="bio"
                  placeholder="Write about yourself..."
                  className="inputField h-[68px] py-2"
                />
                <div className="h-6 font-mono">
                  {touched.bio && errors.bio && (
                    <p className="text-red-500">{errors.bio}</p>
                  )}
                </div>
              </>
            )}
            <>
              <Field
                type="password"
                name="password"
                placeholder="password"
                className="inputField"
              />
              <div className="h-6 font-mono">
                {touched.password && errors.password && (
                  <p className="text-red-500">{errors.password}</p>
                )}
              </div>
            </>
            <button
              type="submit"
              className="btn m-8 bg-zinc-950 dark:bg-stone-50 text-white dark:text-stone-950 hover:bg-zinc-800 hover:dark:bg-stone-200 w-10/12 max-w-xl h-10">
              {isLoginPage ? "Login" : "Signup"}
            </button>
          </Form>
        )}
      </Formik>
      <button
        type="button"
        onClick={() => setIsLoginPage(!isLoginPage)}
        className="m-10 w-2/3 max-w-xl h-8 bg-transparent text-black  dark:text-stone-50 hover:text-zinc-600 hover:dark:text-stone-400 font-Roboto">
        {isLoginPage
          ? "Don’t have an account? Join"
          : "Already have an account? Login"}
      </button>
    </>
  );
}

export default LoginPage;
