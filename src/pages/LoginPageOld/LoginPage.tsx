import { IonPage } from "@ionic/react";

const LoginPage = () => {
  // const { authorLogin, setAuthorLogin } = useContext<any>(AuthContext);
  // const [modalOpen, setModalOpen] = useState({ isOpen: false, versionAllow: [] });
  // const date = new Date();
  // //!-------------
  // const setAuthorLoginCookie = async (value: string) => {
  //   const options = {
  //     url: "http://equipment.manager",
  //     key: "authorLogin",
  //     value: value,
  //     expires: new Date(Date.now() + 604800 * 1000).toUTCString(), //: 1 minute

  //   };

  //   await Http.setCookie(options);
  // };
  // //!----------
  // //////////
  // // const googleLogin = () => {

  // // };

  // const handelManualLogin = () => {
  //   const userNameElm = document.querySelector('input[name="login-username"]') as HTMLInputElement;
  //   const passwordElm = document.querySelector('input[name="login-password"]') as HTMLInputElement;
  //   //TODO: Dispatch when got User
  //   const handelManualLoginFirebaseUser = ({ type, payload }: { type: string; payload: any }) => {
  //     if (type === "SUCCESSFUL") {
  //       let isMatching = false;
  //       for (const key in payload) {
  //         if (userNameElm?.value === key) {
  //           if (passwordElm?.value == payload?.[key].password) {
  //             if (payload?.[key]?.level === "lock") {
  //               Toast.show({
  //                 text: "Tài khoản này đã bị khóa! Liên hệ Mr.Sỹ để biết thêm chi tiết !",
  //               });
  //             } else {
  //               const authLoginTemp = payload?.[key];
  //               authLoginTemp.provider = "Account";
  //               authLoginTemp.expiresTime = date.getDate()
  //               const authLoginJSON = JSON.stringify(authLoginTemp);
  //               setAuthorLoginCookie(authLoginJSON);
  //               setAuthorLogin(authLoginTemp);
  //             }
  //           } else {
  //             Toast.show({
  //               text: "Sai mật khẩu",
  //             });
  //           }
  //           isMatching = true;
  //           break;
  //         }
  //       }
  //       {
  //         !isMatching &&
  //           Toast.show({
  //             text: "Tài khoản không tồn tại !",
  //           });
  //       }
  //     }
  //     //TODO_END: Dispatch when got User
  //   };

  //   if (userNameElm?.value === "admin") {
  //     if (passwordElm?.value === "1131") {
  //       const authLoginTemp = {
  //         displayName: "Admin",
  //         email: "Admin",
  //         photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTALaz-a4vn9owNouOECZMXi-qJ6QFYAfOcgutqlXT3mvMlPFEFRVcdAUIDUw3wPD17z8g&usqp=CAU",
  //         provider: "Account",
  //         level: "Admin",
  //         expiresTime: date.getDate()
  //       };
  //       const authLoginJSON = JSON.stringify(authLoginTemp);
  //       setAuthorLoginCookie(authLoginJSON);
  //       setAuthorLogin(authLoginTemp);
  //     } else {
  //       Toast.show({
  //         text: "Sai mật khẩu",
  //       });
  //     }
  //   } else {
  //     const childRef = "User/";
  //     firebaseGetMainData(childRef, handelManualLoginFirebaseUser);
  //   }
  // };
  // ////////////////
  // //TODO: Check version allow
  // useEffect(() => {
  //   const handelCheckVersionAllow = ({ type, payload }: { type: string; payload: any }) => {
  //     if (type === "SUCCESSFUL" && !payload.includes(APP_VERSION)) {
  //       setModalOpen({ isOpen: true, versionAllow: payload });
  //     }
  //   };
  //   const childRef = "VersionAllow/";
  //   firebaseGetMainData(childRef, handelCheckVersionAllow);
  // }, []);

  // //TODO_END: Check version allow
  // //TODO: handle key press
  //  const handleKeyPress = (e:any)=>{
  //   const key = e.key
  //   if(key === 'Enter'){
  //     handelManualLogin()
  //   }
  //  }
  // //TODO_END: handle key press

  return (
    <IonPage className="alight-item">
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>{"Login"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent style={{width:'400px'}}>
        <IonList style={{ margin: "20px" }}>
          <div style={{ border: " 1px solid #ccc", borderRadius: "5px", padding: "5px", marginTop: "20px", marginBottom: "20px" }}>
            <IonItem fill="outline" shape="round">
              <IonLabel position="floating">User Name</IonLabel>
              <IonInput placeholder="Enter text" name="login-username"></IonInput>
            </IonItem>
            <IonItem fill="outline">
              <IonLabel position="floating">Password</IonLabel>
              <IonInput placeholder="Enter text" name="login-password" onKeyUp={(e:any)=> handleKeyPress(e)}></IonInput>
            </IonItem>
          </div>
          <IonButton expand="block" onClick={handelManualLogin}>
            Login
          </IonButton>
          <IonLabel style={{ margin: "20px", width: "auto", display: "block", textAlign: "center" }}>------------ or -------------</IonLabel>
          <IonButton expand="block" fill="outline" onClick={()=> alert('Currently this method is not supported!')}>
            <IonIcon icon={logoGoogle} slot="start" />
            <IonLabel>Login with Google</IonLabel>
          </IonButton>
        </IonList>
      </IonContent>
      <IonModal isOpen={modalOpen.isOpen} canDismiss={false}>
        <div style={{ margin: 10 }}>
          <h3>Equipments Manager</h3>
          <div>current version: {APP_VERSION}</div>
          <div>version suppose: {JSON.stringify(modalOpen.versionAllow)}</div>
          <div style={{ color: "red", margin: 10 }}>This version is not supposed to use. Please update to the latest version or contact Mr.Sy !!!</div>
        </div>
      </IonModal> */}
    </IonPage>
  );
};

export default LoginPage;
