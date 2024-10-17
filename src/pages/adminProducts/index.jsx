import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import {
  getAllProducts,
  createProduct,
  deleteProduct,
  addProductOption,
  editProductOption,
  deleteProductOption,
} from "../../store/adminProducts";

import Panel from "../../components/adminPanel";

import { Button, Input, Modal, Select, Form, message, Popconfirm } from "antd";
import ImageUpload from "../../components/imageUpload";

import { LuSearch } from "react-icons/lu";
import { BsImageFill } from "react-icons/bs";
import { MdDelete, MdColorLens } from "react-icons/md";
import { FaEdit, FaQuestion } from "react-icons/fa";
import { IoAddSharp } from "react-icons/io5";

const textClassname = "text-sm font-main text-textGray";

export default function AdminProducts() {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [collectionOptions, setCollectionOptions] = useState([]);
  const [pageUpdate, setPageUpdate] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    categoryId: "",
    collectionId: "",
  });
  const [currentProduct, setCurrentProduct] = useState({});
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const products = useSelector((state) => state.adminProducts.products);
  const collections = useSelector((state) => state.adminCollection.collections);
  const categories = useSelector((state) => state.adminCategories.categories);
  const productsCount = useSelector(
    (state) => state.adminProducts.productsCount
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProducts());
    let catOptions = categories.map((cat) => {
      return {
        label: cat.options[0].title,
        value: cat.id,
      };
    });

    let colOptions = collections.map((col) => {
      return {
        label: col.options[0].title,
        value: col.id,
      };
    });

    setCategoryOptions(catOptions);
    setCollectionOptions(colOptions);
  }, [categories]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [pageUpdate]);

  const columns = [
    {
      title: "Title (EN)",
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
      title: "Title (RU)",
      dataIndex: "titleRu",
      key: "titleRu",
      render: (val) => (
        <div className={`text-center ${textClassname}`}>{val}</div>
      ),
    },
    {
      title: "Title (TR)",
      dataIndex: "titleTr",
      key: "titleTr",
      render: (val) => (
        <div className={`text-center ${textClassname}`}>{val}</div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (val) => {
        return (
          <div className="flex items-center justify-center gap-2 cursor-pointer">
            <div
              onClick={() => {
                setCurrentProduct(val);
                setIsEditProductModalOpen(true);
              }}
              className="text-lg text-editBlue cursor-pointer hover:opacity-85 duration-100"
            >
              <FaEdit />
            </div>
            <div
              onClick={() => {
                navigate("/admin/productcolors", {
                  state: {
                    id: val.id,
                    name: val.titleEn,
                  },
                });
              }}
              className="text-lg text-accepted cursor-pointer hover:opacity-85 duration-100"
            >
              <MdColorLens />
            </div>

            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              icon={<FaQuestion style={{ color: "red" }} />}
              onConfirm={() => {
                dispatch(deleteProduct(val.id)).then((res) => {
                  displayMessage(res);
                  setPageUpdate(true);
                });

                setTimeout(() => {
                  setPageUpdate(false);
                }, 2000);
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

  const rows = products
    ? products.map((pr) => {
        let en = {};
        let ru = {};
        let tr = {};
        for (let opt of pr.options) {
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
          key: pr.id,
          id: pr.id,
          titleEn: en.title,
          titleRu: ru.title,
          titleTr: tr.title,
          optionEnId: en.id,
          optionRuId: ru.id,
          optionTrId: tr.id,
        };
      })
    : [];

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

    setTimeout(() => {
      setPageUpdate(false);
    }, 2000);
  };

  const handleAddProduct = () => {
    dispatch(createProduct(newProduct)).then((res) => {
      displayMessage(res);

      setPageUpdate(true);
      setIsAddProductModalOpen(false);
      setNewProduct({});
    });
  };

  const handleAddProductOptions = (option) => {
    dispatch(
      addProductOption({
        id: currentProduct.id,
        option,
      })
    ).then((res) => {
      displayMessage(res);
      setPageUpdate(true);
      setIsEditProductModalOpen(false);
    });
  };

  const handleEditProductOption = (option, id) => {
    dispatch(
      editProductOption({
        id,
        option,
      })
    ).then((res) => {
      displayMessage(res);
      setPageUpdate(true);
      setIsEditProductModalOpen(false);
    });
  };

  const handleDeleteProductOption = (id) => {
    dispatch(deleteProductOption(id)).then((res) => {
      displayMessage(res);
      setPageUpdate(true);
      setIsEditProductModalOpen(false);
    });
  };

  return (
    <div className="w-[95%] mx-auto mt-4">
      {contextHolder}
      <Panel columns={columns} rows={rows}>
        <div className="px-4 py-6 flex justify-between items-center">
          <div className="font-main text-blackMain text-md">
            Products ({productsCount})
          </div>
          <div className="w-[60%] flex justify-end gap-2 items-center">
            <Button
              onClick={() => [setIsAddProductModalOpen(true)]}
              className="bg-blackMain text-white font-main text-sm py-5"
            >
              Add product
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
        title="Add Product"
        open={isAddProductModalOpen}
        footer={null}
        onCancel={() => {
          setIsAddProductModalOpen(false);
        }}
      >
        <Form
          className="flex flex-wrap flex-col items-center gap-2 mt-4 w-[100%]"
          layout="vertical"
          wrapperCol={{
            span: 32,
          }}
          labelWrap={false}
          onFinish={handleAddProduct}
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
                setNewProduct({
                  ...newProduct,
                  title: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            name="category"
            className="w-[100%]"
            label={
              <label className="font-main text-sm text-blueish p-0">
                Category
              </label>
            }
            required
          >
            <Select
              className="border-b1 border-greenBlue"
              onSelect={(e) => {
                setNewProduct({
                  ...newProduct,
                  categoryId: e,
                });
              }}
              options={categoryOptions}
            />
          </Form.Item>
          <Form.Item
            name="collection"
            className="w-[100%]"
            label={
              <label className="font-main text-sm text-blueish p-0">
                Collection
              </label>
            }
            required
          >
            <Select
              className="border-b1 border-greenBlue"
              onSelect={(e) => {
                setNewProduct({
                  ...newProduct,
                  collectionId: e,
                });
              }}
              options={collectionOptions}
            />
          </Form.Item>
          <Form.Item className="w-[60%]">
            <Button
              htmlType="submit"
              className="bg-blackMain text-white text-md w-[100%] py-4"
            >
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add Product Option"
        open={isEditProductModalOpen}
        footer={null}
        onCancel={() => {
          setIsEditProductModalOpen(false);
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
              value: currentProduct.titleEn,
            },
            {
              name: ["titleRu"],
              value: currentProduct.titleRu,
            },
            {
              name: ["titleTr"],
              value: currentProduct.titleTr,
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
                  setCurrentProduct({
                    ...currentProduct,
                    titleEn: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <div className="flex gap-2 items-center">
              <Button
                onClick={() =>
                  handleAddProductOptions({
                    title: currentProduct.titleEn,
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
                  handleEditProductOption(
                    {
                      title: currentProduct.titleEn,
                    },
                    currentProduct.optionEnId
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
                  setCurrentProduct({
                    ...currentProduct,
                    titleRu: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <div className="flex gap-2 item-center">
              <Button
                onClick={() =>
                  handleAddProductOptions({
                    title: currentProduct.titleRu,
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
                  handleEditProductOption(
                    {
                      title: currentProduct.titleRu,
                    },
                    currentProduct.optionRuId
                  )
                }
                className="bg-btnBlue text-white text-sm"
              >
                <FaEdit />
                Edit(RU)
              </Button>
              <Button
                onClick={() =>
                  handleDeleteProductOption(currentProduct.optionRuId)
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
                  setCurrentProduct({
                    ...currentProduct,
                    titleTr: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <div className="flex gap-2 item-center">
              <Button
                onClick={() =>
                  handleAddProductOptions({
                    title: currentProduct.titleTr,
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
                  handleEditProductOption(
                    {
                      title: currentProduct.titleTr,
                    },
                    currentProduct.optionTrId
                  )
                }
                className="bg-btnBlue text-white text-sm"
              >
                <FaEdit />
                Edit(TR)
              </Button>
              <Button
                onClick={() =>
                  handleDeleteProductOption(currentProduct.optionTrId)
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
    </div>
  );
}
