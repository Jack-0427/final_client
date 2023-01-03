import {
    Modal,
    Form,
    Input,
    Switch,
    DatePicker,
    Row,
    Col,
    Checkbox,
    Select,
} from "antd";

const onChange = (value) => {
    console.log(`selected ${value}`);
};
const onSearch = (value) => {
    console.log("search:", value);
};

import { useState } from "react";

const PaymentModel = ({ open, select, onCreate, onCancel }) => {
    const [form] = Form.useForm();

    const types = [
        { label: "信用卡", value: "信用卡" },
        { label: "金融卡", value: "金融卡" },
        { label: "現金", value: "現金" },
        { label: "其他", value: "其他" },
    ];

    const [Type, setType] = useState("");

    const change = (e) => {
        if (Type !== e.target.value) {
            setType(e.target.value);
        } else {
            setType("");
        }
    };

    return (
        <Modal
            open={open}
            title="Create a new payment"
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
                    label="Payment Name"
                    rules={[
                        {
                            required: true,
                            message:
                                "Error: Please enter the name of your payment!",
                        },
                    ]}
                >
                    <Input placeholder="ex. 熊大信用卡" />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input placeholder="ex. 中國信託所辦" />
                </Form.Item>
                <Form.Item
                    name="type"
                    label="Types"
                    rules={[
                        {
                            required: true,
                            validator: () => {
                                return Type !== ""
                                    ? Promise.resolve()
                                    : Promise.reject(
                                          "Error: Please enter the type of your payment!"
                                      );
                            },
                        },
                    ]}
                >
                    <Row>
                        {types.map((type) => {
                            return (
                                <Col span={8} key={type.label}>
                                    <Checkbox
                                        value={type.value}
                                        style={{ lineHeight: "32px" }}
                                        checked={Type === type.value}
                                        onChange={change}
                                    >
                                        {type.label}
                                    </Checkbox>
                                </Col>
                            );
                        })}
                    </Row>
                </Form.Item>
                {/* <Form.Item
                    name="asset"
                    label="Asset"
                    rules={[
                        {
                            required: true,
                            message:
                                "Error: Please enter the asset of your payment!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item> */}
                <Form.Item
                    name="asset"
                    label="Asset"
                    rules={[
                        {
                            required: true,
                            message:
                                "Error: Please enter the asset of your payment!",
                        },
                    ]}
                >
                    <Select
                        showSearch
                        placeholder="Select a asset"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                            (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        options={select.map((ele) => ({
                            value: ele.name,
                            label: ele.name,
                        }))}
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

export default PaymentModel;
