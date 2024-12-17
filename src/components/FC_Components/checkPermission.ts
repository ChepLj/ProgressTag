import { Toast } from '@capacitor/toast';

function checkPermission(condition: string, authorCreatedId?: string|number, authorLogin?:any): Boolean {
  console.log("🚀 ~ file: checkPermission.ts:4 ~ checkPermission ~ authorLogin:", authorLogin)
  switch (condition) {
    case "pre-delete": {
      if (authorLogin.level === "admin" || authorLogin?.app?.equipmentManager.appLevel === "admin" || authorCreatedId == authorLogin.userName) return true;
      Toast.show({
        text: "You don't have Permission !",
      });
      break;
    }
    case "delete": {
      if (authorLogin.level === "admin" || authorLogin?.app?.equipmentManager.appLevel === "admin"  || authorCreatedId == authorLogin.userName) return true;
      Toast.show({
        text: "You don't have Permission !",
      });
      break;
    }
    case "edit": {
      if (authorLogin.level === "admin" || authorLogin?.app?.equipmentManager.appLevel === "admin" || authorCreatedId == authorLogin.userName) return true;
      Toast.show({
        text: "You don't have Permission !",
      });
      break;
    }
    default:
      return false;
  }
  return false;
}

export default checkPermission;
