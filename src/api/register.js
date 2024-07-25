import { services } from "@/utils/request.js"

export const registerApi = (options) => {
    return services.post('/register', options).then(response => {
        return response.data;
    })
}