import { encode } from "blurhash";
import { get, ref } from "firebase/database";
import Resizer from "react-image-file-resizer";
import firebasePostData from "../../api/postData";
import firebasePostImage from "../../api/postImage";
import { database } from "../../firebase/firebaseConfig";
import { ITF_AuthorLogin, ITF_Logs } from "../../interface/mainInterface";
import firebasePostMedia from "../../api/postImage";
import { MIMEtype } from "./MIMEtype";

//TODO: Get all Data
function firebaseGetDataFromSever(disPatch: Function) {
  const mainRef = ref(database, "/MainData/");
  get(mainRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        // calculatorNewKey(snapshot.val());

        //: disPatch đẻ render lại
        disPatch({
          type: "get data from server",
          payload: snapshot.val(),
        });
      } else {
        console.log("%cfirebaseGetDataFromSever ~ No data available", "color:red");
      }
    })
    .catch((error) => {
      console.log("%cfirebaseGetDataFromSever ~ Error", "color:red", error);
    });
}

//TODO_END: Get all Data

//TODO: Calculator new key
function calculatorNewKey({ objectFromSever, disPatch }: { objectFromSever: any; disPatch: Function }) {
  let newKey = 0;

  for (const key in objectFromSever) {
    if (newKey < Number(key.substring(2))) {
      newKey = Number(key.substring(2));
    }
  }

  const codeOfAuthorName = "BF";
  const key = `${codeOfAuthorName}${newKey + 1}`;

  if (key) {
    disPatch({
      type: "create new key",
      payload: key,
    });
  }
}
//TODO_END: Calculator new key

//TODO: Handel Prepare Data

const handelPrepareData = (objectData: Function, disPatch: Function) => {
  const handel = objectData();

  if (handel) {
    disPatch({
      type: "prepare data",
      payload: handel,
    });
  }
};

//TODO_END: Handel Prepare Data

//TODO: Post Data to Sever
function postDataToSever(objectData: any, key: string, authorLogin: ITF_AuthorLogin, disPatch: Function) {
  const callbackSuccess = (result: string) => {
    if (result === "post successfully!") {
      disPatch({
        type: "post data",
        payload: key,
      });
    } else if (result === "post failed!") {
      //! failed
      alert("Post Data to Sever failed!");
    }
  };
  objectData.id = key; //:
  objectData.ref = `/MainData/${key}`; //:
  console.log("🚀 ~ postDataToSever ~ objectData:", objectData)
  objectData.author = authorLogin.displayName; //:
  objectData.authorId = authorLogin.userName; //:

  const data = {
    ref: `/MainData/${key}`,
    data: objectData,
  };
  console.log("🚀 ~ postDataToSever ~ data:", data)

  const log: ITF_Logs = {
    ref: `Logs/${Date.now()}`,
    data: {
      behavior: "Create",
      author: authorLogin.displayName,
      authorId: authorLogin.userName,
      detail: "Create new item",
      item: key,
    },
  };
  const uploadContainer = [data, log];
  firebasePostData(uploadContainer, callbackSuccess);
}

//TODO_END: Post Data to Sever

//TODO: Create Avatar
function createAvatar(images: Array<any>, disPatch: Function) {
  let avatar = "";
  for (const value of images) {
    if (value.avatar) {
      avatar = value.image;
      break;
    }
  }
  fetch(avatar)
    .then((result) => {
      return result.blob();
    })
    .then((result) => {
      action(result);
    })
    .catch((err) => {
      console.log("%c progressUpdate.ts:107 ~ createAvatar failure:", "color:red", err);
    });

  const action = (result: Blob) => {
    try {
      Resizer.imageFileResizer(
        result,
        300,
        300,
        "JPEG",
        70,
        0,
        (output: any) => {
          createBlurhashAvatar(output, disPatch);
        },
        "blob",
        300,
        300
      );
    } catch {
      console.log("%cCompress Avatar failure", "color:red");
    }
  };
}

