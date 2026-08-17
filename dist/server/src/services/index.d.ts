/// <reference types="node" />
/// <reference types="node" />
declare const _default: {
    service: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => {
        getWelcomeMessage(): string;
        exportMembersXlsx(): Promise<Buffer>;
    };
};
export default _default;
