import { Box, Typography, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockExpenses } from "../data/mockExpenses";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useTheme } from "@mui/material";
import { date } from "yup";
import { GridValueFormatterParams } from "@mui/x-data-grid";
import { formatDate } from "@fullcalendar/react";
import { useQuery } from "@apollo/client";
import { useFind } from "../hooks/useFind";
import { useUser } from "../hooks/useUser";
import { useTag } from "../hooks/useTag";
import { useNavigate, useLocation } from "react-router-dom";
import { display } from "@mui/system";
import { GET_ALL_RECORDS } from "../graphql/query";
import { message } from "antd";
import TagModal from "../components/TagModal";
import AddBar from "../components/AddBar";

const Tag = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { getAsset, getPayment } = useFind();
    const { token, email } = useUser();
    const { data, update } = useTag();
    const [tagOpen, setTagOpen] = useState(false);

    const bar = () => {
        return <AddBar setOpen={setTagOpen} color={colors.primary[100]} />;
    };

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            editable: true,
        },
        {
            field: "times",
            headerName: "Times",
            flex: 1,
            editable: true,
        },
    ];

    return (
        <>
            <Box m="20px">
                <Header title="TAGS" subtitle="List of tags for User" />
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
                        rows={data?.allTags ? data?.allTags : []}
                        columns={columns}
                        components={{ Toolbar: bar }}
                    />
                </Box>
            </Box>
            <TagModal
                open={tagOpen}
                onCreate={async ({ name, times }) => {
                    try {
                        await update({
                            variables: {
                                name,
                                times,
                            },
                            context: { headers: { token: token } },
                        });
                        message.success({
                            content: "The tag has been created successfully.",
                            duration: 0.8,
                        });
                    } catch (e) {
                        message.error({
                            content: "The name has been used.",
                            duration: 0.8,
                        });
                    }
                    setTagOpen(false);
                }}
                onCancel={() => {
                    setTagOpen(false);
                }}
            />
        </>
    );
};

export default Tag;
