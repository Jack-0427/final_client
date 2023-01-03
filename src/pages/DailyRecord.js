import { Box, Typography, Button } from "@mui/material";
import { Pie } from "@nivo/pie";
import {
    DataGrid,
    gridColumnGroupsLookupSelector,
    GridToolbar,
} from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockExpenses } from "../data/mockExpenses";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useTheme } from "@mui/material";
import { useFind } from "../hooks/useFind";
import { useUser } from "../hooks/useUser";
import { useRecord } from "../hooks/useRecord";
import { useNavigate, useLocation } from "react-router-dom";
import { display } from "@mui/system";
import { GET_ALL_RECORDS } from "../graphql/query";
import { message } from "antd";
import RecordModal from "../components/RecordModal";
import AddBar from "../components/AddBar";
import { DatePicker, Space, Radio, Divider } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import {
    CaretLeftOutlined,
    CaretRightOutlined,
  } from '@ant-design/icons';// import CaretRightOutlined from "@mui/icons-material/CaretRightOutlined";

const dayFormat = "YYYY-MM-DD";
const monthFormat = "YYYY-MM";
const yearFormat = "YYYY";

const DailyRecord = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { data, update } = useRecord();

    const [dayPick, setDayPick] = useState("day"); // default is 'middle'
    const [chooseDate, setChooseDate] = useState(dayjs().format(dayFormat));
    const [chooseMonth, setChooseMonth] = useState(dayjs().format(monthFormat));
    const [chooseYear, setChooseYear] = useState(dayjs().format(yearFormat));

    const onChange = (date, dateString) => {
        console.log(date, dateString);
        if (dayPick === "day") {
            setChooseDate(dateString);
        }
        if (dayPick === "month") {  
            setChooseMonth(dateString);
        }
        if (dayPick === "year") {
            setChooseYear(dateString);
        }
    };

    const bar = () => {
        return (
            <AddBar
                setOpen={() => {}} color={colors.primary[100]} />
            );
        }

    const columns = [
            { field: "id", headerName: "ID", flex: 0.5 },
            { field: "name", headerName: "Name", flex: 1 },
            {
                field: "asset",
                headerName: "Asset",
                flex: 1,
                editable: true,
                // renderCell: ({ row: { asset, id } }) => {
                //     return (
                //         <Box
                //             backgroundColor={colors.greenAccent[600]}
                //             borderRadius="4px"
                //             display="flex"
                //             justifyContent="center"
                //             onClick={() => {
                //                 getAsset(id);
                //                 navigate(`/asset/${id}`);
                //             }}
                //         >
                //             {asset}
                //         </Box>
                //     );
                // },
            },
            {
                field: "payment",
                headerName: "Payment",
                flex: 1,
                editable: true,
                // renderCell: ({ row: { payment, id } }) => {
                //     return (
                //         <Box
                //             backgroundColor={colors.greenAccent[600]}
                //             borderRadius="4px"
                //             display="flex"
                //             justifyContent="center"
                //             onClick={() => {
                //                 getPayment(id);
                //                 navigate(`/payment/${id}`);
                //             }}
                //         >
                //             {payment}
                //         </Box>
                //     );
                // },
            },
            {
                field: "date",
                headerName: "Date",
                type: "date",
                flex: 1,
                editable: true,
            },
            {
                field: "amount",
                headerName: "Amount",
                type: "number",
                headerAlign: "left",
                align: "left",
                editable: true,
            },
            {
                field: "tag",
                headerName: "Tag",
                cellClassName: "name-column--cell",
                flex: 1,
            },
            {
                field: "description",
                headerName: "Description",
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
                            onClick={() => {
                                console.log(row);
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
                            onClick={() => {
                                console.log(id);
                            }}
                        >
                            save
                        </DeleteIcon>
                    );
                },
            },
        ];

    const allRecords = data?.allRecords ? data.allRecords : [];

    const filteredRecords = allRecords
    .filter((record) => {
        if (dayPick === "day") {
            return record.date === chooseDate;
        } else if (dayPick === "month") {
            return (
                record.date.substring(0, 7) === chooseMonth
            );
        } else if (dayPick === "year") {
            return (
                record.date.substring(0, 4) === chooseYear
            );
        }
    })

    return (
        <Box m="20px">
            <Header
                title="Daily RECORDS"
                subtitle="List of records for use in daily"
            />
            <Box m="20px 0 0 0"
                height="10vh"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    // "justify-content": "center",
                    alignItems: "center",
                    // backgroundColor: "red",
                }}
            >
                                <Radio.Group
                    value={dayPick}
                    onChange={(e) => setDayPick(e.target.value)}
                >
                    <Radio.Button value="day">Day</Radio.Button>
                    <Radio.Button value="month">Month</Radio.Button>
                    {/* <Radio.Button value="quarter">Quarter</Radio.Button> */}
                    <Radio.Button value="year">Year</Radio.Button>
                </Radio.Group>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // backgroundColor: "red",
                }}>
                    <CaretLeftOutlined 
                        style={{
                            fontSize: "20px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            if (dayPick === "day") {
                                setChooseDate(dayjs(chooseDate, dayFormat).subtract(1, "day").format(dayFormat));
                            } else if (dayPick === "month") {
                                setChooseMonth(dayjs(chooseMonth, monthFormat).subtract(1, "month").format(monthFormat));
                            } else if (dayPick === "year") {
                                setChooseYear(dayjs(chooseYear, yearFormat).subtract(1, "year").format(yearFormat));
                            }
                        }}

                    />
                {dayPick === "day" && (
                    <DatePicker
                        onChange={onChange}
                        picker={dayPick}
                        format={dayFormat}
                        // defaultValue={dayjs(chooseDate, dayFormat)}
                        allowClear={false}
                        value={dayjs(chooseDate, dayFormat)}
                    />
                )}
                {dayPick === "month" && (
                    <DatePicker
                        onChange={onChange}
                        picker={dayPick}
                        format={monthFormat}
                        // defaultValue={dayjs(chooseMonth, monthFormat)}
                        allowClear={false}
                        value={dayjs(chooseMonth, monthFormat)}
                    />
                )}
                {/* {dayPick === "quarter" && <DatePicker onChange={onChange} picker={dayPick} format={dayFormat}/>} */}
                {dayPick === "year" && (
                    <DatePicker
                        onChange={onChange}
                        picker={dayPick}
                        format={yearFormat}
                        allowClear={false}
                        // defaultValue={dayjs(chooseYear, yearFormat)}
                        value={dayjs(chooseYear, yearFormat)}
                    />
                )}
                    <CaretRightOutlined
                        style={{
                            fontSize: "20px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            if (dayPick === "day") {
                                setChooseDate(dayjs(chooseDate, dayFormat).add(1, "day").format(dayFormat));
                            } else if (dayPick === "month") {
                                setChooseMonth(dayjs(chooseMonth, monthFormat).add(1, "month").format(monthFormat));
                            } else if (dayPick === "year") {
                                setChooseYear(dayjs(chooseYear, yearFormat).add(1, "year").format(yearFormat));
                            }
                        }}
                    />
                </div>
                {/* <Divider /> */}
                {/* <div>choose date: {
                
                    }
                </div> */}

                { dayPick === "day" && <div>Choose Date: {chooseDate}</div>}
                { dayPick === "month" && <div>Choose Month: {chooseMonth}</div>}
                { dayPick === "year" && <div>Choose Year: {chooseYear}</div>}

                <div>Total: {
                    filteredRecords.reduce((acc, record) => {
                        return acc + record.amount
                    }
                    , 0)
                }</div>
                {/* <DatePicker onChange={onChange} picker={dayPick} /> */}
                {/* <DatePicker onChange={onChange} picker="month" /> */}
                {/* <DatePicker onChange={onChange} picker="quarter" /> */}
                {/* <DatePicker onChange={onChange} picker="year" /> */}

                {/* <div>
                    {allRecords
                        .filter((record) => {
                            if (dayPick === "day") {
                                return record.date === chooseDate;
                            } else if (dayPick === "month") {
                                return (
                                    record.date.substring(0, 7) === chooseDate
                                );
                            } else if (dayPick === "year") {
                                return (
                                    record.date.substring(0, 4) === chooseDate
                                );
                            }
                        })
                        .map((record) => {
                            return (
                                <div key={record.id}>
                                    <div>{record.name}</div>
                                    <div>{record.amount}</div>
                                    <div>{record.date}</div>
                                </div>
                            );
                        })}
                </div> */}
            </Box>   
            <Box
                m="40px 0 0 0"
                height="65vh"
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
                {
                    <DataGrid
                        rows={
                            filteredRecords 
                        }
                        columns={columns}
                        components={{ Toolbar: bar }}
                    />
                }
            </Box>
        </Box>
    );
};

export default DailyRecord;
