import { ErrorObject } from '@/interfaces/exceptions/error-object';
import { Parser as ParserInterface } from '@/interfaces/exceptions/parser';
import _ from 'lodash';

export class Parser implements ParserInterface {
    /**
     * Parse the given error response.
     *
     * @param  {ErrorObject} error
     *
     * @return {ErrorObject|ErrorObject[]}
     */
    public parse (error: ErrorObject): ErrorObject | ErrorObject[] {
        if (!_.isArray(error.message)) {
            return error;
        }

        const errors: ErrorObject[] = [];

        _.forEach(error.message, (message) => {
            errors.push({
                error: error.error,
                message,
                statusCode: error.statusCode
            });
        });

        return errors;
    }
}
