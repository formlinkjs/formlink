export type ErrorObject = {
    /**
     * The field the error belongs to.
     *
     * @var {string}
     */
    field: string;

    /**
     * The description of the error in detail.
     *
     * @var {string|string[]}
     */
    message: string | string[];
};
