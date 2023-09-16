import PropType from "prop-types"

function AuthorInfoWidget({ authorData }) {
  const serverBaseUrl = import.meta.env.VITE_Server_BASE_URL;

  return (
    <div className="w-[425px] m-4 p-4 border-[2px] rounded-lg shadow-md">
      <img
        className="block m-auto w-36 object-cover aspect-square rounded-full"
        src={`${serverBaseUrl}/assets/avatar/${authorData?.avatarImgName}`}
      />
      <p className="my-6 font-poppins text-lg font-semibold text-purple-950">
        {authorData?.name}
      </p>
      <p className="font-Roboto mx-10 text-zinc-700">{authorData?.bio}</p>
      {/* add author followers, follow/unfollow button */}
    </div>
  )
}

AuthorInfoWidget.propTypes = {
  authorData: PropType.object.isRequired
}

export default AuthorInfoWidget