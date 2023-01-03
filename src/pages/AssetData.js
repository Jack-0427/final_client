import { useParams } from "react-router-dom";
import { mockExpenses } from "../data/mockExpenses";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { DatePicker } from "antd";
import { useState } from "react";
import { useAsset } from "../hooks/useAsset"
import { usePayment } from "../hooks/usePayment"
import { useRecord } from "../hooks/useRecord"
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

const AssetData = ({ isCustomLineColors = false, isDashboard = false }) => {
    const { id } = useParams();
    const theme = useTheme();
    const { data: assetData } = useAsset();
    const { data: paymentData } = usePayment();
    const { data: recordData } = useRecord();
    console.log(assetData, "p");
    console.log(paymentData, "p");
    console.log(recordData, "p");
    const colors = tokens(theme.palette.mode);
    const color = { 富邦銀行: "#4cceac", 中國信託: "#a4a9fc", 其他: "#f1b9b7" };
    const [startTime, setStartTime] = useState(new Date("2022-01-01"));
    const [endTime, setEndTime] = useState(new Date("2022-01-15"));
    // console.log(startTime);
    // console.log(endTime);
    let data = [];
    let value;

    // console.log(value);
    const ToMonth = {
        Jan: 1,
        Feb: 2,
        Mar: 3,
        Apr: 4,
        May: 5,
        Jun: 6,
        Jul: 7,
        Aug: 8,
        Sep: 9,
        Oct: 10,
        Nov: 11,
        Dec: 12,
    };

    // const test = mockExpenses.map(ele => parseInt(ele.date.toString().split(" ")[2]))
    const filter = mockExpenses.filter(
        (ele) => ele.date >= startTime && ele.date <= endTime
    );
    const groupByCategory = filter.reduce((group, expense) => {
        const { asset } = expense;
        group[asset] = group[asset] ?? [];
        group[asset].push(expense);
        return group;
    }, {});

    for (const key in groupByCategory) {
        // console.log(groupByCategory[key])
        let balance = new Array(32).fill(0);
        let chart = [];
        let test = groupByCategory[key].map((ele) =>
            parseInt(ele.date.toString().split(" ")[2])
        );
        for (let i = 0; i < groupByCategory[key].length; i++) {
            balance[test[i]] += groupByCategory[key][i].price;
        }
        for (let i = 1; i < 32; i++) {
            balance[i] = balance[i - 1] + balance[i];
        }
        for (let i = 1; i < 32; i++) {
            chart.push({ x: i, y: balance[i] });
        }
        data.push({ data: chart, id: key, color: color[key] });
    }

    return (
        <>
            <RangePicker
                defaultValue={[
                    dayjs("2022-01-01", dateFormat),
                    dayjs("2022-01-15", dateFormat),
                ]}
                onChange={(time, timeString) => {
                    setStartTime(time[0]);
                    setEndTime(time[1]);
                }}
                format={dateFormat}
            />
            <ResponsiveLine
                data={data}
                theme={{
                    axis: {
                        domain: {
                            line: {
                                stroke: colors.grey[100],
                            },
                        },
                        legend: {
                            text: {
                                fill: colors.grey[100],
                            },
                        },
                        ticks: {
                            line: {
                                stroke: colors.grey[100],
                                strokeWidth: 1,
                            },
                            text: {
                                fill: colors.grey[100],
                            },
                        },
                    },
                    legends: {
                        text: {
                            fill: colors.grey[100],
                        },
                    },
                    tooltip: {
                        container: {
                            color: colors.primary[500],
                        },
                    },
                }}
                colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    stacked: true,
                    reverse: false,
                }}
                yFormat=" >-.2f"
                curve="catmullRom"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: "bottom",
                    tickSize: 0,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: isDashboard ? undefined : "transportation", // added
                    legendOffset: 36,
                    legendPosition: "middle",
                }}
                axisLeft={{
                    orient: "left",
                    tickValues: 5, // added
                    tickSize: 3,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: isDashboard ? undefined : "count", // added
                    legendOffset: -40,
                    legendPosition: "middle",
                }}
                enableGridX={false}
                enableGridY={false}
                pointSize={8}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: "bottom-right",
                        direction: "column",
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: "left-to-right",
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: "circle",
                        symbolBorderColor: "rgba(0, 0, 0, .5)",
                        effects: [
                            {
                                on: "hover",
                                style: {
                                    itemBackground: "rgba(0, 0, 0, .03)",
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
            />
        </>
        // <></>
    );
};

export default AssetData;
