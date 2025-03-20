export const API_BASE_URL = "https://momentum.redberryinternship.ge/api";
export const API_TOKEN = "9e78808b-acff-409b-acf0-5673454faeeb";

export const API_ENDPOINTS = {
    departments: `${API_BASE_URL}/departments`,
    employees: `${API_BASE_URL}/employees`,
    priorities: `${API_BASE_URL}/priorities`,
    statuses: `${API_BASE_URL}/statuses`,
    tasks: `${API_BASE_URL}/tasks`
};

export const API_HEADERS = {
    Authorization: `Bearer ${API_TOKEN}`
}; 