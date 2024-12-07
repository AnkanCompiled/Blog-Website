import React, { useState, lazy, Suspense } from "react";
import PageLoadingComponent from "../components/PageLoadingComponent";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import AppearanceComponent from "../components/AppearanceComponent";
const AccountComponent = lazy(() => import("../components/AccountComponent"));

export default function SettingPage() {
  const [component, setComponent] = useState("default");

  const renderComponent = () => {
    switch (component) {
      case "account":
        return (
          <Suspense fallback={<PageLoadingComponent background={false} />}>
            <AccountComponent />;
          </Suspense>
        );
      case "appearance":
        return <AppearanceComponent />;
      default:
        return <DefaultComponent />;
    }
  };

  return (
    <div className="main_screen overflow-x-hidden min-h-screen flex flex-col">
      <NavbarComponent />

      <div className="flex-1 grid grid-cols-1 xl:grid-cols-[1fr_5fr]">
        {/* Tab */}
        <div
          className={`bg-gradient-to-b dark:from-gray-700 dark:to-[#222222] from-gray-400 to-gray-100 m-5 rounded-xl ${
            component === "default" ? "block" : "hidden"
          } xl:block`}
        >
          <div className="flex flex-col gap-5 items-center xl:items-start p-5">
            <button
              className={`setting_button ${
                component === "account"
                  ? "font-bold"
                  : "hover:text-gray-700 hover:dark:text-gray-300"
              }`}
              onClick={() => setComponent("account")}
            >
              Account
            </button>
            <button
              className={`setting_button ${
                component === "appearance"
                  ? "font-bold"
                  : "hover:text-gray-700 hover:dark:text-gray-300"
              }`}
              onClick={() => setComponent("appearance")}
            >
              Appearance
            </button>
          </div>
        </div>
        {/* Main */}
        <div
          className={` bg-gradient-to-b dark:from-gray-700 dark:to-[#222222] from-gray-400 to-gray-100 m-5 rounded-xl p-10 ${
            component !== "default" ? "block" : "hidden"
          } xl:block`}
        >
          <div className="w-full flex justify-end mb-3">
            <button
              className="block xl:hidden text-gray-600 hover:text-gray-700 dark:text-gray-400 hover:dark:text-gray-300 transition-colors"
              onClick={() => setComponent("default")}
            >
              ← Back to Settings
            </button>
          </div>
          <div className="block xl:hidden w-full h-0.5 bg-gray-500 rounded-xl my-4"></div>
          {renderComponent()}
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}

function DefaultComponent() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <h1 className="text-4xl font-bold dark:text-gray-100 text-gray-800">
        Settings
      </h1>
    </div>
  );
}
