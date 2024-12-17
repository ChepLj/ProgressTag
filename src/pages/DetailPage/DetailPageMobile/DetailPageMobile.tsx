import {
  IonAccordion,
  IonAccordionGroup,
  IonBadge,
  IonChip,
  IonCol,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPopover,
  IonRouterLink,
  IonRow,
  IonSpinner,
  IonText,
  IonThumbnail,
  IonToolbar,
} from "@ionic/react";

import { constructOutline, documentAttachOutline, documentTextOutline, newspaperOutline } from "ionicons/icons";
import { memo } from "react";
import { Blurhash } from "react-blurhash";
import { LazyLoadImage } from "react-lazy-load-image-component";
import timestampToTime from "../../../components/FC_Components/timestampToTime";
import "./DetailPageMobile.css";
import noImageAvailable from "../../../source/img/No_Image_Available.jpg";
import { ITF_ProgressTag } from "../../../interface/mainInterface";
const DetailPage = ({ object, handleRemoveBlurhash, calculatorTotal, handleChangeQuantity, setShowImage, setProgressTagGoTo }) => {
  console.log("🚀 ~ DetailPage ~ object:", object)
  console.log("%cDetail Page Render", "color:green");

  return (
    <>
      {" "}
      {/* //! content header */}
      <IonHeader className="detail_content-header" id="detail_content-header">
        <IonGrid>
          <IonRow>
            {/* <IonCol size="4">
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
              <IonItem lines="none" className="ion-no-padding">
                <IonLabel color="success" className="fontSize-large">
                  {calculatorTotal}
                </IonLabel>
                <IonLabel className="fontStyle-italic fontSize-normal detail_content-unit">{object.store[0]?.unit}</IonLabel>
              </IonItem>
            </IonCol> */}
            <IonCol size="12">
              <IonItem className="ion-no-padding fontSize-normal">
                <IonLabel >ProgressTag:</IonLabel>
                <IonText className="fontStyle-boil" color="danger" style={{fontSize: '18px'}}>{object.code}</IonText>
              </IonItem>
              <IonItem className="ion-no-padding fontSize-normal">
                <IonLabel color="medium" >
                  Area:
                </IonLabel>
                <IonText className="fontStyle-boil ">{object.title}</IonText>
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
          </IonRow>
        </IonGrid>
        {object?.progressTag?.[0]?.id && (
          <IonToolbar>
            {object?.progressTag?.map((crr: ITF_ProgressTag, index: number) => {
              return (
                <IonChip key={index} color={crr.type == "Original" ? "success" : "medium"} onClick={() => setProgressTagGoTo({ isOpen: true, messenger: `Xem thông tin của Progress Tag ${crr.id}`, Url: crr?.ref })}>
                  <IonLabel style={{ paddingRight: 5 }}>{crr.id}</IonLabel>
                </IonChip>
              );
            })}
          </IonToolbar>
        )}
        {/* <IonToolbar>
          {object.store.map((crr: any, index: number) => {
            return (
              <IonChip key={index + "store"} onClick={() => handleChangeQuantity(crr.local, crr.quantity, index)}>
                <IonLabel style={{ paddingRight: 5 }}>{crr.local}</IonLabel>
                <IonBadge>{crr.quantity}</IonBadge>
              </IonChip>
            );
          })}
        </IonToolbar>
        <IonToolbar>
          {object?.tag?.map((crr: any, index: number) => {
            return (
              <IonChip key={index + "tag"} color="danger">
                <IonLabel style={{ paddingRight: 5 }}>{crr}</IonLabel>
              </IonChip>
            );
          })}
        </IonToolbar> */}
      </IonHeader>
      {/* //! end content header*/}
      {/* //! content header fake*/}
      <IonHeader className="detail_content-header-fake">
        <IonGrid>
          <IonRow>
            <IonCol size="4">
              <IonThumbnail className="detail_content-thumbnail">
                <IonImg className="detail_content-thumbnail-img" src="" />
              </IonThumbnail>
              <IonItem lines="none" className="ion-no-padding">
                <IonLabel color="success" className="fontSize-large"></IonLabel>
                <IonLabel className="fontStyle-italic fontSize-normal detail_content-unit"></IonLabel>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem className="ion-no-padding fontSize-normal">
                <IonLabel color="medium"></IonLabel>
                <IonText className="fontStyle-boil" color="primary"></IonText>
              </IonItem>

              <IonItem className="ion-no-padding fontSize-normal">
                <IonLabel color="medium"></IonLabel>
                <IonText className="fontStyle-italic"></IonText>
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

        {object?.progressTag?.[0]?.id && (
          <IonToolbar>
            {object?.progressTag?.map((crr: ITF_ProgressTag, index: number) => {
              return (
                <IonChip key={index} color={crr.type == "Original" ? "success" : "medium"}>
                  <IonLabel style={{ paddingRight: 5 }}>{crr.id}</IonLabel>
                </IonChip>
              );
            })}
          </IonToolbar>
        )}

        {/* <IonToolbar>
          {object.store.map((crr: any, index: number) => {
            return (
              <IonChip key={index + "storeFake"}>
                <IonLabel style={{ paddingRight: 5 }}>{crr.local}</IonLabel>
                <IonBadge>{crr.quantity}</IonBadge>
              </IonChip>
            );
          })}
        </IonToolbar>
        <IonToolbar>
          {object?.tag?.map((crr: any, index: number) => {
            return (
              <IonChip key={index + "tagFake"} color="danger">
                <IonLabel style={{ paddingRight: 5 }}>{crr}</IonLabel>
              </IonChip>
            );
          })}
        </IonToolbar> */}
      </IonHeader>
      {/* //! end content header fake*/}
      {/* //! content detail */}
      <section className="detail_content-contentSection" id="detail_content-contentSection">
        <IonGrid>
          <IonRow>
            <IonCol
              onClick={() => {
                object?.images[0]?.image && setShowImage({ isOpen: true, index: 0 });
              }}
            >
              <IonThumbnail className="detail_content-thumbnail">
                {object?.images[0]?.image ? (
                  <>
                    <LazyLoadImage
                      className="detail_content-thumbnail-img"
                      src={object?.images[0]?.image || noImageAvailable}
                      alt="avatar"
                      width={"100%"}
                      height={"100%"}
                      afterLoad={() => {
                        handleRemoveBlurhash(`detail_content-thumbnail-image-0`);
                      }}
                    />
                    <IonSpinner name="lines-sharp-small" id={`detail_content-thumbnail-image-0`} className="mainPage_img-blurhash" color="medium"></IonSpinner>
                  </>
                ) : (
                  <IonImg className="detail_content-thumbnail-img" src={noImageAvailable} />
                )}
              </IonThumbnail>
            </IonCol>
            <IonCol
              onClick={() => {
                object?.images[1]?.image && setShowImage({ isOpen: true, index: 1 });
              }}
            >
              <IonThumbnail className="detail_content-thumbnail">
                {object?.images[1]?.image ? (
                  <>
                    <LazyLoadImage
                      className="detail_content-thumbnail-img"
                      src={object?.images[1]?.image || noImageAvailable}
                      alt="avatar"
                      width={"100%"}
                      height={"100%"}
                      afterLoad={() => {
                        handleRemoveBlurhash(`detail_content-thumbnail-image-1`);
                      }}
                    />
                    <IonSpinner name="lines-sharp-small" id={`detail_content-thumbnail-image-1`} className="mainPage_img-blurhash" color="medium"></IonSpinner>
                  </>
                ) : (
                  <IonImg className="detail_content-thumbnail-img" src={noImageAvailable} />
                )}
              </IonThumbnail>
            </IonCol>
            <IonCol
              onClick={() => {
                object?.images[2]?.image && setShowImage({ isOpen: true, index: 2 });
              }}
            >
              <IonThumbnail className="detail_content-thumbnail">
                {object?.images[2]?.image ? (
                  <>
                    <LazyLoadImage
                      className="detail_content-thumbnail-img"
                      src={object?.images[2]?.image || noImageAvailable}
                      alt="avatar"
                      width={"100%"}
                      height={"100%"}
                      afterLoad={() => {
                        handleRemoveBlurhash(`detail_content-thumbnail-image-2`);
                      }}
                    />
                    <IonSpinner name="lines-sharp-small" id={`detail_content-thumbnail-image-2`} className="mainPage_img-blurhash" color="medium"></IonSpinner>
                  </>
                ) : (
                  <IonImg className="detail_content-thumbnail-img" src={noImageAvailable} />
                )}
              </IonThumbnail>
            </IonCol>
            <IonCol
              onClick={() => {
                object?.images[3]?.image && setShowImage({ isOpen: true, index: 3 });
              }}
            >
              <IonThumbnail className="detail_content-thumbnail">
                {object?.images[3]?.image ? (
                  <>
                    <LazyLoadImage
                      className="detail_content-thumbnail-img"
                      src={object?.images[3]?.image || noImageAvailable}
                      alt="avatar"
                      width={"100%"}
                      height={"100%"}
                      afterLoad={() => {
                        handleRemoveBlurhash(`detail_content-thumbnail-image-3`);
                      }}
                    />
                    <IonSpinner name="lines-sharp-small" id={`detail_content-thumbnail-image-3`} className="mainPage_img-blurhash" color="medium"></IonSpinner>
                  </>
                ) : (
                  <IonImg className="detail_content-thumbnail-img" src={noImageAvailable} />
                )}
              </IonThumbnail>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonAccordionGroup expand="compact" value={["fourth"]}>
          <IonAccordion value="first">
            <IonItem slot="header" color="light">
              <IonIcon icon={constructOutline} size="small" className="detail_accordion-icon">
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
              <IonIcon icon={documentTextOutline} size="small" className="detail_accordion-icon">
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
              <IonIcon icon={newspaperOutline} size="small" className="detail_accordion-icon"></IonIcon>
              <IonLabel>Logs</IonLabel>
            </IonItem>
            <IonList slot="content" color="secondary">
              {object.logs ? (
                Object.keys(object.logs)
                  .reverse()
                  .map((crr, index) => {
                    return (
                      <IonItem key={index + "log"}>
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
          <IonAccordion value="fourth">
            <IonItem slot="header" color="light">
              <IonIcon icon={documentAttachOutline} size="small" className="detail_accordion-icon"></IonIcon>
              <IonLabel>Drawing & Document</IonLabel>
            </IonItem>
            <IonList slot="content" color="secondary">
              {object.attachments?.[0] ? (
                object.attachments?.map((crr, index) => {
                  return (
                    <IonItem className="previewBeforeUpload_content-attachment" key={index}>
                      <IonRouterLink href={crr?.URL} target="_blank" color="success">
                        {crr?.fileName}
                      </IonRouterLink>
                    </IonItem>
                  );
                })
              ) : (
                <span className="fontStyle-italic fontSize-small " style={{ paddingLeft: "10px" }}>
                  No attachment !!!
                </span>
              )}
              <br />
              <br />
            </IonList>
          </IonAccordion>
        </IonAccordionGroup>
        {/* //! end content detail */}
      </section>
    </>
  );
};

export default memo(DetailPage);
