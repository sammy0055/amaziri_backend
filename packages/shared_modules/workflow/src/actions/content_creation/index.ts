import { AssistantManager } from "../../helpers/manage-assistant";
import {
  ContentApprovalParams,
  ContentGenerationParams,
  ContentSuggestionParams,
  SubmitedContentType,
} from "../../types/content_creation";
import { PromptTemplate } from "@langchain/core/prompts";
import { areValuesValid } from "../../utils/validation";
import { ActionNode, WorkflowData } from "../../types";
import { SubmitedContentEntry } from "amazir_data_model";

const ContentSuggestion = (
  params: ContentSuggestionParams,
  workflow: WorkflowData
) => {
  const validateParameters = (): boolean => {
    const isWorkflowValid = areValuesValid({ ...workflow });
    if (params?.prompt && isWorkflowValid) return true;
    return false;
  };

  const execute = async (
    node: ActionNode,
    previousResult: any
  ): Promise<any> => {
    // let trending_topics = params?.input?.join("")
    // if (!trending_topics) trending_topics = "";
    // // ensure that {input} cant be delete from the prompt string
    // // on the client side
    // const promptTemplate = PromptTemplate.fromTemplate(params.prompt);
    // const { value } = await promptTemplate.invoke({ input: trending_topics });

    // const { assistantQuery } = new AssistantManager();
    // const data = await assistantQuery({
    //   _id: params.assistantId,
    //   prompt: value,
    // });
    // return data.text;
    return { result: node.id, previousResult: "suggestion" };
  };

  return {
    validateParameters,
    execute,
  };
};

const ContentGeneration = (
  params: ContentGenerationParams,
  workflow: WorkflowData
) => {
  const { input, prompt, assistantId } = params;
  const validateParameters = (): boolean => {
    const isWorkflowValid = areValuesValid({ ...workflow });
    const isValuesValid = areValuesValid({
      input: input?.join(""),
      prompt,
      assistantId,
    });

    if (isValuesValid && isWorkflowValid) return true;
    return false;
  };

  const execute = async (
    node: ActionNode,
    previousResult: any
  ): Promise<any> => {
    // const _input = input.join("") || _data;
    // const promptTemplate = PromptTemplate.fromTemplate(prompt);
    // const { value } = await promptTemplate.invoke({ input: _input });

    // const { assistantQuery } = new AssistantManager();
    // const data = await assistantQuery({ _id: assistantId, prompt: value });
    // return data.text;
    return { result: node.id, previousResult: "generation" };
  };

  return {
    validateParameters,
    execute,
  };
};

const ContentApproval = (
  params: ContentApprovalParams,
  workflow: WorkflowData
) => {
  const validateParameters = (): boolean => {
    const isWorkflowValid = areValuesValid({ ...workflow });
    const isApprovers = params.approvers.length > 0;
    const isInput = params?.input;
    const isContentTypeValid = params?.contentType;
    if (isWorkflowValid && isApprovers && isInput && isContentTypeValid)
      return true;
    return false;
  };

  const execute = async (
    node: ActionNode,
    previousResult: any
  ): Promise<any> => {
    // const contentInput = params?.input
    // const content: SubmitedContentType = {
    //   organization: workflow.organization,
    //   workflowId: workflow._id,
    //   approvals: params.approvers,
    //   contentTypes: [params?.contentType],
    //   content: {
    //     text: contentInput,
    //     media: "",
    //   },
    //   approvalState: {
    //     isApproved: false,
    //     approvedBy: "",
    //   },
    // };
    // const resData = await SubmitedContentEntry.create(content);
    // // send notification to approvals
    // return resData;
    return { result: node.id, previousResult: "approval" };
  };

  return {
    validateParameters,
    execute,
  };
};

export { ContentSuggestion, ContentGeneration, ContentApproval };
