import { errorHandler } from "../../../../helpers/error-handler";
import { KnowledgeVault } from "../../../../helpers/manage-knowledge-vault";
import { verifyUserIdToken } from "../../../../middleware/verifyIdToken";
import { AuthUserData } from "../../../../types/common/users";
interface UserInput {
  DocumentId: string;
}
export const getDocument = async (
  _: unknown,
  { DocumentId }: UserInput,
  { ContextFunctionArgument }: AuthUserData
) => {
  try {
    const { email } = await verifyUserIdToken(ContextFunctionArgument.req);
    const { getDocument } = new KnowledgeVault(email);
    const data = await getDocument(DocumentId);
    return {
      code: 200,
      success: true,
      message: "document retrieved successfully",
      data,
    };
  } catch (error: any) {
    errorHandler(error);
  }
};
