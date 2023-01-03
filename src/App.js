import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Record from "./pages/Record";
import Asset from "./pages/Asset";
import Payment from "./pages/Payment";
import AssetData from "./pages/AssetData";
import PaymentData from "./pages/PaymentData";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Tag from "./pages/Tag";
import Calendar from "./scenes/calendar/calendar";
import MainPage from "./User/MainPage";
import { useUser } from "./hooks/useUser";
import { useNavigate } from "react-router-dom";
import { AssetProvider } from "./hooks/useAsset";
import { PaymentProvider } from "./hooks/usePayment";
import { TagProvider } from "./hooks/useTag";
import { RecordProvider } from "./hooks/useRecord";
import DailyRecord from "./pages/DailyRecord";
import AssetManagement from "./pages/AssetManagement";
import DayDot from "./pages/DayDot";

function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const { LoginSuccess } = useUser();
    return LoginSuccess ? (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <Sidebar isSidebar={isSidebar} />
                    <main className="content">
                        <Topbar setIsSidebar={setIsSidebar} />
                        <AssetProvider>
                            <PaymentProvider>
                                <TagProvider>
                                    <RecordProvider>
                                        <Routes>
                                            <Route
                                                path="/"
                                                element={<Dashboard />}
                                            />
                                            <Route
                                                path="/team"
                                                element={<Team />}
                                            />
                                            <Route
                                                path="/contacts"
                                                element={<Contacts />}
                                            />
                                            <Route
                                                path="/invoices"
                                                element={<Invoices />}
                                            />
                                            <Route
                                                path="/form"
                                                element={<Form />}
                                            />
                                            <Route
                                                path="/bar"
                                                element={<Bar />}
                                            />
                                            <Route
                                                path="/pie"
                                                element={<Pie />}
                                            />
                                            <Route
                                                path="/line"
                                                element={<Line />}
                                            />
                                            <Route
                                                path="/faq"
                                                element={<FAQ />}
                                            />
                                            <Route
                                                path="/calendar"
                                                element={<Calendar />}
                                            />
                                            <Route
                                                path="/geography"
                                                element={<Geography />}
                                            />
                                            <Route
                                                path="/record/dayDot"
                                                element={<DayDot />}
                                            />
                                            <Route
                                                path="/record/daily"
                                                element={<DailyRecord />}
                                            />
                                            <Route
                                                path="/asset/management"
                                                element={<AssetManagement />}
                                            />
                                            <Route
                                                path="/record"
                                                element={<Record />}
                                            />
                                            <Route
                                                path="/asset"
                                                element={<Asset />}
                                            />
                                            <Route
                                                path="/payment"
                                                element={<Payment />}
                                            />
                                            <Route
                                                path="/tag"
                                                element={<Tag />}
                                            />
                                            <Route
                                                path="/data"
                                                element={<AssetData />}
                                            />
                                            <Route
                                                path="/pies"
                                                element={<PaymentData />}
                                            />
                                        </Routes>
                                    </RecordProvider>
                                </TagProvider>
                            </PaymentProvider>
                        </AssetProvider>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    ) : (
        <MainPage />
    );
}

export default App;
