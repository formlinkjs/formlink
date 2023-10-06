import { Form as FormInterface } from '../interfaces/clients/form';
import { Response } from '../interfaces/http/response';
import { FormOptions } from '../interfaces/form/form-options';
import { Handler as ErrorHandlerInterface } from '../interfaces/exceptions/handler';
import type { AxiosInstance, AxiosStatic } from 'axios';
import { ErrorObject } from '../interfaces/exceptions/error-object';
import { ErrorRepsonse } from '../interfaces/exceptions/error-response';
import { RequestTypes } from '../interfaces/http/request-types';
export declare class Form implements FormInterface {
    /**
     * All initial values after original data has beeen changed.
     *
     * @var {object}
     */
    protected initial: {
        [key: string]: any;
    };
    /**
     * All form input data.
     *
     * @var {object}
     */
    protected data: {
        [key: string]: any;
    };
    /**
     * List of options to apply to frontend throughout the form submission process.
     *
     * @var {FormOptions}
     */
    protected options: FormOptions;
    /**
     * The form error handler instance.
     *
     * @var {ErrorHandlerInterface}
     */
    protected errorHandler?: ErrorHandlerInterface;
    /**
     * Indicates if the form has been submitted and is currently being processed.
     *
     * @var {boolean}
     */
    protected processing: boolean;
    /**
     * Indicate if the form submittion is completed and was successful.
     *
     * @var {boolean}
     */
    protected successful: boolean;
    /**
     * Indicate if the form was recently submitted, completed and was successful.
     *
     * @var {boolean}
     */
    protected recentlySuccessful: boolean;
    /**
     * The default HTTP handler instance to use for form submission.
     *
     * @var {AxiosInstance|undefined}
     */
    protected http?: AxiosInstance;
    /**
     * Create a new Form instance.
     *
     * @param {object} data
     * @param {FormOptions|undefined} options
     *
     * @return  {void}
     */
    constructor(data?: {
        [key: string]: any;
    }, options?: FormOptions);
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
    protected makeRequest(method: RequestTypes, url: URL | string, config: FormOptions): Promise<any>;
    /**
     * Prepare the data object for the given request type.
     *
     * @param   {RequestTypes}  method
     *
     * @return  {object}
     */
    protected prepareDataForMethod(method: RequestTypes): {
        [key: string]: any;
    };
    /**
     * Actions to be performed on successful request response.
     *
     * @param   {Response}  response
     *
     * @return  {object}
     */
    protected onSuccess(response: Response): object;
    /**
     * Actions to be performed on failed request attempt.
     *
     * @param   {ErrorRepsonse|any}  error
     *
     * @return  {void}
     */
    protected onFail(error: ErrorRepsonse | any): void;
    /**
     * Assign data to current instance of form object.
     *
     * @param   {object}  data
     *
     * @return  {Form}
     */
    withData(data: {
        [key: string]: any;
    }): Form;
    /**
     * Set initial/original values of form data.
     *
     * @param   {object}  values
     *
     * @return  {void}
     */
    protected setInitialValues(values: {
        [key: string]: any;
    }): void;
    /**
     * Assign options to be used by current instance of form object.
     *
     * @param   {FormOptions}  options
     *
     * @return  {Form}
     */
    withOptions(options?: FormOptions): Form;
    /**
     * Get all data as object assgined to form object.
     *
     * @return  {object}
     */
    getData(): {
        [key: string]: any;
    };
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
    protected resetStatus(): void;
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
     * Set custom options.
     *
     * @param   {string}  options
     *
     * @return  {void}
     */
    setOptions(options: {
        [key: string]: any;
    }): void;
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
    protected createHttpHandler(client?: AxiosStatic): AxiosInstance;
    /**
     * Determine if the data attached contains file data.
     *
     * @return  {boolean}
     */
    protected hasFiles(): boolean;
    /**
     * Set status properties to indicate form submission in progress.
     *
     * @return  {void}
     */
    protected startProcessing(): void;
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
    protected validateRequestType(method: RequestTypes): void;
}
//# sourceMappingURL=form.d.ts.map