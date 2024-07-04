import { errorHandler } from "../../../../helpers/error-handler";
import { KnowledgeVault } from "../../../../helpers/manage-knowledge-vault";
import { VectorStore } from "../../../../helpers/vector_store";
import { verifyUserIdToken } from "../../../../middleware/verifyIdToken";
import { ManageS3Storage } from "../../../../services/aws/simple-storage";
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
    const { removeDocumentFromVectoreStore } = new VectorStore(email);
    const { deleteObjects } = new ManageS3Storage();
    const deletedVault = await removeKnowledgeVault(KnowledgeVaultId);
    await removeDocumentFromVectoreStore(deletedVault._id, "knowledgeVault");
    if (!Array.isArray(deletedVault.documents)) throw new Error("no document");
    if (deletedVault?.documents?.length !== 0) {
      const keys = deletedVault.documents.map((item) => item.newFileName);
      await deleteObjects(keys);
    }

    return RESPONSE_STATUS.SUCCESSFUL;
  } catch (error: any) {
    errorHandler(error);
  }
};
