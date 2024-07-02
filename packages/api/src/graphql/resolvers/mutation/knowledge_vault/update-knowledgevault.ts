import { errorHandler } from "../../../../helpers/error-handler";
import { KnowledgeVault } from "../../../../helpers/manage-knowledge-vault";
import { verifyUserIdToken } from "../../../../middleware/verifyIdToken";
import { AuthUserData } from "../../../../types/common/users";

interface UserInput {
  knowledgeVaultInputData: { _id: string; name: string };
}
export const updateKnowledgeVault = async (
  _: unknown,
  { knowledgeVaultInputData }: UserInput,
  { ContextFunctionArgument }: AuthUserData
) => {
  try {
    const { email } = await verifyUserIdToken(ContextFunctionArgument.req);
    const { updateKnowledgeVault } = new KnowledgeVault(email);
    const data = await updateKnowledgeVault(knowledgeVaultInputData);

    if (!data)
      throw new Error(
        "something went wrong while updating the vault, please try again"
      );
    return {
      code: 200,
      success: true,
      message: "knowledge vault updated successfully",
      data,
    };
  } catch (error: any) {
    errorHandler(error);
  }
};
