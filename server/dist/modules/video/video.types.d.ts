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
//# sourceMappingURL=video.types.d.ts.map