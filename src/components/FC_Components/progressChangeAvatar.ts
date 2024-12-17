import Resizer from "react-image-file-resizer";
import firebasePostData from "../../api/postData";
import firebasePostImage from "../../api/postImage";

//TODO: Create Avatar
function createAvatar(avatar: any, disPatch: Function) {
   
    fetch(avatar)
      .then((result) => {
        return result.blob();
      })
      .then((result) => {
        action(result);
      })
      .catch((err) => {
        console.log("%c ~ createAvatar failure:", "color:red", err);
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
            disPatch({
                data: output,
                state:'createAvatar',
                messenger: 'handel avatar is done'
            })
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
  
  
  //TODO: Post Avatar
  function postAvatar(image: any,key:string, disPatch: Function) {

    const fileName = `${key}-Avatar`;
    const childRef = `User/Avatar/`;
    const finishPostAvatar = (status: "Upload completed successfully" | "Upload Failed", payload: any) => {
      if (status === "Upload completed successfully") {
        disPatch({
          state: "postAvatar",
          data: payload,
          messenger:'post Avatar done'
        });
      } else if (status === "Upload Failed") {
      }
    };
  
    firebasePostImage(image, childRef, fileName, finishPostAvatar);
    
  
    /////
  }
  //TODO_END:  Post Avatar
  
  //TODO: Post AvatarURL to Sever
  function postAvatarURLToSever(image: string, key: string, disPatch: Function) {
    const callbackSuccess = (result: string) => {
      if (result === "post successfully!") {
        disPatch({
          state: "postURLAvatar",
          data: image,
          messenger: 'All done !!!'
        });
      } else if (result === "post failed!") {
        //! failed
        alert("Post avatar to Sever failed!");
      }
    };
  
    const uploadContainer = [
      {
        ref: `/User/${key}/photoURL`,
        data: image,
      },
    ];
    firebasePostData(uploadContainer, callbackSuccess);
  }



  //TODO_end: Post AvatarURL to Sever

  //! export
  // export { createAvatar, postAvatar, postAvatarURLToSever };
