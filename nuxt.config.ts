// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: '杭州星瀚投资管理有限公司',
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                },
            ],
            link: [{ rel: 'icon', type: 'image/png', href: '/logo.png' }],
        },
    },
    modules: ['@vant/nuxt', '@nuxtjs/tailwindcss', '@vueuse/nuxt'],
    devtools: { enabled: true },
});
