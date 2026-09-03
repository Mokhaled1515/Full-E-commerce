// export const validURLConvert = (name) =>{
//     if(!name){
//         return ""
//     }
//  const url = name?.toString().replaceAll(" ","-").replaceAll(",","-").replaceAll("&","-")
//  return url
// }

export const validURLConvert = (name) => {
  if (!name) {
    return "";
  }

  return (
    name
      .toString()
      .trim()
      .toLowerCase()
      // Replace slash and backslash
      .replace(/[\/\\]+/g, "-")
      // Replace special characters
      .replace(/[^a-z0-9\s-]/g, "")
      // Replace spaces with -
      .replace(/\s+/g, "-")
      // Remove duplicate -
      .replace(/-+/g, "-")
      // Remove - from beginning/end
      .replace(/^-+|-+$/g, "")
  );
};
