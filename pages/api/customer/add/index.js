import { firebaseAdmin } from '../../../../src/lib/auth/firebaseAdmin';

const AddCustomer = (req, res) => {
  const db = firebaseAdmin.firestore();
  const { id } = req.body;

  try {
    db.collection('userClients').doc(id).set({
      ...req.body,
      isOnline: false,
      createdAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
    })
    .then(function() {
      res.send({ success: true, message: 'Client successfully added!' });
    })
    .catch(function(error) {
      res.send({ success: false, error });
    });
  } catch(error) {
    res.send({ success: false, error });
  }
};

export default AddCustomer;
