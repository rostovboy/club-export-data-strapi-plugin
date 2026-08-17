import { Core } from '@strapi/strapi';
declare const service: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    getWelcomeMessage(): string;
    exportMembersXlsx(): Promise<Buffer<ArrayBufferLike>>;
};
export default service;
