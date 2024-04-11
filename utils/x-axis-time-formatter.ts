export const xAxisTimeFormatter = (timeTend: string[]) => {
    const findFirst2023Idx = timeTend.findIndex((t) => t.includes('2023'));

    return (value: string, idx: number) => {
        if (
            idx === 0 ||
            idx === timeTend.length - 1 ||
            idx === findFirst2023Idx
        ) {
            return value;
        }

        return '';
    };
};
