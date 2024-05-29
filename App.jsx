import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavigationMenu } from "@shopify/app-bridge-react";
// import Routes from "./Routes";
import "./index.css";

import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
  NavigationBar,
} from "./components";
import HomePage from "./pages";
import { Product } from "./pages/Product";
import TranslateText from "./pages/TranslateText";

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");
  const { t } = useTranslation();

  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
            <NavigationMenu navigationLinks={[]} />
            <div className="flex">
              <div className="w-1/12">
                <NavigationBar />
              </div>
              <div className="w-11/12 pl-10 mr-10 ml-8">
                <Routes>
                  <Route path="/home" element={<HomePage />}></Route>
                  <Route path="/product" element={<Product />}></Route>
                  <Route path="/translate" element={<TranslateText />}></Route>
                </Routes>
              </div>
            </div>

            {/* <Routes pages={pages} /> */}
          </QueryProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
