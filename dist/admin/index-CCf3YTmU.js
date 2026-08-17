"use strict";
const react = require("react");
const jsxRuntime = require("react/jsx-runtime");
const icons = require("@strapi/icons");
const designSystem = require("@strapi/design-system");
const admin = require("@strapi/strapi/admin");
const reactIntl = require("react-intl");
const reactRouterDom = require("react-router-dom");
const __variableDynamicImportRuntimeHelper = (glob, path, segs) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(
      reject.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + path + (path.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
};
const PLUGIN_ID = "club-export-data-plugin";
const getTranslation = (id) => `${PLUGIN_ID}.${id}`;
const Initializer = ({ setPlugin }) => {
  const ref = react.useRef(setPlugin);
  react.useEffect(() => {
    ref.current(PLUGIN_ID);
  }, []);
  return null;
};
const PluginIcon = () => /* @__PURE__ */ jsxRuntime.jsx(icons.FileXls, {});
const MEMBER_UID = "api::member.member";
const EXPORT_URL = "/club-export-data-plugin/members/export";
const getFilename = () => {
  const date = /* @__PURE__ */ new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `club-users-export-${day}-${month}-${year}.xlsx`;
};
const getCookieValue = (name) => document.cookie.split("; ").find((cookie) => cookie.startsWith(`${name}=`))?.split("=")[1];
const getAdminToken = () => {
  const localStorageToken = window.localStorage.getItem("jwtToken");
  if (localStorageToken) {
    return JSON.parse(localStorageToken);
  }
  return getCookieValue("jwtToken") ?? "";
};
const getExportUrl = () => {
  const backendUrl = String(window.strapi?.backendURL ?? "").replace(/\/$/, "");
  return `${backendUrl}${EXPORT_URL}`;
};
const downloadBlob = (blob) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = getFilename();
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};
const ExportMembersButton = () => {
  const { formatMessage } = reactIntl.useIntl();
  const { slug } = reactRouterDom.useParams();
  const { toggleNotification } = admin.useNotification();
  if (slug !== MEMBER_UID) {
    return null;
  }
  const handleExport = async () => {
    try {
      const token = getAdminToken();
      const response = await fetch(getExportUrl(), {
        method: "GET",
        credentials: "include",
        headers: {
          ...token ? { Authorization: `Bearer ${token}` } : {}
        }
      });
      if (!response.ok) {
        throw new Error(`Export failed with status ${response.status}`);
      }
      downloadBlob(await response.blob());
    } catch (error) {
      toggleNotification({
        type: "danger",
        message: formatMessage({
          id: getTranslation("export.members.error"),
          defaultMessage: "Members export failed."
        })
      });
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Download, {}), onClick: handleExport, children: formatMessage({
    id: getTranslation("export.members.button"),
    defaultMessage: "Export Members"
  }) });
};
const plugin = {
  register(app) {
    app.getPlugin("content-manager").injectComponent("listView", "actions", {
      name: "export-members-button",
      Component: ExportMembersButton
    });
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: PLUGIN_ID
      },
      Component: () => Promise.resolve().then(() => require("./App-bpqZ6T_A.js")),
      permissions: []
    });
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID
    });
  },
  registerTrads({ locales }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/en.json": () => Promise.resolve().then(() => require("./en-4vy19Oil.js")), "./translations/ru.json": () => Promise.resolve().then(() => require("./ru-C0Bm687K.js")) }), `./translations/${locale}.json`, 3);
          const newData = {};
          const keys = Object.keys(data);
          for (const key of keys) {
            newData[getTranslation(key)] = data[key];
          }
          return { data: newData, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  }
};
exports.getTranslation = getTranslation;
exports.plugin = plugin;
