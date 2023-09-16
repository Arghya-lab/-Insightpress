import PropType from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../features/info/infoSlice";

function AuthorInfoWidget({ authorData }) {
  //  fullAuthorData contains =>  _id, name, email, avatarImgName, bio, bookmarks, createdAt, updatedAt, __v
  const userId = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch()

  const serverBaseUrl = import.meta.env.VITE_Server_BASE_URL;
  const isOwnAuthorPage = authorData._id === userId;

  const handleFollow = () => {
    console.log("profile following");
    console.log(authorData, userId);
  };
  

  return (
    <div className="w-[94%] sm:w-[425px] m-4 p-4 border-[2px] rounded-lg shadow-md ">
      <img
        className="block m-auto w-36 object-cover aspect-square rounded-full"
        src={`${serverBaseUrl}/assets/avatar/${authorData?.avatarImgName}`}
      />
      <p className="my-6 font-poppins text-lg font-semibold text-purple-950">
        {authorData?.name}
      </p>
      <p className="font-Roboto mx-10 text-zinc-700">{authorData?.bio}</p>
      {token && isOwnAuthorPage ? (
        <button
          type="button"
          className="btn h-10 w-2/3 max-w-[252px] mx-auto mt-10 bg-zinc-200 text-zinc-900 hover:bg-zinc-300 flex items-center justify-around"
          onClick={()=>dispatch(openModal())}>
          Edit Bio
        </button>
      ) : token ? (
        <button
          type="button"
          className="btn h-10 w-2/3 max-w-[252px] mx-auto mt-10 bg-zinc-200 text-zinc-900 hover:bg-zinc-300 flex items-center justify-around"
          onClick={handleFollow}>
          Follow
          {/* {isFollowing ? "Unfollow" : "Follow"}
            {isFollowing ? <IoLogOutOutline /> : <IoLogInOutline />} */}
          {/* add author followers */}
        </button>
      ) : undefined}
    </div>
  );
}

AuthorInfoWidget.propTypes = {
  authorData: PropType.object.isRequired,
};

export default AuthorInfoWidget;
