import { fileOpen, supported } from "browser-fs-access";
if (supported) {
  console.log("Using the File System Access API.");
} else {
  console.log("Using the fallback implementation.");
}


//TODO: handel open Text
export const handelOpenTextFile = async (callback) => {
  try {
    const blob = await fileOpen({
      description: "Text files",
      mimeTypes: [
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
        "text/plain",
        "application/pdf",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/elk",
        "image/vnd.dwg",
        "image/vnd.dxf",
        "model/vnd.dwf",
        "application/x-rar-compressed",
        "application/zip",
      ],
      extensions: [".docx", ".doc", ".xls", ".xlsx", ".pdf", ".txt", ".elk", ".dwg", ".dwf", ".dxf", ".rar", ".zip"],
      // multiple: true,
    });

    if (blob) {
      if (blob.size > 100000000) {
        alert("The File is over size > 0.1Gb !");
      } else {
        callback(blob);
      }
      
      console.log("🚀 ~ handelOpenTextFile ~ blob:", blob)
    }
  } catch {}
};

//TODO_END: handel open Text
