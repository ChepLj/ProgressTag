import { IonButton, IonButtons, IonChip, IonIcon, IonInput, IonItem, IonLabel, IonList, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonActionSheet } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { useContext, useEffect, useRef, useState } from "react";
import { AuxiliaryDataContext } from "../../../../context/auxiliaryDataContext";
import { ITF_ObjectData, ITF_StoreObject } from "../../../../interface/mainInterface";


export default //JSX: Section 2
function Section2({ step, arrayStock, arrayTag,objectData }: { step: any; arrayStock: any; arrayTag: any; objectData?: ITF_ObjectData }) {
  //* Check Render and Unmount
  console.log("%cSection2 Render", "color:green");
  useEffect(() => {
    return () => console.log("%cSection2 Unmount", "color:red");
  }, []);
  //* END Check Render and Unmount
  let display: "create_section_hidden" | "create_section_display" = "create_section_hidden";
  if (step == 2) {
    display = "create_section_display";
  } else {
    display = "create_section_hidden";
  }
  const stockArrayRef = useRef<Array<ITF_StoreObject>>(objectData?.store || []);
  const tagArrayRef = useRef<Array<string>>(objectData?.tag || []);
  const [stockState, setStockState] = useState<Array<ITF_StoreObject>>(objectData?.store || []);
  const [tagState, setTagState] = useState<Array<string>>(objectData?.tag || []);
  const [totalState, setTotalState] = useState<number>(0);
  const unit = ["Hộp", "Cái", "Bộ", "Mét", "Thanh", "Kg", "Tấm", "Bịch", "Đơn vị khác"];
  const { AuxiliaryData } = useContext<any>(AuxiliaryDataContext);

  const [present] = useIonActionSheet(); //: Select Stock
  const handelAddNewStock = () => {
    const stockList = AuxiliaryData.StockList?.map((crr: string, index: number) => {
      // console.log("🚀 ~ file: CreatePage.tsx:258 ~ stockList ~ crr:", crr);
      return {
        text: crr,
        data: {
          action: crr,
        },
      };
    });
    present({
      header: "Select New Stock",
      buttons: [
        ...stockList,
        {
          text: "Cancel",
          role: "cancel",
          data: {
            action: "cancel",
          },
        },
      ],
      onDidDismiss: (e) => {
        handelAddNewStockLine(e.detail);
      },
    });
  };
  //TODO: Handel Add New Tag Line
  const handelAddNewTag = () => {
    const tagList = AuxiliaryData.TagList?.map((crr: string, index: number) => {
      // console.log("🚀 ~ file: CreatePage.tsx:258 ~ TagList ~ crr:", crr);
      return {
        text: crr,
        data: {
          action: crr,
        },
      };
    });
    present({
      header: "Select New Tag",
      buttons: [
        ...tagList,
        {
          text: "Cancel",
          role: "cancel",
          data: {
            action: "cancel",
          },
        },
      ],
      onDidDismiss: (e) => {
        handelAddNewTagLine(e.detail); //!
      },
    });
  };

  //TODO_END: Handel Add New Tag Line
  //TODO: Handel Add New Stock Line
  const handelAddNewStockLine = (result: { data?: any; role?: string }) => {
    if (result.role === "cancel") {
      return;
    } else if (result.data) {
      const newStock = {
        local: result.data.action,
        quantity: 0,
        unit: "",
      };
      stockArrayRef.current = [...stockState, newStock];
      setStockState(stockArrayRef.current);
    }
  };
  //TODO_END: Handel Add New Stock Line

  //TODO: Handel Delete New Stock Line
  const handelDeleteStock = (index: number) => {
    stockArrayRef.current.splice(index, 1);
    setStockState([...stockArrayRef.current]);
    handelToTalQuantity();
  };
  //TODO_END: Handel Delete New Stock Line

  //TODO: Handel Total Quantity
  const handelToTalQuantity = () => {
    const quantityStockTotal = stockArrayRef.current.reduce((total, crr, index) => {
      const elm = document.querySelector(`input[name = "quantity-${index}"]`) as HTMLInputElement;
      const result = total + Number(elm.value);
      //
      stockArrayRef.current[index].quantity = Number(elm.value);
      //
      return result;
    }, 0);
    arrayStock.current = stockState;
    setTotalState(quantityStockTotal);
  };
  //TODO_END: Handel Total Quantity

  //TODO: Handel Add New Tag Line
  const handelAddNewTagLine = (result: { data?: any; role?: string }) => {
    if (result.role === "cancel") {
      return;
    } else if (result.data) {
      const newTag = result.data.action;
      tagArrayRef.current = [...tagState, newTag];
      arrayTag.current = tagArrayRef.current;
      setTagState(tagArrayRef.current);
    }
  };
  //TODO_END: Handel Add New Tag Line

  //TODO: Handel Delete New Tag Line
  const handelDeleteTag = (index: number) => {
    tagArrayRef.current.splice(index, 1);
    arrayTag.current = tagArrayRef.current;
    setTagState([...tagArrayRef.current]);
  };
  //TODO_END: Handel Delete New Tag Line
useEffect(()=>{
  if(objectData && step == 2){
    const unitElm = document.querySelector(`[name ="create-section2-unit"]`) as HTMLSelectElement
    unitElm.value = objectData.store?.[0].unit
    console.log("🚀 ~ useEffect ~ unitElm:",  objectData.store?.[0].unit)
    stockArrayRef.current.map((crr, index) => {
      const elm = document.querySelector(`input[name ="quantity-${index}"]`) as HTMLInputElement;
      elm.value = crr.quantity.toString()
     
    })
    handelToTalQuantity()
    arrayTag.current = tagArrayRef.current;
  }

},[step])
  return (
    <section className={display}>
      <IonItem>
        <IonLabel>Total:</IonLabel>
        <IonInput name="create-section2-totalQuantity" placeholder="enter quantity in Stock Section bellow!" readonly={true} value={totalState} />
      </IonItem>
      <IonItem>
        <IonLabel>Unit:</IonLabel>
        <IonSelect name="create-section2-unit" interface="popover" placeholder="Select" >
          {unit.map((crr, index) => {
            return (
              <IonSelectOption value={crr} key={index}>
                {crr}
              </IonSelectOption>
            );
          })}
        </IonSelect>
      </IonItem>
      <IonToolbar>
        <IonTitle slot="start">Stock</IonTitle>
        <IonButtons slot="end" onClick={handelAddNewStock}>
          <IonButton size="small">Add New Stock</IonButton>
        </IonButtons>
      </IonToolbar>
      <IonList>
        {stockState.map((crrObject, index) => {
          return (
            <IonItem key={index}>
              <IonLabel>{crrObject.local}:</IonLabel>
              <IonInput
                
                placeholder="enter quantity"
                type="number"
                name={`quantity-${index.toString()}`}
                onBlur={() => {
                  handelToTalQuantity();
                }}
              />
              <IonButtons
                slot="end"
                onClick={() => {
                  handelDeleteStock(index);
                }}
              >
                <IonButton>delete</IonButton>
                <IonIcon icon={trashOutline} />
              </IonButtons>
            </IonItem>
          );
        })}
      </IonList>
      <IonToolbar style={{ marginTop: "40px" }}>
        <IonTitle slot="start">Group</IonTitle>
        <IonButtons slot="end" onClick={handelAddNewTag}>
          <IonButton size="small">Add New Group</IonButton>
        </IonButtons>
      </IonToolbar>
      <IonList>
        {tagState.map((crrObject, index) => {
          return (
            <IonItem key={index} className="create-section2-tag">
              <IonChip color="danger">
                <IonLabel>{crrObject}</IonLabel>
              </IonChip>

              <IonButtons
                slot="end"
                onClick={() => {
                  handelDeleteTag(index);
                }}
              >
                <IonButton>delete</IonButton>
                <IonIcon icon={trashOutline} />
              </IonButtons>
            </IonItem>
          );
        })}
      </IonList>
    </section>
  );
}
//JSX_END: Section 2
