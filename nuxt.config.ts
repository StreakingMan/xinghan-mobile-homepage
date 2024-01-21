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
            script: [{ src: '//res.wx.qq.com/open/js/jweixin-1.4.0.js' }],
        },
    },
    modules: [
        '@vant/nuxt',
        '@nuxtjs/tailwindcss',
        '@vueuse/nuxt',
        'nuxt-mongoose',
    ],
    devtools: { enabled: true },
    build: {
        transpile: [/echarts/],
    },
});
