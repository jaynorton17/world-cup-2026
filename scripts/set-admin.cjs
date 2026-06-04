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

const [role, targetEmail] = process.argv.slice(2);

if (!role || !targetEmail) {
  console.error('Usage: node scripts/set-admin.js <admin|junior> <email>');
  console.error('');
  console.error('  admin  — sets { admin: true }  + Firestore role "admin"        (full access)');
  console.error('  junior — sets { juniorAdmin: true } + Firestore role "juniorAdmin" (host fee only)');
  console.error('');
  console.error('Examples:');
  console.error('  node scripts/set-admin.js admin admin@worldcupapp2026.com');
  console.error('  node scripts/set-admin.js junior jaynorton17@gmail.com');
  process.exit(1);
}

async function run() {
  const user = await admin.auth().getUserByEmail(targetEmail);

  if (role === 'admin') {
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    console.log(`✓ Custom claim { admin: true } set for ${targetEmail} (uid: ${user.uid})`);

    const db = admin.firestore();
    await db.collection('users').doc(user.uid).set({ role: 'admin' }, { merge: true });
    console.log(`✓ Firestore users/${user.uid}/role set to "admin"`);
  } else if (role === 'junior') {
    await admin.auth().setCustomUserClaims(user.uid, { juniorAdmin: true });
    console.log(`✓ Custom claim { juniorAdmin: true } set for ${targetEmail} (uid: ${user.uid})`);

    const db = admin.firestore();
    await db.collection('users').doc(user.uid).set({ role: 'juniorAdmin' }, { merge: true });
    console.log(`✓ Firestore users/${user.uid}/role set to "juniorAdmin"`);
  } else {
    console.error('Unknown role. Use "admin" or "junior".');
    process.exit(1);
  }

  const updated = await admin.auth().getUser(user.uid);
  console.log('✓ Confirmed custom claims:', JSON.stringify(updated.customClaims));
  process.exit(0);
}

run().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
