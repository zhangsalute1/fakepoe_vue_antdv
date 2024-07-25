import { services } from "@/utils/request.js"

export const registerApi = (options) => {
    return services.post('/register', options).then(response => {
        console.log('注册成功', response.data);
        return response.data;
    }).catch(error => {
        console.log('注册失败', error.response || error.message);
        throw error;
    })
}