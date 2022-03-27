module.exports = {
    trendPost: async (currentDate, lessThanSevenDays) => {
        const query = [{
            $match: {
                createDate: {
                    $gte: new Date(lessThanSevenDays + ' 23:59:59:999'),
                    $lte: new Date(currentDate),
                },
                claps: {
                    $gte: 10
                }
            }
        },
        {
            $unset: [
                "phoneNumber",
                "__v",
                "descriptionPost",
                "updateDate",
                "createDate",
                "createDateNoClaps",
                "createDateClaps",
                "claps",
                "no_claps",
                "price",
                "address"
            ]
        }];
        return query;
    }
}