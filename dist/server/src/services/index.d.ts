declare const _default: {
    service: ({ strapi }: {
        strapi: import('@strapi/types/dist/core').Strapi;
    }) => {
        getWelcomeMessage(): string;
        exportMembersXlsx(): Promise<Buffer<ArrayBufferLike>>;
    };
};
export default _default;
