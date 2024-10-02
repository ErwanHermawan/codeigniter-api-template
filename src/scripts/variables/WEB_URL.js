/* ------------------------------------------------------------------------------
@name: WEB_URL
@description: WEB_URL
--------------------------------------------------------------------------------- */

const URL_BASE_WEB = $("base").attr("href");

export const WEB_URL = {
	base: `${URL_BASE_WEB}`,
	files: `${VENDOR_WEB}files/`,
	dashboard: `${URL_BASE_WEB}dashboard`,
};
