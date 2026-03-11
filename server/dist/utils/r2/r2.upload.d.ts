export interface UploadToR2Input {
    key: string;
    body: Buffer;
    contentType: string;
}
export declare function uploadToR2(input: UploadToR2Input): Promise<void>;
//# sourceMappingURL=r2.upload.d.ts.map