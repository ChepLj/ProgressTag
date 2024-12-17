import { ActionSheet, ActionSheetButtonStyle } from "@capacitor/action-sheet";
import { Toast } from "@capacitor/toast";
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonThumbnail, IonTitle, IonToolbar } from "@ionic/react";
import { memo, useContext, useEffect } from "react";
import firebaseDeleteData from "../../api/deleteData";
import firebaseGetMainData from "../../api/getData";
import firebasePostData from "../../api/postData";
import { MainContext } from "../../context/mainDataContext";
import { ITF_Logs } from "../../interface/mainInterface";
import { AuthContext } from "../LoginPage/function/loginContext";

const TrashPage: React.FC = () => {
  //* Check Render and Unmount
  console.log("%cTrash Page Render", "color:green");
  useEffect(() => {
    return () => console.log("%cTrash Page Unmount", "color:red");
  }, []);
  //* END Check Render and Unmount
  const { data, keyOfDataShow, disPatch } = useContext<any>(MainContext);
  const { authorLogin } = useContext<any>(AuthContext);
  //TODO: get key of delete object
  const keyOfDataDelete = [];
  for (const key in data) {
    if (data[key]?.status == "pre-delete" && (authorLogin.displayName === "Admin" || authorLogin.displayName === data[key]?.author)) {
      keyOfDataDelete.push(key);
    }
  }
  keyOfDataDelete.reverse();
  //TODO_END: get key of delete object

  //TODO: restore Item
  const handelRestoreItem = (item: string) => {
    const callbackSuccess = (result: string) => {
      if (result === "post successfully!") {
        //: lấy data từ firebase sao đó dispatch đê render lại
        const childRef = "MainData/";
        firebaseGetMainData(childRef, disPatch);
      } else {
        Toast.show({
          text: "Something is wrong !",
        });
      }
    };
    //!
    const currentTime = Date.now();
    const status = {
      ref: `MainData/${item}/status`,
      data: "normal",
    };
    const logsItem: ITF_Logs = {
      ref: `MainData/${item}/logs/${currentTime}`,
      data: {
        behavior: "restore",
        author: authorLogin.displayName,
        authorId: authorLogin.userName,
        detail: "restore",
        item: item,
      },
    };
    const logsMain: ITF_Logs = {
      ref: `Logs/${currentTime}`,
      data: {
        behavior: "restore",
        author: authorLogin.displayName,
        authorId: authorLogin.userName,
        detail: "restore",
        item: item,
      },
    };
    const uploadContainer = [status, logsItem, logsMain];
    firebasePostData(uploadContainer, callbackSuccess);
  };
  //TODO_END: restore Item
  //TODO: remove Item
  const handelRemoveItem = async (item: string) => {
    const result = await ActionSheet.showActions({
      title: `Delete forever ${item} item`,
      message: `Are you sure delete forever ${item} item ?`,
      options: [
        {
          title: "Delete",
          style: ActionSheetButtonStyle.Destructive,
        },
        {
          title: "Cancel",
          style: ActionSheetButtonStyle.Cancel,
        },
      ],
    });
    if (result.index === 0) {
      const callbackSuccess = async (result: string) => {
        if (result === "remove successfully!") {
          const currentTime = Date.now();
          const logsMain: ITF_Logs = {
            ref: `Logs/${currentTime}`,
            data: {
              behavior: "remove",
              author: authorLogin.displayName,
              authorId: authorLogin.userName,
              detail: "remove",
              item: item,
            },
          };
          const uploadContainer = [logsMain];
          await firebasePostData(uploadContainer, () => {});

          //: lấy data từ firebase sao đó dispatch đê render lại
          const childRef = "MainData/";
          await firebaseGetMainData(childRef, disPatch);
        } else {
          Toast.show({
            text: "Something is wrong !",
          });
        }
      };
      /////////////////////////////////////
      const ref = `MainData/${item}`;
      firebaseDeleteData(ref, callbackSuccess);
    }
  };
  //TODO_END: remove Item
  return (
    <IonPage>
      {/* <Header title="Trash"></Header> */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/* <IonBackButton text="Home"></IonBackButton> */}
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Trash</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {keyOfDataDelete.length >= 1 ? (
          <IonList>
            {keyOfDataDelete.map((crrKey, index) => {
              return (
                <IonItem key={index}>
                  <IonThumbnail style={{ border: "1px solid gray", margin: "5px" }}>
                    <img src={data[crrKey]?.icon.image} />
                  </IonThumbnail>
                  <div className="margin-right-6px">
                    <IonLabel className="fontSize-normal" color="primary">
                      {data[crrKey]?.id}
                    </IonLabel>
                    <IonLabel className="fontStyle-italic fontSize-normal" color="warning">
                      {data[crrKey]?.author}
                    </IonLabel>
                  </div>
                  <IonButtons slot="end">
                    <IonButton
                      slot="start"
                      color="success"
                      fill="solid"
                      onClick={() => {
                        handelRestoreItem(crrKey);
                      }}
                    >
                      Restore
                    </IonButton>
                    <span style={{ width: "10px" }}></span>
                    <IonButton
                      slot="end"
                      color="danger"
                      fill="solid"
                      onClick={() => {
                        handelRemoveItem(crrKey);
                      }}
                    >
                      Remove
                    </IonButton>
                  </IonButtons>
                </IonItem>
              );
            })}
          </IonList>
        ) : (
          <h5 className="fontStyle-italic" style={{ textAlign: "center" }}>
            Trash is empty !
          </h5>
        )}
      </IonContent>
    </IonPage>
  );
};

export default memo(TrashPage);
