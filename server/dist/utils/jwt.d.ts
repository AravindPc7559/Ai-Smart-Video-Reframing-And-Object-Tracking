export interface JwtPayload {
    userId: string;
}
export declare function generateAccessToken(payload: JwtPayload): string;
export declare function verifyToken(token: string): JwtPayload;
//# sourceMappingURL=jwt.d.ts.map