import { createContext, useEffect, useReducer, useState } from "react";
import { ITF_ActionDisPatch } from "../interface/mainInterface";

const ProgressTagContext = createContext({});

const ProgressTagProvider = ({ children }: any) => {
  console.log("%cProgressTagProvider Render", "color:green");
  useEffect(() => {
    //: Unmount
    return () => {
      console.log("%cProgressTagProvider Unmount", "color:red");
    };
  }, []);

 
  const handleProgressTag = (state: any, action: ITF_ActionDisPatch) => {  
    switch (action.type) {
      case "SUCCESSFUL":
        return action.payload;
      default:
        return state;
    }
  }
  const [ProgressTag, disPatchProgressTag]: [data: any, disPatch: Function] = useReducer<any>(handleProgressTag, {});
 
  return (
    <ProgressTagContext.Provider value={{ ProgressTag, disPatchProgressTag }}>
      {/* The rest of your app */}
      {children}
    </ProgressTagContext.Provider>
  );
};

export { ProgressTagContext, ProgressTagProvider };

