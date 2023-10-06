import { Http } from '@/enums/http';

export type HttpHeaders = {
    Accept?: Http.DEFAULT_CONTENT_TYPE | string,
    'Content-Type'?: Http.DEFAULT_CONTENT_TYPE | string,
    Authorization?: string;
    'X-Requested-With'?: Http.X_REQUESTED_WITH | string;
};
