import { ReservedFieldNames } from './../enums/reserved-field-names';

export const reservedFieldNames: ReservedFieldNames[] = [
    ReservedFieldNames.OPTIONS,
    ReservedFieldNames.PAGE,
    ReservedFieldNames.VALIDATE_REQUEST_TYPE,
    ReservedFieldNames.DATA,
    ReservedFieldNames.DELETE,
    ReservedFieldNames.ERROR_FOR,
    ReservedFieldNames.ERRORS_FOR,
    ReservedFieldNames.HAS_ERRORS,
    ReservedFieldNames.INITIAL,
    ReservedFieldNames.IS_DIRTY,
    ReservedFieldNames.ON_FAIL,
    ReservedFieldNames.ON_SUCCESS,
    ReservedFieldNames.PATCH,
    ReservedFieldNames.POST,
    ReservedFieldNames.PROCESSING,
    ReservedFieldNames.PUT,
    ReservedFieldNames.RECENTLY_SUCCESSFUL,
    ReservedFieldNames.RESET,
    ReservedFieldNames.SUBMIT,
    ReservedFieldNames.SUCCESSFUL,
    ReservedFieldNames.WITH_DATA,
    ReservedFieldNames.WITH_OPTIONS
];

/**
 * Guard against a list of reserved field names.
 *
 * @param   {ReservedFieldNames|string}  fieldName
 *
 * @return  {void}
 */
export const guardAgainstReservedFieldName = (
    fieldName: ReservedFieldNames | string
): void => {
    if (reservedFieldNames.includes(fieldName as ReservedFieldNames)) {
        throw new Error(
            `Field name ${fieldName} isn't allowed to be used in a Form or Errors instance.`
        );
    }
};
