import { encode } from "blurhash";
import Resizer from "react-image-file-resizer";
import firebasePostData from "../../api/postData";
import firebasePostImage from "../../api/postImage";
import { ITF_AuthorLogin, ITF_Logs } from "../../interface/mainInterface";

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
function postDataToSever(objectData: any, objectOldDataStr: string, authorLogin: ITF_AuthorLogin, disPatch: Function) {
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
  const key = objectData.id; //:
  const nowTime = Date.now();
  // const idUpload = {
  //   ref: `/MainData/${key}/id`,
  //   data: objectData.id,
  // };
  const codeUpload = {
    ref: `/MainData/${key}/code`,
    data: objectData.code,
  };
  const titleUpload = {
    ref: `/MainData/${key}/title`,
    data: objectData.title,
  };
  const progressTagUpload = {
    ref: `/MainData/${key}/progressTag`,
    data: objectData.progressTag,
  };
  const subTitleUpload = {
    ref: `/MainData/${key}/subTitle`,
    data: objectData.subTitle,
  };
  const descriptionUpload = {
    ref: `/MainData/${key}/description`,
    data: objectData.description,
  };
  const storeUpload = {
    ref: `/MainData/${key}/store`,
    data: objectData.store,
  };
  const tagUpload = {
    ref: `/MainData/${key}/tag`,
    data: objectData.tag,
  };
  const noteUpload = {
    ref: `/MainData/${key}/note`,
    data: objectData.note,
  };
  // const iconUpload = {
  //   ref: `/MainData/${key}/icon`,
  //   data: objectData.icon,
  // };
  // const imagesUpload = {
  //   ref: `/MainData/${key}/images`,
  //   data: objectData.images,
  // };
  // const attachmentsUpload = {
  //   ref: `/MainData/${key}/attachments`,
  //   data: objectData.attachments,
  // };
  // const authorUpload = {
  //   ref: `/MainData/${key}/author`,
  //   data: objectData.author,
  // };
  // const dateCreatedUpload = {
  //   ref: `/MainData/${key}/dateCreated`,
  //   data: objectData.dateCreated,
  // };

  // const statusUpload = {
  //   ref: `/MainData/${key}/status`,
  //   data: objectData.status,
  // };
  // const favoriteUpload = {
  //   ref: `/MainData/${key}/favorite`,
  //   data: objectData.favorite,
  // };
  // const importantUpload = {
  //   ref: `/MainData/${key}/important`,
  //   data: objectData.important,
  // };
  // const isPrivateUpload = {
  //   ref: `/MainData/${key}/isPrivate`,
  //   data: objectData.isPrivate,
  // };
  const logsUpload = {
    ref: `/MainData/${key}/logs/${nowTime}`,
    data: {
      behavior: "Edit",
      author: authorLogin.displayName,
      authorId: authorLogin.userName,
      detail: objectOldDataStr,
      item: key,
    },
  };
  const logMainUpload: ITF_Logs = {
    ref: `Logs/${nowTime}`,
    data: {
      behavior: "Edit",
      author: authorLogin.displayName,
      authorId: authorLogin.userName,
      detail: objectOldDataStr,
      item: key,
    },
  };

  const uploadContainer = [codeUpload, titleUpload,progressTagUpload, subTitleUpload, descriptionUpload, storeUpload, tagUpload, noteUpload, logsUpload, logMainUpload];
  firebasePostData(uploadContainer, callbackSuccess);
}

//TODO_END: Post Data to Sever

//!export

export { postDataToSever, handelPrepareData };
