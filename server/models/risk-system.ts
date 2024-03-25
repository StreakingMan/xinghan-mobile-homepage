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
        signalTitle: {
            type: String,
            required: false,
        },
        signalTends: {
            type: [
                {
                    label: String,
                    data: Array,
                },
            ],
            required: true,
        },
        valueTitle: {
            type: String,
            required: false,
        },
        valueTends: {
            type: [
                {
                    label: String,
                    data: Array,
                },
            ],
            required: true,
        },
        infoTitle: {
            type: String,
            required: false,
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
