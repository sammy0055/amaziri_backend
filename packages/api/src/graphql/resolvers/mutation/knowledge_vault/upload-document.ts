import { errorHandler } from "../../../../helpers/error-handler";
import { VectorStore } from "../../../../helpers/vector_store";
import { verifyUserIdToken } from "../../../../middleware/verifyIdToken";
import { InputDocumentData } from "../../../../types/common/organization";
import {
  AuthUserData,
} from "../../../../types/common/users";

export interface UserInput {
  uploadDocumentInputData: InputDocumentData;
}
export const uploadDocument = async (
  _: unknown,
  { uploadDocumentInputData }: UserInput,
  { ContextFunctionArgument }: AuthUserData
) => {
  try {
    const { email } = await verifyUserIdToken(ContextFunctionArgument.req);
    const { addDocument } = new VectorStore(email);
    const data = await addDocument(uploadDocumentInputData);
    return {
      code: 200,
      success: true,
      message: "uploadUrl generated successfully",
      data,
    };
  } catch (error: any) {
    errorHandler(error);
  }
};
