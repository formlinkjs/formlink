import { ErrorData } from './../interfaces/exceptions/error-data';
import { ErrorResponse } from './../interfaces/exceptions/error-response';
import { Response } from './../interfaces/http/response';
import _ from 'lodash';
import { Http } from './../enums/http';

/**
 * Determine if file data are available embedded into the data object.
 *
 * @param   {object}  object
 *
 * @return  {boolean}
 */
export const hasFilesDeep = (object: { [key: string]: any; }): boolean => {
    if (!object) {
        return false;
    }

    if (typeof object === 'object') {
        for (const key in object) {
            if (_.has(object, key)) {
                if (hasFilesDeep(object[key])) {
                    return true;
                }
            }
        }
    }

    if (_.isArray(object)) {
        for (const key in object) {
            if (_.has(object, key)) {
                return hasFilesDeep(object[key]);
            }
        }
    }

    return isFile(object);
};

/**
 * Determine if the given object is a file.
 *
 * @param   {any}      object
 *
 * @return  {boolean}
 */
export const isFile = (object: any): boolean => {
    return object instanceof File || object instanceof FileList;
};

/**
 * Create a new error response object.
 *
 * @param  {object} errors
 *
 * @return {ErrorResponse}
 */
export const makeError = (errors: { [key: string]: string[]; }): ErrorResponse => {
    return {
        response: {
            status: Http.UNPROCESSABLE_ENTITY,
            data: { errors } as ErrorData
        } as Response
    } as ErrorResponse;
};
