import { Toast } from "@capacitor/toast";

//TODO: Validate Section1
function section1Validate (){
    const nameElm = document.querySelector('input[name="create-section1-name"]') as HTMLInputElement
    const descriptionElm = document.querySelector('textarea[name="create-section1-description"]') as HTMLTextAreaElement
    const condition1  = Boolean((nameElm.value).trim())
    const condition2 = ((nameElm.value).trim().length > 5)
    const condition3  = Boolean((descriptionElm.value).trim())
    const condition4 = ((descriptionElm.value).trim().length > 5)
    if(condition1 && condition2 && condition3 && condition4)
    {
        return true
    } 
    else{
        Toast.show({
            text: "Name and Description are not be empty , at least 5 character!",
            position: "center",
          });
        return false
    }

}
//TODO_END: Validate Section1

//TODO: Validate Section2
function section2Validate (){
    const totalQuantityElm = document.querySelector('input[name="create-section2-totalQuantity"]') as HTMLInputElement
    const unitElm = document.querySelector('input[name="create-section2-unit"]') as HTMLInputElement
    const tagElm = document.querySelector('.create-section2-tag') as HTMLElement
    // console.log("🚀 ~ section2Validate ~ tagElm:", tagElm)
    const condition1 = (+totalQuantityElm.value) != 0 
    const condition2 = Boolean(unitElm.value)
    const condition3 = tagElm
    if(condition1 && condition2 && condition3)
    {
        return true
    } 
    else{
        Toast.show({
            text: "Select Unit and add at least a Stock and Group !",
            position: "center",
          });
        return false
    }
}
//TODO_END: Validate Section2

//TODO: Validate Section3
function section3Validate (){
    const img1Elm = document.querySelector('.create-section3-image1') as HTMLElement
    
    const condition1 = img1Elm.dataset.available === 'true' //! tam thời dùng cách này đẻ validate
    if(condition1)
    {
        return true
    } 
    else{
        Toast.show({
            text: "Select at least a Picture !",
            position: "center",
          });
        return false
    }

}
//TODO_END: Validate Section3
//! Export 
export {section1Validate}
export {section2Validate}
export {section3Validate}