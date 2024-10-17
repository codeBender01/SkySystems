import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";

import {
  getOneProduct,
  addProductSize,
  editProductSize,
  deleteProductSize,
  addProductSizeImage,
  deleteProductSizeImage,
} from "../../store/adminProducts";

import Panel from "../../components/adminPanel";
import ImageUpload from "../../components/imageUpload";

import { Button, Input, message, Modal, Select, Form, Popconfirm } from "antd";

import { LuSearch, LuArrowDownUp } from "react-icons/lu";
import { MdImageNotSupported } from "react-icons/md";
import { FaEdit, FaQuestion } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsImageFill } from "react-icons/bs";

const textClassname = "text-sm font-main text-textGray";

export default function AdminSizes() {
  const [isAddSizeModalOpen, setIsAddSizeModalOpen] = useState(false);
  const [isEditSizeModalOpen, setIsEditSizeModalOpen] = useState(false);
  const [isAddImageModalOpen, setIsAddImageModalOpen] = useState(false);
  const [activeSizeId, setActiveSizeId] = useState("");
  const [pageUpdate, setPageUpdate] = useState(false);
  const [color, setColor] = useState({});
  const [newSize, setNewSize] = useState({
    size: "",
    quantity: 0,
    price: 0,
    barcode: "",
    isActive: false,
  });
  const [currentSize, setCurrentSize] = useState({});
  const [editedSize, setEditedSize] = useState({});

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const { state } = useLocation();

  useEffect(() => {
    dispatch(getOneProduct(state.id)).then((res) => {
      let colors = res.payload.product.colors;
      for (let i = 0; i < colors.length; i++) {
        if (colors[i].id === state.colorId) {
          setColor(colors[i]);
        }
      }
    });
  }, [pageUpdate]);

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
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (val) => {
        return (
          <div className={`flex flex-col items-center ${textClassname}`}>
            {val}
          </div>
        );
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (val) => (
        <div className={`text-center ${textClassname}`}>{val}</div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (val) => (
        <div className={`text-center ${textClassname}`}>{val}</div>
      ),
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
      key: "barcode",
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
                setIsAddImageModalOpen(true);
                setActiveSizeId(val.id);
              }}
              className="text-lg text-amber cursor-pointer hover:opacity-85 duration-100"
            >
              <BsImageFill />
            </div>
            <div
              onClick={() => {
                setCurrentSize(val);
                setIsEditSizeModalOpen(true);
              }}
              className="text-lg text-editBlue cursor-pointer hover:opacity-85 duration-100"
            >
              <FaEdit />
            </div>

            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              icon={<FaQuestion style={{ color: "red" }} />}
              onConfirm={() => {
                dispatch(deleteProductSize(val.id)).then((res) => {
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

  const rows = color.sizes
    ? color.sizes.map((sz) => {
        return {
          key: sz.id,
          id: sz.id,
          size: sz.size,
          quantity: sz.quantity,
          price: sz.price,
          barcode: sz.barcode,
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

  const handleAddProductSize = () => {
    dispatch(
      addProductSize({
        id: state.colorId,
        size: newSize,
      })
    ).then((res) => {
      displayMessage(res);

      setPageUpdate(true);
      setIsAddSizeModalOpen(false);
      setNewSize({});
    });
  };

  const handleEditProductSize = () => {
    dispatch(
      editProductSize({
        id: currentSize.id,
        size: editedSize,
      })
    ).then((res) => {
      displayMessage(res);

      setPageUpdate(true);
      setIsEditSizeModalOpen(false);
      setNewSize({});
    });
  };

  return (
    <div>
      {contextHolder}
      <Panel columns={columns} rows={rows}>
        <div className="px-4 py-6 flex justify-between items-center">
          <div className="font-main text-blackMain text-md">Products size</div>
          <div className="w-[60%] flex justify-end gap-2 items-center">
            <Button
              onClick={() => [setIsAddSizeModalOpen(true)]}
              className="bg-blackMain text-white font-main text-sm py-5"
            >
              Add size
            </Button>
            <Input
              prefix={<LuSearch size={18} />}
              className="w-[60%] py-2 font-main text-sm"
              placeholder="Search sizes"
            />
          </div>
        </div>
      </Panel>
      <Modal
        title="Add Size"
        open={isAddSizeModalOpen}
        footer={null}
        onCancel={() => {
          setIsAddSizeModalOpen(false);
        }}
      >
        <Form
          className="flex flex-wrap flex-col items-center gap-2 mt-4 w-[100%]"
          layout="vertical"
          wrapperCol={{
            span: 32,
          }}
          labelWrap={false}
          onFinish={handleAddProductSize}
        >
          <Form.Item
            name="size"
            className="w-[100%]"
            label={
              <label className="font-main text-sm text-blueish p-0">Size</label>
            }
            required
          >
            <Input
              className="border-b1 border-greenBlue"
              onChange={(e) => {
                setNewSize({
                  ...newSize,
                  size: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            name="quantity"
            className="w-[100%]"
            label={
              <label className="font-main text-sm text-blueish p-0">
                Quantity
              </label>
            }
            required
          >
            <Input
              className="border-b1 border-greenBlue"
              onChange={(e) => {
                setNewSize({
                  ...newSize,
                  quantity: e.target.value,
                });
              }}
              type="number"
            />
          </Form.Item>
          <Form.Item
            name="price"
            className="w-[100%]"
            label={
              <label className="font-main text-sm text-blueish p-0">
                Price
              </label>
            }
            required
          >
            <Input
              className="border-b1 border-greenBlue"
              onChange={(e) => {
                setNewSize({
                  ...newSize,
                  price: e.target.value,
                });
              }}
              type="number"
            />
          </Form.Item>
          <Form.Item
            name="barcode"
            className="w-[100%]"
            label={
              <label className="font-main text-sm text-blueish p-0">
                Barcode
              </label>
            }
            required
          >
            <Input
              className="border-b1 border-greenBlue"
              onChange={(e) => {
                setNewSize({
                  ...newSize,
                  barcode: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            name="isActive"
            className="w-[100%]"
            label={
              <label className="font-main text-sm text-blueish p-0">
                Is Active
              </label>
            }
            required
          >
            <Select
              className="border-b1 border-greenBlue"
              onSelect={(e) => {
                setNewSize({
                  ...newSize,
                  isActive: e,
                });
              }}
              options={[
                {
                  label: "Active",
                  value: true,
                },
                {
                  label: "Not active",
                  value: false,
                },
              ]}
            />
          </Form.Item>
          <Form.Item className="w-[60%]">
            <Button
              htmlType="submit"
              className="bg-blackMain text-white text-md w-[100%] py-4"
            >
              Add Size
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit Size"
        open={isEditSizeModalOpen}
        footer={null}
        onCancel={() => {
          setIsEditSizeModalOpen(false);
        }}
      >
        <Form
          form={form}
          className="flex flex-wrap flex-col items-center gap-2 mt-4 w-[100%]"
          layout="vertical"
          wrapperCol={{
            span: 32,
          }}
          labelWrap={false}
          onFinish={handleEditProductSize}
          initialValues={{
            size: currentSize.size,
            barcode: currentSize.barcode,
            price: currentSize.price,
            quantity: currentSize.quantity,
          }}
        >
          <Form.Item
            name="size"
            className="w-[100%]"
            label={
              <label className="font-main text-sm text-blueish p-0">Size</label>
            }
            required
          >
            <Input
              className="border-b1 border-greenBlue"
              onChange={(e) => {
                setEditedSize({
                  ...editedSize,
                  size: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            name="quantity"
            className="w-[100%]"
            label={
              <label className="font-main text-sm text-blueish p-0">
                Quantity
              </label>
            }
            required
          >
            <Input
              className="border-b1 border-greenBlue"
              onChange={(e) => {
                setEditedSize({
                  ...editedSize,
                  quantity: e.target.value,
                });
              }}
              type="number"
            />
          </Form.Item>
          <Form.Item
            name="price"
            className="w-[100%]"
            label={
              <label className="font-main text-sm text-blueish p-0">
                Price
              </label>
            }
            required
          >
            <Input
              className="border-b1 border-greenBlue"
              onChange={(e) => {
                setEditedSize({
                  ...editedSize,
                  price: e.target.value,
                });
              }}
              type="number"
            />
          </Form.Item>
          <Form.Item
            name="barcode"
            className="w-[100%]"
            label={
              <label className="font-main text-sm text-blueish p-0">
                Barcode
              </label>
            }
            required
          >
            <Input
              className="border-b1 border-greenBlue"
              onChange={(e) => {
                setEditedSize({
                  ...editedSize,
                  barcode: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item className="w-[60%]">
            <Button
              htmlType="submit"
              className="bg-blackMain text-white text-md w-[100%] py-4"
            >
              Edit Size
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <ImageUpload
        openModal={isAddImageModalOpen}
        setOpenModal={setIsAddImageModalOpen}
        itemId={activeSizeId}
        uploadMethod={addProductSizeImage}
        getMethod={getOneProduct}
        deleteMethod={deleteProductSizeImage}
        pageUpdate={pageUpdate}
        setPageUpdate={setPageUpdate}
        colorId={state.colorId}
      />
    </div>
  );
}
