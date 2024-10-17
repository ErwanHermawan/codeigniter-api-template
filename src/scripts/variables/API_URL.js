/* ------------------------------------------------------------------------------
@name: API_URL
@description: API_URL
--------------------------------------------------------------------------------- */

const URL_BASE = "http://localhost/codeigniter-api-template/api/";

export const API_URL = {
	LOGIN: `${URL_BASE}auth/login`,
	USERS: `${URL_BASE}users`,
	USER_LOGS: `${URL_BASE}users/log`,
	META: `${URL_BASE}meta`,
	PROFILE: `${URL_BASE}profile`,
};
