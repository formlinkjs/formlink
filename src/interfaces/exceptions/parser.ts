import { ErrorObject } from './error-object';

export interface Parser {
    /**
     * Parse the given error response.
     *
     * @param  {ErrorObject} error
     *
     * @return {ErrorObject|ErrorObject[]}
     */
    parse (error: ErrorObject): ErrorObject | ErrorObject[];
}
