import { ErrorObject } from '@/interfaces/exceptions/error-object';
import _ from 'lodash';

export class Parser {
    /**
     * Parse the given error response.
     *
     * @param  {ErrorObject} error
     *
     * @return {ErrorObject|ErrorObject[]}
     */
    public static parse (error: ErrorObject): ErrorObject | ErrorObject[] {
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
