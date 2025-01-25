import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { memo, useContext, useEffect, useRef, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { objectListRender } from "../../components/FC_Components/initObjectData";
import { ITF_ObjectData } from "../../interface/mainInterface";

import { AuthContext } from "../LoginPage/function/loginContext";
import ModalChangeQuantity from "./Modal/ModalChangeQuantity";
import ModalImageShow from "./Modal/ModalImageShow";

import DetailPageDesktop from "./DetailPageDesktop/DetailPageDesktop";
import DetailPageMobile from "./DetailPageMobile/DetailPageMobile";
import "./Modal/Modal.css";
import firebaseGetMainData from "../../api/getData";
import { home, qrCodeOutline } from "ionicons/icons";
import LoadingComponent from "../../components/JSX_Components/LoadingComponent";
import ModalShowQRCode from "./Modal/ModalShowQRCode";
import { ProgressTagContext } from "../../context/progressTagContext";
const DetailPage: React.FC = () => {
  console.log("%cDetail Page Render", "color:green");
  // const { state } = useLocation<string>();
  const { id: state } = useParams<any>(); // Extracts 'id' from the URL
  console.log("🚀 ~ state:", state);
  // let { current: object } = useRef<ITF_ObjectData>(objectListRender[state]); //: đổi tên current sang object để tường minh
  const object = useRef<ITF_ObjectData>(objectListRender[state]); //: đổi tên current sang object để tường minh
  const { ProgressTag, disPatchProgressTag } = useContext<any>(ProgressTagContext);
  const [showImage, setShowImage] = useState({ isOpen: false, index: 0 });
  const [changeQuantityModal, setChangeQuantityModal] = useState({ isOpen: false, local: "", quantity: 0, index: 0 });
  const { authorLogin } = useContext<any>(AuthContext);
  const author: string = authorLogin?.email;
  const imageNumberTemp = [0, 1, 2, 3];
  const params = new URLSearchParams(window.location.search);

  const [data, setData] = useState(object.current);
  const router = useIonRouter();

  const [progressTagGoTo, setProgressTagGoTo] = useState({ isOpen: false, messenger: "", Url: "" });



  //TODO: Calculator Total
  const calculatorTotal = data?.store?.reduce((total: number, crr: any) => {
    return total + crr.quantity;
  }, 0);

  //TODO: end
  //TODO: handle show from QRcode
  useEffect(() => {
    const disPatch = (result) => {
      console.log("🚀 ~ disPatch ~ result:", result);
      if (result.type == "SUCCESSFUL") {
        console.log(result.payload);
        setData(result.payload);
      }
    };
    if (!data) {
      // const id = params.get("id");
      const id = state;
      // const ref = params.get("ref");
      const ref = `ProgressTag/${id}`;
      id && ref && firebaseGetMainData(ref, disPatch);
    }
  }, [params]);
  //TODO_END: handle show from QRcode
  useEffect(() => {
    //: Unmount
    return () => {
      console.log("%cDetail Page Unmount", "color:red");
    };
  }, []);
  console.log("🚀 ~ useEffect ~ data:", data);
  //TODO: handle change quantity
  const handleChangeQuantity = (local: string, quantity: number, index: number) => {
    authorLogin &&
      setChangeQuantityModal({
        isOpen: true,
        local,
        quantity,
        index,
      });
  };
  //TODO_END: handle change quantity

  //TODO: handel remove blurhash
  const handleRemoveBlurhash = (id: string) => {
    const elm = document.getElementById(id);
    elm?.remove();
  };

  //TODO_END: handel remove blurhash
  // console.log("🚀 ~ authorLogin:", authorLogin);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {authorLogin ? (
              <>
                {router.canGoBack() && <IonBackButton></IonBackButton>}
                {!router.canGoBack() && <HomeButton />}
              </>
            ) : (
              <HomeButton />
            )}
          </IonButtons>
          <IonTitle>{data?.id}</IonTitle>
          {data?.id ? (
            <IonButtons slot="end" color="secondary" id="open-modal">
              <IonButton size="small">
                <IonIcon icon={qrCodeOutline} color="secondary" />
              </IonButton>
            </IonButtons>
          ) : (
            <HomeButton />
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {data?.id ? (
          window.screen.width < 800 ? (
            <DetailPageMobile
              object={data}
              handleRemoveBlurhash={handleRemoveBlurhash}
              calculatorTotal={calculatorTotal}
              handleChangeQuantity={handleChangeQuantity}
              setShowImage={setShowImage}
              setProgressTagGoTo={setProgressTagGoTo}
            />
          ) : (
            <DetailPageDesktop
              object={data}
              handleRemoveBlurhash={handleRemoveBlurhash}
              imageNumberTemp={imageNumberTemp}
              setShowImage={setShowImage}
              calculatorTotal={calculatorTotal}
              handleChangeQuantity={handleChangeQuantity}
              setProgressTagGoTo={setProgressTagGoTo}
            />
          )
        ) : (
          <LoadingComponent />
        )}

        <ModalImageShow isPhone={window.screen.width < 800} state={showImage} setShowImage={setShowImage} />
        <ModalChangeQuantity
          isOpenModal={changeQuantityModal.isOpen}
          local={changeQuantityModal.local}
          quantity={changeQuantityModal.quantity}
          index={changeQuantityModal.index}
          id={state}
          authorLogin={authorLogin}
          callbackDismiss={() => setChangeQuantityModal({ isOpen: false, local: "", quantity: 0, index: 0 })}
        />
        {data?.id && <ModalShowQRCode object={data} />}
      </IonContent>
      <IonAlert
        isOpen={progressTagGoTo.isOpen}
        onDidDismiss={() => setProgressTagGoTo({ isOpen: false, messenger: "", Url: "" })}
        header="Progress Referent"
        message={progressTagGoTo.messenger}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Go To",
            role: "confirm",
            handler: () => {
              progressTagGoTo.Url && router.push(progressTagGoTo.Url, "forward", "push");
            },
          },
        ]}
      />
    </IonPage>
  );
};

//JSX Home Button
function HomeButton() {
  return (
    <IonButton size="small" href="/">
      <IonIcon slot="icon-only" ios={home} md={home}></IonIcon>
    </IonButton>
  );
}
//JSX:End Home Button

export default memo(DetailPage);
