import { OverlayEventDetail } from '@ionic/core/components';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { downloadOutline } from 'ionicons/icons';
import { useRef } from 'react';
import QRMake from '../../../components/JSX_Components/QRMake/QRMake';
import { ITF_ObjectData } from '../../../interface/mainInterface';

function ModalShowQRCode({object}:{object:ITF_ObjectData}) {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

 

  function confirm() {
    downloadQR()
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    
  }

  const downloadQR = () => {
    const canvas = document.getElementById("qr-code-make") as HTMLCanvasElement;
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = 'QRCode-' + object.id + ".png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };


  return (
    <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
        </IonButtons>
        <IonTitle>Generate QR code</IonTitle>
        <IonButtons slot="end">
          <IonButton strong={true} onClick={() => confirm()}  color='success'>
            <IonIcon icon={downloadOutline} slot="icon-only"/>
         
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <QRMake object={object}/>
    </IonContent>
  </IonModal>
  );
}

export default ModalShowQRCode;