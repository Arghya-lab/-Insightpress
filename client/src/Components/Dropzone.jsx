import { useEffect, useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";

// dropzone style //
const baseStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "6px",
  borderWidth: 2,
  borderRadius: 6,
  borderColor: "rgb(113 113 122)",
  borderStyle: "dashed",
  color: "#A7A3B0",
  fontFamily: "Poppins, ui-serif, Georgia, Cambria, Times, serif",
  cursor: "pointer",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function Dropzone(props) {
  // eslint-disable-next-line react/prop-types
  const { onDropzoneValue, isAvatar } = props;
  const [file, setFile] = useState([]);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      maxFile: 1,
      accept: {
        "image/jpeg": [".jpg", ".jpeg", ".png"],
      },
      onDrop: (acceptedFile) => {
        const newFile = Object.assign(acceptedFile[0], {
          preview: URL.createObjectURL(acceptedFile[0]),
        });
        setFile(newFile);
        onDropzoneValue(newFile);
      },
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    if (file) {
      return () => URL.revokeObjectURL(file.preview);
    }
  }, [file]);

  return (
    <div
      className={`container flex flex-col items-center space-y-4 ${
        isAvatar ? "w-10/12 max-w-xl" : "mx-auto my-8 w-full max-w-4xl"
      }`}>
      {file && (
        <div
          className={`${isAvatar ? "h-36 aspect-square" : ""}`}
          key={file.name}>
          <img
            src={file.preview}
            className={`block h-full object-cover ${
              isAvatar ? "aspect-square rounded-full" : ""
            }`}
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        </div>
      )}
      <div {...getRootProps({ className: "dropzone", style })}>
        <input {...getInputProps()} />
        <p>Drag & drop or click to select.</p>
      </div>
    </div>
  );
}

export default Dropzone;
