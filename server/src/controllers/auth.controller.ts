import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase';
import { getAuth } from 'firebase-admin/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password, displayName } = req.body;

    const { data: existingUser, error: existingUserError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (existingUserError) throw existingUserError;

    if (existingUser)
      return res.status(409).json({ message: 'Este correo ya está registrado.' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const { error } = await supabase.from('users').insert({
      email,
      password: hashedPassword,
      display_name: displayName,
      auth_provider: 'local'
    });

    if (error) throw error;

    return res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (err: any) {
    console.error('[Register Error]', err.message);
    return res.status(500).json({ message: 'Error interno en el registro' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('auth_provider', 'local')
      .maybeSingle();

    if (error) throw error;

    if (!user)
      return res.status(404).json({ message: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h'
    });

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.display_name
      }
    });
  } catch (err: any) {
    console.error('[Login Error]', err.message);
    return res.status(500).json({ message: 'Error interno en el login' });
  }
};

export const loginWithGoogle = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { idToken } = req.body;
    const decodedToken = await getAuth().verifyIdToken(idToken);
    const { uid, email, name } = decodedToken;

    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('auth_provider', 'google')
      .maybeSingle();

    let user = existingUser;

    if (!user) {
      const { data, error } = await supabase.from('users').insert({
        email,
        display_name: name || email,
        password: null,
        auth_provider: 'google'
      }).select().single();

      if (error) throw error;
      user = data;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h'
    });

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.display_name
      }
    });
  } catch (err) {
    console.error('[Google Login Error]', err);
    return res.status(401).json({ message: 'Token inválido o error de autenticación' });
  }
};