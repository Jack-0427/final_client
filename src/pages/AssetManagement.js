import Header from "../components/Header";
import { Box, Typography, Button } from "@mui/material";
import { useAsset } from "../hooks/useAsset";
import { useUser } from "../hooks/useUser";

import { Select } from 'antd';
import { useState } from "react";
import { useRecord } from "../hooks/useRecord";
import { usePayment } from "../hooks/usePayment";



const AssetManagement = () => {

    // const theme = useTheme();
    // const colors = tokens(theme.palette.mode);
    const { token, email } = useUser();
    const { data, update } = useAsset();
    const { data: recordData } = useRecord();
    const { data: paymentData } = usePayment();

    const allAssets = data?.allAssets ?? [];
    const allRecords = recordData?.allRecords ?? [];
    const allPayments = paymentData?.allPayments ?? [];

    console.log(allRecords);
    // choose asset is the asset that is selected, default is the first asset
    const [ chooseAsset, setChooseAsset ] = useState(
        allAssets.length > 0 ? allAssets[0] : ""
    );

    const onChange = (value) => {
        console.log(`selected ${value}`);
        setChooseAsset(value);
    };

    const onSearch = (value) => {
    console.log('search:', value);
    };

    return (
        <Box m="20px">
            <Header
            title="Asset Management"
            subtitle="Manage your assets here"
            />
        <Select
            showSearch
            placeholder="Select a asset"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={
                allAssets.map((ele) => ({
                    value: ele.name,
                    label: ele.name,
                }))
            }
        />
        <Button variant="contained">Add Asset</Button>

        <div>
            <div>Payments:</div>
            {
                allPayments.filter((ele) => ele.asset === chooseAsset).map((ele) => (
                    <div key={ele.id}>
                        <div>id: {ele.id}</div>
                        <div>asset: {ele.asset}</div>
                        <div>name: {ele.name}</div>
                        <div>type: {ele.type}</div>
                        <div>date: {ele.date}</div>
                    </div>
                ))
            }
        </div>
        <div>
            <div>Recently Records:</div>
        {
            allRecords.filter((ele) => ele.asset === chooseAsset).map((ele) => (
                <div key={ele.id}>
                    <div>id: {ele.id}</div>
                    <div>asset: {ele.asset}</div>
                    <div>amount: {ele.amount}</div>
                    <div>date: {ele.date}</div>
                    <div>description: {ele.description}</div>
                </div>
            ))
        }  
        </div>
            {/* <Box m="40px 0 0 0">
            <Button variant="contained">Add Asset</Button>
            </Box> */}
        </Box>
    )
    // return (
    //     <div>
    //         <h1>Asset Management</h1>
    //     </div>
    // );
};

export default AssetManagement;