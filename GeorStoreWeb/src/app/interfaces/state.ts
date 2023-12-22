export interface State<T> {
    isLoading: boolean;
    data: T
}

export interface Result {
    isSuccess?: boolean;
    mensaje?: string;
    data?: any
}