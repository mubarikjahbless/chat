export declare enum Order {
    asc = "asc",
    desc = "desc"
}
export declare class CommonQuery {
    page?: number;
    limit?: number;
    order?: Order;
    sortBy?: string;
    sort: {
        [key: string]: any;
    };
    constructor();
}
