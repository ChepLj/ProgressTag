import { Toast } from "@capacitor/toast";
import firebaseGetMainData from "../../api/getData";
import firebasePostData from "../../api/postData";
import { useContext } from "react";
import { AuthContext } from "../../pages/LoginPage/function/loginContext";


function setFavorite(item: string, arrFavorite: Array<string>,author:string, disPatch: Function) {
  //TODO: callback when Favorite success
  const callback = (result: any) => {
    if (result === "post successfully!") {
      Toast.show({
        text: `Set Favorite ${item} item successful !`,
      });
      // Re-render
      const childRef = "MainData/";
      firebaseGetMainData(childRef, disPatch);
    } else {
      console.log("%c Favorite Failure", "color:red");
      Toast.show({
        text: `Set Favorite ${item} item Failure !`,
      });
    }
  };
  //TODO_END: callback when Favorite success
  arrFavorite.push(author)
  const uploadContainer = [
    {
      ref: `MainData/${item}/favorite`,
      data: [...arrFavorite],
    },
  ];
  firebasePostData(uploadContainer, callback);
}

//! ---------------------------------------------------
function unSetFavorite(item: string, arrFavorite: Array<string>,author:string, disPatch: Function) {
  //TODO: callback when Favorite success
  const callback = (result: any) => {
    if (result === "post successfully!") {
      Toast.show({
        text: `Unset Favorite ${item} item successful !`,
      });
      // Re-render
      const childRef = "MainData/";
      firebaseGetMainData(childRef, disPatch);
    } else {
      console.log("%c Unset Favorite Failure", "color:red");
      Toast.show({
        text: `Unset Favorite ${item} item Failure !`,
      });
    }
  };
  //TODO_END: callback when preDelete success
  const newArrFavorite = arrFavorite.filter((value)=> value !== author)
  const uploadContainer = [
    {
      ref: `MainData/${item}/favorite`,
      data: newArrFavorite,
    },
  ];
  firebasePostData(uploadContainer, callback);
}

export { setFavorite, unSetFavorite };
