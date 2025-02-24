import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, Switch } from "react-router-dom";
import Menu from "./components/JSX_Components/Menu/Menu";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/* Theme variables */
import "./theme/variables.css";
//! Import
import { useContext, useEffect, useState } from "react";
import "./App.css";
import { decryptCrypto } from "./components/FC_Components/crypto";
import { AuxiliaryDataProvider } from "./context/auxiliaryDataContext";
import MainDataContext from "./context/mainDataContext";
import CreateEquipPage from "./pages/CreateEquipPage/CreateEquipPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import EditPage from "./pages/EditPage/EditPage";
import HelpsPage from "./pages/HelpsPage/HelpsPage";
import LoadingPage from "./pages/LoadingPage/LoadingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { AuthContext } from "./pages/LoginPage/function/loginContext";
import LogsPage from "./pages/LogsPage/LogsPage";
import MainPage from "./pages/MainPage/MainPage";
import QRScan from "./pages/QRScan/QRScan";
import TrashPage from "./pages/TrashPage/TrashPage";
import { ProgressTagProvider } from "./context/progressTagContext";

//! end
setupIonicReact();

const App: React.FC = () => {
  console.log("%cApp Render", "color:green");
  const { authorLogin, setAuthorLogin } = useContext<any>(AuthContext);
  const [loading, setLoading] = useState<"loading" | "logged" | "not logged">("loading");
  const date = new Date();
  useEffect(() => {
    if (authorLogin) {
      setLoading("logged");
    } else {
      //TODO: Get authorLogin cookie
      // const getCookie = async () => {
      //   const cookie: HttpCookie = await Http.getCookie({
      //     url: "http://equipment.manager",
      //     key: "authorLogin",
      //   });
      //   if (cookie.value) {
      //     const auth = JSON.parse(cookie.value);
      //     if (auth.expiresTime === date.getDate()) {
      //       console.log("🚀 ~ file: App.tsx:55 ~ getCookie ~ auth:", auth);
      //       setAuthorLogin(auth);
      //     } else {
      //       setLoading("not logged");
      //     }
      //   } else {
      //     setLoading("not logged");
      //   }
      // };
      // getCookie();
      /////////////////////////////////////////////////////////
      const authorTemp = localStorage.getItem("authorLogin");
      if (authorTemp) {
        const now = new Date();
        const oneDayInMs = 24 * 60 * 60 * 1000; // 1 day in milliseconds
        const authorDecryptTemp = decryptCrypto(authorTemp);
        if (now.getTime() - authorDecryptTemp?.timestamp >= oneDayInMs) {
          localStorage.removeItem("authorLogin"); // Remove data if it's older than 1 day
          setLoading("not logged");
        } else {
          setAuthorLogin(authorDecryptTemp);
        }
      } else {
        setLoading("not logged");
      }
      //TODO_END: Get authorLogin cookie
    }
  }, [authorLogin]);
  return (
    <MainDataContext>
      <AuxiliaryDataProvider>
        <ProgressTagProvider>
          <IonApp>
            <IonReactRouter>
              {loading === "loading" && <h3 style={{ textAlign: "center", height: "100%", paddingTop: "90%" }}>Loading ...</h3>}
              {loading === "not logged" && (
                <IonRouterOutlet>
                  <Switch>
                  <Route path="/page/Detail/QRCode/:id" exact={true}>
                      <DetailPage />
                    </Route>             
                    <Route path="*">
                      <LoginPage />
                    </Route>
                  </Switch>
                </IonRouterOutlet>
              )}
              {loading === "logged" && authorLogin && (
                <IonSplitPane contentId="main" when="(min-width: 800px)">
                  <Menu dispatch={setLoading} />

                  <IonRouterOutlet id="main">
                    <Route path="/" exact={true}>
                      <Redirect to="/page/Main" />
                    </Route>
                    <Route path="/page/Main" exact={true}>
                      <MainPage />
                    </Route>
                    <Route path="/page/Create" exact={true}>
                      <CreateEquipPage />
                    </Route>
                    <Route path="/page/QRScan" exact={true}>
                      <QRScan />
                    </Route>

                    <Route path="/page/Edit/:id" exact={true}>
                      <EditPage />
                    </Route>
                    <Route path="/page/Logs" exact={true}>
                      <LogsPage />
                    </Route>
                    <Route path="/page/Trash" exact={true}>
                      <TrashPage />
                    </Route>
                    <Route path="/page/Info" exact={true}>
                      <HelpsPage />
                    </Route>
                    <Route path="/page/Detail/:id" exact={true}>
                      <DetailPage />
                    </Route>
                    
                    <Route path="/page/Detail/QRCode/:id" exact={true}>
                      <DetailPage />
                    </Route>
                    <Route path="/page/Redirect" exact={true}>
                      <LoadingPage />
                    </Route>
                  </IonRouterOutlet>
                </IonSplitPane>
              )}
            </IonReactRouter>
          </IonApp>
        </ProgressTagProvider>
      </AuxiliaryDataProvider>
    </MainDataContext>
  );
};

export default App;
