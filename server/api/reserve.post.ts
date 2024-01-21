import { ReserveModel } from '~/server/models/reserve';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    return await new ReserveModel({
        ...body,
        createAt: new Date(),
    }).save();
});
