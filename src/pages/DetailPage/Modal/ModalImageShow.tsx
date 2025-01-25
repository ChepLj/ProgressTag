import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle } from "@ionic/react";
import { ITF_ImagesObject } from "../../../interface/mainInterface";



export default //TODO: Modal Show Image
function ModalImageShow({isPhone, state,  setShowImage }: { isPhone:boolean; state: any; setShowImage: Function }) {

  // console.log("🚀 ~ ModalImageShow ~ state:", state)
  //TODO: Tính toán chuyển bức hình tiếp theo khi nhấn next
  const calculatorIndex = (): number => {
    if (state.index < state.images.length - 1) {
      const newIndex = state.index + 1;
      return newIndex;
    } else return 0;
  };
  //TODO: end
  return (
    <IonModal
      isOpen={state.isOpen}
      onWillDismiss={() => {
        setShowImage({ isOpen: false, index: 0, title: state.title, images: [] });
      }}
      id={isPhone ? "modelImageShowMobile": "modelImageShow"}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              onClick={() => {
                setShowImage({ isOpen: false, index: 0 });
              }}
            >
              Close
            </IonButton>
          </IonButtons>
          <IonTitle>
            ({state.title}) {state.index + 1}/{state.images?.length}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                setShowImage({ isOpen: true, index: calculatorIndex(), title: state.title, images: state.images});
              }}
            >
              Next
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <div className="detailImageShow">
        <img src={state.images?.[state.index]?.image} className="detailImageShowItem" />
      </div>
    </IonModal>
  );
}

//TODO: end