import PropType from "prop-types";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../features/info/infoSlice";
import { RxCross2 } from "react-icons/rx";

function EditBioModal({ authorData }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const isModalOpen = useSelector((state) => state.info.isModalOpen);
  const serverBaseUrl = import.meta.env.VITE_Server_BASE_URL;

  const handleSubmit = async (values, actions) => {
    console.log(values);
    console.log("submitted", values);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    const res = await fetch(`${apiBaseUrl}/api/author/editBio`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "auth-token": token },
      body: JSON.stringify(values),
    });
    console.log(res);
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      console.log(data);
      actions.setSubmitting(false);
      dispatch(closeModal());
    } else {
      console.log("wrong credentials");
    }
  };

  return (
    <div
      className={`fixed ${
        isModalOpen ? "block" : "hidden"
      } inset-0 bg-zinc-800 bg-opacity-80 overflow-y-auto h-full w-full`}>
      <div className="relative top-36 mx-auto p-5 border dark:border-zinc-700 w-[525px] max-w-[94%] shadow-lg rounded-md bg-white dark:bg-stone-950">
        <div className="mt-3 text-center">
          <div className="flex justify-between items-center ml-6">
            <div className="flex justify-start items-center space-x-4">
              <img
                className="w-12 aspect-square rounded-full object-cover"
                src={`${serverBaseUrl}/assets/avatar/${authorData?.avatarImgName}`}
                alt="Avatar"
              />
              <p className="text-lg font-poppins text-zinc-800 dark:text-stone-200">
                {authorData?.name}
              </p>
            </div>
            <button
              className="px-4 h-12 rounded-md dark:text-stone-50 hover:bg-zinc-300 hover:dark:bg-stone-700"
              onClick={() => dispatch(closeModal())}>
              <RxCross2 />
            </button>
          </div>
          <p className="mt-4 font-Roboto text-zinc-700 dark:text-stone-300">
            Put your new Bio here
          </p>
          <Formik initialValues={{ bio: "" }} onSubmit={handleSubmit}>
            <Form className="my-6">
              {/* //  fetch prev bio and put as initial values */}
              <Field
                type="text"
                as="textarea"
                name="bio"
                placeholder="Write about yourself..."
                className="inputField h-[68px] py-2"
              />
              <button
                type="submit"
                className="btn bg-zinc-950 dark:bg-stone-100 text-white dark:text-stone-950 hover:bg-zinc-800 hover:dark:bg-stone-200 w-10/12 max-w-xl h-10">
                Edit Bio
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

EditBioModal.propTypes = {
  authorData: PropType.object.isRequired,
};

export default EditBioModal;
