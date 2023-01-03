import { Modal, Form, Input, Switch, DatePicker } from "antd";
import { InputNumber } from "antd";

const TagModal = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            open={open}
            title="Create a new Tag"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then((value) => {
                        form.resetFields();
                        onCreate(value);
                    })
                    .catch((e) => {
                        window.alert(e);
                    });
            }}
        >
            <Form form={form} layout="vertical" name="form_in_modal">
                <Form.Item
                    name="name"
                    label="Tag Name"
                    rules={[
                        {
                            required: true,
                            message:
                                "Error: Please enter the name of the asset!",
                        },
                    ]}
                >
                    <Input placeholder="ex. 餐飲" />
                </Form.Item>
                <Form.Item
                    name="times"
                    label="Icon"
                    rules={[
                        {
                            required: true,
                            message:
                                "Error: Please enter the balance of your asset!",
                        },
                    ]}
                >
                    <InputNumber initialvalue={0} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default TagModal;
