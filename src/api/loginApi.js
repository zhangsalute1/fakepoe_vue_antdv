import { services } from "@/utils/request.js"

export const loginApi = (options) => {
    return services.post('/login', options).then(response => {
        console.log('登陆成功', response.data);
        return response.data;
    }).catch(error => {
        console.log('登录失败', error.response || error.message);
        throw error;
    })
}