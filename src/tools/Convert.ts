export const convertToJSObject = (content: unknown) => {
  if(typeof content==="object") {
    const objAsStr = JSON.stringify(content);
    if(objAsStr!=='{}') 
      return JSON.parse(JSON.stringify(content));
    return {};
  }
};