import { useContext, useEffect } from "react";
import { ITF_ObjectData } from "../../../../interface/mainInterface";
import PreviewBeforeUpload from "./PreviewBeforeUpload/Desktop/PreviewBeforeUpload";
import { AuthContext } from "../../../../pages/LoginPage/function/loginContext";
import { PrecacheController } from "workbox-precaching";
import PreviewBeforeUploadMobile from "./PreviewBeforeUpload/Mobile/PreviewBeforeUploadMobile";

//JSX: Section Preview
export default function SectionPreview({ step, objectData, objectDataOld }: { step: any; objectData: Function; objectDataOld?: ITF_ObjectData }) {
  //* Check Render and Unmount
  console.log("%cSectionPreview Render", "color:green");
  useEffect(() => {
    return () => console.log("%cSectionPreview Unmount", "color:red");
  }, []);
  //* END Check Render and Unmount
  const { authorLogin } = useContext<any>(AuthContext);
  let display: "create_section_hidden" | "create_section_display" = "create_section_hidden";
  if (step == 4) {
    display = "create_section_display";
  } else {
    display = "create_section_hidden";
  }

  return (
    <>
      {step === 4 ? (
        authorLogin.isPhone ? (
          <PreviewBeforeUploadMobile className={display} object={objectData()}  objectDataOld={objectDataOld}  />
        ) : (
          <PreviewBeforeUpload className={display} object={objectData()} objectDataOld={objectDataOld} />
        )
      ) : (
        <h2 className={display}>Something is wrong !</h2>
      )}
    </>
  );
}
//JSX_END: Section Preview
