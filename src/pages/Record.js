import { Box, Typography, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockExpenses } from "../data/mockExpenses";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useTheme } from "@mui/material";
import { useFind } from "../hooks/useFind";
import { useUser } from "../hooks/useUser";
import { useRecord } from "../hooks/useRecord";
import { useTag } from "../hooks/useTag";
import { useNavigate, useLocation } from "react-router-dom";
import { display } from "@mui/system";
import { GET_ALL_RECORDS } from "../graphql/query";
import { message } from "antd";
import RecordModal from "../components/RecordModal";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBar from "../components/AddBar";
import dayjs from "dayjs";

const Record = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { getAsset, getPayment } = useFind();
    const { token, email } = useUser();
    const { data, create, update, Delete } = useRecord();
    const { data: tagData } = useTag();
    let tagNames = tagData ? tagData.allTags.map(ele => ele.name) : [];
    // console.log(tagNames);
    const [recordOpen, setRecordOpen] = useState(false);

    const navigate = useNavigate();

    const bar = () => {
        return <AddBar setOpen={setRecordOpen} color={colors.primary[100]} />;
    };

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "name", headerName: "Name", flex: 1 },
        {
            field: "asset",
            headerName: "Asset",
            flex: 1,
        },
        {
            field: "payment",
            headerName: "Payment",
            flex: 1,
        },
        {
            field: "date",
            headerName: "Date",
            flex: 1,
            renderCell: ({ row: { date } }) =>
                dayjs(date).format('YYYY-MM-DD'),
            editable: true,
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            headerAlign: "left",
            align: "left",
            editable: true,
            cellClassName: ({ row: {amount}}) => amount > 0 ? "positive" : "negative",
        },
        {
            field: "tag",
            headerName: "Tag",
            cellClassName: "positive",
            type: "singleSelect",
            valueOptions: tagNames,
            editable: true,
            flex: 1,
        },
        {
            field: "description",
            headerName: "Description",
            editable: true,
            flex: 1,
        },
        {
            field: "save",
            headerName: "Save",
            flex: 1,
            renderCell: ({ row }) => {
                return (
                    <Button
                        sx={{
                            backgroundColor: `${colors.greenAccent[600]}`,
                            display: "flex",
                            justifyContent: "center",
                        }}
                        onClick={async() => {
                            let {amount, asset, create_time, date, description,
                                 id, name, payment, tag, __typename} = row
                            let typename = __typename;
                            await update({
                                variables: {
                                    amount, asset, create_time, date, description,
                                    id, name, payment, tag, typename
                                },
                                context: { headers: { token: token } },
                            });
                        }}
                    >
                        save
                    </Button>
                );
            },
        },
        {
            field: "delete",
            headerName: "Delete",
            flex: 1,
            renderCell: ({ row: { id } }) => {
                return (
                    <DeleteIcon
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                        onClick={async () => {
                            console.log(id);
                            await Delete({
                                variables: {
                                    id,
                                },
                                context: { headers: { token: token } },
                            });
                        }}
                    >
                        save
                    </DeleteIcon>
                );
            },
        },
    ];

    return (
        <>
            <Box m="20px">
                <Header title="RECORDS" subtitle="List of records for User" />
                <Box
                    m="40px 0 0 0"
                    height="75vh"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                        },
                        "& .positive": {
                            color: colors.greenAccent[300],
                        },
                        "& .negative": {
                            color: colors.redAccent[300],
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: colors.blueAccent[700],
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: colors.primary[400],
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: colors.blueAccent[700],
                        },
                        "& .MuiCheckbox-root": {
                            color: `${colors.greenAccent[200]} !important`,
                        },
                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `${colors.grey[100]} !important`,
                        },
                    }}
                >
                    <DataGrid
                        rows={data?.allRecords ? data.allRecords : []}
                        columns={columns}
                        components={{ Toolbar: bar }}
                    />
                </Box>
            </Box>
            <RecordModal
                open={recordOpen}
                onCreate={async ({
                    name,
                    dateTmp,
                    description,
                    tagName,
                    amount,
                    assetPayment,
                    income
                    // assetname,
                    // paymentname,
                }) => {
                    try {
                        const date = dayjs(dateTmp).format("YYYY-MM-DD");
                        console.log({
                            name,
                            dateTmp,
                            description,
                            tagName,
                            amount,
                            assetPayment,
                            income
                            // assetname,
                            // paymentname,
                        });
                        const assetname = assetPayment.split(" ")[0];
                        const paymentname = assetPayment.split(" ")[1];
                        // const tagname = tagName[0];
                        const tagname = tagName;
                        // console.log(tagname);
                        amount = income ? amount : -amount;
                        await create({
                            variables: {
                                name,
                                date,
                                description,
                                tagname,
                                amount,
                                assetname,
                                paymentname,
                            },
                            context: { headers: { token: token } },
                        });
                        message.success({
                            content:
                                "The payment has been created successfully.",
                            duration: 0.8,
                        });
                    } catch (e) {
                        console.log(e);
                        message.error({
                            content: "The name has been used.",
                            duration: 0.8,
                        });
                    }
                    setRecordOpen(false);
                }}
                onCancel={() => {
                    setRecordOpen(false);
                }}
            />
        </>
    );
};

export default Record;
