import { useEffect } from "react";
import { useHistory } from "react-router";
import { TableVirtuoso } from "react-virtuoso";
import ObjectData, { objectListRender } from "../../../components/FC_Components/initObjectData";
import timestampToTime from "../../../components/FC_Components/timestampToTime";
import { ITF_ObjectData } from "../../../interface/mainInterface";

function TableView({ data, keyOfDataRaw, disPatch, ionItemSlidingRef, authorLogin }: { data: any; keyOfDataRaw: string[]; disPatch: Function; ionItemSlidingRef: any; authorLogin: any }) {
  return (
    <>
      {!keyOfDataRaw.includes("A000000") ? (
        <TableVirtuoso
          id="tableViewStyle"
          style={{ height: "100%", width: "100%" }}
          data={[...keyOfDataRaw]}
          overscan={{ main: 0, reverse: 2000 }}
          fixedHeaderContent={() => (
            <tr style={{ background: "gray", color: "white" }}>
              <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>No.</th>
              <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Id</th>
              <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Code</th>
              <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Name</th>
              <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Author</th>
              <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Stock</th>
              <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Description</th>
              <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Note</th>
              <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Date</th>
              {/* <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Logs</th> */}
              {/* <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Images</th> */}
              {/* <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Attachments</th> */}
            </tr>
          )}
          itemContent={(index, crrKey) => {
            objectListRender[crrKey] = new ObjectData(data[crrKey]);
            return (
              <>
                <ItemList index={index} objectData={objectListRender[crrKey]} objectKey={crrKey} disPatch={disPatch} ionItemSlidingRef={ionItemSlidingRef} author={authorLogin.displayName} />
              </> //: Tạo riêng 1 JSX cho ITEM
            );
          }}
        />
      ) : (
        <h2>Đang tải dữ liệu !!!</h2>
      )}
    </>
  );
}

//JSX: JSX Item List
const ItemList = ({ objectData, index, objectKey, disPatch, ionItemSlidingRef, author }: { objectData: ITF_ObjectData; index: number; objectKey: string; disPatch: Function; ionItemSlidingRef: any; author: string }) => {
  const history = useHistory(); //: lấy history
  const handleRemoveBlurhash = (id: string) => {
    const elm = document.getElementById(id);
    elm?.remove();
  };

  useEffect(() => {
    //:nothing

    //:Unmount
    //! To enhance performant set Object to null
    return () => {
      // objectListRender[objectKey] = null;
      // delete objectListRender[objectKey];
    };

    //! end
  }, []);
  //TODO: handle JSON data
  const handleStock = () => {
    const tempArr = objectData.store.map((crr) => {
      return `${crr.local}: ${crr.quantity} ${crr.unit}`;
    });
    const tempStr = JSON.stringify(tempArr);
    const tempStr2 = tempStr.replaceAll(/"/g, " ");
    const tempStr3 = tempStr2.replaceAll(/\[/g, " ");
    const tempStr4 = tempStr3.replaceAll(/\]/g, " ");
    const tempStr5 = tempStr4.replaceAll(/\,/g, "|");
    return tempStr5;
  };
  ////////////////////
  const handleImage = () => {
    return JSON.stringify(objectData.images);
  };
  //TODO_END: handle JSON data

  return (
    <>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", width: "auto", maxWidth: "50px" }}>{index + 1}</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "60px", maxWidth: "50px" }}>{objectKey}</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "60px", maxWidth: "150px" }}>{objectData.code}</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "100px", maxWidth: "250px" }}>{objectData.title}</td>

      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "100px", maxWidth: "150px" }}>{objectData.author}</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "150px", maxWidth: "150px" }}>{handleStock()}</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "200px", maxWidth: "350px" }} dangerouslySetInnerHTML={{ __html: objectData.description.replaceAll("<br/>", " | <br/>") }}></td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "100px", maxWidth: "150px" }} dangerouslySetInnerHTML={{ __html: objectData.note.replaceAll("<br/>", " | <br/>") }}></td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "60px", maxWidth: "150px" }}>{timestampToTime(+objectData.dateCreated, "date only")}</td>
      {/* <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: '12px', minWidth:'100px', maxWidth:'150px'}}>{handleLogs()}</td> */}
      {/* <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: '12px', minWidth:'100px', maxWidth:'150px'}}>{handleImage()}</td> */}
      {/* <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: '12px', minWidth:'100px', maxWidth:'150px'}}>{objectData.attachments}</td> */}
    </>
  );
};
//JSX_END: JSX Item List

//! export
export default TableView;
