/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import type { MouseEvent } from "react";

const Login = () => {
  const { login, loginWithGoogle } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Correo inválido").required("Requerido"),
      password: Yup.string()
        .min(6, "Mínimo 6 caracteres")
        .required("Requerido"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await login(values.email, values.password);
      } catch (err: any) {
        setErrors({ email: "Credenciales incorrectas" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleGoogleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error("Error al iniciar sesión con Google:", err);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={formik.handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>

        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Cargando..." : "Entrar"}
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="google-btn"
        >
          Iniciar sesión con Google
        </button>
      </form>
    </div>
  );
};

export default Login;
