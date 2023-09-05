import React from "react";
import { Formik, Form, Field } from "formik";

function Login() {
  const handleSubmit = (values, actions) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    }, 1000);
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
          <Field type="text" name="name" placeholder="Full Name" className="inputField" />
          <Field type="email" name="email" placeholder="email" className="inputField" />
          <Field type="password" name="password" placeholder="password" className="inputField" />
          <button type="submit" className="btn w-2/3 max-w-xl h-10">Signup</button>
        </Form>
      </Formik>
      <button type="button" className="mt-8 w-2/3 max-w-xl h-20 bg-transparent text-black hover:text-zinc-600 font-Roboto">Don’t have an account? Join   Already have an account? Login</button>
    </>
  );
}

export default Login;
