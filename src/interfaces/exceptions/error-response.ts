import type { AxiosError } from 'axios';
import { Response } from './../http/response';

export type ErrorRepsonse = AxiosError<Response, any>;
