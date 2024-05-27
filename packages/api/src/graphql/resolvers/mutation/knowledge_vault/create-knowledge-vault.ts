import { errorHandler } from "../../../../helpers/error-handler";
import { KnowledgeVault } from "../../../../helpers/manage-knowledge-vault";
import { verifyUserIdToken } from "../../../../middleware/verifyIdToken";
import { AuthUserData } from "../../../../types/common/users";
import { KnowledgeVault as KnowledgeVaultType } from "../../../../types/common/organization";

interface UserInput {
  knowledgeVaultInputData: Pick<KnowledgeVaultType, "name">;
}
export const createKnowledgeVault = async (
  _: unknown,
  { knowledgeVaultInputData }: UserInput,
  { ContextFunctionArgument }: AuthUserData
) => {
  try {
    const { email } = await verifyUserIdToken(ContextFunctionArgument.req);
    const { createKnowledgeVault } = new KnowledgeVault(email);
    const data = await createKnowledgeVault(knowledgeVaultInputData);
    return {
      code: 200,
      success: true,
      message: "knowledge vault created successfully",
      data,
    };
  } catch (error: any) {
    errorHandler(error);
  }
};
