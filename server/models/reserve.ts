import { defineMongooseModel } from '#nuxt/mongoose';

export interface IReserve {
    selectedFund: string;
    referee?: string;
    reserveType: string;
    money: string;
    name: string;
    phone: string;
    remark?: string;
    createAt: Date;
}
export const ReserveModel = defineMongooseModel<IReserve>(
    'Reserve',
    {
        selectedFund: {
            type: String,
            required: true,
        },
        referee: {
            type: String,
        },
        reserveType: {
            type: String,
            required: true,
        },
        money: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        remark: {
            type: String,
        },
        createAt: {
            type: Date,
            default: () => new Date(),
        },
    },
    {
        collection: 'reserve',
    },
);
