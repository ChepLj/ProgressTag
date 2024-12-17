import { IonButton, IonChip, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPopover, IonText, IonTextarea } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { ITF_ObjectData } from "../../../../interface/mainInterface";
import ProgressSelectModal from "./ProgressSelectModal";

//JSX: Section 1
function Section1({ step, objectData, progressTagRef }: { step: any; objectData?: ITF_ObjectData; progressTagRef:any }) {
  //* Check Render and Unmount
  console.log("%cSection1 Render", "color:green");
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
      // objectData.progressTag &&
      //   setProgressTag(objectData.progressTag);
    }
  }, []);

  //TODO_END: Assign value when action is Edit
  //TODO: Update ProgressTag Element
  useEffect(()=>{
     progressTagRef.current =  progressTag ? Object.keys(progressTag).map((key, index) => progressTag[key]):''
  })
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
        <p style={{ color: "gray", fontStyle: "italic", fontSize: "10px", width: "auto", textAlign: "end", margin: "10px" }}>(nhấn để thêm Tag)</p>
        <IonButton fill="outline" size="small" slot="end" onClick={() => setIsModalOpen(true)}>
          <IonIcon slot="icon-only" icon={addOutline} />
        </IonButton>
      </IonItem>
      {progressTag ? (
        Object.keys(progressTag).map((key, index) => {
          const { id, type, area } = progressTag[key] || {};
          return (
            <span key={key}>
              <IonChip id={`hover-trigger-${key}`} color={type === "Original" ? "success" : "medium"}>
                <IonLabel>{id || "Unknown"}</IonLabel>
              </IonChip>
              <IonPopover trigger={`hover-trigger-${key}`} onDidDismiss={() => ""}>
                <div style={{ padding: "1rem" }}>
                  <p>
                    <i>Area:</i> {area}
                  </p>
                  <p>
                    <i>Type:</i> {type}
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

      <ProgressSelectModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setProgressTag={setProgressTag} />
    </section>
  );
}

//JSX_END: Section 1
export default Section1;
