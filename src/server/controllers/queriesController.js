const Project = require("../models/Project");
const Employee = require("../models/Employee");
const Department = require("../models/Department");

exports.getQueryOne = async (req, res) => {

    try {

        const queryone = await Project.aggregate([
            {
                $match: {
                    $expr: { $ne: ["$earnings.obtained", null] }
                }
            }, {
                $lookup: {
                    from: "employees",
                    localField: "ownerID",
                    foreignField: "_id",
                    as: "employeeArray"
                }
            }, {
                $addFields: {
                    employeeData: {
                        $arrayElemAt: ["$employeeArray", 0]
                    }
                }
            }, {
                $lookup: {
                    from: "departments",
                    localField: "employeeData.departmentID",
                    foreignField: "_id",
                    as: "departmentArray"
                }
            }, {
                $addFields: {
                    departmentData: {
                        $arrayElemAt: ["$departmentArray", 0]
                    }
                }
            }, {
                $project: {
                    departmentID: "$departmentData._id",
                    departmentName: "$departmentData.name",
                    subBenefits: {
                        $subtract: ["$earnings.obtained", "$budget"]
                    },
                    summary: {
                        $cond: {
                            if: { $gte: [{ $subtract: ["$earnings.obtained", "$budget"] }, 0] },
                            then: "Profitable",
                            else: "Loss-Making"
                        }
                    }
                }
            }, {
                $group: {
                    _id: {
                        departmentID: "$departmentID",
                        departmentName: "$departmentName",
                        summary: "$summary"
                    },
                    totalBenefits: {
                        $sum: "$subBenefits"
                    },
                    avgBenefits: {
                        $avg: "$subBenefits"
                    },
                    count: { $sum: 1 }
                }
            }, {
                $project: {
                    _id: 1,
                    profitable: { $cond: [{ $eq: ["$_id.summary", "Profitable"] }, "$count", 0] },
                    nonProf: { $cond: [{ $eq: ["$_id.summary", "Loss-Making"] }, "$count", 0] },
                    totalBenefits: 1,
                    avgBenefits: 1
                }
            }, {
                $group: {
                    _id: {
                        departmentID: "$_id.departmentID",
                        departmentName: "$_id.departmentName",
                    },
                    totalProf: { $sum: "$profitable" },
                    totalNonProf: { $sum: "$nonProf" },
                    finalBenefits: { $sum: "$totalBenefits" },
                    finalavgBenefits: { $avg: "$avgBenefits" }
                }
            }
        ]);

        res.json(queryone);

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error getting the query one :(');
    }
};

exports.getQueryTwo = async (req, res) => {

    try {

        const querytwo = await Project.aggregate([
            {
                $lookup: {
                    from: "employees",
                    localField: "ownerID",
                    foreignField: "_id",
                    as: "employeeArray"
                }
            }, {
                $addFields: {
                    employeeData: {
                        $arrayElemAt: ["$employeeArray", 0]
                    }
                }
            }, {
                $match: {
                    $expr: { $ne: ["$earnings.obtained", null] }
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    owner: { $concat: ["$employeeData.firstName", " ", "$employeeData.lastName"] },
                    duration: {
                        $divide: [
                            { $subtract: ["$duration.end", "$duration.start"] },
                            60 * 1000 * 60 * 24
                        ]
                    },
                    benefits: { $subtract: ["$earnings.obtained", "$budget"] },
                    summary:
                    {
                        $switch:
                        {
                            branches: [
                                {
                                    case: {
                                        $and: [
                                            { $gt: [{ $subtract: ["$earnings.obtained", "$budget"] }, 0] },
                                            { $gt: [{ $subtract: ["$earnings.obtained", "$earnings.expected"] }, 0] }
                                        ]
                                    },
                                    then: "Profitable! :)"
                                }, {
                                    case: {
                                        $and: [
                                            { $gt: [{ $subtract: ["$earnings.obtained", "$budget"] }, 0] },
                                            { $lte: [{ $subtract: ["$earnings.obtained", "$earnings.expected"] }, 0] }
                                        ]
                                    },
                                    then: "Not bad :/"
                                }, {
                                    case: { $lte: [{ $subtract: ["$earnings.obtained", "$budget"] }, 0] },
                                    then: "Loss-Making :("
                                }
                            ],
                            default: "Still no final report."
                        }
                    }
                }
            }
        ]);

        res.json(querytwo);

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error getting the query two :(');
    }
};

exports.getQueryThree = async (req, res) => {

    try {

        const querythree = await Employee.aggregate([
            {
                $match: {
                    $expr: {
                        $lte: [
                            "$hireDate",
                            {
                                $dateSubtract: {
                                    startDate: new Date(),
                                    unit: "year",
                                    amount: 3
                                }
                            }
                        ]
                    }
                }
            }, {
                $lookup: {
                    from: "projects",
                    localField: "_id",
                    foreignField: "ownerID",
                    as: "projectArray"
                }
            }, {
                $unwind: "$projectArray"
            }, {
                $match: {
                    $expr: {
                        $eq: [
                            { $dateToString: { format: "%Y", date: "$projectArray.duration.end" } },
                            { $dateToString: { format: "%Y", date: new Date() } }
                        ]
                    }
                }
            }, {
                $match: {
                    $expr: { $ne: ["$projectArray.earnings.obtained", null] }
                }
            },
            {
                $group: {
                    _id: {
                        _id: "$_id",
                        firstName: "$firstName",
                        lastName: "$lastName",
                        salary: "$salary"
                    },
                    reference: { $max: { $subtract: ["$projectArray.earnings.obtained", "$projectArray.budget"] } }
                }
            }, {
                $project: {
                    _id: "$_id._id",
                    name: { $concat: ["$_id.firstName", " ", "$_id.lastName"] },
                    salary: "$_id.salary",
                    maxBenefit: "$reference",
                    incentive: { $sum: ["$_id.salary", { $multiply: ["$reference", 0.1] }] }
                }
            }, {
                $match: {
                    $expr: { $gt: ["$maxBenefit", 0] }
                }
            }
        ]);

        res.json(querythree);

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error getting the query three :(');
    }
};

exports.getQueryFour = async (req, res) => {

    try {

        const queryfour = await Department.aggregate([
            {
                $unwind: "$contactInfo"
            }, {
                $match: {
                    "contactInfo.type": { $regex: "Manager", $options: "i" }
                }
            }, {

                $lookup: {
                    from: "employees",
                    localField: "_id",
                    foreignField: "departmentID",
                    as: "employeeArray"
                }
            }, {
                $unwind: "$employeeArray"
            }, {
                $match: { "employeeArray.extraRoles.manager": true }
            }, {
                $project: {
                    _id: 1,
                    name: 1,
                    manager: { $concat: ["$employeeArray.firstName", " ", "$employeeArray.lastName"] },
                    phone: "$contactInfo.number",
                    workTime: "$shifts"
                }
            }

        ]);

        res.json(queryfour);

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error getting the query four :(');
    }
};