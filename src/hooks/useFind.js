import { createContext, useState, useContext, useEffect } from "react";

const FindContext = createContext({
    assetId: 0,
    recordId: 0,
    paymentId: 0,
    getAsset: () => {},
    getRecord: () => {},
    getPayment: () => {},
});

const useFind = () => useContext(FindContext);

const FindProvider = (props) => {
    const [assetId, setAssetId] = useState(0);
    const [recordId, setRecordId] = useState(0);
    const [paymentId, setPaymentId] = useState(0);

    const getAsset = (id) => {
        setAssetId(id);
    };

    const getRecord = (id) => {
        setRecordId(id);
    };

    const getPayment = (id) => {
        setPaymentId(id);
    };

    return (
        <FindContext.Provider
            value={{
                assetId,
                recordId,
                paymentId,
                getAsset,
                getRecord,
                getPayment,
            }}
            {...props}
        />
    );
};

export { FindProvider, useFind };
