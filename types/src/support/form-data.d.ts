import { FormDataConvertible } from '../interfaces/form/form-data';
/**
 * Convert an object to FormData.
 *
 * @param {Record<string, FormDataConvertible>} source
 * @param {FormData} form
 * @param {string | null} parentKey
 *
 * @returns {FormData}
 */
export declare const objectToFormData: (source: Record<string, FormDataConvertible>, form?: FormData, parentKey?: string | null) => FormData;
//# sourceMappingURL=form-data.d.ts.map