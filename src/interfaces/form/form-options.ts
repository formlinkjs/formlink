import { AxiosStatic } from 'axios';
import { Handler as ErrorHandlerInterface } from '@/interfaces/exceptions/handler';

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
    onSuccess?: (response: any) => void;
    onFail?: (error: any) => void;
    onFinish?: () => void;
};
