import { ActionSheet, ActionSheetButtonStyle } from "@capacitor/action-sheet";
import { ITF_AttachmentsObject, ITF_AuthorLogin, ITF_ImagesObject, ITF_StoreObject } from "../../interface/mainInterface";
import FC_HandelPreDelete from "./preDelete";
import { setFavorite, unSetFavorite } from "./toggleFavorite";
import { setImportant, unSetImportant } from "./toggleImportant";
import checkPermission from "./checkPermission";
//! Tạo lớp cho dữ liệu
class ObjectData {
  //: Property
  id: string;
  // code: number;
  title: string;
  // progressTag: string;
  ref?: string;
  subTitle: string;
  description: string;
  // store: Array<ITF_StoreObject>;
  // tag: Array<string>;
  note: string;
  icon: ITF_ImagesObject;
  images: Array<ITF_ImagesObject>;
  attachments: Array<ITF_AttachmentsObject>;
  author: string;
  authorId: string|number;
  dateCreated: number | string;
  logs: Array<object>;
  status: Array<string>;
  favorite: Array<string|number>;
  important: Array<string|number>;
  isPrivate: boolean;
  area: string;
  local: string;
  //:Constructor
  constructor({

    // code,
    id,
    title,
    // progressTag,
    ref,
    subTitle,
    description,
    // store,
    // tag,
    note,
    icon,
    images,
    attachments,
    author,
    authorId,
    dateCreated,
    logs,
    status,
    favorite,
    important,
    isPrivate,
    area,
  local
  }: {
    //:convert to destructuring object
    title:string;
    // code: number;
    id: string;
    // progressTag: string;
    ref?: string;
    subTitle: string;
    description: string;
    // store: Array<ITF_StoreObject>;
    // tag:Array<string>;
    note: string;
    icon: ITF_ImagesObject;
    images: Array<ITF_ImagesObject>;
    attachments: Array<ITF_AttachmentsObject>;
    author: string;
    authorId: string|number;
    dateCreated: number;
    logs: Array<object>;
    status: Array<string>;
    favorite: Array<string|number>;
    important: Array<string|number>;
    isPrivate: boolean;
    area: string;
  local: string;
  }) {
    this.id = id;
    // this.code = code;
    this.title = title;
    // this.progressTag = progressTag;
    this.ref= ref;
    this.subTitle = subTitle;
    this.description = description;
    // this.store = store;
    // this.tag = tag;
    this.note = note;
    this.icon = icon;
    this.images = images;
    this.attachments = attachments;
    this.author = author;
    this.authorId = authorId;
    this.dateCreated = dateCreated;
    this.logs = logs;
    this.status = status;
    this.favorite = favorite? favorite : [];
    this.important = important? important : [];
    this.isPrivate = isPrivate;
    this.area = area;
    this.local = local;
  }
  //:Behavior
  //TODO: hiển thị chi tiết
  handelDetail = (history: any, item: string) => {
    history.push({
      pathname: "/page/Detail/" + this.id,
      state: item,
    }); //: Truyền id lên URL sau đó dùng useParameter để lấy id
  };
  //TODO_END:
  //TODO: mở trang chỉnh sửa, cập nhật
  handelEdit = (history: any, item: string,authorCreatedId:string|number, authorLoginId :string|number) => {
    checkPermission('edit', authorCreatedId, authorLoginId) &&
    history.push({
      pathname: "/page/Edit/" + this.id,
      state: item,
    });
  };
  //TODO_END:
  //TODO: Thêm vào yêu thích
  handelFavorite = (author:ITF_AuthorLogin,disPatch:Function) => {
    if(this.favorite.includes(author.userName)){
      unSetFavorite(this.id,this.favorite=[],author.userName, disPatch)
    }
    else{
      setFavorite(this.id,this.favorite=[],author.userName, disPatch)
    }
  };
  //TODO_END:
  //TODO: Đánh dấu là quan trọng
  handelImportant = (author:ITF_AuthorLogin, disPatch:Function) => {
    if(this.important.includes(author.userName)){
      unSetImportant(this.id,this.important=[],author.userName, disPatch)
    }
    else{
      setImportant(this.id,this.important=[],author.userName, disPatch)
    }
  };
  //TODO_END: Đánh dấu là quan trọng
  //TODO: Xóa đối tượng
  handelPreDelete = async (authorLogin:ITF_AuthorLogin, disPatch: Function) => {
    const result = await ActionSheet.showActions({
      title: `Delete ${this.id} item`,
      message: `Are you sure delete ${this.id} item ?`,
      options: [
        {
          title: "Delete",
          style: ActionSheetButtonStyle.Destructive,
        },
        {
          title: "Cancel",
          style: ActionSheetButtonStyle.Cancel,
        },
      ],
    });
    if (result.index === 0) {
      FC_HandelPreDelete(this.id, this.authorId, authorLogin, disPatch);
    }
  };
  //TODO_END:
  //TODO: Upload đối tượng lên sever
  handelUpload = () => {};
  //TODO_END:
  //TODO: Tạo một đối tượng mới
  handelCreate = () => {};
  //TODO_END:
}

//! Tạo đối tượng toàn cục
const objectListRender: any = {};
//TODO: Export
export default ObjectData;
export { objectListRender };

