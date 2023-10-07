import { Form as FormInterface } from './../interfaces/clients/form';
import { Response } from './../interfaces/http/response';
import { FormOptions } from './../interfaces/form/form-options';
import { Handler as ErrorHandler } from './../exceptions/handler';
import { Handler as ErrorHandlerInterface } from './../interfaces/exceptions/handler';
import type { AxiosInstance, AxiosStatic } from 'axios';
import _ from 'lodash';
import { guardAgainstReservedFieldName } from './../support/field-name-validator';
import { Http } from './http';
import { Http as HttpEnum } from './../enums/http';
import { Methods } from './../enums/methods';
import { hasFilesDeep } from './../support/helpers';
import { objectToFormData } from './../support/form-data';
import { ErrorRepsonse } from './../interfaces/exceptions/error-response';
import { RequestTypes } from './../interfaces/http/request-types';

export class Form implements FormInterface {
    /**
     * All initial values after original data has beeen changed.
     *
     * @var {Record<string, any>}
     */
    private initial: Record<string, any> = {};

    /**
     * All form input data.
     *
     * @var {Record<string, any>}
     */
    public data: Record<string, any> = {};

    /**
     * List of options to apply to frontend throughout the form submission process.
     *
     * @var {FormOptions}
     */
    private options: FormOptions = {
        resetOnSuccess: true,
        setInitialOnSuccess: false,
        preserveState: false,
        preserveScroll: false
    };

    /**
     * The form error handler instance.
     *
     * @var {ErrorHandlerInterface}
     */
    private errorHandler?: ErrorHandlerInterface;

    /**
     * Indicates if the form has been submitted and is currently being processed.
     *
     * @var {boolean}
     */
    private processing = false;

    /**
     * Indicate if the form submittion is completed and was successful.
     *
     * @var {boolean}
     */
    private successful = false;

    /**
     * Indicate if the form was recently submitted, completed and was successful.
     *
     * @var {boolean}
     */
    private recentlySuccessful = false;

    /**
     * The default HTTP handler instance to use for form submission.
     *
     * @var {AxiosInstance|undefined}
     */
    private http?: AxiosInstance;

    /**
     * Create a new Form instance.
     *
     * @param {object} data
     * @param {FormOptions|undefined} options
     *
     * @return  {void}
     */
    constructor (
        data: Record<string, any> = {},
        options?: FormOptions
    ) {
        this.withData(data).withOptions(options);

        if (options?.http) {
            this.setHttpHandler(options.http);
        }

        if (options?.errorHandler) {
            this.setErrorHandler(options.errorHandler);
        }
    }

    /**
     * Create static instance of form object.
     *
     * @param   {object}  data
     * @param   {FormOptions|undefined}  options
     *
     * @return  {Form}
     */
    public static create (
        data: { [key: string]: any; },
        options?: Partial<FormOptions>
    ): Form {
        return new Form(data, options);
    }

    /**
     * Make GET request with currently attached data object to given endpoint.
     *
     * @param   {URL|string}  url
     * @param   {object}  options
     *
     * @return  {Promise}
     */
    public async get (
        url: URL | string,
        options?: Partial<FormOptions>
    ): Promise<any> {
        return await this.submit(Methods.GET, url, options);
    }

    /**
     * Make POST request with currently attached data object to given endpoint.
     *
     * @param   {URL|string}  url
     * @param   {object}  options
     *
     * @return  {Promise}
     */
    public async post (
        url: URL | string,
        options?: Partial<FormOptions>
    ): Promise<any> {
        return await this.submit(Methods.POST, url, options);
    }

    /**
     * Make PUT request with currently attached data object to given endpoint.
     *
     * @param   {URL|string}  url
     * @param   {object}  options
     *
     * @return  {Promise}
     */
    public async put (
        url: URL | string,
        options?: Partial<FormOptions>
    ): Promise<any> {
        return await this.submit(Methods.PUT, url, options);
    }

    /**
     * Make PATCH request with currently attached data object to given endpoint.
     *
     * @param   {URL|string}  url
     * @param   {object}  options
     *
     * @return  {Promise}
     */
    public async patch (
        url: URL | string,
        options?: Partial<FormOptions>
    ): Promise<any> {
        return await this.submit(Methods.PATCH, url, options);
    }

    /**
     * Make DELETE request with currently attached data object to given endpoint.
     *
     * @param   {URL|string}  url
     * @param   {object}  options
     *
     * @return  {Promise}
     */
    public async delete (
        url: URL | string,
        options?: Partial<FormOptions>
    ): Promise<any> {
        return await this.submit(Methods.DELETE, url, options);
    }

    /**
     * Make given request type with currently attached data object to given endpoint.
     *
     * @param   {RequestTypes}  method
     * @param   {URL|string}  url
     * @param   {Partial<FormOptions>}  options
     *
     * @return  {Promise}
     */
    public async submit (
        method: RequestTypes,
        url: URL | string,
        options: Partial<FormOptions> = this.options
    ): Promise<any> {
        this.startProcessing();

        this.validateRequestType(method);

        return await this.makeRequest(method, url, options)
            .then((response) => {
                this.errorHandler?.clear();

                this.onSuccess(response);

                if (options.onSuccess) {
                    return options.onSuccess(response);
                }
            })
            .catch((errors) => {
                this.onFail(errors);

                if (options.onFail) {
                    return options.onFail(errors);
                }
            })
            .finally(() => {
                if (options.onFinish) {
                    return options.onFinish();
                }
            });
    }

