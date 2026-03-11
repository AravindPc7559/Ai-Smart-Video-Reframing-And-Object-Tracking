import { IExample, ExamplePlain } from './example.model';
export interface CreateExampleInput {
    name: string;
    description?: string;
}
export declare const exampleRepository: {
    findAll(): Promise<ExamplePlain[]>;
    create(data: CreateExampleInput): Promise<IExample>;
    findById(id: string): Promise<ExamplePlain | null>;
};
//# sourceMappingURL=example.repository.d.ts.map