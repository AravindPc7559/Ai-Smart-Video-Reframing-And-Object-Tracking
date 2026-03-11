declare function isAllowedMimeType(mimeType: string): boolean;
export declare const videoService: {
    isAllowedMimeType: typeof isAllowedMimeType;
    uploadVideo(userId: string, file: {
        buffer: Buffer;
        originalname: string;
        mimetype: string;
        size: number;
    }, metadata?: {
        title?: string;
        description?: string;
    }): Promise<{
        id: string;
        fileUrl: string;
    }>;
};
export {};
//# sourceMappingURL=video.service.d.ts.map