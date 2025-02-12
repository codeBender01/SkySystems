import { useEffect, useState } from "react";

import Panel from "../../components/adminPanel";
import ImageUpload from "../../components/imageUpload";

import {
  useGetCategoriesAdminQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useAddCategoryOptionsMutation,
  useEditCategoryOptionsMutation,
  useDeleteCategoryOptionMutation,
  useUploadCategoryImageMutation,
  useDeleteCategoryImageMutation,
} from "../../store/services/categoriesApi";

import { Button, Input, Modal, Form, message, Popconfirm } from "antd";

import { LuSearch } from "react-icons/lu";
import { LuArrowDownUp } from "react-icons/lu";
import { MdImageNotSupported, MdDelete } from "react-icons/md";
import { FaEdit, FaQuestion } from "react-icons/fa";
import { BsImageFill } from "react-icons/bs";
import { IoAddSharp } from "react-icons/io5";

import "../../antd.css";

const textClassname = "text-sm font-main text-textGray";

export default function AdminCategories() {
  const [createCategory] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [addCategoryOption] = useAddCategoryOptionsMutation();
  const [editCategoryOption] = useEditCategoryOptionsMutation();
  const [deleteCategoryOption] = useDeleteCategoryOptionMutation();
  const [uploadCatImage] = useUploadCategoryImageMutation();
  const [deleteCatImage] = useDeleteCategoryImageMutation();
  const { data: categoriesAdmin, isLoading } = useGetCategoriesAdminQuery();
  const [categories, setCategories] = useState([]);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [isAddCatModalOpen, setIsAddCatModalOpen] = useState(false);
  const [isEditCatModalOpen, setIsEditCatModalOpen] = useState(false);
  const [isAddImageModalOpen, setIsAddImageModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    title: "",
  });
  const [currentCategory, setCurrentCategory] = useState({});
  const [activeCatId, setActiveCatId] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();

  useEffect(() => {
    if (categoriesAdmin) {
      setCategories(categoriesAdmin.categories);
      setCategoriesCount(categoriesAdmin.totalCount);
    }
  }, [categoriesAdmin, deleteCatImage]);

  const displayMessage = (res) => {
    if (res.data) {
      messageApi.success("Success!");
    } else if (res.error) {
      messageApi.error("Error!");
    }
  };

  const columns = [
    {
      title: <LuArrowDownUp size={18} />,
      dataIndex: "img",
      key: "img",
      width: 100,
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
                setActiveCatId(val.id);
                setCurrentCategory(val);
              }}
              className="text-lg text-amber cursor-pointer hover:opacity-85 duration-100"
            >
              <BsImageFill />
            </div>
            <div
              onClick={() => {
                setCurrentCategory(val);
                setIsEditCatModalOpen(true);
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
                const res = await deleteCategory(val.id).unwrap();
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

  const rows = categories
    ? categories.map((cat) => {
        let en = {};
        let ru = {};
        let tr = {};
        for (let opt of cat.options) {
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
          key: cat.id,
          id: cat.id,
          img: cat.medias.length > 0 ? cat.medias[0].filePath : null,
          titleEn: en.title,
          titleRu: ru.title,
          titleTr: tr.title,
          optionEnId: en.id,
          optionRuId: ru.id,
          optionTrId: tr.id,
          medias: cat.medias ? cat.medias : [],
        };
      })
    : [];

  const handleAddCategory = async () => {
    const res = await createCategory(newCategory);
    displayMessage(res);
    form.resetFields();
    setIsAddCatModalOpen(false);
  };

  const handleAddCategoryOptions = async (option) => {
    const res = await addCategoryOption({
      id: currentCategory.id,
      obj: option,
    });
    displayMessage(res);
    setIsEditCatModalOpen(false);
  };

  const handleEditCategoryOptions = async (option, id) => {
    const res = await editCategoryOption({
      id,
      obj: option,
    });
    displayMessage(res);
    setIsEditCatModalOpen(false);
  };

  const handleDeletecategoryOptions = async (id) => {
    const res = await deleteCategoryOption(id).unwrap();
    displayMessage(res);
    setIsEditCatModalOpen(false);
  };

  return (
    <div className="w-[95%] mx-auto mt-4" id="cats">
      {contextHolder}
      <Panel isLoading={isLoading} columns={columns} rows={rows}>
        <div className="px-4 py-6 flex justify-between items-center">
          <div className="font-main text-blackMain text-md">
            Categories ({categoriesCount})
          </div>
          <div className="w-[60%] flex justify-end gap-2 items-center">
            <Button
              onClick={() => setIsAddCatModalOpen(true)}
              className="bg-blackMain text-white font-main text-sm py-5"
            >
              Add category
            </Button>
            <Input
              prefix={<LuSearch size={18} />}
              className="w-[60%] py-2 font-main text-sm"
              placeholder="Search products"
            />
          </div>
        </div>
      </Panel>

      <Modal
        title="Add Category"
        open={isAddCatModalOpen}
        footer={null}
        onCancel={() => {
          setIsAddCatModalOpen(false);
        }}
      >
        <Form
          className="flex flex-wrap flex-col items-center gap-2 mt-4 w-[100%]"
          layout="vertical"
          wrapperCol={{
            span: 32,
          }}
          labelWrap={false}
          onFinish={handleAddCategory}
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
                setNewCategory({
                  ...newCategory,
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
              Add Category
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        titlvve="Edit Category"
        open={isEditCatModalOpen}
        footer={null}
        onCancel={() => {
          setIsEditCatModalOpen(false);
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
              value: currentCategory.titleEn,
            },
            {
              name: ["titleRu"],
              value: currentCategory.titleRu,
            },
            {
              name: ["titleTr"],
              value: currentCategory.titleTr,
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
                  setCurrentCategory({
                    ...currentCategory,
                    titleEn: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <div className="flex gap-2 items-center">
              <Button
                onClick={() =>
                  handleAddCategoryOptions({
                    title: currentCategory.titleEn,
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
                  handleEditCategoryOptions(
                    {
                      title: currentCategory.titleEn,
                    },
                    currentCategory.optionEnId
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
                  setCurrentCategory({
                    ...currentCategory,
                    titleRu: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <div className="flex gap-2 item-center">
              <Button
                onClick={() =>
                  handleAddCategoryOptions({
                    title: currentCategory.titleRu,
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
                  handleEditCategoryOptions(
                    {
                      title: currentCategory.titleRu,
                    },
                    currentCategory.optionRuId
                  )
                }
                className="bg-btnBlue text-white text-sm"
              >
                <FaEdit />
                Edit(RU)
              </Button>
              <Button
                onClick={() =>
                  handleDeletecategoryOptions(currentCategory.optionRuId)
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
                  setCurrentCategory({
                    ...currentCategory,
                    titleTr: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <div className="flex gap-2 item-center">
              <Button
                onClick={() =>
                  handleAddCategoryOptions({
                    title: currentCategory.titleTr,
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
                  handleEditCategoryOptions(
                    {
                      title: currentCategory.titleTr,
                    },
                    currentCategory.optionTrId
                  )
                }
                className="bg-btnBlue text-white text-sm"
              >
                <FaEdit />
                Edit(TR)
              </Button>
              <Button
                onClick={() =>
                  handleDeletecategoryOptions(currentCategory.optionTrId)
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
        itemId={activeCatId}
        uploadMethod={uploadCatImage}
        deleteMethod={deleteCatImage}
        currentItem={currentCategory}
      />
    </div>
  );
}
