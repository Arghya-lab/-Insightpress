import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setAuth } from "../features/auth/authSlice";

const baseUrl = import.meta.env.VITE_API_BASE_URL
const signupUrl = `${baseUrl}api/auth/signup/`
const loginUrl = `${baseUrl}api/auth/login/`

function Login() {
  const [isLoginPage, setIsLoginPage] = useState(true)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleSubmit = async(values, actions) => {
    const res = await fetch(isLoginPage?loginUrl:signupUrl, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(values),
    })
    if (res.ok) {
      const data = await res.json();
      const { email } = values
      const userData = {email, ...data}
      dispatch(setAuth(userData))
      actions.setSubmitting(false);
      navigate("/")
    } else {
      console.log("wrong credentials");
    }
  };

  return (
    <>
      <h1 className="px-[calc((100vw-1024px)/2)] text-white bg-black font-serif text-4xl p-4">
        Insight Social
      </h1>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={handleSubmit}>
        <Form className="mt-28 flex flex-col items-center gap-6">
          {isLoginPage?undefined:<Field type="text" name="name" placeholder="Full Name" className="inputField" />}
          
          <Field type="email" name="email" placeholder="email" className="inputField" />
          <Field type="password" name="password" placeholder="password" className="inputField" />
          <button type="submit" className="btn w-2/3 max-w-xl h-10">{isLoginPage?"Login":"Signup"}</button>
        </Form>
      </Formik>
      <button type="button" onClick={()=>setIsLoginPage(!isLoginPage)} className="mt-16 w-2/3 max-w-xl h-8 bg-transparent text-black hover:text-zinc-600 font-Roboto">{isLoginPage?"Don’t have an account? Join":"Already have an account? Login"}</button>
    </>
  );
}

export default Login;
