import { Button } from "@strapi/design-system";
import { Download } from "@strapi/icons";
import { useNotification } from "@strapi/strapi/admin";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import { getTranslation } from "../utils/getTranslation";

const MEMBER_UID = "api::member.member";
const EXPORT_URL = "/club-export-data-plugin/members/export";

const getFilename = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `club-users-export-${day}-${month}-${year}.xlsx`;
};

const getCookieValue = (name: string) =>
  document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.split("=")[1];

const getAdminToken = () => {
  const localStorageToken = window.localStorage.getItem("jwtToken");

  if (localStorageToken) {
    return JSON.parse(localStorageToken);
  }

  return getCookieValue("jwtToken") ?? "";
};

const getExportUrl = () => {
  const backendUrl = String((window as Window & { strapi?: { backendURL?: string } }).strapi?.backendURL ?? "").replace(/\/$/, "");

  return `${backendUrl}${EXPORT_URL}`;
};

const downloadBlob = (blob: Blob) => {
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
  const { formatMessage } = useIntl();
  const { slug } = useParams();
  const { toggleNotification } = useNotification();

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
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
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
          defaultMessage: "Members export failed.",
        }),
      });
    }
  };

  return (
    <Button startIcon={<Download />} onClick={handleExport}>
      {formatMessage({
        id: getTranslation("export.members.button"),
        defaultMessage: "Export Members",
      })}
    </Button>
  );
};

export { ExportMembersButton };
