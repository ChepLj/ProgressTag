import { Camera, CameraResultType, CameraSource , Photo} from "@capacitor/camera";
import { useState } from "react";
import { Capacitor } from "@capacitor/core";
import { ITF_UserPhoto } from "../../interface/mainInterface";

//Interface 



export function usePhotoGallery() {
  const isNative = Capacitor.isNativePlatform()
  if (isNative) {
    Camera.requestPermissions(); //: request permission
  }

  const [photos, setPhotos] = useState<ITF_UserPhoto[]>([]);

  const takePhoto = async (type: string, indexChange?: number) => {
    let source = CameraSource.Prompt;
    switch (type) {
      case "camera": {
        source = CameraSource.Camera;
        break;
      }
      case "gallery": {
        source = CameraSource.Photos;
        break;
      }
      default: {
        source = CameraSource.Prompt;
        break;
      }
    }

    const handelPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: source,
      quality: 100,
    });
    const fileName = new Date().getTime() + ".jpeg";
    if (typeof(indexChange) === 'number') {
      //: change  image
      const oldArrayPhoto = [...photos];
      oldArrayPhoto[indexChange] = {
        fileName: fileName,
        path: handelPhoto.path ,
        webPath:  handelPhoto.webPath,
        avatar: false,
      };
      console.log("🚀 ~ file: takePhotoHook.ts:63 ~ takePhoto ~ oldArrayPhoto:", oldArrayPhoto)

      setPhotos(oldArrayPhoto);
    } else {
      const newPhotos = [
        {
          fileName: fileName,
          path: handelPhoto.path ,
          webPath:  handelPhoto.webPath,
          avatar: false,
        },
        ...photos,
      ];
      setPhotos(newPhotos);
    }
     
  };

  return {
    photos,
    takePhoto,
    setPhotos,
  };
}



export type {ITF_UserPhoto}
