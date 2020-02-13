export declare type CookieSettings = Partial<{
    expires: number | string;
    path: string;
    useSecure: boolean;
    maxAge: number;
}>;
export declare enum Storages {
    Cookie = "cookie",
    LocalStorage = "localstorage",
    SessionStorage = "sessionstorage"
}
export declare type IStorage = Readonly<{
    delete(key: string): IStorage;
    deleteAll(): IStorage;
    get(key: string): any;
    has(key: string): boolean;
    json(): any;
    set<T>(key: string, object: T, parameters?: CookieSettings): IStorage;
}>;
