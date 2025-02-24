import {
  IonAccordion,
  IonAccordionGroup,
  IonBadge,
  IonButton,
  IonButtons,
  IonChip,
  IonCol,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPopover,
  IonRow,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { constructOutline, documentAttachOutline, documentTextOutline, imagesOutline, key } from "ionicons/icons";
import { memo, useContext, useEffect, useState } from "react";

import { ITF_Data, ITF_ImagesObject, ITF_ProgressTag } from "../../../../../../interface/mainInterface";
import timestampToTime from "../../../../../FC_Components/timestampToTime";
import "./PreviewBeforeUploadMobile.css";
import { ProgressTagContext } from "../../../../../../context/progressTagContext";
import ModalImageShow from "../../../../../../pages/DetailPage/Modal/ModalImageShow";

//! Main
const PreviewBeforeUploadMobile = ({ object, className, objectDataOld }: { object: ITF_Data; objectDataOld: any; className: string }) => {
  console.log("🚀 ~ PreviewBeforeUploadMobile ~ object:", object);
  //* Check Render and Unmount
  console.log("%cPreviewBeforeUpload Render", "color:green");

  const { ProgressTag, disPatchProgressTag } = useContext<any>(ProgressTagContext);
  useEffect(() => {
    return () => console.log("%cPreviewBeforeUpload Unmount", "color:red");
  }, []);
  //* END Check Render and Unmount
  const [showImage, setShowImage] = useState({ isOpen: false, index: 0, title: "", images: [] });
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
      <IonHeader className="previewBeforeUpload_content-header" id="previewBeforeUpload_content-header">
        <IonGrid>
          <IonRow>
            <IonCol size="4">
              <IonThumbnail className="previewBeforeUpload_content-thumbnail">
                <IonImg className="previewBeforeUpload_content-thumbnail-img" src={object.icon.image} />
              </IonThumbnail>
              <IonItem lines="none" className="ion-no-padding">
                <IonLabel color="success" className="fontSize-large">
                  {calculatorTotal}
                </IonLabel>
                <IonLabel className="fontStyle-italic fontSize-normal previewBeforeUpload_content-unit">{object.store[0]?.unit}</IonLabel>
              </IonItem>
            </IonCol>
            <IonCol>
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
                <IonLabel color="medium">Date Created:</IonLabel>
                <IonText className="fontStyle-italic">{timestampToTime(+object.dateCreated, "date only")}</IonText>
              </IonItem>
              <IonItem className="ion-no-padding fontSize-normal">
                <IonLabel color="medium">Author:</IonLabel>
                <IonText className="fontStyle-italic">{object.author}</IonText>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
        {object?.progressTag && (
          <IonToolbar>
            {object?.progressTag.map((crr: ITF_ProgressTag, index: number) => {
              const { tag, type, key } = crr || {};
              const objectTemp = ProgressTag[key];
              return (
                <span key={"Mobile-ProgressTag-Preview" + index}>
                  <IonChip id={`mobile-hover-trigger-previewProgressTag-${index}-${tag}`} color={type === "Original" ? "success" : "medium"}>
                    <IonLabel>{tag || "Unknown"}</IonLabel>
                  </IonChip>
                  <IonPopover trigger={`mobile-hover-trigger-previewProgressTag-${index}-${tag}`} onDidDismiss={() => ""}>
                    <div style={{ padding: "1rem" }}>
                      <p>
                        <i>Area:</i> {objectTemp?.tag}
                      </p>
                      <p>
                        <i>Local:</i>{objectTemp?.local}
                      </p>
                      <p>
                        <i>Type:</i> {objectTemp?.type}
                      </p>
                      <p style={{ display: "flex", alignItems: "center" }}>
                        <i>View image</i>
                        <i>&nbsp;&nbsp;&nbsp;({objectTemp?.images.length})&nbsp;</i>
                        <IonIcon
                          icon={imagesOutline}
                          color="primary"
                          onClick={() => {
                            objectTemp?.images.length && setShowImage({ isOpen: true, index: 0, title: `${tag} ProgressTag `, images: objectTemp?.images });
                          }}
                        />
                      </p>
                      
                    </div>
                  </IonPopover>
                </span>
              );
            })}
          </IonToolbar>
        )}
        <IonToolbar>
          {object.store.map((crr: any, index: number) => {
            return (
              <IonChip key={"Mobile-store-Preview" + index}>
                <IonLabel style={{ paddingRight: 5 }}>{crr.local}</IonLabel>
                <IonBadge>{crr.quantity}</IonBadge>
              </IonChip>
            );
          })}
        </IonToolbar>
        <IonToolbar>
          {object?.tag?.map((crr: any, index: number) => {
            return (
              <IonChip key={"Mobile-Tag-Preview" + index} color="danger">
                <IonLabel style={{ paddingRight: 5 }}>{crr}</IonLabel>
              </IonChip>
            );
          })}
        </IonToolbar>
      </IonHeader>
      {/* //! end content header*/}
      {/* //! content header fake*/}
      <IonHeader className="previewBeforeUpload_content-header-fake">
        <IonGrid>
          <IonRow>
            <IonCol size="4">
              <IonThumbnail className="previewBeforeUpload_content-thumbnail">
                <IonImg className="previewBeforeUpload_content-thumbnail-img" src="" />
              </IonThumbnail>
              <IonItem lines="none" className="ion-no-padding">
                <IonLabel color="success" className="fontSize-large"></IonLabel>
                <IonLabel className="fontStyle-italic fontSize-normal previewBeforeUpload_content-unit"></IonLabel>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem className="ion-no-padding fontSize-normal">
                <IonLabel color="medium"></IonLabel>
                <IonText className="fontStyle-boil" color="primary"></IonText>
              </IonItem>

              <IonItem className="ion-no-padding fontSize-normal">
                <IonLabel color="medium"></IonLabel>
                <IonText className="fontStyle-boil"></IonText>
              </IonItem>
              <IonItem className="ion-no-padding fontSize-normal">
                <IonLabel color="medium"></IonLabel>
                <IonText className="fontStyle-italic"></IonText>
              </IonItem>
              <IonItem className="ion-no-padding fontSize-normal">
                <IonLabel color="medium"></IonLabel>
                <IonText className="fontStyle-italic"></IonText>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
        {object?.progressTag && (
          <IonToolbar>
            {Object.keys(object?.progressTag).map((key: string, index: number) => {
              const content = object.progressTag[key];
              return (
                <IonChip key={"Mobile-ProgressTag-fake-Preview" + index} color={content.type == "Original" ? "success" : "medium"}>
                  <IonLabel style={{ paddingRight: 5 }}>{content.id}</IonLabel>
                </IonChip>
              );
            })}
          </IonToolbar>
        )}
        <IonToolbar>
          {object.store.map((crr: any, index: number) => {
            return (
              <IonChip key={"Mobile-store-fake-Preview" + index}>
                <IonLabel style={{ paddingRight: 5 }}>{crr.local}</IonLabel>
                <IonBadge>{crr.quantity}</IonBadge>
              </IonChip>
            );
          })}
        </IonToolbar>
        <IonToolbar>
          {object?.tag?.map((crr: any, index: number) => {
            return (
              <IonChip key={"Mobile-tag-fake-Preview" + index} color="danger">
                <IonLabel style={{ paddingRight: 5 }}>{crr}</IonLabel>
              </IonChip>
            );
          })}
        </IonToolbar>
      </IonHeader>
      {/* //! end content header fake*/}
      {/* //! content previewBeforeUpload */}
      <section>
        <IonGrid>
          <IonRow>
            <IonCol
              onClick={() => {
                object?.images[0]?.image && setShowImage({ isOpen: true, index: 0, title: `Image`, images: object?.images });
              }}
            >
              <IonThumbnail className="previewBeforeUpload_content-thumbnail">
                <IonImg className="previewBeforeUpload_content-thumbnail-img" src={object?.images[0]?.image} />
              </IonThumbnail>
            </IonCol>
            <IonCol
              onClick={() => {
                object?.images[1]?.image && setShowImage({ isOpen: true, index: 1, title: `Image`, images: object?.images });
              }}
            >
              <IonThumbnail className="previewBeforeUpload_content-thumbnail">
                <IonImg className="previewBeforeUpload_content-thumbnail-img" src={object?.images[1]?.image} />
              </IonThumbnail>
            </IonCol>
            <IonCol
              onClick={() => {
                object?.images[2]?.image && setShowImage({ isOpen: true, index: 2, title: `Image`, images: object?.images });
              }}
            >
              <IonThumbnail className="previewBeforeUpload_content-thumbnail">
                <IonImg className="previewBeforeUpload_content-thumbnail-img" src={object?.images[2]?.image} />
              </IonThumbnail>
            </IonCol>
            <IonCol
              onClick={() => {
                object?.images[3]?.image && setShowImage({ isOpen: true, index: 3, title: `Image`, images: object?.images });
              }}
            >
              <IonThumbnail className="previewBeforeUpload_content-thumbnail">
                <IonImg className="previewBeforeUpload_content-thumbnail-img" src={object?.images[3]?.image} />
              </IonThumbnail>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonAccordionGroup value={["third"]} multiple>
          <IonAccordion value="first">
            <IonItem slot="header" color="light">
              <IonIcon icon={constructOutline} size="small" className="previewBeforeUpload_accordion-icon">
                {" "}
              </IonIcon>
              <IonLabel>Description</IonLabel>
            </IonItem>
            <IonLabel slot="content" color="secondary">
              <IonItem lines="none">
                <div dangerouslySetInnerHTML={{ __html: object.description }}></div>
              </IonItem>
            </IonLabel>
          </IonAccordion>
          <IonAccordion value="second">
            <IonItem slot="header" color="light">
              <IonIcon icon={documentTextOutline} size="small" className="previewBeforeUpload_accordion-icon">
                {" "}
              </IonIcon>
              <IonLabel>Note</IonLabel>
            </IonItem>
            <IonLabel slot="content" color="secondary">
              {object.note ? (
                <IonItem lines="none">
                  <div dangerouslySetInnerHTML={{ __html: object.note }}></div>
                </IonItem>
              ) : (
                <IonItem lines="none">Không có dữ liệu !</IonItem>
              )}
            </IonLabel>
          </IonAccordion>

          <IonAccordion value="third">
            <IonItem slot="header" color="light">
              <IonIcon icon={documentAttachOutline} size="small" className="previewBeforeUpload_accordion-icon"></IonIcon>
              <IonLabel>Attachments</IonLabel>
            </IonItem>
            <IonList slot="content" color="secondary">
              {object.attachments?.[0] ? (
                object.attachments?.map((crr, index) => {
                  return (
                    <IonItem className="previewBeforeUpload_content-attachment" key={"Mobile-attachments-Preview" + index}>
                      {/* <IonIcon icon={documentAttachOutline} slot="start" /> */}
                      <IonText color="secondary">{crr?.name}</IonText>
                    </IonItem>
                  );
                })
              ) : objectDataOld?.attachments?.[0]?.fileName ? (
                objectDataOld.attachments?.map((crr, index) => {
                  return (
                    <IonItem className="previewBeforeUpload_content-attachment" key={"Mobile-attachment-old-Preview" + index}>
                      {/* <IonIcon icon={documentAttachOutline} slot="start" /> */}
                      <IonText color="secondary">{crr?.fileName}</IonText>
                    </IonItem>
                  );
                })
              ) : (
                <span className="fontStyle-italic fontSize-small ">No attachment !!!</span>
              )}
            </IonList>
          </IonAccordion>
        </IonAccordionGroup>
        {/* //! end content previewBeforeUpload */}
      </section>
      <ModalImageShow
   
      isPhone={window.screen.width < 800}
      state={showImage}
  
      setShowImage={setShowImage}
      />
    </section>
  );
};

//! end Main


export default memo(PreviewBeforeUploadMobile);
