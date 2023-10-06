import { ErrorRepsonse } from '../interfaces/exceptions/error-response';
/**
 * Determine if file data are available embedded into the data object.
 *
 * @param   {object}  object
 *
 * @return  {boolean}
 */
export declare const hasFilesDeep: (object: {
    [key: string]: any;
}) => boolean;
/**
 * Determine if the given object is a file.
 *
 * @param   {any}      object
 *
 * @return  {boolean}
 */
export declare const isFile: (object: any) => boolean;
/**
 * Create a new error response object.
 *
 * @param  {object} errors
 *
 * @return {ErrorRepsonse}
 */
export declare const makeError: (errors: {
    [key: string]: string[];
}) => ErrorRepsonse;
//# sourceMappingURL=helpers.d.ts.map