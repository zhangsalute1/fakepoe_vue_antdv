import { services } from "@/utils/request.js"

export const chatApi = (options) => {
    return services.post('/chat', options).then(response => {
        return response.data;
    })
}