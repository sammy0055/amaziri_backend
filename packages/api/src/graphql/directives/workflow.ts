import { ActionNames } from "amaziri_workflow";

import { defaultFieldResolver, GraphQLSchema } from "graphql";
import { MapperKind, mapSchema, getDirective } from "@graphql-tools/utils";
import { validateWorkflowInput } from "../../middleware/workflow-validation";

export function ValidateActionParametersDirective(
  directiveName: string
): (schema: GraphQLSchema) => GraphQLSchema {
  const inputFieldDirectivesMap = new Map();
  return (schema) =>
    mapSchema(schema, {
      // [MapperKind.INPUT_OBJECT_FIELD]: (fieldConfig, fieldName, typeName) => {
      //   const actionParametersDirective = getDirective(
      //     schema,
      //     fieldConfig,
      //     directiveName
      //   )?.[0];
      //   if (actionParametersDirective) {
      //     console.log("====================================");
      //     console.log(
      //       `Validating field: ${fieldName} in input type: ${typeName} with directive: ${directiveName}`
      //     );
      //     console.log("====================================", actionParametersDirective);
      //   }
      //   return fieldConfig;
      // },
      [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
        const { resolve = defaultFieldResolver } = fieldConfig;
        const directives = getDirective(schema, fieldConfig, directiveName);
      
        fieldConfig.resolve = async function (source, args, context, info) {
          console.log('====================================');
          console.log(directives);
          console.log('====================================');
          await validateWorkflowInput(args);
          return resolve(source, args, context, info);
        };
        return fieldConfig;
      },
    });
}
