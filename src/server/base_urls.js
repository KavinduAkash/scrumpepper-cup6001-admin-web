//BASE URLS
export const SCRUM_PEPPER_TESTING_BASE_URL     = `http://localhost:8080`;
export const SCRUM_PEPPER_TESTING_BASE_URL     = `http://143.110.239.13:8081/sppm-admin-api`;
export const SCRUM_PEPPER_PRODUCTION_BASE_URL  = `http://localhost:8080`;
export const URL_TYPE = 1;
//API URLS
export const SCRUM_PEPPER_API_URL  = (status) => `${status === 1 ? SCRUM_PEPPER_TESTING_BASE_URL  : SCRUM_PEPPER_PRODUCTION_BASE_URL}/v1/`;
