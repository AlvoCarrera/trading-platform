import * as admin from 'firebase-admin';
import { initializeApp, cert } from 'firebase-admin/app';
import * as path from 'path';
import * as fs from 'fs';

const serviceAccountPath = path.resolve(__dirname, 'firebase-service-account.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

if (!admin.apps.length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

export { admin };