import firebaseGetMainData from "../../api/getData";
import firebasePostData from "../../api/postData";
import { ITF_AuthorLogin, ITF_Logs } from "../../interface/mainInterface";
import checkPermission from "./checkPermission";
import { Toast } from "@capacitor/toast";

function FC_HandelPreDelete(item: string, author: string|number,authorLogin:ITF_AuthorLogin, disPatch: Function) {
  //TODO: callback when preDelete success
  const callback = (result: any) => {
    if (result === "post successfully!") {
      Toast.show({
        text: `Delete ${item} item successful !`,
      });
  // Re-render
      const childRef = "MainData/";
      firebaseGetMainData(childRef, disPatch);
    } else {
      console.log("%c preDelete Failure", "color:red");
      Toast.show({
        text: `Delete ${item} item Failure !`,
      });
    }
  };
  //TODO_END: callback when preDelete success

  if (item && checkPermission("pre-delete", author, authorLogin)) {
    const currentTime = Date.now();
    const status = {
      ref: `MainData/${item}/status`,
      data: "pre-delete",
    };
    const logsItem: ITF_Logs = {
      ref: `MainData/${item}/logs/${currentTime}`,
      data: {
        behavior: "pre-delete",
        author: authorLogin.displayName,
        authorId: authorLogin.userName,
        detail: "pre-delete",
        item: item,
      },
    };
    const logsMain: ITF_Logs = {
      ref: `Logs/${currentTime}`,
      data: {
        behavior: "pre-delete",
        author: authorLogin.displayName,
        authorId: authorLogin.userName,

        detail: "pre-delete",
        item: item,
      },
    };
    const uploadContainer = [status, logsItem, logsMain];
    firebasePostData(uploadContainer, callback);
  }
}

export default FC_HandelPreDelete;
