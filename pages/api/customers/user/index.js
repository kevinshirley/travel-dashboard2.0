import { firebaseAdmin } from '../../../../src/lib/auth/firebaseAdmin';

const UserCustomers = (req, res, next) => {
  const db = firebaseAdmin.firestore();
  const { id } = req.body;

  db.collection('userClients')
    .where('createdBy', '==', id)
    .get()
    .then(snap => {
      try {
        let clients = [];
        snap.forEach(doc => {
          const newClient = doc.data();
          // clients.push(newClient);
          clients = [
            ...clients,
            newClient,
          ];
        });
        console.log({ clients });
        res.send({
          success: true,
          clients,
        });
      } catch(err) {
        res.send({
          success: false,
          error: err,
        });
      }
    });
};

export default UserCustomers;
