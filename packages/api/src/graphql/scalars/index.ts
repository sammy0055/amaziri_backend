import { GraphQLScalarType, Kind } from "graphql";
import path from "node:path";
import { assistanttypes, validExtensions } from "../../data/taxonomy";
import { Types, isValidObjectId } from "mongoose";
import { ActionNames, ActionType, ActionCategory } from "amaziri_workflow";
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
  const validate = (value: any) => {
    const actionNames = Object.values(ActionNames);
    if (!actionNames.includes(value)) {
      throw Error(
        "ActionName is not valid, should be one of the following, " +
          actionNames.join(",")
      );
    }
  };
  return new GraphQLScalarType({
    name: "WorkflowActionName",
    description: "union of actionNames allowed",
    serialize(value: any) {
      validate(value);
      return value;
    },
    parseValue(value: any) {
      validate(value);
      return value;
    },
  });
};

export const WorkflowActionCategory = () => {
  const validate = (value: any) => {
    const actioCategory = Object.values(ActionCategory);
    if (!actioCategory.includes(value)) {
      throw Error(
        "ActioCategory is not valid, should be one of the following, " +
          actioCategory.join(",")
      );
    }
  };
  return new GraphQLScalarType({
    name: "WorkflowActionCategory",
    description: "union of ActioCategory allowed",
    serialize(value: any) {
      validate(value);
      return value;
    },
    parseValue(value: any) {
      validate(value);
      return value;
    },
  });
};

export const WorkflowActionType = () => {
  const validate = (value: any) => {
    const actionType = Object.values(ActionType);
    if (!actionType.includes(value)) {
      throw Error(
        "actionType is not valid, should be one of the following, " +
          actionType.join(",")
      );
    }
  };
  return new GraphQLScalarType({
    name: "WorkflowActionType",
    description: "union of WorkflowActionType allowed",
    serialize(value: any) {
      validate(value);
      return value;
    },
    parseValue(value: any) {
      validate(value);
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