    /**
     * Make a request to the given endpoint with the provided payload.
     *
     * @param  {RequestTypes}  method
     * @param  {URL|string}  url
     * @param  {FormOptions}  options
     *
     * @return  {Promise}
     */
    private makeRequest (
        method: RequestTypes,
        url: URL | string,
        options: FormOptions
    ): Promise<any> {
        return new Promise((resolve, reject): void => {
            this.getHttpHandler()
                .request(_.merge({
                    url: url instanceof URL ? url.toString() : url,
                    method: method.toLowerCase(),
                    ...{ ...this.options, ...options }
                }, this.prepareDataForMethod(method)))
                .then((response: any) => resolve(response))
                .catch((error: any) => reject(error));
        });
    }

    /**
     * Prepare the data object for the given request type.
     *
     * @param   {RequestTypes}  method
     *
     * @return  {object}
     */
    private prepareDataForMethod (
        method: RequestTypes
    ): { [key: string]: any; } {
        if (method === Methods.GET) {
            return { params: new URLSearchParams(this.data) };
        }

        return {
            data: this.hasFiles()
                ? objectToFormData(this.getData())
                : this.getData()
        };
    }

    /**
     * Actions to be performed on successful request response.
     *
     * @param   {Response}  response
     *
     * @return  {object}
     */
    private onSuccess (response: Response): object {
        this.processing = false;

        if (!this.hasErrors()) {
            this.successful = true;
            this.recentlySuccessful = true;

            setTimeout(() => (this.recentlySuccessful = false), 2000);
        }

        if (_.get(this.options, 'resetOnSuccess', false)) {
            this.reset();
        } else if (_.get(this.options, 'setInitialOnSuccess')) {
            this.setInitialValues(this.getData());
        }

        return response;
    }

    /**
     * Actions to be performed on failed request attempt.
     *
     * @param   {ErrorRepsonse|any}  error
     *
     * @return  {void}
     */
    private onFail (error: ErrorRepsonse | any): void {
        if (
            (error !== null || error !== undefined)
            && !_.has(error, 'response')
        ) {
            this.resetStatus();

            throw error;
        }

        const errorHandler = this.getErrorHandler();

        errorHandler.setStatusCode(
            error.response?.status || HttpEnum.INTERNAL_SERVER_ERROR
        );

        if (error.response.data) {
            errorHandler.record(error);
        }

        this.resetStatus();
    }


    /**
     * Assign data to current instance of form object.
     *
     * @param   {Record<string, any>}  data
     *
     * @return  {Form}
     */
    public withData (data: Record<string, any>): Form {
        this.setInitialValues(data);

        this.processing = false;
        this.successful = false;

        _.forEach(data, (value, key) => {
            guardAgainstReservedFieldName(key);

            this.data[key] = value;
        });

        return this;
    }

    /**
     * Set initial/original values of form data.
     *
     * @param   {Record<string, any>}  values
     *
     * @return  {void}
     */
    private setInitialValues (values: Record<string, any>): void {
        this.initial = {};

        _.merge(this.initial, values);
    }

    /**
     * Assign options to be used by current instance of form object.
     *
     * @param   {FormOptions|undefined}  options
     *
     * @return  {Form}
     */
    public withOptions (options?: Partial<FormOptions>): Form {
        this.options = _.merge(this.options, options || {});

        return this;
    }

    /**
     * Get all data as object assgined to form object.
     *
     * @return  {Record<string, any>}
     */
    public getData (): Record<string, any> {
        const data: Record<string, any> = {};

        _.forEach(this.initial, (_value: any, key: string) => {
            data[key] = this.data[key];
        });

        return data;
    }

    /**
     * Get all data as object assgined to form object.
     *
     * @param   {function}  callback
     *
     * @return  {FormInterface}
     */
    public transform (callback: (data: Record<string, any>) => void): FormInterface {
        callback(this.getData());

        return this;
    }

    /**
     * Save current data to initials object and empty current data registry.
     *
     * @return  {void}
     */
    public reset (): void {
        this.initial = _.merge(this.initial, this.data);

        _.forEach(this.initial, (key: string) => this.setField(key, null));
    }

    /**
     * Reset status properties.
     *
     * @return  {void}
     */
    private resetStatus (): void {
        this.processing = false;
        this.successful = false;
        this.recentlySuccessful = false;
    }

    /**
     * Get the value of the specified field.
     *
     * @param   {string}  field
     *
     * @return  {any}
     */
    public getField (field: string): any {
        return this.data[field];
    }

    /**
     * Set the value of the specified field.
     *
     * @param   {string}  field
     * @param   {any}  value
     *
     * @return  {void}
     */
    public setField (field: string, value: any): void {
        _.set(this.data, field, value);
    }

