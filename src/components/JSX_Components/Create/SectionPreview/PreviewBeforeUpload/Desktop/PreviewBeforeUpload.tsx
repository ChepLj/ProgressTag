import { IonAccordion, IonAccordionGroup, IonBadge, IonButton, IonButtons, IonChip, IonCol, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonModal, IonRow, IonText, IonThumbnail, IonTitle, IonToolbar } from "@ionic/react";
import { constructOutline, documentAttachOutline, documentTextOutline } from "ionicons/icons";
import { memo, useEffect, useState } from "react";



import noImageAvailable from "../../../../../../source/img/No_Image_Available.jpg";

import "./PreviewBeforeUpload.css";
import { ITF_Data, ITF_ObjectData, ITF_ImagesObject } from "../../../../../../interface/mainInterface";
import timestampToTime from "../../../../../FC_Components/timestampToTime";

//! Main
const PreviewBeforeUpload = ({ object, className, objectDataOld }: { object: ITF_Data; className: string; objectDataOld?: ITF_ObjectData }) => {
  console.log("🚀 ~ PreviewBeforeUpload ~ object:", object);
  //* Check Render and Unmount
  console.log("%cPreviewBeforeUpload Render", "color:green");
  useEffect(() => {
    return () => console.log("%cPreviewBeforeUpload Unmount", "color:red");
  }, []);
  //* END Check Render and Unmount
  const [showImage, setShowImage] = useState({ isOpen: false, index: 0 });
  const imageNumberTemp = [0, 1, 2, 3];
  //TODO: Calculator Total
  const calculatorTotal = object.store.reduce((total: number, crr: any) => {
    return total + crr.quantity;
  }, 0);

  //TODO_END: Calculator Total
  useEffect(() => {
    //: Unmount
    return () => {
      console.log("previewBeforeUpload unmount");
    };
  }, []);

  return (
    <section className={className}>
      {/* //! content header */}
      <IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol size="2">
              <IonThumbnail className="previewBeforeUpload_content-thumbnail">
                <IonImg className="previewBeforeUpload_content-thumbnail-img" src={objectDataOld?.icon ? objectDataOld.icon.image : object.icon.image} />
              </IonThumbnail>
            </IonCol>
            <IonCol size="5">
              <IonItem className="ion-no-padding fontSize-normal">
                <IonLabel color="medium">Name:</IonLabel>
                <IonText className="fontStyle-boil" color="primary">
                  {object.title}
                </IonText>
              </IonItem>
              <IonItem className="ion-no-padding fontSize-normal">
                <IonLabel color="medium">MSVT:</IonLabel>
                <IonText className="fontStyle-boil">{object.code}</IonText>
              </IonItem>
              <IonItem className="ion-no-padding fontSize-normal">
                <IonLabel color="medium">Progress Tag:</IonLabel>
                <IonText className="fontStyle-boil">{`object.progressTag?.id`}</IonText>
              </IonItem>
              <IonItem className="ion-no-padding fontSize-normal">
                <IonLabel color="medium">Date Created:</IonLabel>
                <IonText className="fontStyle-italic">{timestampToTime(+object.dateCreated, "date only")}</IonText>
              </IonItem>
              <IonItem className="ion-no-padding fontSize-normal">
                <IonLabel color="medium">Author:</IonLabel>
                <IonText className="fontStyle-italic">{object.author}</IonText>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonRow>
                {imageNumberTemp.map((crr, index) => {
                  return (
                    <IonCol
                      key={"Desktop-Image-Number" + index}
                      onClick={() => {
                        object?.images[index]?.image && setShowImage({ isOpen: true, index: index });
                      }}
                    >
                      <IonThumbnail className="previewBeforeUpload_content-thumbnail">
                        <IonImg className="previewBeforeUpload_content-thumbnail-img" src={objectDataOld?.images[index] ? objectDataOld.images[index].image : object?.images[index]?.image || noImageAvailable} />
                      </IonThumbnail>
                    </IonCol>
                  );
                })}
              </IonRow>
              <IonRow>
                <IonList style={{ width: "100%" }}>
                  {object.attachments?.[0] ? (
                    object.attachments?.map((crr, index) => {
          
                      return (
                        <IonItem className="previewBeforeUpload_content-attachment" key={"Desktop-attachments-Preview" + index}>
                          <IonIcon icon={documentAttachOutline} slot="start" />
                          <IonText color="secondary">{crr?.name}</IonText>
                        </IonItem>
                      );
                    })
                  ) : objectDataOld?.attachments?.[0]?.fileName ? (
                    objectDataOld.attachments?.map((crr, index) => {
                      return (
                        <IonItem className="previewBeforeUpload_content-attachment" key={"Desktop-attachments-old-Preview" + index}>
                          <IonIcon icon={documentAttachOutline} slot="start" />
                          <IonText color="secondary">{crr?.fileName}</IonText>
                        </IonItem>
                      );
                    })
                  ) : (
                    <span className="fontStyle-italic fontSize-small ">No attachment !!!</span>
                  )}
                </IonList>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonToolbar>
          <span style={{ display: "inline-flex" }}>
            <IonLabel>Total :</IonLabel>
            <IonLabel color="success" className="fontSize-large padding-left-right-8px">
              {calculatorTotal}
            </IonLabel>
            <IonLabel className="fontStyle-italic fontSize-small ">{object.store[0]?.unit}</IonLabel>
            <span style={{ borderLeft: "2px solid gray", marginLeft: "8px", marginRight: "8px" }}></span>
          </span>
          {object.store.map((crr: any, index: number) => {
            return (
              <IonChip key={"Desktop-store-Preview" + index}>
                <IonLabel style={{ paddingRight: 5 }}>{crr.local}</IonLabel>
                <IonBadge>{crr.quantity}</IonBadge>
              </IonChip>
            );
          })}
        </IonToolbar>
        <IonToolbar>
          <span style={{ display: "inline-flex" }}>
            <IonLabel>Group :</IonLabel>

            <span style={{ borderLeft: "2px solid gray", marginLeft: "8px", marginRight: "8px" }}></span>
          </span>
          {object.tag.map((crr: any, index: number) => {
            return (
              <IonChip key={"Desktop-tag-Preview" + index} color="danger">
                <IonLabel style={{ paddingRight: 5 }}>{crr}</IonLabel>
              </IonChip>
            );
          })}
        </IonToolbar>
      </IonHeader>
      {/* //! end content header*/}

      {/* //! content previewBeforeUpload */}
      <section>
        <IonRow>
          <IonCol>
            <IonAccordionGroup value="first">
              <IonAccordion value="first">
                <IonItem slot="header" color="light">
                  <IonIcon icon={constructOutline} size="small" className="previewBeforeUpload_accordion-icon">
                    {" "}
                  </IonIcon>
                  <IonLabel>Description</IonLabel>
                </IonItem>
                <IonLabel slot="content" color="secondary">
                  <IonItem lines="none">
                    <div dangerouslySetInnerHTML={{ __html: object.description }} style={{ width: "100%" }}></div>
                  </IonItem>
                </IonLabel>
              </IonAccordion>
            </IonAccordionGroup>
          </IonCol>
          <IonCol>
            <IonAccordionGroup value="first">
              <IonAccordion value="first">
                <IonItem slot="header" color="light">
                  <IonIcon icon={documentTextOutline} size="small" className="previewBeforeUpload_accordion-icon">
                    {" "}
                  </IonIcon>
                  <IonLabel>Note</IonLabel>
                </IonItem>
                <IonLabel slot="content" color="secondary">
                  {object.note ? (
                    <IonItem lines="none">
                      <div dangerouslySetInnerHTML={{ __html: object.note }} style={{ width: "100%" }}></div>
                    </IonItem>
                  ) : (
                    <IonItem lines="none">Không có dữ liệu !</IonItem>
                  )}
                </IonLabel>
              </IonAccordion>
            </IonAccordionGroup>
          </IonCol>
        </IonRow>
        {/* //! end content previewBeforeUpload */}
      </section>
      <ModalImageShow
        state={showImage}
        images={object.images}
        callback={(object: any) => {
          setShowImage(object);
        }}
      />
    </section>
  );
};

//! end Main
//JSX: Modal Show Image
function ModalImageShow({ state, images, callback }: { state: any; images: Array<ITF_ImagesObject>; callback: Function }) {
  //TODO: Tính toán chuyển bức hình tiếp theo khi nhấn next
  const calculatorIndex = (): number => {
    if (state.index < images.length - 1) {
      const newIndex = state.index + 1;
      return newIndex;
    } else return 0;
  };
  //TODO: end
  return (
    <IonModal isOpen={state.isOpen}>
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
            Image {state.index + 1}/{images.length}
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

      <IonImg src={images[state.index]?.image} />
    </IonModal>
  );
}

//JSX_END: Modal Show Image

export default memo(PreviewBeforeUpload);
