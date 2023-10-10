import _ from 'lodash';
import { Handler as ExceptionHadlder } from './../interfaces/exceptions/handler';
import { Parser } from './parser';
import { ErrorObject } from './../interfaces/exceptions/error-object';
import { ErrorResponse } from './../interfaces/exceptions/error-response';
import { Http } from './../enums/http';
import { ErrorData } from './../interfaces/exceptions/error-data';

export class Handler implements ExceptionHadlder {
    /**
     * The errors array.
     *
     * @var {ErrorObject[]}
     */
    protected errors: ErrorObject[] = [];

    /**
     * The error status code.
     *
     * @var {number}
     */
    protected status: number = Http.UNPROCESSABLE_ENTITY;

    /**
     * Create new errors handler instance.
     *
     * @param  {ErrorResponse} errors
     *
     * @return {void}
     */
    constructor (errors?: ErrorResponse) {
        if (errors) {
            this.errors = this.parseErrors(errors);
        }
    }

    /**
     * Get first error message for given field.
     *
     * @param  {string} field
     *
     * @return {string|undefined}
     */
    public get (field: string): string | undefined {
        const error = this.getRaw(field);

        if (error?.message && typeof error.message !== 'string') {
            return _.first(error.message) || '';
        }

        return error?.message as string;
    }

    /**
     * Get first error message for given field.
     *
     * @param  {string} field
     *
     * @return {ErrorObject|undefined}
     */
    public getRaw (field: string): ErrorObject | undefined {
        return _.find(
            this.errors,
            (error: ErrorObject) => error.field === field
        );
    }

    /**
     * Get all the error messages for the given field.
     *
     * @param  {string} field
     *
     * @return {string[]}
     */
    public getAll (field: string): string[] {
        const fieldError = _.find(
            this.errors,
            (error: ErrorObject) => error.field === field
        );

        return typeof fieldError?.message === 'string'
            ? [fieldError.message]
            : fieldError?.message || [];
    }

    /**
     * Determine if the given field has an error.
     *
     * @param  {string}  field
     *
     * @return {boolean}
     */
    public has (field: string): boolean {
        return Boolean(_.find(
            this.errors,
            (error: ErrorObject) => error.field === field)
        );
    }

    /**
     * Get all the errors in a flat array.
     *
     * @return {string[]}
     */
    public flatten (): string[] {
        const errorMessages: string[] = [];

        _.forEach(this.errors, (error: ErrorObject) => {
            if (typeof error.message !== 'string') {
                errorMessages.push(...error.message);
            } else {
                errorMessages.push(error.message as string);
            }
        });

        return errorMessages;
    }

    /**
     * Get all the errors.
     *
     * @return {ErrorObject[]}
     */
    public all (): ErrorObject[] {
        return this.errors;
    }

    /**
     * Record error messages object.
     *
     * @param  {ErrorResponse} errors
     *
     * @return {void}
     */
    public record (errors: ErrorResponse): void {
        this.errors = this.parseErrors(errors);
    }

    /**
     * Parse errors object.
     *
     * @param  {ErrorResponse} errors
     *
     * @return {ErrorObject[]}
     */
    private parseErrors (
        errors: ErrorResponse
    ): ErrorObject[] {
        this.status = errors.response?.status || Http.UNPROCESSABLE_ENTITY;

        if (errors.response?.data) {
            return Parser.parse(errors.response.data as ErrorData);
        }

        return [];
    }

    /**
     * Clear message of given error field.
     *
     * @param  {string|undefined} field
     *
     * @return {void}
     */
    public clear (field?: string): void {
        if (field) {
            this.errors = _.filter(
                this.errors,
                (error: ErrorObject) => error.field !== field
            );

            return;
        }

        this.errors = [];
    }

    /**
     * Determine if any error messages are available in all registered fields.
     *
     * @return {boolean}
     */
    public any (): boolean {
        return Boolean(this.errors.length);
    }

    /**
     * Set the status code for the error.
     *
     * @param  {number} status
     *
     * @return {void}
     */
    public setStatusCode (status: number): void {
        this.status = status;
    }

    /**
     * Get the status code for the error.
     *
     * @return {number}
     */
    public getStatusCode (): number {
        return this.status;
    }
}
