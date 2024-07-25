import { createRouter, createWebHistory } from 'vue-router'
import layout from '@/components/layout/index.vue'
import login from '@/components/login/index.vue'
import register from '@/components/register/index.vue'

const routes = [
    { path: '/', component: login },
    { path: '/layout', component: layout },
    { path: '/register', component: register },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export { router }
