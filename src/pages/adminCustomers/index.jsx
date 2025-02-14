import { useGetAllClientsQuery } from "../../store/services/clientsApi";

import Panel from "../../components/adminPanel";
import { Button, Input } from "antd";

import { LuSearch } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import { LuArrowDownUp } from "react-icons/lu";

const textClassname = "text-sm font-main text-textGray";

export default function AdminCustomers() {
  const { data: clients } = useGetAllClientsQuery();

  const columns = [
    {
      title: <LuArrowDownUp size={18} />,
      dataIndex: "initials",
      key: "initials",
      render: (val) => (
        <div className="bg-paleGray rounded-md h-[48px] w-[48px] text-btnBlue text-sm font-main flex items-center justify-center uppercase">
          {val}
        </div>
      ),
    },
    {
      title: "Name",
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
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (val) => (
        <div className={`text-center ${textClassname}`}>{val}</div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (val) => (
        <div className={`text-center ${textClassname}`}>{val}</div>
      ),
    },
    {
      title: "Shipping Address",
      dataIndex: "address",
      key: "address",
      render: (val) => (
        <div className={`text-center ${textClassname}`}>{val}</div>
      ),
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

  const rows = clients
    ? clients.clients.map((c) => {
        return {
          key: c.id,
          id: c.id,
          initials: "eh",
          name: c.firstName,
          phone: c.phone,
          email: c.email,
          address:
            c.apartmentNumber +
            " " +
            c.street +
            " " +
            c.city +
            ", " +
            c.country,
        };
      })
    : [];

  return (
    <div className="w-[95%] mx-auto mt-4">
      <Panel columns={columns} rows={rows}>
        <div className="px-4 py-6 flex justify-between items-center">
          <div className="font-main text-blackMain text-md">Customers</div>
          <div className="w-[70%] flex justify-end gap-2 items-center">
            <Input
              prefix={<LuSearch size={18} />}
              className="w-[60%] py-2 font-main text-sm"
              placeholder="Search customers"
            />
          </div>
        </div>
      </Panel>
    </div>
  );
}
