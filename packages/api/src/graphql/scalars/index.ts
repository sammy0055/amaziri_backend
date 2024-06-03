import { GraphQLScalarType, Kind } from "graphql";
import path from "node:path";
import { assistanttypes, validExtensions } from "../../data/taxonomy";
import { Types, isValidObjectId } from "mongoose";
import { ActionNames } from "amaziri_workflow";
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
          "assistant type is not valid, should be one of the following, " +
            assistanttypes.join(",")
        );
      return value;
    },
    parseValue(value: string) {
      if (!assistanttypes.includes(value))
        throw Error(
          "assistant type is not valid, should be one of the following, " +
            assistanttypes.join(",")
        );
      return value;
    },
  });
};

export const WorkflowActionNames = () => {
  type ActionNamesUnion = `${ActionNames}`;
  return new GraphQLScalarType({
    name: "WorkflowActionName",
    description: "union of actionNames allowed",
    serialize(value: any) {
      const actionNames = Object.values(ActionNames);
      if (!actionNames.includes(value)) {
        throw Error(
          "ActionName is not valid, should be one of the following, " +
            actionNames.join(",")
        );
      }
      return value;
    },
    parseValue(value: any) {
      const actionNames = Object.values(ActionNames);
      if (!actionNames.includes(value)) {
        throw Error(
          "ActionName is not valid, should be one of the following, " +
            actionNames.join(",")
        );
      }
      return value;
    },
  });
};

// Define JSON scalar type
export const JSONScalar = new GraphQLScalarType({
  name: "JSON",
  description: "JSON scalar type",
  parseValue: (value) => value,
  serialize: (value) => value,
  parseLiteral: (ast: any) => {
    switch (ast.kind) {
      case Kind.STRING:
        return JSON.parse(ast.value);
      case Kind.OBJECT:
        return ast.value;
      default:
        return null;
    }
  },
});
