import { Box, Typography, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
// import { mockExpenses } from "../data/mockExpenses";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useTheme } from "@mui/material";
import { date } from "yup";
import { GridValueFormatterParams } from "@mui/x-data-grid";
import { formatDate } from "@fullcalendar/react";
import AssetModal from "../components/AssetModal";
import PaymentModel from "../components/PaymentModal";
import AddIcon from "@mui/icons-material/Add";
import { useUser } from "../hooks/useUser";
import { message } from "antd";
import { useAsset } from "../hooks/useAsset";
import { usePayment } from "../hooks/usePayment";
import AddBar from "../components/AddBar";
import dayjs from "dayjs";

const Payment = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { token, email } = useUser();
    const { data: data1 } = useAsset();
    const { data, create, update } = usePayment();
    const [paymentOpen, setPaymentOpen] = useState(false);

    const bar = () => {
        return <AddBar setOpen={setPaymentOpen} color={colors.primary[100]} />;
    };

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        {
            field: "name",
            headerName: "Name",
            cellClassName: "name-column--cell",
            // editable: true,
        },
        {
            field: "type",
            headerName: "Type",
            // editable: true,
        },
        {
            field: "asset",
            headerName: "Asset",
        },
        {
            field: "available",
            headerName: "Available",
            type: 'boolean',
            editable: true,
            flex: 1,
        },
        {
            field: "date",
            headerName: "Date",
            renderCell: ({ row: { date } }) =>
                dayjs(date).format('YYYY-MM-DD'),
            editable: true,
            flex: 1,
        },
        {
            field: "webs",
            headerName: "Webs",
            flex: 1,
        },
        {
            field: "description",
            headerName: "Description",
            flex: 1,
            editable: true,
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
                            let { asset, available, create_time, date, description, 
                                id, name, type, webs, __typename} = row;
                            let typename = __typename;

                            await update({
                                variables: {
                                    asset, available, create_time, date, description, 
                                id, name, type, webs, typename
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
    ];

    return (
        <>
            <Box m="20px">
                <Header title="PAYMENTS" subtitle="List of payments for User" />
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
                        "& .name-column--cell": {
                            color: colors.greenAccent[300],
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
                        rows={data?.allPayments ? data?.allPayments : []}
                        columns={columns}
                        components={{ Toolbar: bar }}
                    />
                </Box>
            </Box>
            <PaymentModel
                open={paymentOpen}
                select={data1 !== undefined ? data1.allAssets : []}
                onCreate={async ({
                    name,
                    description,
                    type,
                    asset,
                    available,
                    create_time,
                }) => {
                    // const year = create_time.$d.getFullYear().toString();
                    // const month = (create_time.$d.getMonth() + 1).toString();
                    // const day = create_time.$d.getDate().toString();
                    // const date = year + "-" + month + "-" + day;
                    const date = dayjs(create_time).format("YYYY-MM-DD");
                    console.log(
                        name,
                        description,
                        type,
                        date,
                        asset,
                        available
                    );
                    try {
                        await create({
                            variables: {
                                name,
                                description,
                                type,
                                date,
                                asset,
                                available,
                                webs: [],
                            },
                            context: { headers: { token: token } },
                        });
                        message.success({
                            content:
                                "The payment has been created successfully.",
                            duration: 0.8,
                        });
                    } catch (e) {
                        message.error({
                            content: "The name has been used.",
                            duration: 0.8,
                        });
                    }
                    setPaymentOpen(false);
                }}
                onCancel={() => {
                    setPaymentOpen(false);
                }}
            />
        </>
    );
};

export default Payment;
