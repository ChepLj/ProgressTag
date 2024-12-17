import { Toast } from "@capacitor/toast";
import firebaseGetMainData from "../../api/getData";
import firebasePostData from "../../api/postData";

function setImportant(item: string, arrImportant: Array<string>,author:string,disPatch:Function) {
  //TODO: callback when Important success
  const callback = (result: any) => {
    if (result === "post successfully!") {
      Toast.show({
        text: `Set Important ${item} item successful !`,
      });
  // Re-render
      const childRef = "MainData/";
      firebaseGetMainData(childRef, disPatch);
    } else {
      console.log("%c Important Failure", "color:red");
      Toast.show({
        text: `Set Important ${item} item Failure !`,
      });
    }
  };
  //TODO_END: callback when Important success
    arrImportant.push(author)
  const uploadContainer = [
    {
      ref: `MainData/${item}/important`,
      data: [...arrImportant],
    },
  ];
  firebasePostData(uploadContainer, callback);
}

//! ---------------------------------------------------
function unSetImportant(item: string, arrImportant: Array<string>,author:string,disPatch:Function) {
  //TODO: callback when Important success
  const callback = (result: any) => {
    if (result === "post successfully!") {
      Toast.show({
        text: `Unset Important ${item} item successful !`,
      });
      // Re-render
      const childRef = "MainData/";
      firebaseGetMainData(childRef, disPatch);
    } else {
      console.log("%c Unset Important Failure", "color:red");
      Toast.show({
        text: `Unset Important ${item} item Failure !`,
      });
    }
  };
  //TODO_END: callback when preDelete success
    const newArrImportant = arrImportant.filter((value)=> value !== author)
  const uploadContainer = [
    {
      ref: `MainData/${item}/important`,
      data: newArrImportant,
    },
  ];
  firebasePostData(uploadContainer, callback);
}

export { setImportant, unSetImportant };
