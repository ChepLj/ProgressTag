import { Http,HttpResponse ,HttpGetCookiesResult, HttpCookie, HttpUploadFileResult, HttpDownloadFileResult} from '@capacitor-community/http';



// Example of a GET request
const doGet = async () => {
  const options = {
    url: 'https://equipment.manager/my/api',
    headers: { 'X-Fake-Header': 'Max was here' },
    params: { size: 'XL' },
  };

  const response: HttpResponse = await Http.get(options);

  // or...
  // const response = await Http.request({ ...options, method: 'GET' })
};

// Example of a POST request. Note: data
// can be passed as a raw JS Object (must be JSON serializable)
const doPost = async () => {
  const options = {
    url: 'https://equipment.manager/my/api',
    headers: { 'X-Fake-Header': 'Thomas was here' },
    data: { foo: 'bar', cool: true },
  };

  const response: HttpResponse = await Http.post(options);

  // or...
  // const response = await Http.request({ ...options, method: 'POST' })
};

const setCookie = async (key:string, value:string) => {
  const options = {
    url: 'http://equipment.manager',
    key,
    value,
  };

  await Http.setCookie(options);
};

const deleteCookie = async ({key}:{key:string}) => {
  const options = {
    url: 'http://equipment.manager',
    key,
  };

  await Http.deleteCookie(options);
};

const clearCookies = async () => {
  await Http.clearCookies({ url: 'http://equipment.manager' });
};

const getCookies = async () => {
  const cookies: HttpGetCookiesResult = await Http.getCookies({
    url: 'http://equipment.manager',
  });
  return cookies
};
const getCookie = async (key:string) => {
    const cookie: HttpCookie = await Http.getCookie({
      url: 'http://equipment.manager',
      key
    });
    return cookie
  };

// const downloadFile = async () => {
//   const options = {
//     url: 'https://equipment.manager/path/to/download.pdf',
//     filePath: 'document.pdf',
//     fileDirectory: Directory.Downloads,
//     // Optional
//     method: 'GET',
//   };

//   // Writes to local filesystem
//   const response: HttpDownloadFileResult = await Http.downloadFile(options);

//   // Then read the file
//   if (response.path) {
//     const read = await Filesystem.readFile({
//       path: 'download.pdf',
//       directory: Directory.Downloads,
//     });
//   }
// };

// const uploadFile = async () => {
//   const options = {
//     url: 'https://equipment.manager/path/to/upload.pdf',
//     name: 'myFile',
//     filePath: 'document.pdf',
//     fileDirectory: FilesystemDirectory.Downloads,
//   };

//   const response: HttpUploadFileResult = await Http.uploadFile();
// };


//! Export
export {getCookies,getCookie, setCookie,deleteCookie,clearCookies}