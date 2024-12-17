import { IonButton, IonButtons, IonHeader, IonItem, IonLabel, IonList, IonModal, IonProgressBar, IonTitle, IonToolbar } from "@ionic/react";
import { useContext, useEffect, useRef, useState } from "react";
import { ITF_Data, ITF_State } from "../../../interface/mainInterface";
import { AuthContext } from "../../../pages/LoginPage/function/loginContext";
import { handelPrepareData, postDataToSever } from "../../FC_Components/progressUpdateEdit";


//JSX: MOdal Upload
function ModalEditUpload({ isOpen, objectOldData, callbackClose, objectDataFC }: { isOpen: boolean; objectOldData: any; callbackClose: Function; objectDataFC: any }) {
  //* Check Render and Unmount
  console.log("%cModalUpload", "color:green");
  useEffect(() => {
    return () => console.log("%cModalUpload Unmount", "color:red");
  }, []);
  //* END Check Render and Unmount
  const progress = useRef({
    prePareData: "waiting...",
    getDataFromSever: "waiting...",
    createNewKey: "waiting...",
    postData: "waiting...",
    
  });
  // let key = useRef<string>("");
  let objectData = useRef<ITF_Data>();
  let stateLogs = useRef<any>(["first"]);
  const initState = {
    type: "start upload",
    payload: "",
  };

  const { authorLogin } = useContext<any>(AuthContext);
  // const author: string = authorLogin.displayName;
  const [state, disPatch] = useState<ITF_State>(initState);
  const [done, setDone] = useState<boolean>(false);
  const conditionCheck = stateLogs.current?.includes(state.type);
  if (isOpen && !conditionCheck) {
    console.log("🚀 ~ file: ModalUpload.tsx:54 ~ ModalUpload ~ state:", state.type);
    stateLogs.current?.push(state.type);
    console.log("🚀 ~ file: ModalUpload.tsx:134 ~ ModalUpload ~ stateLogs.current:", stateLogs);
    switch (state.type) {
      case "start upload": {
        // progress.current.createNewKey = "done";
        progress.current.prePareData = "processing...";
        // key.current = state.payload;

        handelPrepareData(objectDataFC, disPatch);
        break;
      }
      case "prepare data": {
        progress.current.prePareData = "done";
        progress.current.postData = "processing...";
        objectData.current = state.payload;
        // const objectOldDataStr = JSON.stringify(objectOldData);
        const objectOldDataStr = JSON.stringify(objectOldData)
        postDataToSever(objectData.current, objectOldDataStr, authorLogin, disPatch);
        break;
      }

      //!
      case "post data": {
        progress.current.postData = "done";

        setDone(true);
        break;
      }
    }
  }

  console.log("🚀 ~ file: ModalUpload.tsx:158 ~ ModalUpload ~ state:", state.type);
  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        {!done && (
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton
                color="danger"
                onClick={() => {
                  callbackClose(false);
                }}
              >
                Cancel
              </IonButton>
            </IonButtons>
            <IonTitle>Progress UpLoad ...</IonTitle>
            <IonButtons slot="end">
              <IonButton color="warning" onClick={() => {}}>
                Pause
              </IonButton>
            </IonButtons>

            <IonProgressBar type="indeterminate" />
          </IonToolbar>
        )}
        {done && (
          <IonToolbar color="success">
            <IonTitle>Progress Done !</IonTitle>
          </IonToolbar>
        )}
      </IonHeader>
      <IonList className="createPage_modalUpload">
        <IonItem>
          <IonLabel>Prepared Data:</IonLabel>
          <IonLabel color={progress.current.prePareData === "waiting..." ? "medium" : progress.current.prePareData === "processing..." ? "warning" : "success"}>{progress.current.prePareData}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Post Data:</IonLabel>
          <IonLabel color={progress.current.postData === "waiting..." ? "medium" : progress.current.postData === "processing..." ? "warning" : "success"}>{progress.current.postData}</IonLabel>
        </IonItem>
      </IonList>

      {done && (
        <IonList className="ion-padding createPage_modalUpload-success" color="medium">
          <IonItem>
            <IonLabel color="success" className="ion-text-center">
              Upload successfully !
            </IonLabel>
          </IonItem>
          <IonItem className="ion-text-center">
            <IonLabel style={{ fontStyle: "italic" }}>Equipment :</IonLabel>
            <IonLabel style={{ fontWeight: 600, textAlign: "start" }} color="danger">
              {objectData.current?.id}
            </IonLabel>
          </IonItem>
          <IonButton expand="block" href="/">
            Back to home
          </IonButton>
        </IonList>
      )}
    </IonModal>
  );
}

//JSX_END: MOdal Upload

//! Export
export default ModalEditUpload;
