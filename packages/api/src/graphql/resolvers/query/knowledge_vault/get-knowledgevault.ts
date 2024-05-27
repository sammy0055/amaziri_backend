import { errorHandler } from "../../../../helpers/error-handler";
import { KnowledgeVault } from "../../../../helpers/manage-knowledge-vault";
import { verifyUserIdToken } from "../../../../middleware/verifyIdToken";
import { DocumentEntry } from "../../../../services/mongodb/schema";
import { AuthUserData } from "../../../../types/common/users";
interface UserInput {
  VaultId: string;
}
export const getKnowledgeVault = async (
  _: unknown,
  { VaultId }: UserInput,
  { ContextFunctionArgument }: AuthUserData
) => {
  try {
    const { email } = await verifyUserIdToken(ContextFunctionArgument.req);
    const { getVault } = new KnowledgeVault(email);
    const data = await getVault(VaultId);
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

export const getKnowledgeVaults = async (
    _: unknown,
    __: unknown,
    { ContextFunctionArgument }: AuthUserData
  ) => {
    try {
      const { email } = await verifyUserIdToken(ContextFunctionArgument.req);
      const { getVaults } = new KnowledgeVault(email);
      const data = await getVaults();
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
export const getKnowledgeVaultDocuments = async ({
  _id,
}: KnowledgeVault & { _id: string }) => {
  try {
    return await DocumentEntry.find({ knowledgeVault: _id });
  } catch (error: any) {
    errorHandler(error);
  }
};
