import { Table, Button } from "antd";
import { useEffect, useState } from "react";
import axios from "../axios.js";
import NewItemForm from "./newItemForm.js";
import UpdateForm from "./updateForm.js";

const ItemTable = () => {
  const [items, setItems] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [oldValue, setOldValue] = useState({});
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    showSizeChanger: true,
    onChange: (page, size) => {
      setPagination({
        ...pagination,
        page,
        limit: size,
      });
    },
  });

  useEffect(() => {
    getItems(pagination.limit, pagination.page);
  }, [pagination.page, pagination.limit, isCreating, isUpdating]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (value) => (
        <div>
          <Button
            onClick={() => {
              setOldValue(value);
              showUpdate();
            }}
          >
            Update
          </Button>
          <Button onClick={() => handleDelete(value.id)}>Delete</Button>
        </div>
      ),
    },
  ];
  const handleDelete = async (id) => {
    await axios.delete(`item/${id}`);
    getItems(pagination.limit, pagination.page);
  };
  const getItems = (limit, page) => {
    axios
      .get("item", {
        params: {
          limit,
          page: page - 1,
        },
      })
      .then((res) => {
        console.log(res.data.rows);
        setPagination((pagination) => ({
          ...pagination,
          total: res.data.count,
        }));
        setItems(res.data.rows);
      });
  };

  const showCreate = () => {
    setIsCreating(true);
  };

  const hideCreate = () => {
    setIsCreating(false);
  };

  const showUpdate = () => {
    setIsUpdating(true);
  };

  const hideUpdate = () => {
    setIsUpdating(false);
  };

  return (
    <div>
      <Button onClick={() => showCreate()}>Create</Button>
      <NewItemForm
        visible={isCreating}
        onCancel={() => hideCreate()}
      ></NewItemForm>
      <UpdateForm
        visible={isUpdating}
        onCancel={() => hideUpdate()}
        oldValue={oldValue}
      ></UpdateForm>
      <Table
        columns={columns}
        dataSource={items}
        pagination={pagination}
      ></Table>
    </div>
  );
};

export default ItemTable;
