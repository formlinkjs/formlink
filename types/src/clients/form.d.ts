import { Form as FormInterface } from '../interfaces/clients/form';
import { FormOptions } from '../interfaces/form/form-options';
import { Handler as ErrorHandlerInterface } from '../interfaces/exceptions/handler';
import type { AxiosInstance, AxiosStatic } from 'axios';
import { ErrorObject } from '../interfaces/exceptions/error-object';
import { RequestTypes } from '../interfaces/http/request-types';
export declare class Form implements FormInterface {
    /**
     * All initial values after original data has beeen changed.
     *
     * @var {Record<string, any>}
     */
    private initial;
    /**
     * All form input data.
     *
     * @var {Record<string, any>}
     */
    data: Record<string, any>;
    /**
     * List of options to apply to frontend throughout the form submission process.
     *
     * @var {FormOptions}
     */
    private options;
    /**
     * The form error handler instance.
     *
     * @var {ErrorHandlerInterface}
     */
    private errorHandler?;
    /**
     * Indicates if the form has been submitted and is currently being processed.
     *
     * @var {boolean}
     */
    private processing;
    /**
     * Indicate if the form submittion is completed and was successful.
     *
     * @var {boolean}
     */
    private successful;
    /**
     * Indicate if the form was recently submitted, completed and was successful.
     *
     * @var {boolean}
     */
    private recentlySuccessful;
    /**
     * The default HTTP handler instance to use for form submission.
     *
     * @var {AxiosInstance|undefined}
     */
    private http?;
    /**
     * Create a new Form instance.
     *
     * @param {object} data
     * @param {FormOptions|undefined} options
     *
     * @return  {void}
     */
    constructor(data?: Record<string, any>, options?: FormOptions);
    /**
     * Create static instance of form object.
     *
     * @param   {object}  data
     * @param   {FormOptions|undefined}  options
     *
     * @return  {Form}
     */
    static create(data: {
        [key: string]: any;
    }, options?: FormOptions): Form;
    /**
     * Make GET request with currently attached data object to given endpoint.
     *
     * @param   {URL|string}  url
     * @param   {object}  config
     *
     * @return  {Promise}
     */
    get(url: URL | string, config?: FormOptions): Promise<any>;
    /**
     * Make POST request with currently attached data object to given endpoint.
     *
     * @param   {URL|string}  url
     * @param   {object}  config
     *
     * @return  {Promise}
     */
    post(url: URL | string, config?: FormOptions): Promise<any>;
    /**
     * Make PUT request with currently attached data object to given endpoint.
     *
     * @param   {URL|string}  url
     * @param   {object}  config
     *
     * @return  {Promise}
     */
    put(url: URL | string, config?: FormOptions): Promise<any>;
    /**
     * Make PATCH request with currently attached data object to given endpoint.
     *
     * @param   {URL|string}  url
     * @param   {object}  config
     *
     * @return  {Promise}
     */
    patch(url: URL | string, config?: FormOptions): Promise<any>;
    /**
     * Make DELETE request with currently attached data object to given endpoint.
     *
     * @param   {URL|string}  url
     * @param   {object}  config
     *
     * @return  {Promise}
     */
    delete(url: URL | string, config?: FormOptions): Promise<any>;
    /**
     * Make given request type with currently attached data object to given endpoint.
     *
     * @param   {RequestTypes}  method
     * @param   {URL|string}  url
     * @param   {object}  config
     *
     * @return  {Promise}
     */
    submit(method: RequestTypes, url: URL | string, config?: FormOptions): Promise<any>;
    /**
     * Make a request to the given endpoint with the provided payload.
     *
     * @param  {RequestTypes}  method
     * @param  {URL|string}  url
     * @param  {FormOptions}  config
     *
     * @return  {Promise}
     */
    private makeRequest;
    /**
     * Prepare the data object for the given request type.
     *
     * @param   {RequestTypes}  method
     *
     * @return  {object}
     */
    private prepareDataForMethod;
    /**
     * Actions to be performed on successful request response.
     *
     * @param   {Response}  response
     *
     * @return  {object}
     */
    private onSuccess;
    /**
     * Actions to be performed on failed request attempt.
     *
     * @param   {ErrorRepsonse|any}  error
     *
     * @return  {void}
     */
    private onFail;
    /**
     * Assign data to current instance of form object.
     *
     * @param   {Record<string, any>}  data
     *
     * @return  {Form}
     */
    withData(data: Record<string, any>): Form;
    /**
     * Set initial/original values of form data.
     *
     * @param   {Record<string, any>}  values
     *
     * @return  {void}
     */
    private setInitialValues;
    /**
     * Assign options to be used by current instance of form object.
     *
     * @param   {FormOptions|undefined}  options
     *
     * @return  {Form}
     */
    withOptions(options?: Partial<FormOptions>): Form;
    /**
     * Get all data as object assgined to form object.
     *
     * @return  {Record<string, any>}
     */
    getData(): Record<string, any>;
    /**
     * Get all data as object assgined to form object.
     *
     * @param   {function}  callback
     *
     * @return  {FormInterface}
     */
    transform(callback: (data: Record<string, any>) => void): FormInterface;
    /**
     * Save current data to initials object and empty current data registry.
     *
     * @return  {void}
     */
    reset(): void;
    /**
     * Reset status properties.
     *
     * @return  {void}
     */
    private resetStatus;
    /**
     * Get the value of the specified field.
     *
     * @param   {string}  field
     *
     * @return  {any}
     */
    getField(field: string): any;
    /**
     * Set the value of the specified field.
     *
     * @param   {string}  field
     * @param   {any}  value
     *
     * @return  {void}
     */
    setField(field: string, value: any): void;
    /**
     * Get all form options.
     *
     * @return  {FormOptions}
     */
    getOptions(): FormOptions;
    /**
     * Set the default HttpHandler instance to use for form submission.
     *
     * @param   {AxiosStatic}  http
     *
     * @return  {Form}
     */
    setHttpHandler(http: AxiosStatic): Form;
    /**
     * Get the default HttpHandler instance.
     *
     * @return  {AxiosInstance}
     */
    getHttpHandler(): AxiosInstance;
    /**
     * Create the default HttpHandler instance.
     *
     * @param {ErrorHandlerInterface} errorHandler
     *
     * @return  {Form}
     */
    setErrorHandler(errorHandler: ErrorHandlerInterface): Form;
    /**
     * Get the default ErrorHandler instance.
     *
     * @return  {ErrorHandlerInterface}
     */
    getErrorHandler(): ErrorHandlerInterface;
    /**
     * Create a new http handler instance.
     *
     * @param  {AxiosStatic|undefined}  client
     *
     * @return  {AxiosInstance}
     */
    private createHttpHandler;
    /**
     * Determine if the data attached contains file data.
     *
     * @return  {boolean}
     */
    private hasFiles;
    /**
     * Set status properties to indicate form submission in progress.
     *
     * @return  {void}
     */
    private startProcessing;
    /**
     * Determine if the inputs bound to form have any related error messages.
     *
     * @return  {boolean}
     */
    hasErrors(): boolean;
    /**
     * Determine f the given form filed bound to the form object has an error message.
     *
     * @param   {string}  field
     *
     * @return  {boolean}
     */
    hasError(field: string): boolean;
    /**
     * Get error message associated with the given form input.
     *
     * @param   {string}  field
     *
     * @return  {string|undefined}
     */
    error(field: string): string | undefined;
    /**
     * Get all the errors associated with the form in a flat array.
     *
     * @return  {ErrorObject[]}
     */
    allErrors(): ErrorObject[];
    /**
     * Clear the error message for the given form input.
     *
     * @return  {void}
     */
    clearErrors(): void;
    /**
     * Determine if the form submission is still in progress.
     *
     * @return {boolean}
     */
    isProcessing(): boolean;
    /**
     * Set status properties to indicate form submission is still processing.
     *
     * @param   {boolean}  state
     *
     * @return  {void}
     */
    setProcessing(state: boolean): void;
    /**
     * Determine form submission is successful.
     *
     * @return  {boolean}
     */
    isSuccessful(): boolean;
    /**
     * Set status properties to indicate form submission completed successfully.
     *
     * @param   {boolean}  state
     *
     * @return  {void}
     */
    setSuccessful(state: boolean): void;
    /**
     * Determine if the form was recently submitted, completed and was successful.
     *
     * @return  {boolean}
     */
    isRecentlySuccessful(): boolean;
    /**
     * Set status properties to indicate form submission completed successfully.
     *
     * @param   {boolean}  state
     *
     * @return  {void}
     */
    setRecentlySuccessful(state: boolean): void;
    /**
     * Determine if the given request type is supported.
     *
     * @param   {RequestTypes}  method
     *
     * @return  {void}
     */
    private validateRequestType;
}
//# sourceMappingURL=form.d.ts.map