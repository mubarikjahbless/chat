declare const _default: () => {
    port: number;
    database: {
        host: string;
    };
    keys: {
        jwt_access_key: string;
        cipher_key: string;
    };
    aws: {
        access_key_id: string;
        secret_access_key: string;
        region: string;
    };
    queue: {
        url: string;
    };
};
export default _default;
