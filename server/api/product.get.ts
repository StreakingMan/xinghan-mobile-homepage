import { ProductModel } from '~/server/models/product';

export default defineEventHandler(async () => {
    const products = await ProductModel.find({});

    products.forEach((p: any) => {
        const valueSubstr = (key: string, length: number) => {
            if (p[key]) {
                p[key] = p[key].map((i: any) => String(i).substring(0, length));
            }
        };
        valueSubstr('timeTend', 10);
        valueSubstr('netAssetValueTend', 4);
        valueSubstr('500valueTend', 4);
    });
    return products;
});
