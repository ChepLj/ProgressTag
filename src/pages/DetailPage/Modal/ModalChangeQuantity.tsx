import { Toast } from "@capacitor/toast";
import { IonModal, IonHeader, IonToolbar, IonButton, IonTitle, IonItem, IonLabel, IonInput } from "@ionic/react";
import { useRef, useState } from "react";
import firebasePostData from "../../../api/postData";
import { objectListRender } from "../../../components/FC_Components/initObjectData";
import { ITF_AuthorLogin, ITF_Logs } from "../../../interface/mainInterface";


export default 
//TODO: modal change quantity
function ModalChangeQuantity({ isOpenModal, local, quantity, index, id, authorLogin, callbackDismiss }: { isOpenModal: boolean; local: string; quantity: number; index: number; id: string; authorLogin: ITF_AuthorLogin; callbackDismiss: any }) {
  const modal = useRef<HTMLIonModalElement>(null);
  const [isWrongNumber, setIsWrongNumber] = useState(false);
  const checkConfirm = () => {
    const inputElm = document.querySelector('input[name="change-quantity"]') as HTMLInputElement;
    const newQuantity = +inputElm?.value;
    if (typeof newQuantity === "number" && newQuantity >= 0) {
      const callback = (result: string) => {
        if (result === "post successfully!") {
          objectListRender[id].store[index].quantity = newQuantity;
          Toast.show({
            duration: "long",
            text: "successfully",
          });
          callbackDismiss();
        } else {
          Toast.show({
            duration: "long",
            text: "something is wrong , please try again !",
          });
        }
      };

      const nowTime = Date.now();
      const dataUpload = { ref: `MainData/${id}/store/${index}/quantity`, data: newQuantity };
      const logsUpload = {
        ref: `/MainData/${id}/logs/${nowTime}`,
        data: {
          behavior: "Change quantity",
          author: authorLogin.displayName,
          authorId: authorLogin.userName,
          detail: `Old : ${quantity} | New : ${newQuantity}`,
          item: id,
        },
      };
      const logMainUpload: ITF_Logs = {
        ref: `Logs/${nowTime}`,
        data: {
          behavior: "Change quantity",
          author: authorLogin.displayName,
          authorId: authorLogin.userName,
          detail: `Old : ${quantity} | New : ${newQuantity}`,
          item: id,
        },
      };
      const uploadContainer = [dataUpload, logsUpload, logMainUpload];
      firebasePostData(uploadContainer, callback);
    } else {
      setIsWrongNumber(true);
    }
  };

  return (
    <IonModal ref={modal} isOpen={isOpenModal} initialBreakpoint={0.5} breakpoints={[0.5]} onIonModalDidDismiss={callbackDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start" color="medium" fill="clear" expand="full" onClick={callbackDismiss}>
            Cancel
          </IonButton>
          <IonTitle>Change Quantity</IonTitle>
          <IonButton slot="end" color="primary" fill="clear" expand="full" onClick={checkConfirm}>
            Confirm
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonItem fill="outline" className="ion-invalid">
        <IonLabel position="floating" color="medium">
          New quantity
        </IonLabel>
        <IonInput className="fontStyle-boil fontSize-large" type="number" color="danger" placeholder="Enter number" value={quantity} name="change-quantity" />
      </IonItem>
      <IonItem>
        <IonLabel>Local: </IonLabel>
        <IonTitle>{local}</IonTitle>
      </IonItem>
      <IonItem>
        <IonLabel>Current Quantity: </IonLabel>
        <IonTitle>{quantity}</IonTitle>
      </IonItem>
      {isWrongNumber && (
        <IonLabel className="ion-padding fontStyle-italic" color="danger">
          Invalid value ! please fill correct number
        </IonLabel>
      )}
    </IonModal>
  );
}
//TODO_END: modal change quantity