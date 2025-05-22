import jwt from 'jsonwebtoken';
import { admin } from '../config/firebaseAdmin';

export const verifyToken = async (token: string): Promise<string> => {
  // 🔐 Opción 1: Intentar verificar con JWT local
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    return decoded.id; // login local
  } catch (err) {
    // Opción 2: Intentar verificar con Firebase Admin (Google Login)
    try {
      const decoded = await admin.auth().verifyIdToken(token);
      return decoded.uid; // login con Google
    } catch (firebaseErr) {
      throw new Error('Invalid or expired token');
    }
  }
};