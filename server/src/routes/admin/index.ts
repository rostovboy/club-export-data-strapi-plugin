export default () => ({
  type: "admin",
  routes: [
    {
      method: "GET",
      path: "/members/export",
      handler: "controller.exportMembers",
      config: {
        policies: [],
      },
    },
  ],
});
