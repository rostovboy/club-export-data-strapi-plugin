import type { Core } from "@strapi/strapi";

const controller = ({ strapi }: { strapi: Core.Strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin("club-export-data-plugin")
      // the name of the service file & the method.
      .service("service")
      .getWelcomeMessage();
  },

  async exportMembers(ctx) {
    const buffer = await strapi
      .plugin("club-export-data-plugin")
      .service("service")
      .exportMembersXlsx();

    ctx.set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    ctx.set("Content-Disposition", 'attachment; filename="members-export.xlsx"');
    ctx.body = buffer;
  },
});

export default controller;
