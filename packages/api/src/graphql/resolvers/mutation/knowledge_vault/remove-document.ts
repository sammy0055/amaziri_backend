import { errorHandler } from "../../../../helpers/error-handler";
import { KnowledgeVault } from "../../../../helpers/manage-knowledge-vault";
import { VectorStore } from "../../../../helpers/vector_store";
import { verifyUserIdToken } from "../../../../middleware/verifyIdToken";
import { ManageS3Storage } from "../../../../services/aws/simple-storage";
import {
  Document,
  RESPONSE_STATUS,
} from "../../../../types/common/organization";
import { AuthUserData } from "../../../../types/common/users";

interface UserInput {
  DocumentId: string;
}
export const removeDocument = async (
  _: unknown,
  { DocumentId }: UserInput,
  { ContextFunctionArgument }: AuthUserData
) => {
  try {
    const { email } = await verifyUserIdToken(ContextFunctionArgument.req);
    const { removeDocumentFromMongoDB } = new KnowledgeVault(email);
    const { removeDocumentFromVectoreStore } = new VectorStore(email);
    const doc = (await removeDocumentFromMongoDB(DocumentId)) as Document & {
      _id: string;
    };
    if (!doc) throw new Error("document does not exist");
    await removeDocumentFromVectoreStore(doc._id, "document");
    const { deleteObject } = new ManageS3Storage();
    await deleteObject(doc.newFileName);
    return RESPONSE_STATUS.SUCCESSFUL;
  } catch (error: any) {
    errorHandler(error);
  }
};
