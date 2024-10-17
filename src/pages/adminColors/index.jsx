import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";

import {
  addProductColor,
  getOneProduct,
  addProductColorOption,
  editProductColorOption,
  deleteProductColorOption,
  deleteProductColor,
} from "../../store/adminProducts";

import Panel from "../../components/adminPanel";

import { Button, Modal, message, Input, Form, Popconfirm } from "antd";

import { LuSearch } from "react-icons/lu";
import { FaEdit, FaQuestion } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddSharp } from "react-icons/io5";
import { VscTextSize } from "react-icons/vsc";

const textClassname = "text-sm font-main text-textGray";

export default function AdminColors() {
  const [messageApi, contextHolder] = message.useMessage();

  const [isAddColorModalOpen, setIsAddColorModalOpen] = useState(false);
  const [isEditColorModalOpen, setIsEditColorModalOpen] = useState(false);
  const [pageUpdate, setPageUpdate] = useState(false);
  const [product, setProduct] = useState({});
  const [newColor, setNewColor] = useState({
    name: "",
  });
  const [currentColor, setCurrentColor] = useState({});

  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOneProduct(state.id)).then((res) => {
      setProduct(res.payload.product);
    });
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
                setCurrentColor(val);
                setIsEditColorModalOpen(true);
              }}
              className="text-lg text-editBlue cursor-pointer hover:opacity-85 duration-100"
            >
              <FaEdit />
            </div>

            <div
              onClick={() => {
                navigate("/admin/productsizes", {
                  state: {
                    id: state.id,
                    colorId: val.id,
                  },
                });
              }}
              className="text-lg text-darkGray cursor-pointer hover:opacity-85 duration-100"
            >
              <VscTextSize />
            </div>

            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              icon={<FaQuestion style={{ color: "red" }} />}
              onConfirm={() => {
                dispatch(deleteProductColor(val.id)).then((res) => {
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

  const rows =
    product && product.colors
      ? product.colors.map((pr) => {
          let en = {};
          let ru = {};
          let tr = {};
          for (let opt of pr.options) {
            if (opt.language === "en") {
              en.name = opt.name;
              en.id = opt.id;
            } else if (opt.language === "ru") {
              ru.name = opt.name;
              ru.id = opt.id;
            } else {
              tr.name = opt.name;
              tr.id = opt.id;
            }
          }
          return {
            key: pr.id,
            id: pr.id,
            titleEn: en.name,
            titleRu: ru.name,
            titleTr: tr.name,
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

  const handleAddColor = () => {
    dispatch(
      addProductColor({
        id: state.id,
        color: newColor,
      })
    ).then((res) => {
      displayMessage(res);

      setPageUpdate(true);
      setIsAddColorModalOpen(false);
      setNewColor({});
    });
  };

  const handleAddColorOption = (option) => {
    dispatch(
      addProductColorOption({
        id: currentColor.id,
        option,
      })
    ).then((res) => {
      displayMessage(res);

      setPageUpdate(true);
      setIsEditColorModalOpen(false);
      setNewColor({});
    });
  };

  const handleEditColorOption = (option, id) => {
    dispatch(
      editProductColorOption({
        id,
        option,
      })
    ).then((res) => {
      displayMessage(res);

      setPageUpdate(true);
      setIsEditColorModalOpen(false);
      setNewColor({});
    });
  };

  const handleDeleteColorOption = (id) => {
    dispatch(deleteProductColorOption(id)).then((res) => {
      displayMessage(res);

      setPageUpdate(true);
      setIsEditColorModalOpen(false);
      setNewColor({});
    });
  };

  return (
    <div className="w-[95%] mx-auto mt-4">
      {contextHolder}
      <Panel columns={columns} rows={rows}>
        <div className="px-4 py-6 flex justify-between items-center">
          <div className="font-main text-blackMain text-md">
            Product size and color ({state.name})
          </div>
          <div className="w-[60%] flex justify-end gap-2 items-center">
            <Button
              onClick={() => {
                setIsAddColorModalOpen(true);
              }}
              className="bg-blackMain text-white font-main text-sm py-5"
            >
              Add Color
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
        title="Add Product Color"
        open={isAddColorModalOpen}
        footer={null}
        onCancel={() => {
          setIsAddColorModalOpen(false);
        }}
      >
        <Form
          className="flex flex-wrap flex-col items-center gap-2 mt-4 w-[100%]"
          layout="vertical"
          wrapperCol={{
            span: 32,
          }}
          labelWrap={false}
          onFinish={handleAddColor}
        >
          <Form.Item
            name="name"
            className="w-[100%]"
            label={
              <label className="font-main text-sm text-blueish p-0">Name</label>
            }
            required
          >
            <Input
              className="border-b1 border-greenBlue"
              onChange={(e) => {
                setNewColor({
                  name: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item className="w-[60%]">
            <Button
              htmlType="submit"
              className="bg-blackMain text-white text-md w-[100%] py-4"
            >
              Add Color
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add Product Option"
        open={isEditColorModalOpen}
        footer={null}
        onCancel={() => {
          setIsEditColorModalOpen(false);
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
              value: currentColor.titleEn,
            },
            {
              name: ["titleRu"],
              value: currentColor.titleRu,
            },
            {
              name: ["titleTr"],
              value: currentColor.titleTr,
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
                  setCurrentColor({
                    ...currentColor,
                    titleEn: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <div className="flex gap-2 items-center">
              <Button
                onClick={() =>
                  handleAddColorOption({
                    name: currentColor.titleEn,
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
                  handleEditColorOption(
                    {
                      name: currentColor.titleEn,
                    },
                    currentColor.optionEnId
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
                  setCurrentColor({
                    ...currentColor,
                    titleRu: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <div className="flex gap-2 item-center">
              <Button
                onClick={() =>
                  handleAddColorOption({
                    name: currentColor.titleRu,
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
                  handleEditColorOption(
                    {
                      name: currentColor.titleRu,
                    },
                    currentColor.optionRuId
                  )
                }
                className="bg-btnBlue text-white text-sm"
              >
                <FaEdit />
                Edit(RU)
              </Button>
              <Button
                onClick={() => handleDeleteColorOption(currentColor.optionRuId)}
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
                  setCurrentColor({
                    ...currentColor,
                    titleTr: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <div className="flex gap-2 item-center">
              <Button
                onClick={() =>
                  handleAddColorOption({
                    name: currentColor.titleTr,
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
                  handleEditColorOption(
                    {
                      name: currentColor.titleTr,
                    },
                    currentColor.optionTrId
                  )
                }
                className="bg-btnBlue text-white text-sm"
              >
                <FaEdit />
                Edit(TR)
              </Button>
              <Button
                onClick={() => handleDeleteColorOption(currentColor.optionTrId)}
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
