/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";
import type { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import googleLogo from "../assets/logo-google.svg";
import tradingLogo from "../assets/trading-logo.png"; // 👈 Importamos la imagen

const Login = () => {
  const { login, loginWithGoogle } = useAuth();
  const { setLoading } = useLoading();
  const navigate = useNavigate();

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
        setLoading(true);
        await login(values.email, values.password);
      } catch (err: any) {
        setErrors({ email: "Credenciales incorrectas" });
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const handleGoogleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await loginWithGoogle();
    } catch (err) {
      console.error("Error al iniciar sesión con Google:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-login">
      <div className="logo-container">
        <img src={tradingLogo} alt="Trading Cat" />
      </div>
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
            <img
              src={googleLogo}
              alt="Google"
              style={{ width: "20px", marginRight: "8px" }}
            />
            Iniciar sesión con Google
          </button>

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="register-btn"
          >
            ¿No tienes cuenta? Regístrate
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
