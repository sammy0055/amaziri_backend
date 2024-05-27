import { GraphQLScalarType, Kind } from "graphql";
import path from "node:path";
import { assistanttypes, validExtensions } from "../../data/taxonomy";
import { Types, isValidObjectId } from "mongoose";

export const UniqueID = () => {
  return new GraphQLScalarType({
    name: "UNIQUEID",
    description: "mongodb object id",
    serialize(value: string) {
      if (value) {
        return value;
      }
    },
   
    parseValue(value: string) {
      if (typeof value === "string" && isValidObjectId(value)) {
        return new Types.ObjectId(value);
      }
      throw new Error("Invalid ID value.");
    },
  });
};

export const documentFileNameScalar = () => {
  return new GraphQLScalarType({
    name: "FileName",
    description: "document file name custom scalar type",
    serialize(value: string) {
      const extension = path.extname(value);
      if (validExtensions.includes(extension)) {
        return value; // Convert outgoing Date to integer for JSON
      }
      throw Error(
        `document fileName most be of the following type ${validExtensions.join(
          ", "
        )}`
      );
    },
    parseValue(value: string) {
      const extension = path.extname(value);
      if (validExtensions.includes(extension)) {
        return value; // Convert incoming integer to Date
      }
      throw new Error(
        `document fileName most be of the following type ${validExtensions.join(
          ", "
        )}`
      );
    },
  });
};

export const AssistantType = () => {
  return new GraphQLScalarType({
    name: "AssistantType",
    description: "the type of assistant, question and answer or not",
    serialize(value: string) {
      if (!assistanttypes.includes(value))
        throw Error(
          "assistant type is not valid, should be on of the following, " +
            assistanttypes.join(",")
        );
      return value;
    },
    parseValue(value: string) {
      if (!assistanttypes.includes(value))
        throw Error(
          "assistant type is not valid, should be on of the following, " +
            assistanttypes.join(",")
        );
      return value;
    },
  });
};
