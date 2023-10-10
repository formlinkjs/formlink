import type { AxiosError } from 'axios';
import { Response } from './../http/response';

export type ErrorResponse = AxiosError<Response, any>;
