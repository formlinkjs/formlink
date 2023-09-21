import { Form as FormInterface } from '@/interfaces/clients/form';
import { FormOptions } from '@/interfaces/support/form-options';
import { Handler as ErrorHandler } from '@/exceptions/handler';
import { Handler as ErrorHandlerInterface } from '@/interfaces/exceptions/handler';
import type { AxiosInstance, AxiosStatic } from 'axios';
import _ from 'lodash';
import { guardAgainstReservedFieldName } from '@/support/field-name-validator';
import { Http } from '@/clients/http';
import { Http as HttpEnum } from '@/enums/http';
import { RequestTypes } from '@/enums/request-types';
import type { RequestTypes as RequestTypesType } from '@/interfaces/support/request-types';
import { ErrorObject } from '@/interfaces/exceptions/error-object';
import { hasFilesDeep } from '@/support/helpers';
import { objectToFormData } from '@/support/form-data';

export class Form implements FormInterface {
    /**
     * All initial values after original data has beeen changed.
     *
     * @var {object}
     */
    protected initial: { [key: string]: any; } = {};

    /**
     * All form input data.
     *
     * @var {object}
     */
    protected data: { [key: string]: any; } = {};

    /**
     * List of options to apply to frontend throughout the form submission process.
     *
     * @var {FormOptions}
     */
    protected options: FormOptions = {
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
    protected errorHandler?: ErrorHandlerInterface;

    /**
     * Indicates if the form has been submitted and is currently being processed.
     *
     * @var {boolean}
     */
    protected processing = false;

    /**
     * Indicate if the form submittion is completed and was successful.
     *
     * @var {boolean}
     */
    protected successful = false;

    /**
     * Indicate if the form was recently submitted, completed and was successful.
     *
     * @var {boolean}
     */
    protected recentlySuccessful = false;

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
     * @param {FormOptions} options
     *
     * @return  {void}
     */
    constructor (
        data: { [key: string]: any; } = {},
        options?: FormOptions
    ) {
        this.withData(data)
            .withOptions(options)
            .setHttpHandler(options?.http)
            .setErrorHandler(options?.errorHandler);
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
        options?: FormOptions
    ): Form {
        return new Form(data, options);
    }

    /**
     * Make GET request with currently attached data object to given endpoint.
     *
     * @param   {URL|string}  url
     * @param   {object}  config
     *
     * @return  {Promise}
     */
    public async get (
        url: URL | string,
        config: FormOptions
    ): Promise<any> {
        return await this.submit(RequestTypes.GET, url, config);
    }

    /**
     * Make POST request with currently attached data object to given endpoint.
     *
     * @param   {URL|string}  url
     * @param   {object}  config
     *
     * @return  {Promise}
     */
    public async post (
        url: URL | string,
        config: FormOptions
    ): Promise<any> {
        return await this.submit(RequestTypes.POST, url, config);
    }

    /**
     * Make PUT request with currently attached data object to given endpoint.
     *
     * @param   {URL|string}  url
     * @param   {object}  config
     *
     * @return  {Promise}
     */
    public async put (
        url: URL | string,
        config: FormOptions
    ): Promise<any> {
        return await this.submit(RequestTypes.PUT, url, config);
    }

    /**
     * Make PATCH request with currently attached data object to given endpoint.
     *
     * @param   {URL|string}  url
     * @param   {object}  config
     *
     * @return  {Promise}
     */
    public async patch (
        url: URL | string,
        config: FormOptions
    ): Promise<any> {
        return await this.submit(RequestTypes.PATCH, url, config);
    }

    /**
     * Make DELETE request with currently attached data object to given endpoint.
     *
     * @param   {URL|string}  url
     * @param   {object}  config
     *
     * @return  {Promise}
     */
    public async delete (
        url: URL | string,
        config: FormOptions
    ): Promise<any> {
        return await this.submit(RequestTypes.DELETE, url, config);
    }

    /**
     * Make given request type with currently attached data object to given endpoint.
     *
     * @param   {RequestTypesType}  method
     * @param   {URL|string}  url
     * @param   {object}  config
     *
     * @return  {Promise}
     */
    public async submit (
        method: RequestTypesType,
        url: URL | string,
        config: FormOptions = this.options
    ): Promise<any> {
        this.startProcessing();

        this.validateRequestType(method);

        return await this.makeRequest(method, url, config)
            .then((response) => {
                this.errorHandler?.clear();

                this.onSuccess(response);

                if (config.onSuccess) {
                    return config.onSuccess(response);
                }
            })
            .catch((errors) => {
                this.onFail(errors);

                if (config.onFail) {
                    return config.onFail(errors);
                }
            })
            .finally(() => {
                if (config.onFinish) {
                    return config.onFinish();
                }
            });
    }

    /**
     * Make a request to the given endpoint with the provided payload.
     *
     * @param  {string}  method
     * @param  {URL|string}  url
     * @param  {object}  config
     *
     * @return  {Promise}
     */
    protected makeRequest (
        method: RequestTypesType,
        url: URL | string,
        config: FormOptions
    ): Promise<any> {
        return new Promise((resolve, reject): void => {
            this.getHttpHandler()
                .request(_.merge({
                    url: url instanceof URL ? url.toString() : url,
                    method: method.toLowerCase(),
                    ...config
                }, this.prepareDataForMethod(method)))
                .then((response: any) => resolve(response))
                .catch((error: any) => reject(error));
        });
    }

    /**
     * Prepare the data object for the given request type.
     *
     * @param   {RequestTypesType}  method
     *
     * @return  {object}
     */
    protected prepareDataForMethod (
        method: RequestTypesType
    ): { [key: string]: any; } {
        if (method === RequestTypes.GET) {
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
     * @param   {object}  response
     *
     * @return  {object}
     */
    protected onSuccess (response: object): object {
        this.processing = false;

        if (!this.hasErrors()) {
            this.successful = true;
            this.recentlySuccessful = true;

            setTimeout(() => (this.recentlySuccessful = false), 2000);
        }

        if (_.get(this.options, 'resetOnSuccess')) {
            this.reset();
        } else if (_.get(this.options, 'setInitialOnSuccess')) {
            this.setInitialValues(this.getData());
        }

        return response;
    }

    /**
     * Actions to be performed on failed request attempt.
     *
     * @param   {any}  error
     *
     * @return  {void}
     */
    protected onFail (error: any): void {
        if (
            error !== null
            && error !== undefined
            && !_.has(error, 'response')
        ) {
            this.resetStatus();

            throw error;
        }

        this.errorHandler?.record(_.get(error, 'response'));

        this.resetStatus();
    }


    /**
     * Assign data to current instance of form object.
     *
     * @param   {object}  data
     *
     * @return  {Form}
     */
    public withData (data: { [key: string]: any; }): Form {
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
     * @param   {object}  values
     *
     * @return  {void}
     */
    protected setInitialValues (values: { [key: string]: any; }): void {
        this.initial = {};

        _.merge(this.initial, values);
    }

    /**
     * Assign options to be used by current instance of form object.
     *
     * @param   {FormOptions}  options
     *
     * @return  {Form}
     */
    public withOptions (options?: FormOptions): Form {
        this.options = _.merge(this.options, options || {});

        return this;
    }

    /**
     * Get all data as object assgined to form object.
     *
     * @return  {object}
     */
    public getData (): { [key: string]: any; } {
        const data: { [key: string]: any; } = {};

        _.forEach(this.initial, (_value: any, key: string) => {
            data[key] = this.data[key];
        });

        return data;
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
    protected resetStatus (): void {
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
     * Set custom options.
     *
     * @param   {string}  options
     *
     * @return  {void}
     */
    public setOptions (options: { [key: string]: any; }): void {
        this.options = _.merge(this.options, options);
    }

    /**
     * Set the default HttpHandler instance to use for form submission.
     *
     * @param   {AxiosStatic|undefiend}  http
     *
     * @return  {Form}
     */
    public setHttpHandler (http?: AxiosStatic): Form {
        this.http = this.createHttpHandler(http);

        return this;
    }

    /**
     * Get the default HttpHandler instance.
     *
     * @return  {AxiosInstance}
     */
    public getHttpHandler (): AxiosInstance {
        return this.http || this.createHttpHandler();
    }

    /**
     * Create the default HttpHandler instance.
     *
     * @param {ErrorHandlerInterface} errorHandler
     *
     * @return  {Form}
     */
    public setErrorHandler (errorHandler?: ErrorHandlerInterface): Form {
        this.errorHandler = errorHandler || new ErrorHandler();

        return this;
    }

    /**
     * Create a new http handler instance.
     *
     * @param  {AxiosStatic|undefined}  client
     *
     * @return  {AxiosInstance}
     */
    protected createHttpHandler (client?: AxiosStatic): AxiosInstance {
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
    protected hasFiles (): boolean {
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
    protected startProcessing (): void {
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
        return this.errorHandler?.get(field);
    }

    /**
     * Get all the errors associated with the form in a flat array.
     *
     * @return  {ErrorObject[]}
     */
    public allErrors (): ErrorObject[] {
        return this.errorHandler?.flatten() || [];
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
    protected validateRequestType (method: RequestTypes): void {
        const methods = [
            RequestTypes.GET,
            RequestTypes.POST,
            RequestTypes.PUT,
            RequestTypes.PATCH,
            RequestTypes.DELETE,
            RequestTypes.HEAD,
            RequestTypes.OPTIONS
        ] as string[];

        if (!methods.includes(method)) {
            throw new Error(
                `\`${method}\` is not a valid request type, ` +
                `must be one of: \`${methods.join('`, `')}\`.`
            );
        }
    }
}
