import { FormOptions } from '@/interfaces/form/form-options';
import { Handler as ErrorHandlerInterface } from '@/interfaces/exceptions/handler';
import type { AxiosInstance, AxiosStatic } from 'axios';
import type { RequestTypes as RequestTypesType } from '@/interfaces/http/request-types';
import { ErrorObject } from '@/interfaces/exceptions/error-object';

export interface Form {
    /**
     * Make GET request with currently attached data object to given endpoint.
     *
     * @param   {URL|string}  url
     * @param   {object}  config
     *
     * @return  {Promise}
     */
    get (
        url: URL | string,
        config?: FormOptions
    ): Promise<any>;

    /**
     * Make POST request with currently attached data object to given endpoint.
     *
     * @param   {URL|string}  url
     * @param   {object}  config
     *
     * @return  {Promise}
     */
    post (
        url: URL | string,
        config?: FormOptions
    ): Promise<any>;

    /**
     * Make PUT request with currently attached data object to given endpoint.
     *
     * @param   {URL|string}  url
     * @param   {object}  config
     *
     * @return  {Promise}
     */
    put (
        url: URL | string,
        config?: FormOptions
    ): Promise<any>;

    /**
     * Make PATCH request with currently attached data object to given endpoint.
     *
     * @param   {URL|string}  url
     * @param   {object}  config
     *
     * @return  {Promise}
     */
    patch (
        url: URL | string,
        config?: FormOptions
    ): Promise<any>;

    /**
     * Make DELETE request with currently attached data object to given endpoint.
     *
     * @param   {URL|string}  url
     * @param   {object}  config
     *
     * @return  {Promise}
     */
    delete (
        url: URL | string,
        config?: FormOptions
    ): Promise<any>;

    /**
     * Make given request type with currently attached data object to given endpoint.
     *
     * @param   {RequestTypesType}  method
     * @param   {URL|string}  url
     * @param   {object}  config
     *
     * @return  {Promise}
     */
    submit (
        method: RequestTypesType,
        url: URL | string,
        config?: FormOptions
    ): Promise<any>;

    /**
     * Assign data to current instance of form object.
     *
     * @param   {object}  data
     *
     * @return  {Form}
     */
    withData (data: { [key: string]: any; }): Form;

    /**
     * Assign options to be used by current instance of form object.
     *
     * @param   {FormOptions}  options
     *
     * @return  {Form}
     */
    withOptions (options?: FormOptions): Form;

    /**
     * Get all data as object assgined to form object.
     *
     * @return  {object}
     */
    getData (): { [key: string]: any; };

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
     * Set custom options.
     *
     * @param   {string}  options
     *
     * @return  {void}
     */
    setOptions (options: { [key: string]: any; }): void;

    /**
     * Set the default HttpHandler instance to use for form submission.
     *
     * @param   {AxiosStatic|undefiend}  http
     *
     * @return  {Form}
     */
    setHttpHandler (http?: AxiosStatic): Form;

    /**
     * Get the default HttpHandler instance.
     *
     * @return  {AxiosInstance}
     */
    getHttpHandler (): AxiosInstance;

    /**
     * Create the default HttpHandler instance.
     *
     * @param {ErrorHandlerInterface} errorHandler
     *
     * @return  {Form}
     */
    setErrorHandler (errorHandler?: ErrorHandlerInterface): Form;

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
     * @return  {ErrorObject[]}
     */
    allErrors (): ErrorObject[];

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
}
