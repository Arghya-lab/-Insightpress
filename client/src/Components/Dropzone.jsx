import { useEffect, useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";

// dropzone style //
const baseStyle = {
  display: "flex",
  alignItems: "center",
  justifycontent: "center",
  margin: "auto",
  padding: "8px",
  borderWidth: 2,
  borderRadius: 6,
  borderColor: "rgb(113 113 122)",
  borderStyle: "dashed",
  color: "#A7A3B0",
  fontFamily: "Poppins, ui-serif, Georgia, Cambria, Times, serif",
  transition: "border .24s ease-in-out",
  width: "12rem",
  height: "6rem",
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

// img preview style  //

const thumbsContainer = {
  width: "16rem",
};

const thumb = {
  // marginBottom: 8,
  // marginRight: 8,
  // width: 500,
  // height: 500,
};

const thumbInner = {
  // display: "flex",
  // minWidth: 0,
  // overflow: "hidden",
};

const img = {
  // display: "block",
  // height: "100%",
  // margin: "auto",
  display: "block",
  margin: "auto",
  maxWidth: "10rem",
  aspectRatio: "1 / 1",
  objectFit: "cover",
  borderRadius: "50%",
  borderWidth: "5px",
};

function Dropzone(props) {
  const [file, setFile] = useState([]);
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      maxFile: 1,
      accept: {
        "image/jpeg": [".jpg", ".jpeg", ".png"],
      },
      onDrop: (acceptedFile) => {
        setFile(
          acceptedFile.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

  const thumbs = file.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

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
    return () => file.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section
      className="container"
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "83%",
        maxWidth: "36rem",
        height: "10rem",
      }}>
      <div {...getRootProps({ className: "dropzone", style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop or click to select.</p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
}

export default Dropzone;
