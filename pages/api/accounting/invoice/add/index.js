import { firebaseAdmin } from '../../../../../src/lib/auth/firebaseAdmin';

const AddInvoice = (req, res) => {
  const db = firebaseAdmin.firestore();
  const parsed = JSON.parse(req.body);
  const { invoiceId } = parsed;

  try {
    db.collection('invoices').doc(invoiceId).set({
      ...parsed,
    })
    .then(function() {
      res.send({ success: true, message: 'Invoice successfully added!' });
    })
    .catch(function(error) {
      console.log({ success: false, error });
      res.send({ success: false, error });
    });
  } catch(error) {
    console.log({ success: false, error });
    res.send({ success: false, error });
  }
};

export default AddInvoice;
