import type { Core } from "@strapi/strapi";
import * as XLSX from "xlsx";

const service = ({ strapi }: { strapi: Core.Strapi }) => ({
  getWelcomeMessage() {
    return "Welcome to Strapi 🚀";
  },

  async exportMembersXlsx() {
    const result = await strapi.db.connection.raw(`
      SELECT
        m.first_name AS "Имя",
        m.last_name AS "Фамилия",
        m.email AS "Эл. почта",
        m.phone AS "Телефон",
        m.country AS "Страна",
        m.city AS "Город",
        to_char(m.created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Europe/Moscow', 'DD.MM.YYYY HH24:MI:SS') AS "Дата регистрации",
        to_char(m.last_login_at AT TIME ZONE 'UTC' AT TIME ZONE 'Europe/Moscow', 'DD.MM.YYYY HH24:MI:SS') AS "Последний вход",
        CASE
          WHEN pp.id IS NOT NULL THEN 'Да'
          ELSE 'Нет'
        END AS "Профессионал",
        COALESCE(
          CASE
            WHEN jsonb_typeof(pp.activity_types::jsonb) = 'array' THEN (
              SELECT string_agg(value, ', ')
              FROM jsonb_array_elements_text(pp.activity_types::jsonb) AS value
            )
            ELSE ''
          END,
          ''
        ) AS "Типы деятельности"
      FROM members m
      LEFT JOIN members_professional_profile_lnk mppl
        ON mppl.member_id = m.id
      LEFT JOIN professional_profiles pp
        ON pp.id = mppl.professional_profile_id
      ORDER BY m.created_at DESC;
    `);
    const worksheet = XLSX.utils.json_to_sheet(result.rows);
    const workbook = XLSX.utils.book_new();

    worksheet["!cols"] = [
      { wch: 20 },
      { wch: 20 },
      { wch: 32 },
      { wch: 18 },
      { wch: 18 },
      { wch: 24 },
      { wch: 22 },
      { wch: 22 },
      { wch: 16 },
      { wch: 36 },
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, "Members");

    return XLSX.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    }) as Buffer;
  },
});

export default service;
