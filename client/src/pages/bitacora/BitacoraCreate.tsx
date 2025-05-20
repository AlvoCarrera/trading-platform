/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import * as Yup from "yup";

const FormularioOperacion = () => {
  const formik = useFormik({
    initialValues: {
      fecha: "",
      par: "",
      tipo: "",
      entrada: "",
      stoploss: "",
      takeprofit: "",
      capital: "",
    },
    validationSchema: Yup.object({
      fecha: Yup.string().required("Campo requerido"),
      par: Yup.string().required("Campo requerido"),
      tipo: Yup.string().required("Campo requerido"),
      entrada: Yup.string().required("Campo requerido"),
      stoploss: Yup.string().required("Campo requerido"),
      takeprofit: Yup.string().required("Campo requerido"),
      capital: Yup.string().required("Campo requerido"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="form-bitacora">
      <div>
        <label htmlFor="fecha">FECHA</label>
        <input
          id="fecha"
          name="fecha"
          type="date"
          onChange={formik.handleChange}
          value={formik.values.fecha}
        />
        {formik.touched.fecha && formik.errors.fecha && (
          <div className="error">{formik.errors.fecha}</div>
        )}
      </div>

      <div>
        <label htmlFor="par">PAR</label>
        <input
          id="par"
          name="par"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.par}
        />
        {formik.touched.par && formik.errors.par && (
          <div className="error">{formik.errors.par}</div>
        )}
      </div>

      <div>
        <label htmlFor="tipo">TIPO</label>
        <input
          id="tipo"
          name="tipo"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.tipo}
        />
        {formik.touched.tipo && formik.errors.tipo && (
          <div className="error">{formik.errors.tipo}</div>
        )}
      </div>

      <div>
        <label htmlFor="entrada">ENTRADA</label>
        <input
          id="entrada"
          name="entrada"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.entrada}
        />
        {formik.touched.entrada && formik.errors.entrada && (
          <div className="error">{formik.errors.entrada}</div>
        )}
      </div>

      <div>
        <label htmlFor="stoploss">STOPLOSS</label>
        <input
          id="stoploss"
          name="stoploss"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.stoploss}
        />
        {formik.touched.stoploss && formik.errors.stoploss && (
          <div className="error">{formik.errors.stoploss}</div>
        )}
      </div>

      <div>
        <label htmlFor="takeprofit">TAKEPROFIT</label>
        <input
          id="takeprofit"
          name="takeprofit"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.takeprofit}
        />
        {formik.touched.takeprofit && formik.errors.takeprofit && (
          <div className="error">{formik.errors.takeprofit}</div>
        )}
      </div>

      <div>
        <label htmlFor="capital">CAPITAL</label>
        <input
          id="capital"
          name="capital"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.capital}
        />
        {formik.touched.capital && formik.errors.capital && (
          <div className="error">{formik.errors.capital}</div>
        )}
      </div>

      <button type="submit">Guardar Operación</button>
    </form>
  );
};

export default FormularioOperacion;
