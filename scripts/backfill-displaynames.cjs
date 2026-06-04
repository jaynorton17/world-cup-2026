const admin = require('firebase-admin');
const path = require('path');

const KEY_PATH = path.join(__dirname, '..', 'service-account-key.json');
let serviceAccount;
try {
  serviceAccount = require(KEY_PATH);
} catch {
  console.error('Missing service-account-key.json. Download from Firebase Console > Project Settings > Service Accounts.');
  console.error('Place it in the project root as service-account-key.json');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function run() {
  const db = admin.firestore();
  const snapshot = await db.collection('users').get();
  let updated = 0;

  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    if (data.displayName) {
      console.log(`  SKIP ${docSnap.id}: already has displayName "${data.displayName}"`);
      continue;
    }
    if (!data.email) {
      console.log(`  SKIP ${docSnap.id}: no email to derive displayName from`);
      continue;
    }
    const derived = data.email.split('@')[0];
    await db.collection('users').doc(docSnap.id).set({ displayName: derived }, { merge: true });
    console.log(`  SET  ${docSnap.id}: displayName = "${derived}" (from email "${data.email}")`);
    updated++;
  }

  console.log(`\nDone. Updated ${updated} user(s).`);
  process.exit(0);
}

run().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
