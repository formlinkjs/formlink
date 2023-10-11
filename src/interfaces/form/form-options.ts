import { AxiosStatic } from 'axios';
import { Handler as ErrorHandlerInterface } from '../exceptions/handler';
import { Response } from '../http/response';
import { ErrorResponse } from '../exceptions/error-response';

export type FormOptions = {
    resetOnSuccess?: boolean,
    setInitialOnSuccess?: boolean;
    preserveState?: boolean;
    preserveScroll?: boolean;
    baseUrl?: URL | string;
    token?: string;
    http?: AxiosStatic;
    errorHandler?: ErrorHandlerInterface;
    only?: string[],
    onBefore?: () => void;
    onCancel?: () => void;
    onSuccess?: (response: Response) => void;
    onFail?: (error: ErrorResponse) => void;
    onFinish?: () => void;
};
