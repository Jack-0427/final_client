import { Box, Typography, Button } from "@mui/material";
import Header from "../components/Header";
import { tokens, useMode } from "../theme";
import { useTheme } from "@mui/material";

// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/calendar
import { ResponsiveCalendar } from '@nivo/calendar'
import { useRecord } from "../hooks/useRecord";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveCalendar = ({ data, monthColor /* see data tab */ }) => {
    console.log(monthColor);
    return (<ResponsiveCalendar
        data={data}
        from="2022-03-01"
        to="2023-07-12"
        emptyColor="#eeeeee"
        colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor={monthColor}
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'row',
                translateY: 36,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left'
            }
        ]}
    />)
}

const DayDot = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { data, update } = useRecord();
    console.log(colors);
    
    const allRecords = data?.allRecords ? data.allRecords : [];    

    // calculate the total amount of each day, on acc
    const totalAmountByDay = allRecords.reduce((acc, record) => {
        const date = record.date;
        const amount = record.amount;
        if (acc[date]) {
            acc[date] += amount;
        } else {
            acc[date] = amount;
        }
        return acc;
    }, {});

    // console.log(totalAmountByDay);

    return (
        <Box m="20px">
        <Header
            title="Daily RECORDS"
            subtitle="List of records for use in daily"
        />
        <Box m="40px 0 0 0" height="75vh"
            sx = {{
                // width: "100%",
                // height: "100%",
                // backgroundColor: "#ffffff",
                // backgroundColor: "powderblue",
                backgroundColor: "lightblue",
                borderRadius: "5px",
                boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
                color: "black",
            }}
        >
            <MyResponsiveCalendar 
                monthColor={colors.primary[300]}
                data={
                    Object.keys(totalAmountByDay).map((date) => {
                        return {
                            day: date,
                            value: totalAmountByDay[date]
                        }
                    }

                )
                }
            />
        </Box>
    </Box>

    )
}

export default DayDot