    /**
     * Get all form options.
     *
     * @return  {FormOptions}
     */
    public getOptions (): FormOptions {
        return this.options;
    }

    /**
     * Set the default HttpHandler instance to use for form submission.
     *
     * @param   {AxiosStatic}  http
     *
     * @return  {Form}
     */
    public setHttpHandler (http: AxiosStatic): Form {
        this.http = this.createHttpHandler(http);

        return this;
    }

    /**
     * Get the default HttpHandler instance.
     *
     * @return  {AxiosInstance}
     */
    public getHttpHandler (): AxiosInstance {
        if (!this.http) {
            this.http = this.createHttpHandler();
        }

        return this.http;
    }

    /**
     * Create the default HttpHandler instance.
     *
     * @param {ErrorHandlerInterface} errorHandler
     *
     * @return  {Form}
     */
    public setErrorHandler (errorHandler: ErrorHandlerInterface): Form {
        this.errorHandler = errorHandler;

        return this;
    }

    /**
     * Get the default ErrorHandler instance.
     *
     * @return  {ErrorHandlerInterface}
     */
    public getErrorHandler (): ErrorHandlerInterface {
        if (!this.errorHandler) {
            this.errorHandler = new ErrorHandler();
        }

        return this.errorHandler;
    }

    /**
     * Create a new http handler instance.
     *
     * @param  {AxiosStatic|undefined}  client
     *
     * @return  {AxiosInstance}
     */
    private createHttpHandler (client?: AxiosStatic): AxiosInstance {
        return (new Http(client))
            .acceptJson()
            .contentType(HttpEnum.DEFAULT_CONTENT_TYPE)
            .setToken(this.options.token)
            .baseUrl(this.options.baseUrl)
            .createInstance();
    }

    /**
     * Determine if the data attached contains file data.
     *
     * @return  {boolean}
     */
    private hasFiles (): boolean {
        for (const property in this.initial) {
            if (hasFilesDeep(this.data[property])) {
                return true;
            }
        }

        return false;
    }

    /**
     * Set status properties to indicate form submission in progress.
     *
     * @return  {void}
     */
    private startProcessing (): void {
        if (this.hasErrors()) {
            this.errorHandler?.clear();
        }

        this.processing = true;
        this.successful = false;
    }

    /**
     * Determine if the inputs bound to form have any related error messages.
     *
     * @return  {boolean}
     */
    public hasErrors (): boolean {
        return this.errorHandler?.any() || false;
    }

    /**
     * Determine f the given form filed bound to the form object has an error message.
     *
     * @param   {string}  field
     *
     * @return  {boolean}
     */
    public hasError (field: string): boolean {
        return this.hasErrors()
            && (this.errorHandler?.has(field) || false);
    }

    /**
     * Get error message associated with the given form input.
     *
     * @param   {string}  field
     *
     * @return  {string|undefined}
     */
    public error (field: string): string | undefined {
        return this.errorHandler?.get(field)?.toString();
    }

    /**
     * Get all the errors associated with the form in a flat array.
     *
     * @return  {string[]}
     */
    public allErrors (): string[] {
        return this.errorHandler?.flatten() || [];
    }

    /**
     * Clear the error message for the given form input.
     *
     * @return  {void}
     */
    public clearErrors (): void {
        this.errorHandler?.clear();
    }

    /**
     * Determine if the form submission is still in progress.
     *
     * @return {boolean}
     */
    public isProcessing (): boolean {
        return this.processing;
    }

    /**
     * Set status properties to indicate form submission is still processing.
     *
     * @param   {boolean}  state
     *
     * @return  {void}
     */
    public setProcessing (state: boolean): void {
        this.processing = state;
    }

    /**
     * Determine form submission is successful.
     *
     * @return  {boolean}
     */
    public isSuccessful (): boolean {
        return this.successful;
    }

    /**
     * Set status properties to indicate form submission completed successfully.
     *
     * @param   {boolean}  state
     *
     * @return  {void}
     */
    public setSuccessful (state: boolean): void {
        this.successful = state;
    }

    /**
     * Determine if the form was recently submitted, completed and was successful.
     *
     * @return  {boolean}
     */
    public isRecentlySuccessful (): boolean {
        return this.recentlySuccessful;
    }

    /**
     * Set status properties to indicate form submission completed successfully.
     *
     * @param   {boolean}  state
     *
     * @return  {void}
     */
    public setRecentlySuccessful (state: boolean): void {
        this.recentlySuccessful = state;
    }

    /**
     * Determine if the given request type is supported.
     *
     * @param   {RequestTypes}  method
     *
     * @return  {void}
     */
    private validateRequestType (method: RequestTypes): void {
        const methods = [
            Methods.GET,
            Methods.POST,
            Methods.PUT,
            Methods.PATCH,
            Methods.DELETE,
            Methods.HEAD,
            Methods.OPTIONS
        ] as string[];

        if (!methods.includes(method)) {
            throw new Error(
                `\`${method}\` is not a valid request type, ` +
                `must be one of: \`${methods.join('`, `')}\`.`
            );
        }
    }
}
