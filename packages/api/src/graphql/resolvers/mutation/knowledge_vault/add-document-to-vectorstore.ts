import { errorHandler } from "../../../../helpers/error-handler";
import { VectorStore } from "../../../../helpers/vector_store";
import { verifyUserIdToken } from "../../../../middleware/verifyIdToken";
import { DocumentQueryInput } from "../../../../types/common/organization";
import { AuthUserData } from "../../../../types/common/users";

export interface UserInput {
  Document: DocumentQueryInput;
}
export const addDocumentToVectorStore = async (
  _: unknown,
  { Document }: UserInput,
  { ContextFunctionArgument }: AuthUserData
) => {
  try {
    const { email } = await verifyUserIdToken(ContextFunctionArgument.req);
    const { createEmbeddings } = new VectorStore(email);
    await createEmbeddings(Document);
    return "SUCCESSFUL";
  } catch (error: any) {
    errorHandler(error);
  }
};
