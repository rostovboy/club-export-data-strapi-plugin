import { jsxs, jsx } from "react/jsx-runtime";
import { Page } from "@strapi/strapi/admin";
import { Routes, Route } from "react-router-dom";
import { Main, Box, Typography, Divider } from "@strapi/design-system";
import { useIntl } from "react-intl";
import { g as getTranslation } from "./index-CIU13gho.mjs";
const HomePage = () => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(Main, { padding: 8, children: [
    /* @__PURE__ */ jsxs(Box, { children: [
      /* @__PURE__ */ jsx(Box, { tag: "h1", children: /* @__PURE__ */ jsxs(Typography, { variant: "beta", children: [
        formatMessage({ id: getTranslation("welcome.message"), defaultMessage: "Welcome to" }),
        " ",
        formatMessage({ id: getTranslation("plugin.name"), defaultMessage: "Club Export Data Plugin" })
      ] }) }),
      /* @__PURE__ */ jsx(Box, { tag: "p", paddingTop: 2, children: /* @__PURE__ */ jsx(Typography, { variant: "omega", children: formatMessage({
        id: getTranslation("welcome.description"),
        defaultMessage: "Configure the display of the Export or Import button using the desired Collection through the options below"
      }) }) })
    ] }),
    /* @__PURE__ */ jsx(Box, { paddingTop: 4, paddingBottom: 4, children: /* @__PURE__ */ jsx(Divider, {}) })
  ] });
};
const App = () => {
  return /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(HomePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(Page.Error, {}) })
  ] });
};
export {
  App as default
};
