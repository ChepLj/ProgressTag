import { get, ref } from "firebase/database";
import { database } from '../firebase/firebaseConfig';

function firebaseGetMainData (childRef:any, disPatch?:any){
   const mainRef = ref(database, childRef)
   get(mainRef).then((snapshot) => {
    if (snapshot.exists()) {
      disPatch({type: "SUCCESSFUL", payload: snapshot.val()}) //: disPatch đẻ render lại
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

export default firebaseGetMainData