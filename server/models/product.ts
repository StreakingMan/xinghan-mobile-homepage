import { defineMongooseModel } from '#nuxt/mongoose';

export const ProductModel = defineMongooseModel('Product', {
    title: {
        type: String,
        required: true,
    },
    acc: {
        type: String,
        required: true,
    },
    yearAcc: {
        type: String,
        required: true,
    },
    manager: {
        type: String,
        required: true,
    },
    updatedAt: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        required: true,
    },
    netAssetValue: {
        type: String,
        required: true,
    },
    startingPoint: {
        type: String,
        required: true,
    },
    netAssetValueTend: {
        type: Array,
        required: true,
    },
    '500ValueTend': {
        type: Array,
        required: true,
    },
    timeTend: {
        type: Array,
        required: true,
    },
    netAssetValueStartLabel: {
        type: String,
        required: true,
    },
    netAssetValueEndLabel: {
        type: String,
        required: true,
    },
});
