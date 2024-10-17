import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { getAbandonedOrders, getClientOrders } from "../../store/adminOrders";

import Panel from "../../components/adminPanel";

import { Button, Input } from "antd";

import { LuSearch } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import { LuArrowDownUp } from "react-icons/lu";

import product from "../../assets/pr.png";

const textClassname = "text-sm font-main text-textGray";

export default function AdminOrders() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAbandonedOrders());
    dispatch(getClientOrders());
  });
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
      render: () => {
        return (
          <div className="flex items-center justify-center gap-2 cursor-pointer">
            <BsThreeDots />
          </div>
        );
      },
    },
  ];

  const rows = [
    {
      key: "1",
      img: product,
      orderId: "3244024",
      date: "20 Mar, 2023",
      total: "75.00",
      status: "Processing",
      note: "lorem ipsum doller amet",
    },
  ];
  return (
    <div className="w-[95%] mx-auto mt-4">
      <Panel columns={columns} rows={rows}>
        <div className="px-4 py-6 flex justify-between items-center">
          <div className="font-main text-blackMain text-md">Orders</div>
          <div className="w-[70%] flex justify-end gap-2 items-center">
            <Button className="bg-btnRed text-white font-main text-sm py-5">
              Abandoned checkouts
            </Button>
            <Button className="bg-btnBlue text-white font-main text-sm py-5">
              Draft orders
            </Button>
            <Input
              prefix={<LuSearch size={18} />}
              className="w-[60%] py-2 font-main text-sm"
              placeholder="Search orders"
            />
          </div>
        </div>
      </Panel>
    </div>
  );
}
