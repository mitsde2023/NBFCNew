// otherRecordType.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config'); 

const Propelled = sequelize.define('Propelled', {
    loanApplicationId: { type: DataTypes.STRING },
    financeReference: { type: DataTypes.STRING },
    applicationStartedOn: { type: DataTypes.STRING },
    applicationCompletedOn: { type: DataTypes.STRING },
    applicationRejectedOn: { type: DataTypes.STRING },
    applicationRejectedReason: { type: DataTypes.STRING },
    borrowerName: { type: DataTypes.STRING },
    borrowerMobileNumber: { type: DataTypes.STRING },
    borrowerCurrentState: { type: DataTypes.STRING },
    borrowerPermanentState: { type: DataTypes.STRING },
    emailId: { type: DataTypes.STRING },
    nbfc: { type: DataTypes.STRING },
    instituteName: { type: DataTypes.STRING },
    courseName: { type: DataTypes.STRING },
    discountedCourseFee: { type: DataTypes.FLOAT },
    loanAmount: { type: DataTypes.FLOAT },
    numberOfAdvanceEMI: { type: DataTypes.FLOAT },
    advanceEMIAmount: { type: DataTypes.FLOAT },
    tenureMonths: { type: DataTypes.FLOAT },
    subventionPercentage: { type: DataTypes.FLOAT },
    subventionAmount: { type: DataTypes.FLOAT },
    subventionGST: { type: DataTypes.FLOAT },
    totalSubventionAmount: { type: DataTypes.FLOAT },
    approvedOn: { type: DataTypes.STRING },
    loanDocumentationDoneOn: { type: DataTypes.DATE },
    disbursedAmount: { type: DataTypes.FLOAT },
    dateOfDisbursement: { type: DataTypes.STRING },
    utrNo: { type: DataTypes.STRING },
    nachType: { type: DataTypes.STRING },
    borrowerROI: { type: DataTypes.FLOAT },
    status: { type: DataTypes.STRING },
    loanDocumentationStatus: { type: DataTypes.STRING },
    instituteReference: { type: DataTypes.STRING },
    instituteNotes: { type: DataTypes.STRING },
    invoiceMonth: { type: DataTypes.STRING },
    agent: { type: DataTypes.STRING },
    agentEmail: { type: DataTypes.STRING },
    agentMobile: { type: DataTypes.STRING },
    agentComment: { type: DataTypes.STRING },
    actualLoanAmount: { type: DataTypes.FLOAT },
    subventionFinanceCharges: { type: DataTypes.FLOAT },
    borrowerName2: { type: DataTypes.STRING },
    emailId2: { type: DataTypes.STRING },
    NbfcName: {
        type: DataTypes.STRING,
        defaultValue: 'Propelled'
    }
});

module.exports = Propelled;
