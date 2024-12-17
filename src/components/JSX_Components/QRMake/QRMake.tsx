import { IonButton, IonContent, IonItem, IonText } from "@ionic/react";
import { QRCodeCanvas } from "qrcode.react";
import logo from "../../../source/img/icon.png";
import { ITF_ObjectData } from "../../../interface/mainInterface";

const QRCodeGeneratorPage = ({ object }: { object: ITF_ObjectData }) => {
  const qrMakeWrapStye: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <section style={qrMakeWrapStye} className="test">
      <QRCodeCanvas
        id="qr-code-make"
        value={`https://btdbf-equipment-manager.web.app/page/detail/qrcode?id=${object.id}&ref=MainData/${object.id}`}
        title={"Equipment QR Code"}
        size={300}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"L"}
        imageSettings={{
          src: logo,
          x: undefined,
          y: undefined,
          height: 52,
          width: 52,
          opacity: 1,
          excavate: false,
        }}
      />

      {/* Additional Text with Borders */}
      <div style={{ width: "100%", margin: "0 auto", marginTop: "20px" }}>
        <IonItem>
          <IonText style={{ minWidth: "80px" }}>ID:</IonText>
          <IonText color='secondary'>
            <b>{object.id}</b>
          </IonText>
        </IonItem>
        <IonItem>
          <IonText style={{ minWidth: "80px" }}>MSVT:</IonText>
          <IonText>
            <b>{object.code}</b>
          </IonText>
        </IonItem>
        <IonItem>
          <IonText style={{ minWidth: "80px" }}>Name:</IonText>
          <IonText>
            <b>{object.title}</b>
          </IonText>
        </IonItem>
        <IonItem>
          <IonText style={{ minWidth: "80px" }}>Author:</IonText>
          <IonText>
            <b>{object.author}</b>
          </IonText>
        </IonItem>
      </div>

      {/* Download Button */}
    </section>
  );
};

export default QRCodeGeneratorPage;
