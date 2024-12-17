import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { setupIonicReact } from "@ionic/react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./pages/LoginPage/function/loginContext";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
const container = document.getElementById("root");
const root = createRoot(container!);

//! Chuyển tất CSS sang nền tảng IOS để thống nhất
setupIonicReact({
  mode: "ios",
});
//! end

//! Chuyển hướng nếu là điện thoại
if (window.screen.width < 800) {
  // window.location.replace("https://mobile-btdbf-equipment-manager.web.app")
}

//! end
root.render(
  // <React.StrictMode>

  <AuthProvider>
    <App />
  </AuthProvider>

  // </React.StrictMode>
);
defineCustomElements(window); //:PWA Elements
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
