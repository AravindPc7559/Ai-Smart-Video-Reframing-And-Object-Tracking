export const UPLOAD_FIELD = 'video';

export const ALLOWED_VIDEO_MIME_TYPES = [
  'video/mp4',
  'video/quicktime',
  'video/webm',
] as const;

export type AllowedVideoMimeType = (typeof ALLOWED_VIDEO_MIME_TYPES)[number];

export const ALLOWED_VIDEO_EXTENSIONS = ['mp4', 'mov', 'webm'] as const;

export interface CreateVideoInput {
  title?: string;
  description?: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  uploadedBy: string;
}

export interface VideoUploadResult {
  id: string;
  fileUrl: string;
}

export const PROCESSING_RATIOS = ['9:16', '1:1', '16:9'] as const;
export type ProcessingRatio = (typeof PROCESSING_RATIOS)[number];

export interface ProcessVideoBbox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ProcessVideoInput {
  videoId: string;
  bbox: ProcessVideoBbox;
  ratio: string;
}
