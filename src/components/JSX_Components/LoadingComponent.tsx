import React, { useEffect, useState } from "react";
import { IonPage, IonContent, IonText, useIonRouter } from "@ionic/react";
import icon from "../../source/img/icon.png";

const LoadingComponent: React.FC = () => {
  const [state, setState] = useState(false);

  useEffect(() => {
    // Redirect after 3 seconds
    const timer = setTimeout(() => {
      setState(true);
    }, 6000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  // Inline styles
  const containerStyle = {
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "start",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
    textAlign: "center" as const,
  };

  const textStyle = {
    marginBottom: "20px",
    color: "#333",
    fontSize: "20px",
  };

  const dotsStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    fontSize: "44px",
    color: "red",
  };

  const dotStyle = {
    animation: "blink 1.5s infinite",
  };
  const imageStyle = {
    width: "150px",
    height: "150px",
    marginTop: "1px",
  };
  return (
    <div>
      
      {state ? (
        <div style={{padding: '5px', color: 'red'}}>
          <h2>Không tìm thấy dữ liệu, kiểm tra lại mã QR nếu như truy cập từ QR</h2>
          <h2>Nếu truy cập từ App , hãy thoát app và mở lại !!!</h2>
          <i>Liên hệ Mr.Sỹ Bảo trì điện PX Luyện để được hỗ trợ</i>
        </div>
      ) : (
        <div style={containerStyle}>
          {/* Redirect Message */}
          <IonText>
            <h2 style={textStyle}>Đang tải dữ liệu ...</h2>
          </IonText>

          {/* Loading Dots */}
          <div style={dotsStyle}>
            <span style={{ ...dotStyle, animationDelay: "0s" }}>•</span>
            <span style={{ ...dotStyle, animationDelay: "0.2s" }}>•</span>
            <span style={{ ...dotStyle, animationDelay: "0.4s" }}>•</span>
          </div>
          {/* Image in the Middle */}
          <img
            src={icon} // Replace with your image URL
            alt="Redirecting"
            style={imageStyle}
          />
          {/* CSS Keyframes for blinking dots */}
          <style>
            {`
        @keyframes blink {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
        `}
          </style>
        </div>
      )}
    </div>
  );
};

export default LoadingComponent;
