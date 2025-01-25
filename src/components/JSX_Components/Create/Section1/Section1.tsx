import { IonButton, IonChip, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPopover, IonText, IonTextarea } from "@ionic/react";
import { addOutline, imagesOutline } from "ionicons/icons";
import { useContext, useEffect, useState } from "react";
import { ITF_ObjectData } from "../../../../interface/mainInterface";
import ProgressSelectModal from "./ProgressSelectModal";
import { ProgressTagContext } from "../../../../context/progressTagContext";
import ModalImageShow from "../../../../pages/DetailPage/Modal/ModalImageShow";

//JSX: Section 1
function Section1({ step, objectData, progressTagRef }: { step: any; objectData?: ITF_ObjectData; progressTagRef: any}) {
  //* Check Render and Unmount
  console.log("%cSection1 Render", "color:green");
  const { ProgressTag, disPatchProgressTag } = useContext<any>(ProgressTagContext);
  const [showImage, setShowImage] = useState({ isOpen: false, index: 0, title: "", images: [] });
  useEffect(() => {
    return () => console.log("%cSection1 Unmount", "color:red");
  }, []);
  //* END Check Render and Unmount

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progressTag, setProgressTag] = useState();

  let display: "create_section_hidden" | "create_section_display" = "create_section_hidden";
  if (step == 1) {
    display = "create_section_display";
  } else {
    display = "create_section_hidden";
  }

  //*  Declare Element Ref
  const replaceBrWithNewline = (input: string) => {
    return input.replace(/<br\s*\/?>/g, "\n");
  };
  //TODO: Assign value when action is Edit
  useEffect(() => {
    if (objectData) {
      console.log("🚀 ~ useEffect ~ objectData:", objectData);
      const nameElm = document.querySelector('[name="create-section1-name"]') as HTMLInputElement;
      const codeElm = document.querySelector('[name="create-section1-code"]') as HTMLInputElement;
      const descriptionElm = document.querySelector('[name="create-section1-description"]') as HTMLInputElement;
      const noteElm = document.querySelector('[name="create-section1-note"]') as HTMLInputElement;
      nameElm.value = objectData.title;
      // nameElm.value = objectData.title || "ghgg";
      codeElm.value = objectData.code.toString();
      descriptionElm.value = replaceBrWithNewline(objectData.description);
      noteElm.value = replaceBrWithNewline(objectData.note);
      if (objectData.progressTag?.[0].tag) {
        const arrayTemp:any = Object.values(objectData.progressTag).map((crr, index) => {
          return crr;
        });
        setProgressTag(arrayTemp);
      }
    }
  }, []);

  //TODO_END: Assign value when action is Edit

  console.log("🚀 ~ useEffect ~ progressTagRef.current :", progressTagRef.current )


  //TODO: Update ProgressTag Element
  useEffect(() => {
    progressTagRef.current = progressTag
      ? Object.keys(progressTag).map((key, index) => {
          const tempObject: any = progressTag[key];
          return {
            key: tempObject.key,
            tag: tempObject.tag,
            type: tempObject.type,
            area: tempObject.area,
            local: tempObject.local,
          };
        })
      : "";

  });
  //TODO_END: Update ProgressTag Element
  return (
    <section className={display}>
      <IonList>
        <IonItem>
          <IonLabel color="tertiary">Name:</IonLabel>
          <IonInput name="create-section1-name" placeholder="enter name of equipment" />
        </IonItem>
        <IonItem>
          <IonLabel color="tertiary">Code:</IonLabel>
          <IonInput type="number" name="create-section1-code" placeholder="enter name of equipment" />
        </IonItem>

        <IonItem>
          <IonLabel color="tertiary">Description:</IonLabel>
          <IonTextarea name="create-section1-description" placeholder="enter description of equipment" autoGrow={true} />
        </IonItem>
        <IonItem>
          <IonLabel color="tertiary">Note:</IonLabel>
          <IonTextarea name="create-section1-note" placeholder="enter note of equipment" autoGrow={true} />
        </IonItem>
      </IonList>
      <IonItem>
        <IonText color="tertiary">Progress Tag:</IonText>
        {/* <IonInput name="create-section1-progressTag" placeholder="enter tag in progress" /> */}

        <IonButton fill="outline" size="small" slot="end" onClick={() => setIsModalOpen(true)}>
          <p style={{ color: "gray", fontStyle: "italic", fontSize: "10px", width: "auto", textAlign: "end", margin: "10px" }}>(nhấn để thêm Tag)</p>
          <IonIcon slot="icon-only" icon={addOutline} />
        </IonButton>
      </IonItem>
      {progressTag ? (
        Object.keys(progressTag).map((keyTemp, index) => {
          const { tag, type, key } = progressTag[keyTemp] || {};
          const objectTemp = ProgressTag[key];
          
         

          return (
            <span key={key}>
              <IonChip id={`hover-trigger-${key}`} color={type === "Original" ? "success" : "medium"}>
                <IonLabel>{tag || "Unknown"}</IonLabel>
              </IonChip>
              <IonPopover trigger={`hover-trigger-${key}`} onDidDismiss={() => ""}>
                <div style={{ padding: "1rem" }}>
                  <p>
                    <i>Area:</i> {objectTemp?.tag}
                  </p>
                  <p>
                    <i>Local:</i> {objectTemp?.local}
                  </p>
                  <p>
                    <i>Type:</i> {objectTemp?.type}
                  </p>
                  <p style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                    <i>View image</i>
                    <i>&nbsp;&nbsp;&nbsp;({objectTemp?.images.length})&nbsp;</i>
                    <IonIcon
                          icon={imagesOutline}
                          color="primary"
                          onClick={() => {
                            objectTemp?.images.length && setShowImage({ isOpen: true, index: 0, title: `ProgressTag ${tag}`, images: objectTemp?.images });
                          }}
                        />
                  </p>
                  {/* Add more details as needed */}
                </div>
              </IonPopover>
            </span>
          );
        })
      ) : (
        <div style={{ color: "red", fontStyle: "italic", padding: "10px" }}>"Không có Progress Tag nào được chọn !"</div>
      )}

      <ProgressSelectModal isModalOpen={isModalOpen} setShowImage={setShowImage} setIsModalOpen={setIsModalOpen} progressTag={progressTag} setProgressTag={setProgressTag} />
       <ModalImageShow
         
            isPhone={window.screen.width < 800}
            state={showImage}
        
            setShowImage={setShowImage}
            />
    </section>
  );
}

//JSX_END: Section 1
export default Section1;
