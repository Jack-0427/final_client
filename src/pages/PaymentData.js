import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { useAsset } from "../hooks/useAsset"
import { usePayment } from "../hooks/usePayment"
import { useRecord } from "../hooks/useRecord"
import { useTag } from "../hooks/useTag"
import { mockPieData as data } from "../data/mockData";
import { mockAssets } from "../data/mockAssets";

const PaymentData = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { data: assetData } = useAsset();
    const { data: paymentData } = usePayment();
    const { data: recordData } = useRecord();
    const { data: tagData } = useTag();

    let income = 0;
    let expense = 0;
    const color = [
        "hsl(104, 70%, 50%)",
        "hsl(162, 70%, 50%)",
        "hsl(291, 70%, 50%)",
        "hsl(229, 70%, 50%)",
        "hsl(344, 70%, 50%)",
    ];

    let myAsset = assetData ? assetData.allAssets : [];
    let myRecord = recordData ? recordData.allRecords : [];
    let myTag = tagData ? tagData.allTags : [];

    let AssetData = myAsset.map((ele, i) => ({
            id: ele.name,
            label: ele.name,
            value: ele.balance,
            color: color[i],
    }));

    let TagData = myTag.map((ele, i) => ({
        id: ele.name,
        label: ele.name,
        value: ele.times,
        color: color[i],
    }));

    for(let i = 0; i < myRecord.length; i++){
        if(myRecord[i].amount > 0){
            income += myRecord[i].amount;
        }
        else{
            expense -= myRecord[i].amount;
        }
    }

    let ExpenseData = [{id: "expense", label: "expense", value: expense, color: color[0]},
                        {id: "income", label: "income", value: income, color: color[0]}]

    
    // let data = assetData.map((ele, i) => ({
    //     id: ele.name,
    //     label: ele.name,
    //     value: ele.amount,
    //     color: color[i],
    // }));

    // const p = {id: 'hack', label: 'hack', value: 239, color: 'hsl(104, 70%, 50%)'}
    // console.log(data)
    // console.log(mockAssets);
    // console.log(data)
    return (
        <ResponsivePie
            data={AssetData}
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
            }}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderColor={{
                from: "color",
                modifiers: [["darker", 0.2]],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={colors.grey[100]}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            enableArcLabels={false}
            arcLabelsRadiusOffset={0.4}
            arcLabelsSkipAngle={7}
            arcLabelsTextColor={{
                from: "color",
                modifiers: [["darker", 2]],
            }}
            defs={[
                {
                    id: "dots",
                    type: "patternDots",
                    background: "inherit",
                    color: "rgba(255, 255, 255, 0.3)",
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                {
                    id: "lines",
                    type: "patternLines",
                    background: "inherit",
                    color: "rgba(255, 255, 255, 0.3)",
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                },
            ]}
            legends={[
                {
                    anchor: "bottom",
                    direction: "row",
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: "#999",
                    itemDirection: "left-to-right",
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: "circle",
                    effects: [
                        {
                            on: "hover",
                            style: {
                                itemTextColor: "#000",
                            },
                        },
                    ],
                },
            ]}
        />
    );
};

export default PaymentData;
