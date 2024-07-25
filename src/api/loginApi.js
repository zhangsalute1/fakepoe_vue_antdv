import { services } from "@/utils/request.js"

export const loginApi = (options) => {
    return services.post('/login', options).then(response => {
        return response.data;
    })
}