import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import axios from "axios";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function ImageUploader({ setImageUrl }) {
  const { TOKEN } = useStateContext();
  const [images, setImages] = React.useState([]);

  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    axios({
      method: "post",
      headers: {
        Authorization: `${TOKEN}`,
        "Content-Type": "multipart/form-data",
        accept: "text/plain",
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamFile/add`,
      data: imageList,
    })
      .then((res) => {
        if (res.data.errorCode !== 500) {
          console.log(res.data.path);
          setImageUrl(res.data.path);
          setImages(imageList);
        } else {
          alert(res.data.resultMessage);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="border-b-[2px] border-[#50a3a2]">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={["jpg"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper w-[280px] md:w-[500px] p-2 flex justify-between">
            <button
              style={isDragging ? { color: "red" } : null}
              onClick={(r) => {
                r.preventDefault();
                onImageUpload();
              }}
              {...dragProps}
              className=""
            >
              {images.length == 0 && (
                <img
                  className="w-[100px]"
                  src="https://user-images.githubusercontent.com/6290720/91559755-9d6e8c00-e973-11ea-9bde-4b60c89f441a.png"
                  alt=""
                />
              )}
            </button>
            &nbsp;
            {imageList.map((image, index) => (
              <div key={index} className="image-item relative rounded-none">
                <img
                  src={image.data_url}
                  alt=""
                  className="w-[300px] md:w-[600px] h-[200px]"
                />
                <div className="image-item__btn-wrapper flex">
                  <button
                    className="cus-btn2"
                    onClick={() => onImageUpdate(index)}
                  >
                    <i className="bi bi-alexa"></i>
                  </button>
                  <button
                    className="cus-btn2 bg-red-400 hover:bg-red-500"
                    onClick={() => onImageRemove(index)}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
