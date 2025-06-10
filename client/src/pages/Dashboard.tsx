import { useMenu } from "../context/MenuContext";
import { NotebookPen, PlayCircle, BarChart3, Users } from "lucide-react";

const Dashboard = () => {
  const { collapsed } = useMenu();

  return (
    <div className={`main-content ${collapsed ? "collapsed" : ""}`}>
      <main className="dashboard-container">
        <section className="dashboard-welcome">
          <h1>
            <span className="dashboard-title-icon">
              Bienvenido a tu Plataforma de Trading
            </span>
          </h1>

          <div className="dashboard-content">
            <p>
              Este es tu espacio personal para crecer como trader profesional.
              Aquí podrás:
            </p>
            <ul>
              <li>
                <span className="dashboard-list-item">
                  <NotebookPen size={18} color="#00d6a7" />
                  Registrar tus operaciones y emociones en tu{" "}
                  <strong>Bitácora</strong>
                </span>
              </li>
              <li>
                <span className="dashboard-list-item">
                  <PlayCircle size={18} color="#00d6a7" />
                  Aprender con nuestros <strong>Cursos interactivos</strong>
                </span>
              </li>
              <li>
                <span className="dashboard-list-item">
                  <BarChart3 size={18} color="#00d6a7" />
                  Visualizar el mercado y estar informado con{" "}
                  <strong>Noticias y Gráficos</strong>
                </span>
              </li>
              <li>
                <span className="dashboard-list-item">
                  <Users size={18} color="#00d6a7" />
                  Formar parte de una <strong>Comunidad de traders</strong> con
                  visión
                </span>
              </li>
            </ul>
            <p className="start-msg">
              ¡Comienza ahora explorando cada sección en el menú lateral!
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
