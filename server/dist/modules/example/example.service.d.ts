import { CreateExampleInput } from './example.repository';
import { IExample, ExamplePlain } from './example.model';
export declare const exampleService: {
    getExamples(): Promise<ExamplePlain[]>;
    createExample(data: CreateExampleInput): Promise<IExample>;
};
//# sourceMappingURL=example.service.d.ts.map