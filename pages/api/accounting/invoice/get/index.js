import { firebaseAdmin } from '../../../../../src/lib/auth/firebaseAdmin';

const Invoices = (req, res, next) => {
  const db = firebaseAdmin.firestore();
  const { userId, invoiceId } = req.body;
  console.log('req.body', req.body);
  db.collection('invoices')
    .where('createdBy', '==', userId)
    .where('invoiceId', '==', invoiceId)
    .get()
    .then(snap => {
      try {
        let invoice;
        snap.forEach(doc => {
          invoice = doc.data();
        });
        res.send({
          success: true,
          invoice,
        });
      } catch(err) {
        res.send({
          success: false,
          error: err,
        });
      }
    })
    .catch(error => {
      res.send({
        success: false,
        error,
      });
    });
};

export default Invoices;
