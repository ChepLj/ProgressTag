import {
  IonHeader,
  IonGrid,
  IonRow,
  IonCol,
  IonThumbnail,
  IonItem,
  IonNote,
  IonText,
  IonLabel,
  IonImg,
  IonList,
  IonIcon,
  IonRouterLink,
  IonToolbar,
  IonChip,
  IonBadge,
  IonAccordionGroup,
  IonAccordion,
  IonPopover,
} from "@ionic/react";
import { documentAttachOutline, constructOutline, documentTextOutline, newspaperOutline } from "ionicons/icons";
import { Blurhash } from "react-blurhash";
import { LazyLoadImage } from "react-lazy-load-image-component";

import noImageAvailable from "../../../source/img/No_Image_Available.jpg";
import timestampToTime from "../../../components/FC_Components/timestampToTime";
import { ITF_ProgressTag } from "../../../interface/mainInterface";

export default function DetailPageDesktop({ object, handleRemoveBlurhash, imageNumberTemp, setShowImage, calculatorTotal, handleChangeQuantity, setProgressTagGoTo }) {
  return (
    <>
      {/* //! content header */}
      <IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol size="2">
              <IonThumbnail className="detail_content-thumbnail">
                <LazyLoadImage
                  className="detail_content-thumbnail-img"
                  // src={array[index]}
                  src={object.icon.image}
                  alt="avatar"
                  width={"100%"}
                  height={"100%"}
                  afterLoad={() => {
                    handleRemoveBlurhash(`detail_content-thumbnail-blurhash-avatar`);
                  }}
                />
                {object.icon.hash && <Blurhash id={`detail_content-thumbnail-blurhash-avatar`} className="mainPage_img-blurhash" hash={object.icon.hash} resolutionX={32} resolutionY={32} punch={1} />}
              </IonThumbnail>
            </IonCol>
            <IonCol size="5">
              <IonItem className="ion-no-padding fontSize-normal">
                <IonNote color="medium" slot="start" style={{ marginRight: 4 }}>
                  Name:
                </IonNote>
                <IonText className="fontStyle-boil ion-text-wrap ion-text-right " color="primary">
                  {object.title}
                </IonText>
              </IonItem>
              <IonItem className="ion-no-padding fontSize-normal">
                <IonLabel color="medium">MSVT:</IonLabel>
                <IonText className="fontStyle-boil">{object.code}</IonText>
              </IonItem>

              <IonItem className="ion-no-padding fontSize-normal">
                <IonLabel color="medium">Date Created:</IonLabel>
                <IonText className="fontStyle-italic">{timestampToTime(+object!.dateCreated, "date only")}</IonText>
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
                      key={index}
                      onClick={() => {
                        object?.images[index]?.image && setShowImage({ isOpen: true, index: index });
                      }}
                    >
                      <IonThumbnail className="previewBeforeUpload_content-thumbnail">
                        <IonImg className="previewBeforeUpload_content-thumbnail-img" src={object?.images[index]?.image || noImageAvailable} />
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
                        <IonItem className="previewBeforeUpload_content-attachment" key={index}>
                          <IonIcon icon={documentAttachOutline} slot="start" />
                          <IonRouterLink href={crr?.URL} target="_blank" color="success">
                            {crr?.fileName}
                          </IonRouterLink>
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
            <IonLabel>Progress Tag: :</IonLabel>

            <span style={{ borderLeft: "2px solid gray", marginLeft: "8px", marginRight: "8px" }}></span>
          </span>

          {object?.progressTag?.[0]?.id &&
            object?.progressTag?.map((crr: ITF_ProgressTag, index: number) => {
              return (
                <IonChip key={index} color={crr?.type == "Original" ? "success" : "medium"} onClick={() => setProgressTagGoTo({ isOpen: true, messenger: `Xem thông tin của Progress Tag ${crr.id}`, Url: crr?.ref })}>
                  <IonLabel style={{ paddingRight: 5 }}>{crr?.id}</IonLabel>
                </IonChip>
              );
            })}
        </IonToolbar>
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
              <IonChip key={index} onClick={() => handleChangeQuantity(crr.local, crr.quantity, index)}>
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
          {object?.tag?.map((crr: any, index: number) => {
            return (
              <IonChip key={index} color="danger">
                <IonLabel style={{ paddingRight: 5 }}>{crr}</IonLabel>
              </IonChip>
            );
          })}
        </IonToolbar>
      </IonHeader>
      {/* //! end content header*/}

      {/* //! content detail */}
      <section className="detail_content-contentSection" id="detail_content-contentSection">
        <IonRow>
          <IonCol size="6">
            <IonAccordionGroup value="first">
              <IonAccordion value="first">
                <IonItem slot="header" color="light">
                  <IonIcon icon={constructOutline} size="small" className="detail_accordion-icon"></IonIcon>
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
          <IonCol size="6">
            <IonAccordionGroup value="third">
              <IonAccordion value="second">
                <IonItem slot="header" color="light">
                  <IonIcon icon={documentTextOutline} size="small" className="detail_accordion-icon"></IonIcon>
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
              <IonAccordion value="third">
                <IonItem slot="header" color="light">
                  <IonIcon icon={newspaperOutline} size="small" className="detail_accordion-icon"></IonIcon>
                  <IonLabel>Logs</IonLabel>
                </IonItem>
                <IonList slot="content" color="secondary">
                  {object.logs ? (
                    Object.keys(object.logs)
                      .reverse()
                      .map((crr, index) => {
                        return (
                          <IonItem key={index}>
                            <div className="fontStyle-italic margin-right-6px fontSize-normal">{object.logs[+crr].behavior}</div>
                            <IonLabel id={`log-detail-${crr}`} className="fontSize-normal">
                              {object.logs[+crr].detail}
                            </IonLabel>
                            <div className="fontStyle-italic fontSize-small alight-right">
                              <IonText>{object.logs[+crr].author}</IonText>
                              <IonLabel>{timestampToTime(+crr)}</IonLabel>
                            </div>
                            <IonPopover trigger={`log-detail-${crr}`} triggerAction="click" side="top">
                              <IonText class="ion-padding">{object.logs[+crr].detail}</IonText>
                            </IonPopover>
                          </IonItem>
                        );
                      })
                  ) : (
                    <IonItem lines="none">Không có dữ liệu !</IonItem>
                  )}
                </IonList>
              </IonAccordion>
            </IonAccordionGroup>
          </IonCol>
        </IonRow>
        {/* //! end content detail */}
      </section>
    </>
  );
}
