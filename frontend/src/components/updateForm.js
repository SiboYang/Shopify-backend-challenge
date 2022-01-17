import { Form, Modal, Input, Button, InputNumber } from "antd";
import axios from"../axios";

const UpdateForm = (props) => {
  const handleSubmit = async (values) => {
    await axios.put(`item/${props.oldValue.id}`, values)
    props.onCancel()
  }


  return (
    <Modal
      title="Basic Modal"
      visible={props.visible}
      onCancel={props.onCancel}
      footer={null}
      destroyOnClose
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={handleSubmit}
        autoComplete="off"
        initialValues={props.oldValue}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input item name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Count"
          name="count"
          rules={[{ required: true, message: "Please input item count!" }]}
        >
        <InputNumber
              min={1}
              parser={(text) => (/^\d+$/.test(text) ? text : 0)}
            />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please input item count!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Brand"
          name="brand"
          rules={[{ required: true, message: "Please input item brand!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
