import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  useGetAllCollectionsAdminQuery,
  useCreateCollectionMutation,
  useDeleteCollectionMutation,
  useAddCollectionOptionMutation,
  useEditCollectionOptionMutation,
  useDeleteCollectionOptionMutation,
  useUploadCollectionImageMutation,
  useDeleteCollectionImageMutation,
} from "../../store/services/collectionsApi";

import Panel from "../../components/adminPanel";
import ImageUpload from "../../components/imageUpload";

import { Button, Input, Modal, Form, message, Popconfirm } from "antd";

import { LuSearch } from "react-icons/lu";
import { LuArrowDownUp } from "react-icons/lu";
import { FaEdit, FaQuestion } from "react-icons/fa";
import { MdDelete, MdImageNotSupported } from "react-icons/md";
import { BsImageFill } from "react-icons/bs";
import { IoAddSharp } from "react-icons/io5";

const textClassname = "text-sm font-main text-textGray";

export default function AdminCollections() {
  const [createCollection] = useCreateCollectionMutation();
  const [deleteCollection] = useDeleteCollectionMutation();
  const [addCollectionOption] = useAddCollectionOptionMutation();
  const [editCollectionOption] = useEditCollectionOptionMutation();
  const [deleteCollectionOption] = useDeleteCollectionOptionMutation();
  const [uploadColImage] = useUploadCollectionImageMutation();
  const [deleteColImage] = useDeleteCollectionImageMutation();
  const { data: collectionsAdmin, isLoading } =
    useGetAllCollectionsAdminQuery();
  const [collections, setCollections] = useState([]);
  const [collectionsCount, setCollectionsCount] = useState();
  const [isAddColModalOpen, setIsAddColModalOpen] = useState(false);
  const [isEditColModalOpen, setIsEditColModalOpen] = useState(false);
  const [pageUpdate, setPageUpdate] = useState(false);
  const [isAddImageModalOpen, setIsAddImageModalOpen] = useState(false);
  const [activeColId, setActiveColId] = useState("");
  const [newCollection, setNewCollection] = useState({
    title: "",
  });
  const [currentCollection, setCurrentCollection] = useState({});
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const displayMessage = (res) => {
    if (res.data) {
      messageApi.success("Success!");
    } else if (res.error) {
      messageApi.error("Error!");
    }
  };

  useEffect(() => {
    if (collectionsAdmin) {
      setCollections(collectionsAdmin.collections);
      setCollectionsCount(collectionsAdmin.totalCount);
    }
  }, [collectionsAdmin, deleteColImage]);

  const columns = [
    {
      title: <LuArrowDownUp size={18} />,
      dataIndex: "img",
      key: "img",
      render: (val) => {
        if (val) {
          return <img src={val} alt="product" className="w-[48px] h-[48px]" />;
        } else {
          return (
            <div className="bg-paleGray text-blackMain text-lg rounded-lg h-[80px] w-[80px] flex items-center justify-center">
              <MdImageNotSupported />
            </div>
          );
        }
      },
    },
    {
      title: "Title EN",
      dataIndex: "titleEn",
      key: "titleEn",
      render: (val) => {
        return (
          <div className={`flex flex-col items-center ${textClassname}`}>
            {val}
          </div>
        );
      },
    },
    {
      title: "Title RU",
      dataIndex: "titleRu",
      key: "titleRu",
      render: (val) => {
        return (
          <div className={`flex flex-col items-center ${textClassname}`}>
            {val}
          </div>
        );
      },
    },
    {
      title: "Title TR",
      dataIndex: "titleTr",
      key: "titleTr",
      render: (val) => {
        return (
          <div className={`flex flex-col items-center ${textClassname}`}>
            {val}
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (val) => {
        return (
          <div className="flex items-center justify-center gap-2 cursor-pointer">
            <div
              onClick={() => {
                setIsAddImageModalOpen(true);
                setActiveColId(val.id);
                setCurrentCollection(val);
              }}
              className="text-lg text-amber cursor-pointer hover:opacity-85 duration-100"
            >
              <BsImageFill />
            </div>
            <div
              onClick={() => {
                setCurrentCollection(val);
                setIsEditColModalOpen(true);
              }}
              className="text-lg text-editBlue cursor-pointer hover:opacity-85 duration-100"
            >
              <FaEdit />
            </div>

            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              icon={<FaQuestion style={{ color: "red" }} />}
              onConfirm={async () => {
                const res = await deleteCollection(val.id);
                displayMessage(res);
              }}
            >
              <div className="text-lg text-deleteRed cursor-pointer hover:opacity-85 duration-100">
                <MdDelete />
              </div>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const rows = collections
    ? collections.map((col) => {
        let en = {};
        let ru = {};
        let tr = {};
        for (let opt of col.options) {
          if (opt.language === "en") {
            en.title = opt.title;
            en.id = opt.id;
          } else if (opt.language === "ru") {
            ru.title = opt.title;
            ru.id = opt.id;
          } else {
            tr.title = opt.title;
            tr.id = opt.id;
          }
        }
        return {
          key: col.id,
          id: col.id,
          img: col.medias.length > 0 ? col.medias[0].filePath : null,
          titleEn: en.title,
          titleRu: ru.title,
          titleTr: tr.title,
          optionEnId: en.id,
          optionRuId: ru.id,
          optionTrId: tr.id,
          medias: col.medias ? col.medias : [],
        };
      })
    : [];

  const handleAddCollection = async () => {
    const res = await createCollection(newCollection);
    setIsAddColModalOpen(false);
    displayMessage(res);
  };

  const handleAddCollectionOptions = async (option) => {
    const res = await addCollectionOption({
      id: currentCollection.id,
      obj: option,
    });
    displayMessage(res);
    setIsEditColModalOpen(false);
  };

  const handleEditCollectionOption = async (option, id) => {
    const res = await editCollectionOption({
      id,
      obj: option,
    });
    displayMessage(res);
    setIsEditColModalOpen(false);
  };

  const handleDeleteCollectionOption = async (id) => {
    const res = await deleteCollectionOption(id);
    displayMessage(res);
    setIsEditColModalOpen(false);
  };

  return (
    <div className="w-[95%] mx-auto mt-4">
      {contextHolder}
      <Panel isLoading={isLoading} columns={columns} rows={rows}>
        <div className="px-4 py-6 flex justify-between items-center">
          <div className="font-main text-blackMain text-md">
            Collections ({collectionsCount})
          </div>
          <div className="w-[60%] flex justify-end gap-2 items-center">
            <Button
              onClick={() => setIsAddColModalOpen(true)}
              className="bg-blackMain text-white font-main text-sm py-5"
            >
              Add collection
            </Button>
            <Input
              prefix={<LuSearch size={18} />}
              className="w-[60%] py-2 font-main text-sm"
              placeholder="Search collections"
            />
          </div>
        </div>
      </Panel>

      <Modal
        title="Add Category"
        open={isAddColModalOpen}
        footer={null}
        onCancel={() => {
          setIsAddColModalOpen(false);
        }}
      >
        <Form
          className="flex flex-wrap flex-col items-center gap-2 mt-4 w-[100%]"
          layout="vertical"
          wrapperCol={{
            span: 32,
          }}
          labelWrap={false}
          onFinish={handleAddCollection}
          form={form}
        >
          <Form.Item
            name="title"
            className="w-[100%]"
            label={
              <label className="font-main text-sm text-blueish p-0">
                Title (EN)
              </label>
            }
            required
          >
            <Input
              className="border-b1 border-greenBlue"
              onChange={(e) => {
                setNewCollection({
                  ...newCollection,
                  title: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item className="w-[60%]">
            <Button
              htmlType="submit"
              className="bg-blackMain text-white text-md w-[100%] py-4"
            >
              Add Collection
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit Category"
        open={isEditColModalOpen}
        footer={null}
        onCancel={() => {
          setIsEditColModalOpen(false);
        }}
      >
        <Form
          className="flex flex-wrap flex-col items-center gap-2 mt-4 w-[100%]"
          layout="vertical"
          wrapperCol={{
            span: 32,
          }}
          labelWrap={false}
          fields={[
            {
              name: ["titleEn"],
              value: currentCollection.titleEn,
            },
            {
              name: ["titleRu"],
              value: currentCollection.titleRu,
            },
            {
              name: ["titleTr"],
              value: currentCollection.titleTr,
            },
          ]}
        >
          <div className="w-[100%]">
            <Form.Item
              name="titleEn"
              className="w-[100%] mb-2"
              label={
                <label className="font-main text-sm text-blueish p-0">
                  Title EN
                </label>
              }
              required
            >
              <Input
                className="border-b1 border-greenBlue"
                onChange={(e) => {
                  setCurrentCollection({
                    ...currentCollection,
                    titleEn: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <div className="flex gap-2 items-center">
              <Button
                onClick={() =>
                  handleAddCollection({
                    title: currentCollection.titleEn,
                    language: "en",
                  })
                }
                className="bg-accepted text-white text-sm"
              >
                <IoAddSharp />
                Add(EN)
              </Button>
              <Button
                onClick={() =>
                  handleEditCollectionOption(
                    {
                      title: currentCollection.titleEn,
                    },
                    currentCollection.optionEnId
                  )
                }
                className="bg-btnBlue text-white text-sm"
              >
                <FaEdit />
                Edit(EN)
              </Button>
            </div>
          </div>
          <div className="w-[100%]">
            <Form.Item
              name="titleRu"
              className="w-[100%] mb-2"
              label={
                <label className="font-main text-sm text-blueish p-0">
                  Title Ru
                </label>
              }
              required
            >
              <Input
                className="border-b1 border-greenBlue"
                onChange={(e) => {
                  setCurrentCollection({
                    ...currentCollection,
                    titleRu: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <div className="flex gap-2 item-center">
              <Button
                onClick={() =>
                  handleAddCollectionOptions({
                    title: currentCollection.titleRu,
                    language: "ru",
                  })
                }
                className="bg-accepted text-white text-sm"
              >
                <IoAddSharp />
                Add(RU)
              </Button>
              <Button
                onClick={() =>
                  handleEditCollectionOption(
                    {
                      title: currentCollection.titleRu,
                    },
                    currentCollection.optionRuId
                  )
                }
                className="bg-btnBlue text-white text-sm"
              >
                <FaEdit />
                Edit(RU)
              </Button>
              <Button
                onClick={() =>
                  handleDeleteCollectionOption(currentCollection.optionRuId)
                }
                className="bg-deleteRed text-white text-sm"
              >
                <MdDelete />
                Delete(RU)
              </Button>
            </div>
          </div>

          <div className="w-[100%]">
            <Form.Item
              name="titleTr"
              className="w-[100%] mb-2"
              label={
                <label className="font-main text-sm text-blueish p-0">
                  Title Tr
                </label>
              }
              required
            >
              <Input
                className="border-b1 border-greenBlue"
                onChange={(e) => {
                  setCurrentCollection({
                    ...currentCollection,
                    titleTr: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <div className="flex gap-2 item-center">
              <Button
                onClick={() =>
                  handleAddCollectionOptions({
                    title: currentCollection.titleTr,
                    language: "tr",
                  })
                }
                className="bg-accepted text-white text-sm"
              >
                <IoAddSharp />
                Add(TR)
              </Button>
              <Button
                onClick={() =>
                  handleEditCollectionOption(
                    {
                      title: currentCollection.titleTr,
                    },
                    currentCollection.optionTrId
                  )
                }
                className="bg-btnBlue text-white text-sm"
              >
                <FaEdit />
                Edit(TR)
              </Button>
              <Button
                onClick={() =>
                  handleDeleteCollectionOption(currentCollection.optionTrId)
                }
                className="bg-deleteRed text-white text-sm"
              >
                <MdDelete />
                Delete(TR)
              </Button>
            </div>
          </div>
        </Form>
      </Modal>

      <ImageUpload
        openModal={isAddImageModalOpen}
        setOpenModal={setIsAddImageModalOpen}
        itemId={activeColId}
        uploadMethod={uploadColImage}
        deleteMethod={deleteColImage}
        currentItem={currentCollection}
      />
    </div>
  );
}
