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
        firstTend: {
            type: Array,
            required: true,
        },
        firstLabel: {
            type: String,
            required: true,
        },
        secondTend: {
            type: Array,
            required: true,
        },
        secondLabel: {
            type: String,
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
