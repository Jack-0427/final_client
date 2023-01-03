import {
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    GridToolbarExport,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";

const bar = ({ setOpen, color }) => {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
            <div
                style={{
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "center",
                }}
                onClick={() => {
                    // setPaymentOpen(true);
                    setOpen(true);
                }}
            >
                <AddIcon
                    style={{
                        alignSelf: "center",
                    }}
                />
                <div
                    style={{
                        fontSize: "13px",
                        color: color,
                        alignSelf: "center",
                    }}
                >
                    &nbsp;ADD
                </div>
            </div>
        </GridToolbarContainer>
    );
};

export default bar;
