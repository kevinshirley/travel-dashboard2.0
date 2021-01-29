import { firebaseAdmin } from '../../../../../src/lib/auth/firebaseAdmin';

const AddCustomerNote = (req, res) => {
  const db = firebaseAdmin.firestore();
  const parsed = JSON.parse(req.body);
  const { id, notes } = parsed;

  try {
    const client = db.collection('userClients').doc(id);

    client.update({
      notes
    })
    .then(function() {
      console.log('Client successfully updated!');
      res.send({ success: true, message: 'Client successfully updated!' });
    })
    .catch(function(error) {
      console.error('Error updating client: ', error);
      res.send({ success: false, error });
    });
  } catch(error) {
    console.error('Error updating client: ', error);
    res.send({ success: false, error });
  }
};

export default AddCustomerNote;
