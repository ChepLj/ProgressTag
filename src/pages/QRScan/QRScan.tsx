import React, { useState, useRef } from "react";
import { IonPage, IonContent, IonButton, IonHeader, IonToolbar, IonTitle, IonAlert, IonLoading, IonText, IonButtons, IonMenuButton, useIonRouter } from "@ionic/react";
import { Html5Qrcode } from "html5-qrcode";
import { useHistory, useLocation } from "react-router-dom";
import { decodeNumber, encodeNumber } from "../../components/FC_Components/encodeNumber";
const QRScanPage: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>({ isOpen: false, messenger: "", Url: "" });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const html5QrcodeRef = useRef<Html5Qrcode | null>(null);
  const router = useIonRouter();

  const startScan = async () => {
    setLoading(true);
    const cameraConfig = { facingMode: "environment" }; // Use the back camera

    try {
      html5QrcodeRef.current = new Html5Qrcode("reader"); // Initialize the scanner
      await html5QrcodeRef.current.start(
        cameraConfig,
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          stopScan(); // Automatically stop after obtaining a result
          checkUrl(decodedText);
          // setScanResult(decodedText); // Set the scan result

          setNotification("");
        },
        (errorMessage) => {
          console.error("Scanning error:", errorMessage);
        }
      );
      setScanning(true);
    } catch (err) {
      setNotification("Thiết bị này không hỗ trợ camera hoặc bạn chưa cấp quyền truy cập Camera  ---  Nếu không biết cách cấp quyền, liên hệ Mr.Sỹ để được hướng dẫn !!!");
      console.error("Error starting the scanner:", err);
    } finally {
      setLoading(false);
    }
  };

  const stopScan = async () => {
    if (html5QrcodeRef.current) {
      try {
        await html5QrcodeRef.current.stop();
        html5QrcodeRef.current.clear();
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
      html5QrcodeRef.current = null;
    }
    setScanning(false);
  };

  // TODO: Check URL
  function checkUrl(url: string) {
    try {
      // Parse the URL
      const parsedUrl = new URL(url);

      // Extract the path and query parameters
      const path = parsedUrl.pathname.toLowerCase();
      const searchParams = parsedUrl.searchParams;

      // Check if path includes '/page/Detail/QRCode'
      const isDetailQRCode = path.includes("/page/detail/qrcode");

      // Check if query parameters 'key' and 'ref' exist
      const hasId = searchParams.has("id");
      // const hasKey = searchParams.has("key");
      const hasRef = searchParams.has("ref");     
     
      // Extract the portion of the path starting from '/page/Detail/QRCode'
      const getRelevantPath = () => {
        const detailIndex = url.toLocaleLowerCase().indexOf("/page/detail/qrcode");
        return detailIndex !== -1 ? url.substring(detailIndex) : null;
      };

      // Return or set result based on conditions
      if (isDetailQRCode && hasRef ) {
        const relevantPath = getRelevantPath();
        setScanResult({ isOpen: true, messenger: 'Tìm thấý thiết bị ' +  searchParams.get('id'), Url: relevantPath });
        return true;
      } else {
        setScanResult({ isOpen: true, messenger: "Error QR Format", Url: "" });
        return false;
      }
    } catch (error) {
      // Handle invalid URLs
      setScanResult({ isOpen: true, messenger: "Error QR Format", Url: "" });
      return false;
    }
  }
  // TODO_END: Check URL







  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Quét QR Code của thiết bị</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div id="reader" style={{ width: "100%", marginTop: "20px" }}></div>
        {!scanning ? (
          <IonButton expand="block" onClick={startScan}>
            Scan with Camera
          </IonButton>
        ) : (
          <IonButton expand="block" color="danger" onClick={stopScan}>
            Stop Scan
          </IonButton>
        )}

        <IonAlert
          isOpen={scanResult.isOpen}
          onDidDismiss={() => setScanResult({ isOpen: false, messenger: "", Url: "" })}
          header="Scan Result"
          message={scanResult.messenger}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
            },
            {
              text: scanResult.messenger === "Error QR Format" ? "Scan Again" : "Go To",
              role: "confirm",
              handler: () => {
                if (scanResult.messenger == "Error QR Format") {
                  startScan();
                } else {
                
                  router.push(scanResult.Url, 'forward', 'push');
                }
              },
            },
          ]}
        />

        <IonLoading isOpen={loading} message="Opening camera..." />
        <br />
        <IonText color="danger">{notification}</IonText>
      </IonContent>
    </IonPage>
  );
};

export default QRScanPage;
