import { IonContent, IonFab, IonFabButton, IonIcon, IonPage } from "@ionic/react";
import { refreshOutline } from "ionicons/icons";
import { memo, useContext, useEffect, useRef, useState } from "react";
import firebaseGetMainData from "../../api/getData";
import conditionFilter from "../../components/FC_Components/conditionFilter";
import conditionSearch from "../../components/FC_Components/conditionSearch";
import { objectListRender } from "../../components/FC_Components/initObjectData";
import Header from "../../components/JSX_Components/Header/Header";
import ModalFilter from "../../components/JSX_Components/ModalFilter/ModalFilter";
import { AuxiliaryDataContext } from "../../context/auxiliaryDataContext";
import { ITF_FilterResult } from "../../interface/mainInterface";
import { AuthContext } from "../LoginPage/function/loginContext";
import { MainContext } from "./../../context/mainDataContext";
import "./MainPage.css";
import CardView from "./ViewStyle/CardView";
import ListView from "./ViewStyle/ListView";
import TableView from "./ViewStyle/TableView";
import MobileView from "./ViewStyle/MobileView";
import { ProgressTagContext } from "../../context/progressTagContext";


//! Main
const MainPage: React.FC = () => {
  console.log("%cMain Page Render", "color:green");
  //TODO: Reset objectListRender
  for (const key in objectListRender) {
    // objectListRender[key]= null
    delete objectListRender[key];
  }
  //TODO: End
  const { data, keyOfDataShow, disPatch } = useContext<any>(MainContext);
  console.log("🚀 ~ data:", data)
  const [KeyOfDataShowFilter, setKeyOfDataShowFilter] = useState<any>(keyOfDataShow);
  const { AuxiliaryData, disPatchAuxiliaryData } = useContext<any>(AuxiliaryDataContext);
  const { ProgressTag, disPatchProgressTag } = useContext<any>(ProgressTagContext);
  const { authorLogin } = useContext<any>(AuthContext);

  const [searchState, setSearchState] = useState<any>({ type: false, payload: [] });
  const [modalFilterOpen, setModalFilterOpen] = useState<any>(false);
  const isFilter = useRef(false);
  let searchTargetValue = useRef("");
  const [viewStyle, setViewStyle] = useState("Card");

  let keyOfDataRaw: Array<string> = [];
  if (searchState.type) {
    keyOfDataRaw = searchState.payload;
  } else {
    keyOfDataRaw = [...KeyOfDataShowFilter];
  }
  keyOfDataRaw.reverse();
  const virtuoso = useRef<any>(null);
  const ionItemSlidingRef = useRef<HTMLIonItemSlidingElement>(null);
  //TODO: Check Mobile Screen
  useEffect(() => {
    if (window.screen.width < 600) {
      authorLogin.isPhone = true;
      setViewStyle("Mobile");
    }
  }, []);
  //TODO_END: Check Mobile Screen
  //TODO: Lấy Main Data khi load Page lần đầu
  useEffect(() => {
    //: lấy data từ firebase sao đó dispatch đê render lại
    const childRef = "ProgressTag/";
    firebaseGetMainData(childRef, disPatch);
  }, []);

  //TODO: gán key of keyOfDataShow sang setKeyOfDataShowFilter
  useEffect(() => {
    setKeyOfDataShowFilter(keyOfDataShow);
  }, [keyOfDataShow]);
  //TODO_END: gán key of keyOfDataShow sang setKeyOfDataShowFilter

  //TODO_END:Lấy Main Data khi load Page lần đầu

  //TODO: Lấy StockList khi load Page lần đầu
  useEffect(() => {
    //: lấy data từ firebase sao đó dispatch đê render lại
    const childRef = "AuxiliaryData/";
    firebaseGetMainData(childRef, disPatchAuxiliaryData);
  }, []);

  //TODO_END:Lấy StockList khi load Page lần đầu
 

  //TODO: refresh Data
  const handelRefresh = () => {
    //: lấy data từ firebase sao đó dispatch đê render lại
    const childRef = "ProgressTag/";
    firebaseGetMainData(childRef, disPatch);
    isFilter.current = false;
    const align = "start";
    const behavior = "smooth";
    virtuoso.current.scrollToIndex({
      //: scroll to top
      index: 0,
      align,
      behavior,
    });
  };

  //TODO_end: refresh Data

  //TODO: Search Result
  const handelSearch = (ev: Event) => {
    let query = "";
    const searchTarget = ev.target as HTMLIonSearchbarElement;
    if (searchTarget) {
      // query = target.value!.toLowerCase();
      query = searchTarget.value!;
      searchTargetValue.current = query;
      if (query) {
        setSearchState({ type: true, payload: conditionSearch(data, KeyOfDataShowFilter, query) });
      } else {
        setSearchState({ type: false, payload: [] });
      }
    }
  };
  //TODO_END: Search Result
  //TODO:  handel filter
  const handleFilter = (filterList: ITF_FilterResult) => {
    const isFilterFC = () => {
      for (const key in filterList) {
        const newKey = key as keyof ITF_FilterResult;
        if (filterList[newKey].length) {
          return true;
        }
      }
      return false;
    };
    ////////////////
    if (isFilterFC()) {
      isFilter.current = true;

      setKeyOfDataShowFilter(conditionFilter(data, keyOfDataShow, filterList, authorLogin));
    } else {
      isFilter.current = false;
      setKeyOfDataShowFilter(keyOfDataShow);
    }
    searchTargetValue.current = "";
  };
  //TODO_END:  handel filter

  return (
    <IonPage>
      <Header
        callbackResultSearch={handelSearch}
        modalFilterOpen={modalFilterOpen}
        setModalFilterOpen={setModalFilterOpen}
        isFilter={isFilter.current}
        value={searchTargetValue.current}
        countSearch={[keyOfDataRaw.length, keyOfDataShow.length]}
        viewStyle={viewStyle}
        setViewStyle={setViewStyle}
        data={data}
        keyOfDataRaw={keyOfDataRaw}
      />
      <IonContent>
        {viewStyle === "Mobile" && <MobileView keyOfDataRaw={keyOfDataRaw} virtuoso={virtuoso} data={data} disPatch={disPatch} ionItemSlidingRef={ionItemSlidingRef} authorLogin={authorLogin} />}

        {viewStyle === "List" && <ListView data={data} keyOfDataRaw={keyOfDataRaw} disPatch={disPatch} ionItemSlidingRef={ionItemSlidingRef} authorLogin={authorLogin} />}
        {/* {viewStyle === "Table" && <TableView data={data} keyOfDataRaw={keyOfDataRaw} disPatch={disPatch} ionItemSlidingRef={ionItemSlidingRef} authorLogin={authorLogin} />} */}
        {viewStyle === "Card" && <CardView data={data} keyOfDataRaw={keyOfDataRaw} disPatch={disPatch} ionItemSlidingRef={ionItemSlidingRef} authorLogin={authorLogin} />}
      </IonContent>
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton size="small" onClick={handelRefresh}>
          <IonIcon icon={refreshOutline}></IonIcon>
        </IonFabButton>
      </IonFab>
      <ModalFilter modalFilterOpen={modalFilterOpen} setModalFilterOpen={setModalFilterOpen} handleFilter={handleFilter} isFilter={isFilter.current} />
    </IonPage>
  );
};
//! End_Main

//TODO: Export
export default memo(MainPage);
