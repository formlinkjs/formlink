import { ErrorObject } from './error-object';
import { ErrorObject as ErrorObjectType } from '../interfaces/exceptions/error-object';
import { ErrorData } from '../interfaces/exceptions/error-data';
import _ from 'lodash';

export class Parser {
    /**
     * Parse the given error response.
     *
     * @param  {ErrorData} errors
     *
     * @return {ErrorObjectType[]}
     */
    public static parse (errors: ErrorData): ErrorObjectType[] {
        const paresedErrors: ErrorObjectType[] = [];

        _.forEach(errors.errors, (messages, field) => {
            paresedErrors.push(new ErrorObject(
                field,
                messages.length > 1 ? messages : _.first(messages) || ''
            ));
        });

        return paresedErrors;
    }
}
