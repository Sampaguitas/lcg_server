const express = require('express');
const router = express.Router();
// const Cdi = require('../../models/Cdi');
// const Certificate = require('../../models/Certificate');
// const End = require('../../models/End');
// const Grade = require('../../models/Grade');
// const Heat = require('../../models/Heat');
// const Length = require('../../models/Length');
// const Other = require('../../models/Other');
// const Size = require('../../models/Size');
// const Spec = require('../../models/Spec');
// const Supplier = require('../../models/Supplier');
// const Surface = require('../../models/Surface');
// const Type = require('../../models/Type');
const _ = require('lodash');

router.get('/', async (req, res) => {
    
    let myPromises = [];
    let lunar = decodeURI(req.query.lunar);

    if (!/^[0-9A-F]{40}$/.test(lunar)) {
        return res.status(400).json({message: 'wrong format'});
    } else {
        
        
        let params = {
            sizeOne: { _id: lunar.slice(0,3), path: 'size', obj: require('../../models/Size') },
            sizeTwo: { _id: lunar.slice(3,6), path: 'size', obj: require('../../models/Size')},
            sizeThree: { _id: lunar.slice(6,9), path: 'size', obj: require('../../models/Size')},
            wtOne: { _id: lunar.slice(9,12), path: 'size', obj: require('../../models/Size')},
            wtTwo: { _id: lunar.slice(12,15), path: 'size', obj: require('../../models/Size')},
            type: { _id: lunar.slice(15,18), path: 'type', obj: require('../../models/Type')},
            spec: { _id: lunar.slice(18,21), path: 'spec', obj: require('../../models/Spec')},
            grade: { _id: lunar.slice(21,24), path: 'grade', obj: require('../../models/Grade')},
            heat: { _id: lunar.slice(24,26), path: 'heat', obj: require('../../models/Heat')},
            length: { _id: lunar.slice(26,29), path: 'length', obj: require('../../models/Length')},
            end: { _id: lunar.slice(29,31), path: 'end', obj: require('../../models/End')},
            surface: { _id: lunar.slice(31,33), path: 'surface', obj: require('../../models/Surface')},
            cdi: { _id: lunar.slice(33,34), path: 'cdi', obj: require('../../models/Cdi')},
            supplier: { _id: lunar.slice(34,35), path: 'supplier', obj: require('../../models/Supplier')},
            certificate: { _id: lunar.slice(35,36), path: 'certificate', obj: require('../../models/Certificate')},
            other: { _id: lunar.slice(36,39), path: 'other', obj: require('../../models/Other')},
        }

        Object.keys(params).map(key => myPromises.push(getName(params, key)));
        Promise.all(myPromises).then(result => {
            return res.status(200).json(result.reduce(function (acc, cur) {
                acc[cur[0]] = cur[1];
                return acc;
            }, {}))
        });
    }
});

module.exports = router;

function getName(params, key) {
    return new Promise(function (resolve) {
        if (params[key].path === 'size') {
            params[key].obj.findById(params[key]._id, function(err, res) {
                if (!!err || !res || !res.mm) {
                    resolve([[key], {_id:  params[key]._id, name: ''}]);
                } else {
                    resolve([[key], !!res.in ? {_id: params[key]._id, name: `${res.mm} | ${res.in}`} : {_id: params[key]._id, name: res.mm} ]);
                }
            }).lean();
        } else {
            params[key].obj.findById(params[key]._id, function(err, res) {
                if (!!err || !res || !res.name) {
                    resolve([[key], {_id:  params[key]._id, name: ''}]);
                } else {
                    resolve([[key], {_id:  params[key]._id, name: res.name}]);
                }
            }).lean();
        }
    });
}

