const express = require('express');
const cors = require('cors');
const app = express();
const GreaquestRoutes = require('./Routes/Greaquest');
const IciciRoutes = require('./Routes/IciciBank');
const Propelled = require('./Routes/Propelled')
const Fibe = require('./Routes/Fibe')

const moment = require('moment');

const sequelize = require('./config');
const LoanFeeOnlyTranstions = require('./Models/LoanFeeOnlyTranstions');
const FeeFromLoanTracker = require('./Models/FeeFromLoanTracker');
app.use(express.json());
app.use(cors());

sequelize.sync().then(() => {
  console.log('Database synced.');
});

app.use('/api', GreaquestRoutes);
app.use('/api', IciciRoutes);
app.use('/api', Propelled);
app.use('/api', Fibe);



app.get('/api/loanFeeTransactions', async (req, res) => {
  try {
    const transactions = await LoanFeeOnlyTranstions.findAll();
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/FeeFromLoanTracker', async (req, res) => {
  try {
    const transactions = await FeeFromLoanTracker.findAll();
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/transaction/mob/:studentMobileNo', async (req, res) => {
  const studentMobileNo = req.params.studentMobileNo;
  
  try {
    const transaction = await LoanFeeOnlyTranstions.findOne({
      attributes: [
        'id',
        'date_of_Payment',
        'mode_of_payment',
        'instrument_No',
        'amount',
        'clearance_Date',
        'student_Name',
        'student_Email_ID',
        'student_Mobile_No',
        'course_Name',
        'finance_charges',
        'Bank_tranId',
        'NbfcName',
        'tenure'
      ],
      where: { student_Mobile_No: studentMobileNo }
    });
    
    console.log(transaction);

    if (transaction) {
      const formattedTransaction = {
        ...transaction.dataValues,
        date_of_Payment: moment(transaction.date_of_Payment, 'MM/DD/YYYY').format('YYYY-MM-DD'),
        clearance_Date: moment(transaction.clearance_Date, 'DD/MMM/YYYY').format('YYYY-MM-DD')
      };

      console.log(formattedTransaction);
      res.json(formattedTransaction);
    } else {
      res.status(404).json({ error: 'Transaction not found' });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/api/transaction/email/:student_Email_ID', async (req, res) => {
  const studentEmailId = req.params.student_Email_ID;

  try {
    const transaction = await LoanFeeOnlyTranstions.findOne({
      attributes: [
        'id',
        'date_of_Payment',
        'mode_of_payment',
        'instrument_No',
        'amount',
        'clearance_Date',
        'student_Name',
        'student_Email_ID',
        'student_Mobile_No',
        'course_Name',
        'finance_charges',
        'Bank_tranId',
        'NbfcName',
        'tenure'
      ],
      where: { student_Email_ID: studentEmailId }
    });

    console.log(transaction);

    if (transaction) {
      const formattedTransaction = {
        ...transaction.dataValues,
        date_of_Payment: moment(transaction.date_of_Payment, 'MM/DD/YYYY').format('YYYY-MM-DD'),
        clearance_Date: moment(transaction.clearance_Date, 'DD/MMM/YYYY').format('YYYY-MM-DD')
      };

      console.log(formattedTransaction);

      res.json(formattedTransaction);
    } else {
      res.status(404).json({ error: `Student Transaction not found with ${studentEmailId}` });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/all-nbfc-transactions', async (req, res) => {
  try {
    const transactions = await LoanFeeOnlyTranstions.findAll({
      attributes: [
        'id',
        'date_of_Payment',
        'mode_of_payment',
        'instrument_No',
        'amount',
        'clearance_Date',
        'student_Name',
        'student_Email_ID',
        'student_Mobile_No',
        'course_Name',
        'finance_charges',
        'Bank_tranId',
        'NbfcName',
        'tenure'        
      ]
    });
    const formattedTransactions = transactions.map(transaction => ({
      ...transaction.dataValues,
      date_of_Payment: moment(transaction.date_of_Payment, ['MM/DD/YYYY', 'DD-MM-YYYY']).format('YYYY-MM-DD'),
      clearance_Date: moment(transaction.clearance_Date, 'DD/MMM/YYYY').format('YYYY-MM-DD'),
    }));

    res.json(formattedTransactions);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/limit/all-nbfc-transactions', async (req, res) => {
  try {
    const { limit } = req.query;

    // Use sequelize options to apply the limit
    const queryOptions = {
      attributes: [
        'id',
        'date_of_Payment',
        'mode_of_payment',
        'instrument_No',
        'amount',
        'clearance_Date',
        'student_Name',
        'student_Email_ID',
        'student_Mobile_No',
        'course_Name',
        'finance_charges',
        'Bank_tranId',
        'NbfcName',
        'tenure'
      ],
      limit: limit ? parseInt(limit, 10) : undefined, // Parse limit as an integer
    };

    const transactions = await LoanFeeOnlyTranstions.findAll(queryOptions);

    const formattedTransactions = transactions.map(transaction => ({
      ...transaction.dataValues,
      date_of_Payment: moment(transaction.date_of_Payment, ['MM/DD/YYYY', 'DD-MM-YYYY']).format('YYYY-MM-DD'),
      clearance_Date: moment(transaction.clearance_Date, 'DD/MMM/YYYY').format('YYYY-MM-DD'),
    }));

    res.json(formattedTransactions);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.get('/api/em-transaction', async (req, res) => {
  const { email, mobile } = req.query;

  try {
    let whereClause = {};

    if (email) {
      whereClause.student_Email_ID = email;
    }

    if (mobile) {
      whereClause.student_Mobile_No = mobile;
    }

    const transaction = await LoanFeeOnlyTranstions.findOne({
      attributes: [
        'id',
        'date_of_Payment',
        'mode_of_payment',
        'instrument_No',
        'amount',
        'clearance_Date',
        'student_Name',
        'student_Email_ID',
        'student_Mobile_No',
        'course_Name',
        'finance_charges',
        'Bank_tranId',
        'NbfcName',
        'tenure'
      ],
      where: whereClause
    });

    if (transaction) {
      const formattedTransaction = {
        ...transaction.dataValues,
        date_of_Payment: moment(transaction.date_of_Payment, 'MM/DD/YYYY').format('YYYY-MM-DD'),
        clearance_Date: moment(transaction.clearance_Date, 'DD/MMM/YYYY').format('YYYY-MM-DD')
      };

      res.json(formattedTransaction);
    } else {
      res.status(404).json({ error: 'Student Transaction not found' });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