//TODO_END: Create Avatar

//TODO: Create Blurhash Avatar
function createBlurhashAvatar(image: Blob, disPatch: Function) {
  const img = new Image();
  img.onerror = (...args) => console.log(args);
  const imageUrl = URL.createObjectURL(image);
  img.src = imageUrl;
  img.crossOrigin = "Anonymous";
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const context = canvas.getContext("2d");
    if (context) {
      context.drawImage(img, 0, 0);
      const imageData = context.getImageData(0, 0, img.width, img.height);
      if (imageData) {
        disPatch({
          type: "handel avatar",
          payload: {
            hash: encode(imageData.data, imageData.width, imageData.height, 4, 4),
            image: image,
          },
        });
      } else {
        disPatch({
          type: "handel avatar",
          payload: {
            image: image,
          },
        });
      }
    }
  };
}
//TODO_END: Create Blurhash Avatar

//TODO: Post Avatar
function postAvatar(image: any, key: string, disPatch: Function) {
  const fileName = `${key}_avatar`;
  const childRef = `Avatar/`;
  const finishPostAvatar = (status: "Upload completed successfully" | "Upload Failed", payload: any) => {
    if (status == "Upload completed successfully") {
      disPatch({
        type: "post avatar",
        payload: {
          image: payload,
          hash: image.hash || "L6PZfSi_.AyE_3t7t7R**0o#DgR4",
        },
      });
    } else if (status == "Upload Failed") {
    }
  };

  firebasePostImage(image.image, childRef, fileName, finishPostAvatar);

  /////
}
//TODO_END:  Post Avatar

//TODO: Post AvatarURL to Sever
function postAvatarURLToSever(image: string, key: string, disPatch: Function) {
  const callbackSuccess = (result: string) => {
    if (result === "post successfully!") {
      disPatch({
        type: "post avatar URL",
        payload: image,
      });
    } else if (result === "post failed!") {
      //! failed
      alert("Post avatar to Sever failed!");
    }
  };

  const uploadContainer = [
    {
      ref: `/MainData/${key}/icon/`,
      data: image,
    },
  ];
  firebasePostData(uploadContainer, callbackSuccess);
}
//TODO_end: Post AvatarURL to Sever

//TODO: Handel Post Image
function handelPostImage(images: Array<any>, key: string, disPatch: Function, setImageState: Function) {
  let imageUrlResultArray: Array<string> = [];
  const stateLogs: any = [];
  const totalOfImages = images.length;
  let itemCount = 0;
  const finishPost = (status: "Upload completed successfully" | "Upload Failed", payload: any) => {
    if (status === "Upload completed successfully") {
      imageUrlResultArray.push(payload); //: add result URL
      ++itemCount; //: (0 -> (totalOfImages -1))
      if (itemCount < totalOfImages) {
        uploadEachItem();
      } else if (itemCount === totalOfImages) {
        //! finish
        disPatch({
          type: "post images",
          payload: imageUrlResultArray,
        });
      }
    } else if (status == "Upload Failed") {
      //! failed
      alert("Post images to Sever failed!");
    }
  };

  /////
  const uploadEachItem = () => {
    if (itemCount >= 0 && itemCount < totalOfImages) {
      const fileName = `${key}_${itemCount}`;
      const childRef = `Image/${key}/`;
      //TODO: Show progress

      const progressCallback = (snapshot: any) => {
        stateLogs[itemCount] = {
          bytesTransferred: snapshot.bytesTransferred,
          totalBytes: snapshot.totalBytes,
        };
        setImageState([...stateLogs]);
      };
      //TODO_END: Show progress
      fetch(images[itemCount])
        .then((result) => {
          return result.blob();
        })
        .then((result) => {
          firebasePostMedia(result, childRef, fileName, finishPost, progressCallback);
        });
    }
  };
  uploadEachItem();
  /////
}
//TODO_END: Handel Post Image

