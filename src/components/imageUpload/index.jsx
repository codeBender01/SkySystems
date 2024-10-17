import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Upload, Modal, message } from "antd";

import { IoIosCamera } from "react-icons/io";

import "../../antd.css";

export default function ImageUpload({
  openModal,
  setOpenModal,
  uploadMethod,
  itemId,
  deleteMethod,
  getMethod,
  pageUpdate,
  setPageUpdate,
  colorId,
}) {
  const [fileList, setFileList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const displayMessage = (res) => {
    if (res.error && res.error.message === "Rejected") {
      messageApi.open({
        type: "error",
        content: "Error",
      });
      return;
    }
    messageApi.open({
      type: "success",
      content: "Success!",
    });
  };

  useEffect(() => {
    if (itemId !== "") {
      dispatch(getMethod(itemId)).then((res) => {
        if (res.payload.category) {
          const fList =
            res.payload &&
            res.payload.category.medias.map((img) => {
              return {
                id: img.id,
                uid: img.id,
                name: img.originalName,
                status: "done",
                url: img.filePath,
              };
            });
          setFileList(fList);
        } else if (res.payload.collection) {
          const fList =
            res.payload &&
            res.payload.collection.medias.map((img) => {
              return {
                id: img.id,
                uid: img.id,
                name: img.originalName,
                status: "done",
                url: img.filePath,
              };
            });
          setFileList(fList);
        }
      });
    }
  }, [pageUpdate, itemId]);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
      className="text-blackMain flex flex-col items-center mx-auto"
    >
      <IoIosCamera size={26} />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Add Photo
      </div>
    </button>
  );

  return (
    <Modal open={openModal} onCancel={() => setOpenModal(false)} footer={null}>
      {contextHolder}
      <Upload
        fileList={fileList}
        listType="picture-card"
        onChange={handleChange}
        customRequest={(options) => {
          const { onSuccess } = options;
          const formData = new FormData();

          formData.append("file", fileList[fileList.length - 1].originFileObj);
          dispatch(uploadMethod({ id: itemId, image: formData }))
            .unwrap()
            .then((res) => {
              onSuccess("done");
              displayMessage(res);
              setOpenModal(false);
              setTimeout(() => {
                setPageUpdate(false);
              }, 2000);
            });
        }}
        onRemove={(file) => {
          dispatch(deleteMethod(file.id)).then((res) => {
            displayMessage(res);
            setOpenModal(false);
            setTimeout(() => {
              setPageUpdate(false);
            }, 2000);
          });
        }}
      >
        {fileList.length === 0 ? uploadButton : null}
      </Upload>
    </Modal>
  );
}
