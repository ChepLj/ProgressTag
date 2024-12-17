import { IonAccordion, IonAccordionGroup, IonButton, IonButtons, IonHeader, IonItem, IonLabel, IonList, IonModal, IonProgressBar, IonTitle, IonToolbar } from "@ionic/react";
import { useContext, useEffect, useRef, useState } from "react";


import { Dialog } from "@capacitor/dialog";
import { ITF_Data, ITF_State } from "../../../interface/mainInterface";
import { AuthContext } from "../../../pages/LoginPage/function/loginContext";

import { calculatorNewKey, createAvatar, firebaseGetDataFromSever, handelPostImage, handelPrepareData, handlePostFile, postAvatar, postAvatarURLToSever, postDataToSever, postFileURLToServer, postImageURLToSever } from "../../FC_Components/progressUpdate";

//JSX: MOdal Upload
function ModalCreateUpload({ isOpen, callbackClose, objectDataFC }: { isOpen: boolean; callbackClose: Function; objectDataFC: any }) {
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
    handelAvatar: "waiting...",
    postAvatar: "waiting...",
    postAvatarURL: "waiting...",
    postImages: "waiting...",
    postAttachments: "waiting...",
    postImagesURL: "waiting...",
    postAttachmentsURL: "waiting...",
  });
  let key = useRef<string>("");
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
  const [imageState, setImageState] = useState<any>([]);
  const [fileState, setFileState] = useState<any>([]);
  const conditionCheck = stateLogs.current?.includes(state.type);

  //! test
  const showAlert = async (input: any) => {
    await Dialog.alert({
      title: "showAlert",
      message: input,
    });
  };

  //! end test

  try {
    if (isOpen && !conditionCheck) {
      // console.log("ModalUpload.tsx:54 ~ ModalUpload ~ state:", state.type);
      stateLogs.current?.push(state.type);
      // console.log("ModalUpload.tsx:134 ~ ModalUpload ~ stateLogs.current:", stateLogs);
      switch (state.type) {
        case "start upload": {
          progress.current.getDataFromSever = "processing...";
          firebaseGetDataFromSever(disPatch);
          break;
        }
        case "get data from server": {
          progress.current.getDataFromSever = "done";
          progress.current.createNewKey = "processing...";
          const objectFromSever = state.payload;
          calculatorNewKey({ objectFromSever, disPatch });
          break;
        }
        case "create new key": {
          progress.current.createNewKey = "done";
          progress.current.prePareData = "processing...";
          key.current = state.payload;
          handelPrepareData(objectDataFC, disPatch);
          break;
        }
        case "prepare data": {
          progress.current.prePareData = "done";
          progress.current.postData = "processing...";
          objectData.current = state.payload;
          if(!state.payload.attachments[0]){
            objectData.current.attachments=['']
          }
          postDataToSever(objectData.current, key.current, authorLogin, disPatch);
          break;
        }
        case "post data": {
          progress.current.postData = "done";
          progress.current.handelAvatar = "processing...";
          const images: any = objectData.current?.images;
          createAvatar(images, disPatch);
          break;
        }
        case "handel avatar": {
          progress.current.handelAvatar = "done";
          progress.current.postAvatar = "processing...";
          // const image = objectData.current?.images[0].image;
          const image = state.payload;
          postAvatar(image, key.current, disPatch);
          break;
        }
        case "post avatar": {
          progress.current.postAvatar = "done";
          progress.current.postAvatarURL = "processing...";
          const image = state.payload;
          postAvatarURLToSever(image, key.current, disPatch);
          break;
        }
        case "post avatar URL": {
          progress.current.postAvatarURL = "done";
          progress.current.postImages = "processing...";
          const images: any = objectData.current?.images?.map((crr) => {
            return crr.image;
          });
          handelPostImage(images, key.current, disPatch, setImageState);
          break;
        }
        case "post images": {
          progress.current.postImages = "done";
          progress.current.postImagesURL = "processing...";
          const imageURLs = state.payload;
          const images: any = objectData.current?.images.map((crr, index) => {
            return {
              hash: crr.hash,
              image: imageURLs[index],
            };
          });
          postImageURLToSever(images, key.current, disPatch);
          break;
        }
        case "post images URL": {
          progress.current.postImagesURL = "done";
          progress.current.postAttachments = "processing...";
          const files: any = objectData.current?.attachments ;
          console.log("🚀 ~ ModalCreateUpload ~ files:", files)
          handlePostFile(files, key.current, disPatch, setFileState);
          break;
        }
        case "post attaches": {
          progress.current.postAttachments = "done";
          progress.current.postAttachmentsURL = "processing...";
          postFileURLToServer(state.payload, key.current, disPatch);
          break;
        }
        case "post attaches URL": {
          progress.current.postAttachmentsURL = "done";
          setDone(true);
          break;
        }
      }
    }
  } catch (error) {
    console.log("ModalUpload.tsx:188 ~ ModalUpload ~ error:", error);

    showAlert(error);
  }

  console.log("ModalUpload.tsx:158 ~ ModalUpload ~ state:", state.type);
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
          <IonLabel>Get Data Fr Sev:</IonLabel>
          <IonLabel color={progress.current.getDataFromSever === "waiting..." ? "medium" : progress.current.getDataFromSever === "processing..." ? "warning" : "success"}>{progress.current.getDataFromSever}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Create New Key:</IonLabel>
          <IonLabel color={progress.current.createNewKey === "waiting..." ? "medium" : progress.current.createNewKey === "processing..." ? "warning" : "success"}>{progress.current.createNewKey}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Prepared Data:</IonLabel>
          <IonLabel color={progress.current.prePareData === "waiting..." ? "medium" : progress.current.prePareData === "processing..." ? "warning" : "success"}>{progress.current.prePareData}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Post Data:</IonLabel>
          <IonLabel color={progress.current.postData === "waiting..." ? "medium" : progress.current.postData === "processing..." ? "warning" : "success"}>{progress.current.postData}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Handel Avatar:</IonLabel>
          <IonLabel color={progress.current.handelAvatar === "waiting..." ? "medium" : progress.current.handelAvatar === "processing..." ? "warning" : "success"}>{progress.current.handelAvatar}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Post Avatar:</IonLabel>
          <IonLabel color={progress.current.postAvatar === "waiting..." ? "medium" : progress.current.postAvatar === "processing..." ? "warning" : "success"}>{progress.current.postAvatar}</IonLabel>
        </IonItem>

        <IonItem>
          <IonLabel>Post AvatarURL:</IonLabel>
          <IonLabel color={progress.current.postAvatarURL === "waiting..." ? "medium" : progress.current.postAvatarURL === "processing..." ? "warning" : "success"}>{progress.current.postAvatarURL}</IonLabel>
        </IonItem>

        <IonAccordionGroup value={progress.current.postImages === "processing..." ? "first" : "close"}>
          <IonAccordion value="first">
            <IonItem slot="header" color="light">
              <IonLabel>Post Images:</IonLabel>
              <IonLabel color={progress.current.postImages === "waiting..." ? "medium" : progress.current.postImages === "processing..." ? "warning" : "success"}>{progress.current.postImages}</IonLabel>
            </IonItem>

            <IonList slot="content">
              {objectData.current?.images &&
                objectData.current?.images.map((crr, index) => {
                  return (
                    <IonItem style={{ fontSize: "12px" }} key={index}>
                      <IonLabel>Image {index + 1}</IonLabel>
                      <IonLabel style={{ flex: 2 }}>{`${imageState[index]?.bytesTransferred} / ${imageState[index]?.totalBytes}`}</IonLabel>
                      {imageState[index]?.bytesTransferred < imageState[index]?.totalBytes ? <IonLabel color="warning">processing...</IonLabel> : imageState[index]?.bytesTransferred === imageState[index]?.totalBytes && imageState[index]?.totalBytes > 0 ? <IonLabel color="success">done</IonLabel> : <IonLabel color="medium">waiting...</IonLabel>}
                    </IonItem>
                  );
                })}
            </IonList>
          </IonAccordion>
        </IonAccordionGroup>
        <IonItem>
          <IonLabel>Post ImagesURL:</IonLabel>
          <IonLabel color={progress.current.postImagesURL === "waiting..." ? "medium" : progress.current.postImagesURL === "processing..." ? "warning" : "success"}>{progress.current.postImagesURL}</IonLabel>
        </IonItem>
        <IonAccordionGroup value={progress.current.postAttachments === "processing..." ? "first" : "close"}>
          <IonAccordion value="first">
            <IonItem slot="header" color="light">
              <IonLabel>Post Attachments:</IonLabel>
              <IonLabel color={progress.current.postAttachments === "waiting..." ? "medium" : progress.current.postAttachments === "processing..." ? "warning" : "success"}>{progress.current.postAttachments}</IonLabel>
            </IonItem>

            <IonList slot="content">
              {objectData.current?.attachments?.[0] &&
                objectData.current?.attachments.map((crr, index) => {
                  return (
                    <IonItem style={{ fontSize: "12px" }} key={index}>
                      <IonLabel>File {index + 1}</IonLabel>
                      <IonLabel style={{ flex: 2 }}>{`${fileState[index]?.bytesTransferred} / ${fileState[index]?.totalBytes}`}</IonLabel>
                      {fileState[index]?.bytesTransferred < fileState[index]?.totalBytes ? <IonLabel color="warning">processing...</IonLabel> : fileState[index]?.bytesTransferred === fileState[index]?.totalBytes && fileState[index]?.totalBytes > 0 ? <IonLabel color="success">done</IonLabel> : <IonLabel color="medium">waiting...</IonLabel>}
                    </IonItem>
                  );
                })}
            </IonList>
          </IonAccordion>
        </IonAccordionGroup>
        <IonItem>
          <IonLabel>Post AttachesURL:</IonLabel>
          <IonLabel color={progress.current.postAttachmentsURL === "waiting..." ? "medium" : progress.current.postAttachmentsURL === "processing..." ? "warning" : "success"}>{progress.current.postAttachmentsURL}</IonLabel>
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
            <IonLabel style={{ fontStyle: "italic" }}>New Equipment :</IonLabel>
            <IonLabel style={{ fontWeight: 600, textAlign: "start" }} color="danger">
              {key.current}
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
export default ModalCreateUpload;
