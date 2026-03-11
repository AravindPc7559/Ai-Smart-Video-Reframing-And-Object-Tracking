import pino from 'pino';
export declare const logger: pino.Logger<never, boolean>;
export declare const requestLogger: (req: {
    method: string;
    url: string;
    ip?: string;
}) => void;
//# sourceMappingURL=logger.d.ts.map