import { FormOptions } from '../form/form-options';
import { RequestTypes } from '../http/request-types';
import type { AxiosStatic } from 'axios';
import { AxiosInstance } from 'axios';
import { Handler as ErrorHandler } from '../exceptions/handler';

export interface Form {
    /**
     * All form input data.
     *
     * @var {Record<string, any>}
     */
    [key: string]: any;
    data: Record<string, any>;

    /**
     * Make GET request with currently attached data object to given endpoint.
     *
     * @param   {URL|string}  url
     * @param   {object}  options
     *
     * @return  {Promise}
     */
    get (
        url: URL | string,
        options?: Partial<FormOptions>
    ): Promise<any>;

    /**
     * Make POST request with currently attached data object to given endpoint.
     *
     * @param   {URL|string}  url
     * @param   {object}  options
     *
     * @return  {Promise}
     */
    post (
        url: URL | string,
        options?: Partial<FormOptions>
    ): Promise<any>;

    /**
     * Make PUT request with currently attached data object to given endpoint.
     *
     * @param   {URL|string}  url
     * @param   {object}  options
     *
     * @return  {Promise}
     */
    put (
        url: URL | string,
        options?: Partial<FormOptions>
    ): Promise<any>;

    /**
     * Make PATCH request with currently attached data object to given endpoint.
     *
     * @param   {URL|string}  url
     * @param   {object}  options
     *
     * @return  {Promise}
     */
    patch (
        url: URL | string,
        options?: Partial<FormOptions>
    ): Promise<any>;

    /**
     * Make DELETE request with currently attached data object to given endpoint.
     *
     * @param   {URL|string}  url
     * @param   {object}  options
     *
     * @return  {Promise}
     */
    delete (
        url: URL | string,
        options?: Partial<FormOptions>
    ): Promise<any>;

    /**
     * Make given request type with currently attached data object to given endpoint.
     *
     * @param   {RequestTypes}  method
     * @param   {URL|string}  url
     * @param   {Partial<FormOptions>}  options
     *
     * @return  {Promise}
     */
    submit (
        method: RequestTypes,
        url: URL | string,
        options: Partial<FormOptions>
    ): Promise<any>;
    /**
     * Assign data to current instance of form object.
     *
     * @param   {Record<string, any>}  data
     *
     * @return  {Form}
     */
    withData (data: Record<string, any>): Form;

    /**
     * Assign options to be used by current instance of form object.
     *
     * @param   {Partial<FormOptions>|undefined}  options
     *
     * @return  {Form}
     */
    withOptions (options?: Partial<FormOptions>): Form;

    /**
     * Get all data as object assgined to form object.
     *
     * @return  {Record<string, any>}
     */
    getData (): Record<string, any>;

    /**
     * Get all data as object assgined to form object.
     *
     * @param   {function}  callback
     *
     * @return  {Form}
     */
    transform (callback: (data: Record<string, any>) => void): Form;

    /**
     * Save current data to initials object and empty current data registry.
     *
     * @return  {void}
     */
    reset (): void;

    /**
     * Get the value of the specified field.
     *
     * @param   {string}  field
     *
     * @return  {any}
     */
    getField (field: string): any;

    /**
     * Set the value of the specified field.
     *
     * @param   {string}  field
     * @param   {any}  value
     *
     * @return  {void}
     */
    setField (field: string, value: any): void;

    /**
     * Get all form options.
     *
     * @return  {FormOptions}
     */
    getOptions (): FormOptions;

    /**
     * Set the default HttpHandler instance to use for form submission.
     *
     * @param   {AxiosStatic}  http
     *
     * @return  {Form}
     */
    setHttpHandler (http: AxiosStatic): Form;

    /**
     * Get the default HttpHandler instance.
     *
     * @return  {AxiosInstance}
     */
    getHttpHandler (): AxiosInstance;

    /**
     * Create the default HttpHandler instance.
     *
     * @param {ErrorHandler} errorHandler
     *
     * @return  {Form}
     */
    setErrorHandler (errorHandler: ErrorHandler): Form;

    /**
     * Get the default ErrorHandler instance.
     *
     * @return  {ErrorHandler}
     */
    getErrorHandler (): ErrorHandler;

    /**
     * Determine if the inputs bound to form have any related error messages.
     *
     * @return  {boolean}
     */
    hasErrors (): boolean;

    /**
     * Determine f the given form filed bound to the form object has an error message.
     *
     * @param   {string}  field
     *
     * @return  {boolean}
     */
    hasError (field: string): boolean;

    /**
     * Get error message associated with the given form input.
     *
     * @param   {string}  field
     *
     * @return  {string|undefined}
     */
    error (field: string): string | undefined;

    /**
     * Get all the errors associated with the form in a flat array.
     *
     * @return  {string[]}
     */
    errors (): string[];

    /**
     * Clear the error message for the given form input.
     *
     * @return  {void}
     */
    clearErrors (): void;

    /**
     * Determine if the form submission is still in progress.
     *
     * @return {boolean}
     */
    isProcessing (): boolean;

    /**
     * Set status properties to indicate form submission is still processing.
     *
     * @param   {boolean}  state
     *
     * @return  {void}
     */
    setProcessing (state: boolean): void;

    /**
     * Determine form submission is successful.
     *
     * @return  {boolean}
     */
    isSuccessful (): boolean;

    /**
     * Set status properties to indicate form submission completed successfully.
     *
     * @param   {boolean}  state
     *
     * @return  {void}
     */
    setSuccessful (state: boolean): void;

    /**
     * Determine if the form was recently submitted, completed and was successful.
     *
     * @return  {boolean}
     */
    isRecentlySuccessful (): boolean;

    /**
     * Set status properties to indicate form submission completed successfully.
     *
     * @param   {boolean}  state
     *
     * @return  {void}
     */
    setRecentlySuccessful (state: boolean): void;

    /**
     * Determine if the form has been modified.
     *
     * @return  {boolean}
     */
    getIsDirty (): boolean;

    /**
     * Set status properties to indicate form has been modified.
     *
     * @param   {boolean}  state
     *
     * @return  {void}
     */
    setIsDirty (state: boolean): void;
}
