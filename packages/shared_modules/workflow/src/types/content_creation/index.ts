export interface ContentSuggestionParams {
  input: string[];
  assistantId: string;
  prompt: string;
  internetSearch: boolean;
}

type contentType = "text" | "image" | "video";
type NotificationChannels = "whatsapp" | "email";
export interface ContentGenerationParams {
  input: string[]; //Selected topics and ideas
  assistantId: string;
  prompt: string;
  contentType: contentType;
}

export interface ContentApprovalParams {
  input: string; //Created content.
  contentType: contentType;
  notificationChannel: NotificationChannels;
  approvers: string[];
}

export interface SubmitedContentType {
  organization: string;
  workflowId: string;
  approvals: string[];
  contentTypes: contentType[];
  content: {
    text: string;
    media: string;
  };
  approvalState: {
    approvedBy: string;
    approvedDate?: Date;
    isApproved: boolean;
  };
}
