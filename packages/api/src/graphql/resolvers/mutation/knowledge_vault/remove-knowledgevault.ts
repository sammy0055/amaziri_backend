import { errorHandler } from "../../../../helpers/error-handler";
import { KnowledgeVault } from "../../../../helpers/manage-knowledge-vault";
import { verifyUserIdToken } from "../../../../middleware/verifyIdToken";
import { AuthUserData } from "../../../../types/common/users";
import { RESPONSE_STATUS } from "../../../../types/common/organization";

interface UserInput {
  KnowledgeVaultId: string;
}

export const removeKnowledgeVault = async (
  _: unknown,
  { KnowledgeVaultId }: UserInput,
  { ContextFunctionArgument }: AuthUserData
) => {
  try {
    const { email } = await verifyUserIdToken(ContextFunctionArgument.req);
    const { removeKnowledgeVault } = new KnowledgeVault(email);
    await removeKnowledgeVault(KnowledgeVaultId);

    return RESPONSE_STATUS.SUCCESSFUL;
  } catch (error: any) {
    errorHandler(error);
  }
};
