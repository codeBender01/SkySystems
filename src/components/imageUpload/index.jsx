import { useState, useEffect } from "react";

import { Upload, Modal, message } from "antd";

import { IoIosCamera } from "react-icons/io";

import "../../antd.css";

export default function ImageUpload({
  openModal,
  setOpenModal,
  uploadMethod,
  itemId,
  deleteMethod,
  currentItem,
}) {
  const [fileList, setFileList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

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
    console.log(currentItem);
    if (currentItem.medias) {
      const fList = currentItem.medias.map((img) => {
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
  }, [currentItem]);

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
        customRequest={async (options) => {
          const { onSuccess } = options;
          const formData = new FormData();

          formData.append("image", fileList[fileList.length - 1].originFileObj);
          const res = await uploadMethod({
            id: itemId,
            image: formData,
          });

          setOpenModal(false);
        }}
        onRemove={async (file) => {
          await deleteMethod(file.id);
          setOpenModal(false);
        }}
      >
        {fileList.length === 0 ? uploadButton : null}
      </Upload>
    </Modal>
  );
}
