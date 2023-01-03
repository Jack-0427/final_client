import { AssetProvider } from "./hooks/useAsset";
import { TagProvider } from "./hooks/useTag";
import { RecordProvider } from "./hooks/useRecord";
import { PaymentProvider } from "./hooks/usePayment";

const DataProvider = () => {
    return (
        <>
            <AssetProvider />
            <TagProvider />
            <RecordProvider />
            <PaymentProvider />
        </>
    );
};

export default DataProvider;
