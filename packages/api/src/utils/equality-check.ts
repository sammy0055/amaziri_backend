import { ObjectId } from "../types/common/organization";

type idType = string | ObjectId;
export const isSubscriptionValid = (id1: idType, id2: idType) => {
  const one = typeof id1 !== "string" ? id1.toString() : id1;
  const two = typeof id2 !== "string" ? id2.toString() : id2;
  return one === two;
};
