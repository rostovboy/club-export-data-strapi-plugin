declare const _default: {
    register: ({ strapi }: {
        strapi: import('@strapi/types/dist/core').Strapi;
    }) => void;
    bootstrap: ({ strapi }: {
        strapi: import('@strapi/types/dist/core').Strapi;
    }) => void;
    destroy: ({ strapi }: {
        strapi: import('@strapi/types/dist/core').Strapi;
    }) => void;
    config: {
        default: {};
        validator(): void;
    };
    controllers: {
        controller: ({ strapi }: {
            strapi: import('@strapi/types/dist/core').Strapi;
        }) => {
            index(ctx: any): void;
            exportMembers(ctx: any): Promise<void>;
        };
    };
    routes: {
        "content-api": () => {
            type: string;
            routes: {
                method: string;
                path: string;
                handler: string;
                config: {
                    policies: any[];
                };
            }[];
        };
        admin: () => {
            type: string;
            routes: {
                method: string;
                path: string;
                handler: string;
                config: {
                    policies: any[];
                };
            }[];
        };
    };
    services: {
        service: ({ strapi }: {
            strapi: import('@strapi/types/dist/core').Strapi;
        }) => {
            getWelcomeMessage(): string;
            exportMembersXlsx(): Promise<Buffer<ArrayBufferLike>>;
        };
    };
    contentTypes: {};
    policies: {};
    middlewares: {};
};
export default _default;