//TODO: Post ImageURL to Sever
function postImageURLToSever(images: Array<any>, key: string, disPatch: Function) {
  const callbackSuccess = (result: string) => {
    if (result === "post successfully!") {
      disPatch({
        type: "post images URL",
        payload: images,
      });
    } else if (result === "post failed!") {
      //! failed
      alert("Post images URL to Sever failed!");
    }
  };

  const uploadContainer = [
    {
      ref: `/MainData/${key}/images`,
      data: images,
    },
  ];
  firebasePostData(uploadContainer, callbackSuccess);
}
//TODO_end: Post ImageURL to Sever

//TODO: Handle Post Attachment
function handlePostFile(files: Array<any>, key: string, dispatch: Function, setFileState: Function) {
  console.log("🚀 ~ handlePostFile ~ files:", files);
  if (files[0]) {
    let fileUrlResultArray: Array<{ fileName: string; URL: string }> = [];
    const stateLogs: any = [];
    const totalOfFiles = files.length;
    console.log("🚀 ~ handlePostFile ~ totalOfFiles:", totalOfFiles)
    let itemCount = 0;
    const finishPost = (status: "Upload completed successfully" | "Upload Failed", payload: any, fileName: string) => {
      if (status === "Upload completed successfully") {
        const result = {
          fileName: fileName,
          URL: payload,
        };
        fileUrlResultArray.push(result); // Add result URL
        ++itemCount; // Increment item count
        if (itemCount < totalOfFiles) {
          uploadEachItem();
        } else if (itemCount === totalOfFiles) {
          // Dispatch action when all files are uploaded
          dispatch({
            type: "post attaches",
            payload: fileUrlResultArray,
          });
        }
      } else if (status === "Upload Failed") {
        // Handle upload failure
        alert("Post files to Server failed!");
      }
    };

    // Function to upload each file
    const uploadEachItem = () => {
      if (itemCount >= 0 && itemCount < totalOfFiles) {
        const file = files[itemCount];
        const temp = file.name.split(".");
        const tag = temp[temp.length - 1];
        const fileName = file.name + "." + tag;
        const childRef = `File/${key}/`; // Updated reference path
        let newMetadata = undefined;
        // Show progress callback
        const progressCallback = (snapshot: any) => {
          stateLogs[itemCount] = {
            bytesTransferred: snapshot.bytesTransferred,
            totalBytes: snapshot.totalBytes,
          };
          setFileState([...stateLogs]);
        };
        if (file.type === "") {
          const tagTemp = temp[temp.length - 1] as keyof typeof MIMEtype;
          newMetadata = {
            contentType: MIMEtype[tagTemp],
          };
        }
        firebasePostMedia(files[itemCount], childRef, fileName, finishPost, progressCallback, newMetadata);
      }
    };
    uploadEachItem();
  } else {
    dispatch({
      type: "post attaches URL",
      payload: "",
    });
  }
}

//TODO_END: Handle Post Attachment

//TODO: Handle Post URL Attachment
function postFileURLToServer(files: Array<any>, key: string, dispatch: Function) {
  const callbackSuccess = (result: string) => {
    if (result === "post successfully!") {
      dispatch({
        type: "post attaches URL",
        payload: files,
      });
    } else if (result === "post failed!") {
      //! failed
      alert("Post files URL to Server failed!");
    }
  };

  const uploadContainer = [
    {
      ref: `/MainData/${key}/attachments`,
      data: files,
    },
  ];
  firebasePostData(uploadContainer, callbackSuccess);
}

//TODO_END: Handle Post URL Attachment

//!export

export { firebaseGetDataFromSever, calculatorNewKey, postDataToSever, handelPrepareData, handelPostImage, postImageURLToSever, handlePostFile, postFileURLToServer, postAvatar, postAvatarURLToSever, createAvatar };
