import { Modal, Form, Input, DatePicker, Select, Switch } from "antd";
import { InputNumber } from "antd";
import { useState } from "react";
import { useAsset } from "../hooks/useAsset";
import { usePayment } from "../hooks/usePayment";
import { useTag } from "../hooks/useTag";

const onChange = (value) => {
    console.log("changed", value);
};

const onSearch = (value) => {
    console.log("search:", value);
};

const RecordModal = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();

    const { data: assetData } = useAsset();
    const { data: paymentData } = usePayment();
    const { data: tagData } = useTag();

    const [assetName, setAssetName] = useState("");

    let assets = assetData !== undefined ? assetData.allAssets : [];
    let payments = paymentData !== undefined ? paymentData.allPayments : [];
    let tags = tagData !== undefined ? tagData.allTags : [];

    let newTag = [...tags];
    newTag.sort((a, b) => a.times > b.times ? -1 : 1);
    // console.log(newTag);
    // payments = payments.filter((ele) => ele.asset === assetName);

    // group payments by asset
    const groupedPayments = payments.reduce((acc, cur) => {
        let asset = assets.find(ele => ele.name === cur.asset);
        if (acc[cur.asset] === undefined) {
            acc[cur.asset] = [];
        }
        if(cur.available && asset.available){
            acc[cur.asset].push(cur);
        }
        return acc;
    }, {});
    
    return (
        <Modal
            open={open}
            title="Create a new Record"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then((value) => {
                        form.resetFields();
                        console.log(value);
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
                initialValues={{ amount: "0" }}
            >
                <Form.Item
                    name="name"
                    label="Record Name"
                    rules={[
                        {
                            required: true,
                            message:
                                "Error: Please enter the name of your payment!",
                        },
                    ]}
                >
                    <Input placeholder="ex. 牛排" />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input placeholder="ex. 早餐店的" />
                </Form.Item>
                <Form.Item name="tagName" label="Tag (Only one)"
                    rules={[
                        {
                            required: true,
                            message:
                                "Error: Please enter the tag of your payment!",
                        },
                    ]}
                >
                    <Select
                        showSearch
                        placeholder="Select a tag"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                            (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        options={newTag.map((ele) => ({
                            value: ele.name,
                            label: ele.name,
                        }))}
                    />
                      {/* <Select
                    mode="tags"
                    style={{
                    width: '100%',
                    }}
                    placeholder="Please select one tag or input a new tag directly"
                    onChange={(ele)=>{
                        ele[1] && form.setFieldsValue({tagname: [ele[1]]});
                    }}
                    options={
                        tags.map((ele) => ({
                            value: ele.name,
                            label: ele.name,
                        }))
                    }
                    /> */}
                    {/* <Input /> */}
                </Form.Item>
                {/* <Form.Item
                    name="assetname"
                    label="Asset"
                    rules={[
                        {
                            required: true,
                            message:
                                "Error: Please enter the asset of the expense!",
                        },
                    ]}
                >
                    <Select
                        showSearch
                        placeholder="Select a asset"
                        optionFilterProp="children"
                        onChange={(value) => {
                            setAssetName(value);
                        }}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                            (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        options={assets.map((ele) => ({
                            value: ele.name,
                            label: ele.name,
                        }))}
                    />
                </Form.Item>
                <Form.Item
                    name="paymentname"
                    label="Payment"
                    rules={[
                        {
                            required: true,
                            message:
                                "Error: Please enter the payment of the expense!",
                        },
                    ]}
                >
                    <Select
                        showSearch
                        placeholder={
                            assetName === "" ? "Select a asset first" : payments.length === 0 ? "No payment found" : "Select a payment"
                        }
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        disabled={assetName === "" || payments.length === 0}
                        filterOption={(input, option) =>
                            (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        options={payments.map((ele) => ({
                            value: ele.name,
                            label: ele.name,
                        }))
                    }
                    />
                </Form.Item> */}
                <Form.Item
                    name="assetPayment"
                    label="Asset & Payment"
                    rules={[
                        {
                            required: true,
                            message:
                                "Error: Please enter the asset and payment of the expense!",
                        },
                    ]}
                >
                <Select
                    // defaultValue="lucy"
                    // make the group label big
                    
                    style={{
                    width: 200,
                    }}
                    onChange={(value) => {
                        // setAssetName(value);
                        console.log(value);

                    }
                    }
                    options={
                        assets.map((ele) => ({
                            label: ele.name,
                            options: groupedPayments[ele.name] === undefined ? [] : groupedPayments[ele.name].map((ele) => ({
                                // value is asset name + payment name, split by space
                                value: ele.asset + " " + ele.name,
                                label: ele.name,
                            }
                            ))
                        }))
                    }
                />
                </Form.Item>
                <Form.Item
                    name="income"
                    label="Expense / Income"
                    valuePropName="checked"
                >    
                <Switch checkedChildren="Income" unCheckedChildren="Expense" />
                </Form.Item>
                <Form.Item
                    name="amount"
                    label="Amount"
                    rules={[
                        {
                            required: true,
                            message:
                                "Error: Please enter the amount of the expense!",
                        },
                    ]}
                >
                    <InputNumber
                        formatter={(value) =>
                            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        onChange={onChange}
                        min={0}
                    />
                </Form.Item>
                <Form.Item
                    name="dateTmp"
                    label="Date"
                    rules={[{ required: true, message: "Please select time!" }]}
                >
                    <DatePicker />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default RecordModal;
