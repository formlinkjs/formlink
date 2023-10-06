import _ from 'lodash';
import { ErrorObject as ErrorObjectType } from '../interfaces/exceptions/error-object';

export class ErrorObject implements ErrorObjectType {
    /**
     * The field the error belongs to.
     *
     * @var {string}
     */
    public field: string;

    /**
     * The description of the error in detail.
     *
     * @var {string|string[]}
     */
    public message: string | string[];

    /**
     * Create a new error object instance.
     *
     * @param {string} field
     * @param {string|string[]} message
     *
     * @return {void}
     */
    constructor (
        field: string,
        message: string | string[]
    ) {
        this.field = field;
        this.message = message;
    }

    /**
     * Represent the error object as a string by returning the error message.
     *
     * @return {string}
     */
    public toString (): string {
        return _.first(this.message) || '';
    }
}
