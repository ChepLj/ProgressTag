import { Dialog } from "@capacitor/dialog";

const showAlert = async (type: string, input: any) => {
  await Dialog.alert({
    title: type,
    message: input,
  });
};

const showConfirm = async (title: string, message: string,okButtonTitle:string,cancelButtonTitle:string,  callback: Function) => {
  const { value } = await Dialog.confirm({
    title,
    message,
    okButtonTitle,
    cancelButtonTitle,
  });

  value && callback();
};

const showPrompt = async () => {
  const { value, cancelled } = await Dialog.prompt({
    title: "Hello",
    message: `What's your name?`,
  });

  console.log("Name:", value);
  console.log("Cancelled:", cancelled);
};

export { showAlert, showConfirm, showPrompt };
