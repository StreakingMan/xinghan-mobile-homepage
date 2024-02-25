import { defineMongooseModel } from '#nuxt/mongoose';

export const RiskSystemModel = defineMongooseModel(
    'RiskSystem',
    {
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        timeTend: {
            type: Array,
            required: true,
        },
        signalTend: {
            type: {
                label: String,
                data: Array,
            },
            required: true,
        },
        profitTends: {
            type: [
                {
                    label: String,
                    data: Array,
                },
            ],
            required: true,
        },
        infos: {
            type: [
                {
                    title: String,
                    desc: String,
                },
            ],
            required: true,
        },
    },
    {
        collection: 'riskSystem',
    },
);
