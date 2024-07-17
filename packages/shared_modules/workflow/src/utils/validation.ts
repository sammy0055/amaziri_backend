interface ConstObject {
  [key: string]: string | undefined | null;
}

export function areValuesValid(obj: ConstObject) {
  for (let key in obj) {
    if (obj[key] === "" || obj[key] === undefined || obj[key] === null) {
      return false;
    }
  }
  return true;
}
