import { useState } from "react";

import {
  useGetAllAdminsQuery,
  useCreateAdminMutation,
  useDeleteAdminMutation,
  useEditAdminMutation,
} from "../../store/services/adminsApi";

import Panel from "../../components/adminPanel";
import { Button, Input, Popconfirm, Modal, Form, message } from "antd";

import { LuSearch } from "react-icons/lu";
import { FaEdit, FaQuestion } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const textClassname = "text-sm font-main text-textGray";

export default function AdminUsers() {
  const [createAdmin] = useCreateAdminMutation();
  const [deleteAdmin] = useDeleteAdminMutation();
  const [editAdmin] = useEditAdminMutation();

  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
  const [isEditAdminModalOpen, setIsEditAdminModalOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    username: "",
    password: "",
  });
  const [currentAdmin, setCurrentAdmin] = useState({});

  const [messageApi, contextHolder] = message.useMessage();

  const { data: admins } = useGetAllAdminsQuery();

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
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
                setCurrentAdmin(val);
                setIsEditAdminModalOpen(true);
              }}
              className="text-lg text-editBlue cursor-pointer hover:opacity-85 duration-100"
            >
              <FaEdit />
            </div>

            <Popconfirm
              title="Delete the admin"
              description="Are you sure to delete this admin?"
              icon={<FaQuestion style={{ color: "red" }} />}
              onConfirm={async () => {
                const res = await deleteAdmin(val.id);
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

  const rows = admins
    ? admins.admins.map((ad) => {
        return {
          key: ad.id,
          id: ad.id,
          username: ad.username,
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
  };

  const handleAddAdmin = async () => {
    const res = await createAdmin(newAdmin);
    displayMessage(res);
  };

  const handleEditAdmin = async () => {
    const res = await editAdmin({
      id: currentAdmin.id,
      admin: {
        username: currentAdmin.username,
        password: currentAdmin.password,
      },
    });
    displayMessage(res);
  };

  return (
    <div className="w-[95%] mx-auto mt-4">
      {contextHolder}
      <Panel columns={columns} rows={rows}>
        <div className="px-4 py-6 flex justify-between items-center">
          <div className="font-main text-blackMain text-md">Customers</div>
          <div className="w-[70%] flex justify-end gap-2 items-center">
            <Button
              onClick={() => setIsAddAdminModalOpen(true)}
              className="bg-blackMain text-white font-main text-sm py-5"
            >
              Add admin
            </Button>
            <Input
              prefix={<LuSearch size={18} />}
              className="w-[60%] py-2 font-main text-sm"
              placeholder="Search customers"
            />
          </div>
        </div>
      </Panel>
      <Modal
        title="Add Admin"
        open={isAddAdminModalOpen}
        footer={null}
        onCancel={() => {
          setIsAddAdminModalOpen(false);
        }}
      >
        <Form
          className="flex flex-wrap flex-col items-center gap-2 mt-4 w-[100%]"
          layout="vertical"
          wrapperCol={{
            span: 32,
          }}
          labelWrap={false}
          onFinish={handleAddAdmin}
        >
          <Form.Item
            name="username"
            className="w-[100%]"
            label={
              <label className="font-main text-sm text-blueish p-0">
                Username
              </label>
            }
            required
          >
            <Input
              onChange={(e) => {
                setNewAdmin({
                  ...newAdmin,
                  username: e.target.value,
                });
              }}
              className="border-b1 border-blackMain"
            />
          </Form.Item>
          <Form.Item
            name="password"
            className="w-[100%]"
            label={
              <label className="font-main text-sm text-blueish p-0">
                Password
              </label>
            }
            required
          >
            <Input.Password
              onChange={(e) => {
                setNewAdmin({
                  ...newAdmin,
                  password: e.target.value,
                });
              }}
              className="border-b1 border-blackMain"
            />
          </Form.Item>
          <Form.Item className="w-[60%]">
            <Button
              htmlType="submit"
              className="bg-blackMain text-white text-md w-[100%] py-4"
            >
              Add admin
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Add Admin"
        open={isEditAdminModalOpen}
        footer={null}
        onCancel={() => {
          setIsEditAdminModalOpen(false);
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
              name: ["username"],
              value: currentAdmin.username,
            },
            {
              name: ["password"],
              value: currentAdmin.password,
            },
          ]}
          onFinish={handleEditAdmin}
        >
          <Form.Item
            name="username"
            className="w-[100%]"
            label={
              <label className="font-main text-sm text-blueish p-0">
                Username
              </label>
            }
            required
          >
            <Input
              onChange={(e) => {
                setCurrentAdmin({
                  ...currentAdmin,
                  username: e.target.value,
                });
              }}
              className="border-b1 border-blackMain"
            />
          </Form.Item>
          <Form.Item
            name="password"
            className="w-[100%]"
            label={
              <label className="font-main text-sm text-blueish p-0">
                Password
              </label>
            }
            required
          >
            <Input.Password
              onChange={(e) => {
                setCurrentAdmin({
                  ...currentAdmin,
                  password: e.target.value,
                });
              }}
              className="border-b1 border-blackMain"
            />
          </Form.Item>
          <Form.Item className="w-[60%]">
            <Button
              htmlType="submit"
              className="bg-blackMain text-white text-md w-[100%] py-4"
            >
              Add admin
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
