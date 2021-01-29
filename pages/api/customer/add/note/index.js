import { firebaseAdmin } from '../../../../../src/lib/auth/firebaseAdmin';
// const AWS = require('aws-sdk');

// const {
//   AWS_ACCESS_KEY_ID, 
//   AWS_SECRET_ACCESS_KEY,
//   AWS_REGION
// } = process.env;

// const config = {
//   aws_table_name: 'customers',
//   aws_remote_config: {
//     accessKeyId: AWS_ACCESS_KEY_ID,
//     secretAccessKey: AWS_SECRET_ACCESS_KEY,
//     region: AWS_REGION
//   }
// };

const AddCustomerNote = (req, res) => {
  const db = firebaseAdmin.firestore();
  const parsed = JSON.parse(req.body);
  let client;
  console.log({ parsed });
  const {
    id,
    firstName,
    lastName,
    email,
    phoneNumber,
    createdBy,
    createdAt,
    isOnline,
    notes,
  } = parsed;

  db.collection('userClients')
    .where('createdBy', '==', createdBy)
    .where('id', '==', id)
    .get()
    .then(snap => {
      try {
        snap.forEach(doc => {
          const currentClient = doc.data();
          client = currentClient;
        });
        console.log({ 'client in': client });
      } catch(err) {
        res.send({
          success: false,
          error: err,
        });
      }
    });
  console.log({ 'client out': client });
  res.send({ success: true });
  // AWS.config.update(config.aws_remote_config);
  // const db = new AWS.DynamoDB.DocumentClient();

  // const params = {
  //   TableName: config.aws_table_name,
  //   Item: {
  //     id,
  //     createdAt,
  //     createdBy,
  //     firstName,
  //     lastName,
  //     email,
  //     phoneNumber,
  //     isOnline,
  //     notes,
  //   }
  // };

  // db.put(params, function(err, data) {
  //   if (err) {
  //     res.send({
  //       success: false,
  //       error: err
  //     });
  //   } else {
  //     const { Items } = data;
  //     res.send({
  //       success: true,
  //       customer: Items
  //     });
  //   }
  // });
};

export default AddCustomerNote;
