/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import Button from "../components/ui/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      displayName: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Correo inválido").required("Requerido"),
      password: Yup.string()
        .min(6, "Mínimo 6 caracteres")
        .required("Requerido"),
      displayName: Yup.string().required("Requerido"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await axios.post("http://localhost:4000/api/auth/register", values);
        navigate("/login");
      } catch (err: any) {
        setErrors({ email: "Ya existe una cuenta con este correo" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="login-container">
      <div className="back-button-wrapper">
        <button className="back-button" onClick={() => navigate("/login")}>
          <ArrowLeft size={20} />
        </button>
      </div>
      <h2>Registrarse</h2>
      <form onSubmit={formik.handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="displayName">Nombre</label>
          <input
            id="displayName"
            name="displayName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.displayName}
            onBlur={formik.handleBlur}
          />
          {formik.touched.displayName && formik.errors.displayName ? (
            <div className="error">{formik.errors.displayName}</div>
          ) : null}
        </div>

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

        <Button type="submit" variant="primary" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Registrando..." : "Crear cuenta"}
        </Button>
      </form>
    </div>
  );
};

export default Register;
