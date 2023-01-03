import { Modal, Form, Input, Switch, DatePicker } from "antd";
import { InputNumber } from "antd";

const onChange = (value) => {
    console.log("changed", value);
};

const AssetModal = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            open={open}
            title="Create a new Asset"
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
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ balance: "0" }}
            >
                <Form.Item
                    name="name"
                    label="Asset Name"
                    rules={[
                        {
                            required: true,
                            message:
                                "Error: Please enter the name of the asset!",
                        },
                    ]}
                >
                    <Input placeholder="ex. 富邦銀行" />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input placeholder="ex. 薪轉帳戶" />
                </Form.Item>
                <Form.Item
                    name="balance"
                    label="Balance (ex. +-100000)"
                    rules={[
                        {
                            required: true,
                            message:
                                "Error: Please enter the balance of your asset!",
                        },
                    ]}
                >
                    {/* <Input /> */}
                    <InputNumber
                        initialvalue={0}
                        formatter={(value) =>
                            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        onChange={onChange}
                    />
                </Form.Item>
                <Form.Item
                    name="available"
                    label="Available"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>
                <Form.Item
                    name="create_time"
                    label="Create_Time"
                    rules={[{ required: true, message: "Please select time!" }]}
                >
                    <DatePicker />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AssetModal;
