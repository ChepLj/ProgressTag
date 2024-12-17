import { Toast } from "@capacitor/toast";
import { IonButton, IonButtons, IonChip, IonCol, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonModal, IonPopover, IonRow, IonText, IonThumbnail, IonTitle, IonToolbar } from "@ionic/react";
import { cameraOutline, checkmarkCircleOutline, imagesOutline, trashOutline } from "ionicons/icons";
import { useContext, useEffect, useState } from "react";
import { ITF_ObjectData } from "../../../../interface/mainInterface";
import noImageAvailable from "../../../../source/img/No_Image_Available.jpg";
import { handelOpenTextFile } from "../../../FC_Components/browserFile";
import { getKeyByValue } from "../../../FC_Components/getKeyByValue";
import { MIMEtype } from "../../../FC_Components/MIMEtype";
import { usePhotoGallery } from "../../../FC_Components/takePhotoHook";
import { AuthContext } from "../../../../pages/LoginPage/function/loginContext";
export default //JSX: Section 3
function Section3({ step, arrayImage, arrayFile, objectData }: { step: any; arrayImage: any; arrayFile: any; objectData?: ITF_ObjectData }) {
  //* Check Render and Unmount
  console.log("%cSection3 Render", "color:green");
  useEffect(() => {
    return () => console.log("%cSection3 Unmount", "color:red");
  }, []);
  //* END Check Render and Unmount

  let display: "create_section_hidden" | "create_section_display" = "create_section_hidden";
  if (step == 3) {
    display = "create_section_display";
  } else {
    display = "create_section_hidden";
  }

  const [showImage, setShowImage] = useState({ isOpen: false, index: 0 });
  const [showPopover, setShowPopover] = useState(false);
  const { photos, takePhoto, setPhotos } = usePhotoGallery();
  const [file, setFile] = useState<File>();

  //TODO: Check default avatar index
  const handelCheckDefaultAvatar = () => {
    for (const value of photos) if (value.avatar) return;

    if (photos.length > 0) photos[0].avatar = true;
  };
  handelCheckDefaultAvatar(); //:Run
  //TODO_END: Check default avatar index

  //TODO: Check limit of Photos
  const handelBeforeTakePhoto = (type: string) => {
    if (photos.length >= 4) {
      return Toast.show({
        text: "Full of image ! (maximum 4 image)",
        position: "center",
      });
    }
    takePhoto(type);
  };

  //TODO_END: Check limit of Photos

  //TODO: Delete image
  const handelDeleteImage = (index: number) => {
    const arrayImagesTemp = [...photos];
    arrayImagesTemp.splice(index, 1);
    setPhotos(arrayImagesTemp);
    setShowImage({ isOpen: false, index: 0 }); //: Exit modal
  };
  //TODO_END: Delete image

  //TODO: Change image
  const handelChangeImage = (index: number) => {
    takePhoto("prompt", index);
  };

  //TODO_END: Change image

  //TODO: Set as avatar
  const handelSetAvatar = (index: number) => {
    //! chưa hiểu vì sao không setphoto() mà vẫn render lại được
    const arrayPhotoTemp = [...photos];
    arrayPhotoTemp.forEach((crr, indexCrr) => {
      if (index === indexCrr) {
        crr.avatar = true;
      } else {
        crr.avatar = false;
      }
    });
    setShowImage({ isOpen: false, index: 0 }); //: Exit modal
  };
  //TODO_END: Set as avatar
  // Assign photo array to arrayImage
  arrayImage.current = photos;
  arrayFile.current[0] = file;
  //

  //TODO: handle delete File
  const handleDeleteFile = () => {
    setFile(undefined);
  };
  //TODO: handle delete File
  console.log(file);
  return (
    <section className={display}>
      <IonGrid>
        <IonToolbar>
          <IonTitle slot="start">Photos</IonTitle>
          <IonButtons slot="end">
            <IonButton size="small" id="add-photo" onClick={() => setShowPopover(true)}>
              Add New Photo
            </IonButton>
            <IonPopover trigger="add-photo" side="bottom" alignment="start" isOpen={showPopover} onDidDismiss={() => setShowPopover(false)}>
              <IonItem>
                <IonButtons
                  onClick={() => {
                    if (objectData) {
                      alert("Không sử dụng được tính năng này ở chế độ chỉnh sửa vật tư !");
                      return;
                    }
                    handelBeforeTakePhoto("gallery");
                  }}
                >
                  <IonButton>Select from Gallery</IonButton>
                  <IonIcon icon={imagesOutline} color="primary" />
                </IonButtons>
              </IonItem>
              <IonItem>
                <IonButtons
                  onClick={() => {
                    if (objectData) {
                      alert("Không sử dụng được tính năng này ở chế độ chỉnh sửa vật tư !");
                      return;
                    }
                    handelBeforeTakePhoto("camera");
                  }}
                >
                  <IonButton>Take photo</IonButton>
                  <IonIcon icon={cameraOutline} color="primary" />
                </IonButtons>
              </IonItem>
            </IonPopover>
          </IonButtons>
        </IonToolbar>
        <IonRow>
          <IonCol
            size="3"
            onClick={() => {
              if (photos[0]) setShowImage({ isOpen: true, index: 0 });
            }}
          >
            <IonThumbnail className="create_thumbnail">
              <IonImg
                className="create_img create-section3-image1"
                data-available={Boolean(photos[0] || objectData?.id)}
                src={objectData?.images ? objectData.images?.[0].image : photos[0]?.webPath || noImageAvailable}
              />
            </IonThumbnail>
            {photos[0]?.avatar && (
              <IonChip className="create_thumbnail-icon-sticker">
                <IonLabel color="danger">Avatar</IonLabel>
                <IonIcon icon={checkmarkCircleOutline} color="success" />
              </IonChip>
            )}
          </IonCol>
          <IonCol
            size="3"
            onClick={() => {
              if (photos[1]) setShowImage({ isOpen: true, index: 1 });
            }}
          >
            <IonThumbnail className="create_thumbnail">
              <IonImg className="create_img" src={objectData?.images?.[1] ? objectData.images[1].image : photos[1]?.webPath || noImageAvailable} />
            </IonThumbnail>
            {photos[1]?.avatar && (
              <IonChip className="create_thumbnail-icon-sticker">
                <IonLabel color="danger">Avatar</IonLabel>
                <IonIcon icon={checkmarkCircleOutline} color="success" />
              </IonChip>
            )}
          </IonCol>
          <IonCol
            size="3"
            onClick={() => {
              if (photos[2]) setShowImage({ isOpen: true, index: 2 });
            }}
          >
            <IonThumbnail className="create_thumbnail">
              <IonImg className="create_img" src={objectData?.images?.[2] ? objectData.images[2].image : photos[2]?.webPath || noImageAvailable} />
            </IonThumbnail>
            {photos[2]?.avatar && (
              <IonChip className="create_thumbnail-icon-sticker">
                <IonLabel color="danger">Avatar</IonLabel>
                <IonIcon icon={checkmarkCircleOutline} color="success" />
              </IonChip>
            )}
          </IonCol>
          <IonCol
            size="3"
            onClick={() => {
              if (photos[3]) setShowImage({ isOpen: true, index: 3 });
            }}
          >
            <IonThumbnail className="create_thumbnail">
              <IonImg className="create_img" src={objectData?.images?.[3] ? objectData.images[3].image : photos[3]?.webPath || noImageAvailable} />
            </IonThumbnail>
            {photos[3]?.avatar && (
              <IonChip className="create_thumbnail-icon-sticker">
                <IonLabel color="danger">Avatar</IonLabel>
                <IonIcon icon={checkmarkCircleOutline} color="success" />
              </IonChip>
            )}
          </IonCol>
        </IonRow>
        <IonRow></IonRow>
      </IonGrid>
      <IonToolbar>
        <IonTitle slot="start">Attachments</IonTitle>
        <IonButtons slot="end">
          <IonButton
            size="small"
            onClick={() => {
              if (objectData) {
                alert("Không sử dụng được tính năng này ở chế độ chỉnh sửa vật tư !");
                return;
              }
              handelOpenTextFile(setFile);
            }}
          >
            Add New Attach
          </IonButton>
        </IonButtons>
      </IonToolbar>

      <IonItem>
        {file?.size ? (
          <>
            <IonLabel class="ion-text-wrap">
              <h2 style={{ color: "blue" }}>{file?.name ? file.name : "..."}</h2>
              <p>
                <IonText color="medium">Type:</IonText> {file?.type ? getKeyByValue(MIMEtype, file?.type) : "..."} &nbsp;&nbsp;
                <IonText color="medium">Size:</IonText> {file?.size ? file.size : "..."} BYTE
              </p>
            </IonLabel>
            <IonButton fill="clear" color="danger" onClick={handleDeleteFile}>
              <IonIcon slot="icon-only" icon={trashOutline} />
            </IonButton>
          </>
        ) : objectData?.attachments ? (
          <IonLabel class="ion-text-wrap">
            <h2 style={{ color: "blue" }}>{objectData?.attachments[0]?.fileName}</h2>
          </IonLabel>
        ) : (
          <IonText color="danger">No attachments added yet.</IonText>
        )}
      </IonItem>

      <ModalImageShow
        state={showImage}
        images={photos}
        callbackClose={(object: any) => {
          setShowImage(object);
        }}
        callbackDelete={handelDeleteImage}
        callbackChange={handelChangeImage}
        callbackSetAvatar={handelSetAvatar}
      />
    </section>
  );
}

