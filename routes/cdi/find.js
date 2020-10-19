const express = require('express');
const router = express.Router();
const Cdi = require('../../models/Cdi');
const _ = require('lodash');

router.get('/', (req, res) => {
    let name = decodeURI(req.query.name);
    let page = decodeURI(req.query.page) || 0;
    Cdi.aggregate([
        // {
        //     $addFields: {
        //         boeDateX: { $dateToString: { format, date: "$boeDate" } },
        //         totalNetWeightX: { $toString: "$totalNetWeight" },
        //         totalGrossWeightX: { $toString: "$totalGrossWeight" },
        //         totalPriceX: { $toString: "$totalPrice" },
        //         hasFile: {
        //             $cond: {
        //                 if: {
        //                     $eq: ["$fileName", ""]
        //                 },
        //                 then: false,
        //                 else: true
        //             }
        //         },
        //     }
        // },
        {
            $match: {
                name : { $regex: new RegExp(escape(name),'i') },
            }
        },
        {
            $project: {
                name: 1,
            }
        }
    ])
    .sort({ name: 1 })
    .skip(10 * page)
    .limit(10)
    .exec(function (err, options) {
        if (err) {
            return res.status(400).json({ message: 'An error has occured.' });
        } else {
            return res.status(200).json({ options });
        }
    });
});

module.exports = router;

function escape(string) {
    return !_.isUndefined(string) ? string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : '';
}