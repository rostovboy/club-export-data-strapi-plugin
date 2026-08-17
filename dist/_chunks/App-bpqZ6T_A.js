"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const admin = require("@strapi/strapi/admin");
const reactRouterDom = require("react-router-dom");
const designSystem = require("@strapi/design-system");
const reactIntl = require("react-intl");
const index = require("./index-CCf3YTmU.js");
const HomePage = () => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { padding: 8, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { tag: "h1", children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Typography, { variant: "beta", children: [
        formatMessage({ id: index.getTranslation("welcome.message"), defaultMessage: "Welcome to" }),
        " ",
        formatMessage({ id: index.getTranslation("plugin.name"), defaultMessage: "Club Export Data Plugin" })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { tag: "p", paddingTop: 2, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", children: formatMessage({
        id: index.getTranslation("welcome.description"),
        defaultMessage: "Configure the display of the Export or Import button using the desired Collection through the options below"
      }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 4, paddingBottom: 4, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Divider, {}) })
  ] });
};
const App = () => {
  return /* @__PURE__ */ jsxRuntime.jsxs(reactRouterDom.Routes, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { index: true, element: /* @__PURE__ */ jsxRuntime.jsx(HomePage, {}) }),
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: "*", element: /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Error, {}) })
  ] });
};
exports.default = App;
