// src/pages/Dashboard.tsx
import { useMenu } from "../context/MenuContext";

const Dashboard = () => {
  const { collapsed } = useMenu();

  return (
    <div className={`main-content ${collapsed ? "collapsed" : ""}`}>
      <main className="dashboard-main">
        <section className="dashboard-intro">
          <h1>Bienvenido a tu Plataforma de Trading</h1>
          <p>
            Este es tu espacio personal para crecer como trader profesional.
            Aquí podrás:
          </p>
          <ul>
            <li>
              🧾 Registrar tus operaciones y emociones en tu{" "}
              <strong>Bitácora</strong>
            </li>
            <li>
              🎥 Aprender con nuestros <strong>Cursos interactivos</strong>
            </li>
            <li>
              📊 Visualizar el mercado y estar informado con{" "}
              <strong>Noticias y Gráficos</strong>
            </li>
            <li>
              👥 Formar parte de una <strong>Comunidad de traders</strong> con
              visión
            </li>
          </ul>
          <p className="start-msg">
            ¡Comienza ahora explorando cada sección en el menú lateral!
          </p>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
