import { ErrorObject as ErrorObjectType } from '../interfaces/exceptions/error-object';
import { ErrorData } from '../interfaces/exceptions/error-data';
export declare class Parser {
    /**
     * Parse the given error response.
     *
     * @param  {ErrorData} errors
     *
     * @return {ErrorObjectType[]}
     */
    static parse(errors: ErrorData): ErrorObjectType[];
}
//# sourceMappingURL=parser.d.ts.map