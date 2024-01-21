import { ProductModel } from '~/server/models/product';

export default defineEventHandler(async () => {
    const products = await ProductModel.find({});

    products.forEach((p: any) => {
        p.timeTend = (p.timeTend || []).map((i: any) => i.toLocaleDateString());
    });
    return products;
});
