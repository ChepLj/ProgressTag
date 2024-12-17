import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle } from "@ionic/react";
import { ITF_ImagesObject } from "../../../interface/mainInterface";



export default //TODO: Modal Show Image
function ModalImageShow({isPhone, state, images, callback }: { isPhone:boolean; state: any; images: Array<ITF_ImagesObject>; callback: Function }) {
  //TODO: Tính toán chuyển bức hình tiếp theo khi nhấn next
  const calculatorIndex = (): number => {
    if (state.index < images.length - 1) {
      const newIndex = state.index + 1;
      return newIndex;
    } else return 0;
  };
  //TODO: end
  return (
    <IonModal
      isOpen={state.isOpen}
      onWillDismiss={() => {
        callback({ isOpen: false, index: 0 });
      }}
      id={isPhone ? "modelImageShowMobile": "modelImageShow"}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              onClick={() => {
                callback({ isOpen: false, index: 0 });
              }}
            >
              Close
            </IonButton>
          </IonButtons>
          <IonTitle>
            Image {state.index + 1}/{images?.length}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                callback({ isOpen: true, index: calculatorIndex() });
              }}
            >
              Next
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <div className="detailImageShow">
        <img src={images?.[state.index]?.image} className="detailImageShowItem" />
      </div>
    </IonModal>
  );
}

//TODO: end