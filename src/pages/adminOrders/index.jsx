import { useEffect, useState } from "react";
import { useGetOrdersQuery } from "../../store/services/ordersApi";

import { useChangeOrderStatusMutation } from "../../store/services/categoriesApi";

import Panel from "../../components/adminPanel";

import { Modal, Input, Select, Button, message } from "antd";

import { LuSearch } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import { LuArrowDownUp } from "react-icons/lu";

import product from "../../assets/pr.png";

const textClassname = "text-sm font-main text-textGray";

const statuses = [
  {
    label: "PROCESSING",
    value: "PROCESSING",
  },
  {
    label: "CANCELLED",
    value: "CANCELLED",
  },
  {
    label: "COMPLETED",
    value: "COMPLETED",
  },
];

export default function AdminOrders() {
  const { data: orders, refetch } = useGetOrdersQuery();

  const [changeOrderStatus] = useChangeOrderStatusMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState({});
  const [data, setData] = useState({
    note: "",
    totalPrice: 0,
    status: "",
  });

  useEffect(() => {
    refetch();
  }, [data, messageApi]);

  const displayMessage = (res) => {
    if (res.data) {
      messageApi.success("Success!");
    } else if (res.error.status === 409) {
      messageApi.error("You already added this product!");
    }
  };

  const columns = [
    {
      title: <LuArrowDownUp size={18} />,
      dataIndex: "img",
      key: "img",
      render: (val) => (
        <img src={val} alt="product" className="w-[48px] h-[48px]" />
      ),
    },
    {
      title: "Order id",
      dataIndex: "orderId",
      key: "orderId",
      render: (val) => {
        return (
          <div className={`flex flex-col items-center ${textClassname}`}>
            {val}
          </div>
        );
      },
    },
    {
      title: "Client Name",
      dataIndex: "name",
      key: "name",
      render: (val) => {
        return (
          <div className={`flex flex-col items-center ${textClassname}`}>
            {val}
          </div>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (val) => (
        <div className={`text-center ${textClassname}`}>{val}</div>
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (val) => (
        <div className={`text-center ${textClassname}`}>${val}</div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (val) => (
        <div className={`text-center ${textClassname}`}>{val}</div>
      ),
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      render: (val) => {
        return (
          <div
            className={`flex flex-col items-center text-center ${textClassname}`}
          >
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
            <BsThreeDots
              onClick={() => {
                setActiveOrder(val);
                setOpen(true);
              }}
            />
          </div>
        );
      },
    },
  ];

  const handleChangeStatus = async () => {
    const res = await changeOrderStatus({
      id: activeOrder.orderId,
      body: data,
    });
    displayMessage(res);
    setOpen(false);
    setData({});
  };

  const rows =
    orders && orders.orders
      ? orders.orders.map((o) => {
          return {
            key: o.id,
            img: o.orderItems[0]
              ? o?.orderItems[0]?.size?.medias[0]?.filePath
              : product,
            orderId: o.orderItems[0] ? o.orderItems[0].orderId : "",
            date: o.shipping[0]
              ? o.shipping[0].dateOfDelivery + ", " + o.shipping[0].deliveryTime
              : "",
            total: o.totalPrice,
            status: o.status,
            note: "",
            name: o.shipping[0] ? o.shipping[0].recipientsName : "",
          };
        })
      : [];
  return (
    <div className="w-[95%] mx-auto mt-4">
      <Panel columns={columns} rows={rows}>
        <div className="px-4 py-6 flex justify-between items-center">
          <div className="font-main text-blackMain text-md">Orders</div>
          <div className="w-[70%] flex justify-end gap-2 items-center">
            <Input
              prefix={<LuSearch size={18} />}
              className="w-[60%] py-2 font-main text-sm"
              placeholder="Search orders"
            />
          </div>
        </div>
      </Panel>

      {contextHolder}

      <Modal
        title="Change order status"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <div className="flex flex-col gap-4 p-6">
          <div>
            <Input
              onChange={(e) => {
                setData({
                  ...data,
                  note: e.target.value,
                });
              }}
              placeholder="Note"
            />
          </div>
          <div className="w-[100%]">
            <Select
              options={statuses}
              placeholder="Select status"
              className="w-[100%]"
              onSelect={(e) => {
                setData({
                  ...data,
                  status: e,
                });
              }}
            />
          </div>
          <div>
            <Input
              onChange={(e) => {
                setData({
                  ...data,
                  totalPrice: parseInt(e.target.value),
                });
              }}
              placeholder="Total price"
            />
          </div>

          <Button
            htmlType="submit"
            onClick={handleChangeStatus}
            className="bg-blackMain text-white text-[14px] uppercase w-[100%] py-4"
          >
            Change Status
          </Button>
        </div>
      </Modal>
    </div>
  );
}
