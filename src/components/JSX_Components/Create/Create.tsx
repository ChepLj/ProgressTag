import { Toast } from "@capacitor/toast";
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonTitle, IonToolbar } from "@ionic/react";
import { chevronBackOutline, chevronForwardOutline, cloudUploadOutline } from "ionicons/icons";
import { useContext, useEffect, useRef, useState } from "react";

import "./Create.css";

import { useLocation } from "react-router-dom";

import { ITF_ObjectData, ITF_StoreObject } from "../../../interface/mainInterface";
import { AuthContext } from "../../../pages/LoginPage/function/loginContext";
import { objectListRender } from "../../FC_Components/initObjectData";
import { section1Validate, section2Validate, section3Validate } from "../../FC_Components/validate/createPageValidate";
import ModalCreateUpload from "./ModalCreateUpload";
import ModalEditUpload from "./ModalEditUpload";
import Section1 from "./Section1/Section1";
import Section2 from "./Section2/Section2";
import Section3 from "./Section3/Section3";
import SectionPreview from "./SectionPreview/SectionPreview";
//! Main
const Create = () => {
  //* Check Render and Unmount
  console.log("%cCreate Render", "color:green");
  useEffect(() => {
    return () => console.log("%cCreate Unmount", "color:red");
  }, []);
  //* END Check Render and Unmount
  const [step, setStep] = useState<number>(1);
  const [modalUpLoadState, setModalUpLoadState] = useState(false);
  const { authorLogin } = useContext<any>(AuthContext);
  const { state } = useLocation<string>();
  const { current: objectData } = useRef<ITF_ObjectData>(objectListRender[state]); //: đổi tên current sang object để tường minh
  const arrayStock = useRef<Array<ITF_StoreObject>>([]);
  const arrayTag = useRef<Array<string>>([]);
  const arrayImage = useRef<Array<any>>([]);
  const arrayFile = useRef<Array<any>>([]);
  const progressTagRef = useRef<Array<any>>([]);
  const totalOfStep = 4;
  //TODO: Handel Change Step
  function handelNextStep() {
    if (step <= totalOfStep) {
      switch (step) {
        case 1: {
          if (section1Validate()) return setStep(step + 1);
          break;
        }
        case 2: {
          if (section2Validate()) return setStep(step + 1);
          break;
        }
        case 3: {
          if (section3Validate()) return setStep(step + 1);
          break;
        }
        case 4: {
          if (true) return setModalUpLoadState(true);
          break;
        }
      }
    } else {
      //! finish step
    }
  }

  function handelBackStep() {
    if (step > 1 && step <= totalOfStep) {
      setStep(step - 1);
    } else {
      if (objectData) {
        console.log("check");
      } else {
        setStep(1);
      }
    }
  }
  //TODO_END: Handel Change Step

  //TODO: create Data
  const handelCreateData = (type: string) => {
    //Step 1
    const nameElm = document.querySelector('input[name="create-section1-name"]') as HTMLInputElement;
    const codeElm = document.querySelector('input[name="create-section1-code"]') as HTMLInputElement;
    const progressTagElm = document.querySelector('input[name="create-section1-progressTag"]') as HTMLInputElement;
    const descriptionElm = document.querySelector('textarea[name="create-section1-description"]') as HTMLTextAreaElement;
    const noteElm = document.querySelector('textarea[name="create-section1-note"]') as HTMLTextAreaElement;
    //Step 2
    const unitElm = document.querySelector('input[name="create-section2-unit"]') as HTMLInputElement;
    arrayStock.current.forEach((crr, index) => {
      arrayStock.current[index].unit = unitElm.value;
    });

    //Step 3
    let objectDataUpload = {};
    switch (type) {
      case "create": {
        const arrayImageTemp = arrayImage.current.map((crr) => {
          return {
            hash: "L6PZfSi_.AyE_3t7t7R**0o#DgR4",
            image: crr.webPath ? crr.webPath : "",
            avatar: crr.avatar,
          };
        });
        const createAvatar = () => {
          for (const value of arrayImageTemp) {
            if (value.avatar) return value;
          }
          return {
            hash: "",
            image: "",
          };
        };

        //TODO: init Data Update
        objectDataUpload = {
          id: "",
          code: Number(codeElm.value),
          title: nameElm.value,
          progressTag: progressTagRef.current,
          subTitle: "...",
          description: descriptionElm.value.replaceAll("\n", "<br/>"),
          store: arrayStock.current,
          tag: arrayTag.current,
          note: noteElm.value.replaceAll("\n", "<br/>"),
          icon: createAvatar(),
          images: arrayImageTemp,
          attachments: arrayFile.current,
          author: authorLogin.displayName,
          authorId: authorLogin.userName,
          dateCreated: Date.now(),
        };

        //TODO_END: init Data Update
        break;
      }
      case "edit": {
        //TODO: init Data Update
        objectDataUpload = {
          id: objectData?.id || "Error",
          code: Number(codeElm.value),
          title: nameElm.value,
          progressTag: progressTagRef.current,
          subTitle: objectData?.subTitle || "Error",
          description: descriptionElm.value.replaceAll("\n", "<br/>"),
          store: arrayStock.current,
          tag: arrayTag.current,
          note: noteElm.value.replaceAll("\n", "<br/>"),
          icon: objectData?.icon || { image: "Error", hash: "Error" },
          images: objectData?.images || [],
          author: objectData?.author || "Error",
          authorId: objectData?.authorId || "Error",
          dateCreated: objectData?.dateCreated || "Error",
          favorite: objectData?.favorite || [],
          important: objectData?.important || [],
          isPrivate: objectData?.isPrivate || false,
          logs: objectData?.logs || [""],
        };
        //TODO_END: init Data Update
        break;
      }
    }
    return objectDataUpload;
  };

  //TODO_END: create Data

  //TODO: cancel Upload
  const cancelUpload = async () => {
    await Toast.show({
      text: "Can not cancel !",
    });
  };

  //TODO_end: cancel Upload

  return (
    <  >
      <IonHeader>
      
        <IonToolbar>
       
          <IonButtons slot="start" onClick={handelBackStep}>
            {step == 1 ? (
              <IonMenuButton />
            ) : (
              <>
                <IonIcon icon={chevronBackOutline} slot="start" color="primary" />
                <IonButton>Back</IonButton>
              </>
            )}
          </IonButtons>
          <IonTitle>{step === totalOfStep ? "Preview" : objectData ? `Edit ${objectData.id}  (${step}/${totalOfStep})` : `${step}/${totalOfStep}`}</IonTitle>
          <IonButtons slot="end" onClick={handelNextStep}>
            <IonButton color={step === totalOfStep ? "warning" : "primary"}>{step === totalOfStep ? "Upload" : "Next"}</IonButton>
            <IonIcon icon={step === totalOfStep ? cloudUploadOutline : chevronForwardOutline} slot="end" color={step === totalOfStep ? "warning" : "primary"} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <section className="create_motherSection">
          <Section1 step={step} objectData={objectData} progressTagRef={progressTagRef}></Section1>
          <Section2 step={step} objectData={objectData} arrayStock={arrayStock} arrayTag={arrayTag}></Section2>
          <Section3 step={step} objectData={objectData} arrayImage={arrayImage} arrayFile={arrayFile}></Section3>
          <SectionPreview step={step} objectData={objectData ? () => handelCreateData("edit") : () => handelCreateData("create")} objectDataOld={objectData}></SectionPreview>
          {modalUpLoadState && objectData ? <ModalEditUpload isOpen={modalUpLoadState} callbackClose={cancelUpload} objectOldData={objectData} objectDataFC={() => handelCreateData("edit")} /> : <ModalCreateUpload isOpen={modalUpLoadState} callbackClose={cancelUpload} objectDataFC={() => handelCreateData("create")} />}
          
        </section>
      </IonContent>
    </>
  );
};

//!End main

//! Export
export default Create