//TODO: Modal Show Image
function ModalImageShow({
  state,
  images,
  callbackDelete,
  callbackChange,
  callbackClose,
  callbackSetAvatar,
}: {
  state: any;
  images: Array<any>;
  callbackDelete: Function;
  callbackChange: Function;
  callbackClose: Function;
  callbackSetAvatar: Function;
}) {
  //* Check Render and Unmount
  console.log("%cModalImageShow Render", "color:green");
  useEffect(() => {
    return () => console.log("%cModalImageShow Unmount", "color:red");
  }, []);
  //* END Check Render and Unmount
  const { authorLogin } = useContext<any>(AuthContext);
  return (
    <IonModal id={authorLogin.isPhone ? "modelImageShowMobile" : "modelImageShow"} isOpen={state.isOpen} onWillDismiss={() => callbackClose({ isOpen: false, index: 0 })}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              onClick={() => {
                callbackClose({ isOpen: false, index: 0 });
              }}
            >
              Close
            </IonButton>
          </IonButtons>
          <IonTitle>Image slot {state.index + 1}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => {}}>Next</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonRow className="create_modal-imageShow">
        <IonCol
          onClick={() => {
            callbackChange(state.index);
          }}
        >
          <IonButton expand="full" fill="solid" color="warning">
            Change
          </IonButton>
        </IonCol>
        <IonCol
          onClick={() => {
            callbackSetAvatar(state.index);
          }}
        >
          <IonButton expand="full" fill="solid" color="success">
            Set as Avatar
          </IonButton>
        </IonCol>
        <IonCol
          onClick={() => {
            callbackDelete(state.index);
          }}
        >
          <IonButton expand="full" fill="solid" color="danger">
            Delete
          </IonButton>
        </IonCol>
      </IonRow>
      <div className="createImageShow">
        <img src={images[state.index]?.webPath} className="createImageShowItem" />
      </div>
      {/* <IonImg src={images[state.index]?.webPath} /> */}

      {images[state.index]?.avatar && (
        <IonChip className="create_modal-imageShow-avatar">
          <IonLabel color="danger">Avatar</IonLabel>
          <IonIcon icon={checkmarkCircleOutline} color="warning" />
        </IonChip>
      )}
    </IonModal>
  );
}

//TODO: end Modal Show Image

//JSX_END: Section 3
