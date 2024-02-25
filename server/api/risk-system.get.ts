import { RiskSystemModel } from '~/server/models/risk-system';

export default defineEventHandler(async () => {
    const riskSystems = await RiskSystemModel.find({}).sort({
        sort: 1,
    });

    riskSystems.forEach((p: any) => {
        p.timeTend = (p.timeTend || []).map((i: any) => i.toLocaleDateString());
    });
    return riskSystems;
});
