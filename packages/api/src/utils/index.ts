export const getUnionType = (arr: string[]) => {
  let unionString = "";
  for (let i = 0; i < arr.length; i++) {
    unionString += `"${arr[i]}"`;
    if (i < arr.length - 1) {
      unionString += " | ";
    }
  }
  return unionString;
};
