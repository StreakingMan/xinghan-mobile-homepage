<script setup lang="ts">
const { y } = useWindowScroll();

const agree = ref(false);
showConfirmDialog({
    title: '“合格投资者”承诺',
    cancelButtonText: '离开',
    messageAlign: 'left',
    message:
        '本人承诺符合中国证监会规定的私募证券投资基金的“合格投资者”标准。即：具备相应风险识别能力和风险承担能力，投资于单只私募基金的金额不低于100万元、且个人金融资产不低于300万元或者最近三年个人年均收入不低于50万元。',
})
    .then(() => {
        // on confirm
        agree.value = true;
    })
    .catch(() => {
        // on cancel
        // @ts-ignore
        wx.closeWindow();
    });
</script>

<template>
    <header
        class="fixed h-[64px] w-full top-0 z-10 bg-white flex items-center justify-center transition-all"
        :class="{
            'drop-shadow-md': y > 0,
        }"
    >
        <img alt="logo" src="/logo-text.png" class="h-[40px] inline-block" />
    </header>
    <main
        :class="{
            'opacity-0': !agree,
        }"
        class="flex flex-col pt-[76px] pb-[var(--van-tabbar-height)] p-4 gap-4 text-zinc-800 bg-slate-50 min-h-screen"
    >
        <slot />
        <p class="text-sm text-center text-zinc-300">
            <a
                href="https://beian.miit.gov.cn/"
                target="_blank"
                rel="noopener noreferrer nofollow"
            >
                浙ICP备2025166436号-1
            </a>
        </p>
    </main>
</template>
