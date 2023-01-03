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
import { useUser } from "../hooks/useUser";
import { message } from "antd";
import { useAsset } from "../hooks/useAsset";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBar from "../components/AddBar";
import dayjs from "dayjs";

const Asset = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { token, email } = useUser();
    const { data, create, update } = useAsset();
    const [assetOpen, setAssetOpen] = useState(false);

    const bar = () => {
        return <AddBar setOpen={setAssetOpen} color={colors.primary[100]} />;
    };

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        {
            field: "name",
            headerName: "Name",
            cellClassName: "name-column--cell",
            editable: true,
        },
        {
            field: "balance",
            headerName: "Balance",
            editable: true,
        },
        {
            field: "available",
            headerName: "Available",
            type: 'boolean',
            editable: true,
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
                            let { available, balance, create_time, date, description,
                                  id, name, __typename, } = row;
                            let typename = __typename;
                            console.log(row);
                            await update({
                                variables: {
                                    available, 
                                    balance, 
                                    create_time, 
                                    date, 
                                    description,
                                    id, 
                                    name,
                                    typename,
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
                <Header title="ASSETS" subtitle="List of assets for User" />
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
                        rows={data?.allAssets ? data?.allAssets : []}
                        columns={columns}
                        components={{ Toolbar: bar }}
                    />
                </Box>
            </Box>
            <AssetModal
                open={assetOpen}
                onCreate={async ({
                    name,
                    balance,
                    description,
                    available,
                    create_time,
                }) => {
                    const date = dayjs(create_time).format("YYYY-MM-DD");
                    balance = parseInt(balance);
                    try {
                        await create({
                            variables: {
                                name,
                                description,
                                available,
                                date,
                                balance,
                            },
                            context: { headers: { token: token } },
                        });
                        message.success({
                            content: "The asset has been created successfully.",
                            duration: 0.8,
                        });
                    } catch (e) {
                        message.error({
                            content: "The name has been used.",
                            duration: 0.8,
                        });
                    }
                    setAssetOpen(false);
                }}
                onCancel={() => {
                    setAssetOpen(false);
                }}
            />
        </>
    );
};

export default Asset;
