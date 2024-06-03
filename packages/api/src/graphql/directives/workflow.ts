import { ActionNames } from "amaziri_workflow";

import { defaultFieldResolver, GraphQLSchema } from "graphql";
import { MapperKind, mapSchema } from "@graphql-tools/utils";
import { validateWorkflowInput } from "../../middleware/workflow-validation";

export function ValidateActionParametersDirective(
  directiveName: string = ""
): (schema: GraphQLSchema) => GraphQLSchema {
  const inputFieldDirectivesMap = new Map();
  return (schema) =>
    mapSchema(schema, {
      [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
        const { resolve = defaultFieldResolver } = fieldConfig;
        fieldConfig.resolve = async function (source, args, context, info) {
          await validateWorkflowInput(args);
          return resolve(source, args, context, info);
        };
        return fieldConfig;
      },
    });
}
