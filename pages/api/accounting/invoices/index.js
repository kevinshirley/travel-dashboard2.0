import { firebaseAdmin } from '../../../../src/lib/auth/firebaseAdmin';

const Invoices = (req, res, next) => {
  const db = firebaseAdmin.firestore();
  const { id } = req.body;

  db.collection('invoices')
    .where('createdBy', '==', id)
    .get()
    .then(snap => {
      try {
        let invoices = [];
        snap.forEach(doc => {
          const newInvoice = doc.data();
          invoices = [
            ...invoices,
            newInvoice,
          ];
        });
        res.send({
          success: true,
          invoices,
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
