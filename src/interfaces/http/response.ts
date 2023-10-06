export interface Response {
    data: { [key: string]: any; },
    status: number,
    statusText?: string,
    headers?: { [key: string]: any; },
    config?: { [key: string]: any; },
    request?: { [key: string]: any; };
}

