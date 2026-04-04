export type httpResponse<T = unknown> = {
    status: number;
    message?: string;
    data?: T;
}