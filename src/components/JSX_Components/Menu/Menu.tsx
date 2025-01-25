import { IonAvatar, IonButton, IonContent, IonIcon, IonImg, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, useIonRouter } from "@ionic/react";

import {
  informationCircleOutline,
  informationCircleSharp,
  mailOutline,
  mailSharp,
  moon,
  paperPlaneOutline,
  paperPlaneSharp,
  qrCodeOutline,
  qrCodeSharp,
  sunny,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
} from "ionicons/icons";
import { memo, useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../../../pages/LoginPage/function/loginContext";
import progressTagIcon from "../../../source/img/progressIcon.jpg";
import documentIcon from "../../../source/img/doccument-Icon.png";
import "./Menu.css";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Main",
    url: "/page/Main",
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  },
  {
    title: "Create",
    url: "/page/Create",
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp,
  },
  {
    title: "QRScan",
    url: "/page/QRScan",
    iosIcon: qrCodeOutline,
    mdIcon: qrCodeSharp,
  },

  {
    title: "Logs",
    url: "/page/Logs",
    iosIcon: warningOutline,
    mdIcon: warningSharp,
  },
  {
    title: "Trash",
    url: "/page/Trash",

    iosIcon: trashOutline,
    mdIcon: trashSharp,
  },
  {
    title: "Info",
    url: "/page/Info",
    iosIcon: informationCircleOutline,
    mdIcon: informationCircleSharp,
  },
];

const Menu = ({ dispatch }: { dispatch: Function }) => {
  console.log("%cMenu Render", "color:green");
  const location = useLocation();
  const history = useHistory();
  const { authorLogin } = useContext<any>(AuthContext);
  const router = useIonRouter();

  const [darkMode, setDarkMode] = useState(false);
  //! Dark mode
  useEffect(() => {
    const savedTheme = localStorage.getItem("dark-mode") === "true";
    setDarkMode(savedTheme);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("dark-mode", darkMode.toString());
  }, [darkMode]);

  const handelLogout = async () => {
    // const options = {
    //   url: "http://equipment.manager",
    //   key: "authorLogin",
    // };

    // await Http.clearCookies(options);
    await localStorage.removeItem("authorLogin");
    await dispatch("not logged");
  };

  const goBack = () => {
    if (router.canGoBack()) {
      router.goBack();
    } else {
      console.log("No previous route available");
    }
  };

  const routerDirection = (appPage: AppPage) => {
    if (appPage.title == "Main") {
      history.push({
        pathname: "/page/Redirect",
      });
      // window.location.href = "/page/Main";
    } else if (appPage.title == "Create") {
      router.push(appPage.url, "root");
    } else if (appPage.title == "QRScan") {
      router.push(appPage.url, "root");
    } else {
      history.push({
        pathname: appPage.url,
      });
    }
  };
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader className="ion-no-padding">
            <IonAvatar style={{ maxWidth: "30px", maxHeight: "30px", marginRight: "5px", border: "1px solid #6ac968" }}>
              <IonImg alt="Avatar" src={authorLogin.photoURL} />
            </IonAvatar>
            <span className="menu-logout fontSize-normal" onClick={handelLogout}>
              Logout
            </span>
          </IonListHeader>

          <div className="darkModeWrap">
            <IonNote className="fontSize-normal fontStyle-italic" style={{ margin: "7px" }}>
              {authorLogin.displayName}
            </IonNote>
            <IonButton onClick={() => setDarkMode(!darkMode)}  fill="clear" size="small" className="darkMode_button">
              <IonIcon icon={darkMode ? sunny : moon} slot="icon-only" />
            </IonButton>
          </div>

          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                {/* <IonItem className={location.pathname === appPage.url ? "selected" : ""} routerLink={appPage.url} href={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem> */}
                <IonItem
                  className={location.pathname === appPage.url ? "selected" : ""}
                  style={{ cursor: "pointer", fontSize: "18px" }}
                  onClick={() => {
                    routerDirection(appPage);
                  }}
                  lines="none"
                  detail={false}
                >
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} style={{ fontSize: "20px" }} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
        <p style={{ color: "gray", fontStyle: "italic", fontSize: "10px", width: "100%", textAlign: "center" }}>- - - - - -Other App- - - - - - </p>
        <IonList>
          <IonItem
            style={{ cursor: "pointer", fontSize: "18px" }}
            onClick={() => {
              "routerDirection(appPage)";
            }}
            lines="none"
            detail={false}
          >
            <IonAvatar style={{ cursor: "pointer", fontSize: "22px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img alt="Silhouette of a person's head" src={progressTagIcon} style={{ width: "22px", height: "22px" }} />
            </IonAvatar>
            <IonLabel>Progress Tag</IonLabel>
          </IonItem>
          <IonItem href="https://document-program.web.app/" style={{ cursor: "pointer", fontSize: "18px" }} lines="none" detail={false}>
            <IonAvatar style={{ cursor: "pointer", fontSize: "22px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img alt="Silhouette of a person's head" src={documentIcon} style={{ width: "22px", height: "22px" }} />
            </IonAvatar>
            <IonLabel>Drawing & Document</IonLabel>
          </IonItem>
        </IonList>

        <div className="menu-bottom">
          <div>Application made for BTĐ BF</div>
          <div>Author Mr.Sỹ</div>
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default memo(Menu);
