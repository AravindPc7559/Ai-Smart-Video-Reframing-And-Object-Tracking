export declare const UPLOAD_FIELD = "video";
export declare const ALLOWED_VIDEO_MIME_TYPES: readonly ["video/mp4", "video/quicktime", "video/webm"];
export type AllowedVideoMimeType = (typeof ALLOWED_VIDEO_MIME_TYPES)[number];
export declare const ALLOWED_VIDEO_EXTENSIONS: readonly ["mp4", "mov", "webm"];
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
export declare const PROCESSING_RATIOS: readonly ["9:16", "1:1", "16:9"];
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
//# sourceMappingURL=video.types.d.ts.map