<script setup lang="ts">
definePageMeta({
    alias: '/reserve',
});

const form = reactive({
    selectedFund: '',
    referee: '',
    reserveType: '认购',
    money: '',
    name: '',
    phone: '',
    remark: '',
});
const { data } = await useFetch('/api/product');
const productOptions = computed(() => {
    if (!data.value) return [];
    return (data.value as any).map((p: any) => p.title);
});

const required = (name: string) => [{ validator: (v: any) => !!v || name }];
const phoneNumber = () => [
    {
        validator: (v: any) =>
            /^1[3456789]\d{9}$/.test(v) || '请填写正确的手机号码',
    },
];

const loading = ref(false);
const onSubmit = async () => {
    loading.value = true;
    const { error } = await useFetch('/api/reserve', {
        method: 'POST',
        body: JSON.stringify(form),
    });
    if (error.value) {
        console.log(error.value);
        showFailToast('服务器正在开小差，请稍后再试');
    } else {
        showSuccessToast('提交成功，请等待工作人员联系');
    }
    loading.value = false;
};
</script>

<template>
    <h1 class="text-2xl text-center font-bold">产品认购/申购/赎回意向申请</h1>
    <p>
        该预约提交的仅为意向申请，我们会根据填写的联系方式与您联系，具体认购/申购/赎回操作流程以实际操作为准
    </p>

    <client-only>
        <van-form @submit="onSubmit">
            <van-field
                v-model="form.selectedFund"
                name="radio"
                label="选择基金"
                :rules="required('请选择基金')"
            >
                <template #input>
                    <van-radio-group
                        v-model="form.selectedFund"
                        class="flex flex-col gap-2"
                    >
                        <van-radio
                            v-for="o in productOptions"
                            :key="o"
                            :name="o"
                        >
                            {{ o }}
                        </van-radio>
                    </van-radio-group>
                </template>
            </van-field>

            <van-field v-model="form.referee" label="推荐人"></van-field>

            <van-field label="预约类型">
                <template #input>
                    <van-radio-group
                        v-model="form.reserveType"
                        direction="horizontal"
                    >
                        <van-radio name="认购">认购</van-radio>
                        <van-radio name="申购">申购</van-radio>
                        <van-radio name="赎回">赎回</van-radio>
                    </van-radio-group>
                </template>
            </van-field>

            <van-field
                v-model="form.money"
                label="金额"
                suffix="万(RMB)"
                type="number"
                required
                :rules="required('请填写金额')"
            ></van-field>
            <van-field
                v-model="form.name"
                label="姓名"
                required
                :rules="required('请填写姓名')"
            ></van-field>
            <van-field
                v-model="form.phone"
                label="联系电话"
                required
                :rules="required('请填写联系电话').concat(phoneNumber())"
            ></van-field>
            <van-field v-model="form.remark" label="备注"></van-field>

            <van-button
                round
                block
                type="primary"
                native-type="submit"
                class="!mt-4"
                :loading="loading"
            >
                提交
            </van-button>
        </van-form>
    </client-only>
</template>

<style scoped></style>
