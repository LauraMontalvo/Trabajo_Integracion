import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Carousel, ListGroup } from 'react-bootstrap';
import { Doughnut, Bar } from 'react-chartjs-2';
import { FaUsers, FaBuilding, FaHandshake, FaTimesCircle, FaHourglassHalf } from 'react-icons/fa';
import 'moment/locale/es'; // Importar el locale español
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import '../../../Styles/moduloReportes.scss';
import TabsAdministracionComp from '../../../Components/Administracion/TabsAdministracionComp';

// Registro de componentes para Chart.js v3
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function ModuloReportes() {
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [usuariosAceptados, setUsuariosAceptados] = useState(0);
  const [usuariosRechazados, setUsuariosRechazados] = useState(0);
  const [usuariosEspera, setUsuariosEspera] = useState(0);
  const [totalEmpresas, setTotalEmpresas] = useState(0);
  const [datosPorEmpresa, setDatosPorEmpresa] = useState([]);
  const [datosDisponibles, setDatosDisponibles] = useState(false);
  const [barData, setBarData] = useState({ datasets: [] });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentCompanies, setRecentCompanies] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [motivosRechazo, setMotivosRechazo] = useState({}); // Estado para almacenar los conteos de los motivos de rechazo

  useEffect(() => {
    axios.get('https://46wm6186-8000.use.devtunnels.ms/api/jobs')
      .then(response => {
        // Supongamos que response.data contiene las ofertas de empleo
        const jobs = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
        setRecentJobs(jobs);
      })
      .catch(error => console.error('Error al obtener trabajos:', error));
    // Obtener usuarios
    axios.get('https://46wm6186-8000.use.devtunnels.ms/api/users')
      .then(response => {
        const filteredUsers = response.data.filter(user => user.estado === 'Activo' && user.rol !== 'Administrador');

        const latestUsers = filteredUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
        setRecentUsers(latestUsers);

        setTotalUsuarios(filteredUsers.length);
        // Aquí puedes calcular y actualizar los usuarios aceptados, rechazados, etc.
      })
      .catch(error => console.error('Error al obtener usuarios:', error));



    // Obtener empresas
    axios.get('https://46wm6186-8000.use.devtunnels.ms/api/companies')
      .then(response => {
        const latestCompanies = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
        setRecentCompanies(latestCompanies);
        setTotalEmpresas(response.data.length);
      })
      .catch(error => console.error('Error al obtener empresas:', error));

    // Obtener postulaciones
    axios.get('https://46wm6186-8000.use.devtunnels.ms/api/postulations')
      .then(response => {
        const postulaciones = response.data;

        // Crear Sets para almacenar IDs de usuarios únicos
        const idsUsuariosAceptados = new Set();
        const idsUsuariosRechazados = new Set();
        const idsUsuariosEnEspera = new Set();

        postulaciones.forEach(postulacion => {
          if (postulacion.estado === 'Aceptada') {
            idsUsuariosAceptados.add(postulacion.idUsuario);
          } else if (postulacion.estado === 'Negada') {
            idsUsuariosRechazados.add(postulacion.idUsuario);
          } else if (postulacion.estado === 'En Espera') {
            idsUsuariosEnEspera.add(postulacion.idUsuario);
          }
        });
        const conteoMotivos = {};

        response.data.forEach(postulacion => {
          if (postulacion.estado === 'Negada' && postulacion.motivoRechazo) {
            conteoMotivos[postulacion.motivoRechazo] = (conteoMotivos[postulacion.motivoRechazo] || 0) + 1;
          }
        });

        setMotivosRechazo(conteoMotivos);
        // Actualizar los estados con la cantidad de usuarios únicos
        setUsuariosAceptados(idsUsuariosAceptados.size);
        setUsuariosRechazados(idsUsuariosRechazados.size);
        setUsuariosEspera(idsUsuariosEnEspera.size);
      })
      .catch(error => {
        console.error('Error al obtener postulaciones:', error);
        setDatosDisponibles(false);
      });

    // ... aquí irían otras llamadas a API o lógicas adicionales si las tienes

  }, [datosPorEmpresa]); // Dependencias de useEffect

  const dataMotivosRechazo = {
    labels: Object.keys(motivosRechazo),
    datasets: [
      {
        label: 'Motivos de Rechazo',
        data: Object.values(motivosRechazo),
        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#4bc0c0'],
        hoverBackgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#4bc0c0']
      },
    ],
  };

  // Preparar los datos para la gráfica de dona
  const doughnutData = {
    labels: ['Aceptados', 'Rechazados', 'En Espera'],
    datasets: [
      {
        label: 'Estado de los Usuarios',
        data: [usuariosAceptados, usuariosRechazados, usuariosEspera],
        backgroundColor: ['#4caf50', '#f44336', '#ff9800'],
        hoverBackgroundColor: ['#388e3c', '#d32f2f', '#f57c00'],
      },
    ],
  };
  // Suponiendo que ya tienes `motivosRechazo` actualizado con los conteos por motivo
  const totalRechazos = Object.values(motivosRechazo).reduce((acc, curr) => acc + curr, 0);

  // Calcular porcentajes por motivo
  const porcentajesPorMotivo = {};
  for (const motivo in motivosRechazo) {
    porcentajesPorMotivo[motivo] = ((motivosRechazo[motivo] / totalRechazos) * 100).toFixed(2);
  }

  // Asumiendo que tienes un objeto `motivosRechazo` con los conteos
  const motivosLabels = ['Fuera de rango de edad', 'Formación académica', 'Plaza ya no disponible', 'Información incompleta', 'Otro'];
  const motivosColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40'];

  // Convertir cada motivo de rechazo en su propio conjunto de datos
  const datasets = motivosLabels.map((motivo, index) => ({
    label: motivo, // El motivo se convierte en el nombre del conjunto de datos
    data: [motivosRechazo[motivo] || 0], // Asegúrate de que esto es un array con un solo elemento
    backgroundColor: motivosColors[index],
    borderColor: motivosColors[index],
    borderWidth: 1,
  }));

  const barChartData = {
    labels: ['Motivos de Rechazo'], // Un único label general para el eje X
    datasets: datasets,
  };

  const barChartOptions = {
   
    responsive: true, // Esto hace que el gráfico sea responsivo en anchura
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };



  // Datos para la gráfica de barras (Puedes personalizar esta parte)


  // Datos para el carrusel
  const data = [
    { title: 'Total de Usuarios', value: totalUsuarios, icon: <FaUsers size={50} /> },
    { title: 'Usuarios Aceptados', value: usuariosAceptados, icon: <FaHandshake size={50} /> },
    { title: 'Usuarios Rechazados', value: usuariosRechazados, icon: <FaTimesCircle size={50} /> },
    { title: 'Usuarios en Espera', value: usuariosEspera, icon: <FaHourglassHalf size={50} /> },
    { title: 'Total de Empresas', value: totalEmpresas, icon: <FaBuilding size={50} /> }, // Nuevo elemento para mostrar el total de empresas
  ];


  const doughnutOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 14,
            family: 'Century Gothic',
          }
        }
      }
    }
  };



  const SummaryCard = ({ title, value, Icon }) => (
    <Card className="text-center mb-3">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Icon size={50} className="mb-2" />
        <Card.Text className="dashboard-value">{value}</Card.Text>
      </Card.Body>
    </Card>
  );


  const ListGroupSection = ({ title, items }) => (
    <div className="list-group-section">
      <h4 className="list-group-title">{title}</h4>
      <ListGroup className="mb-10">
        {items.map((item, index) => (
          <ListGroup.Item key={index} className="list-group-item">
            {item.text}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>

  );


  // Simula la obtención de actividades de empresas que publicaron nuevas ofertas de empleo
  const moment = require('moment');
  moment.locale('es'); // Configura el idioma a español

  function formatRelativeDate(date) {
    return moment(date).fromNow();
  }

  const companyActivities = recentJobs.map(job => ({

    text: `La empresa ${job.idEmpresa.nombreEmpresa} ha publicado una nueva oferta de empleo para ${job.puesto}.   Publicado ${formatRelativeDate(job.fechaPublicacion)}`,
    id: job._id

  }));

  return (
    <div className='App'>
      <TabsAdministracionComp />
      <Container fluid className="mt-4">
        {/* Carrusel con tarjetas */}
        <Row className="justify-content-center mb-4">
          <Col lg={8}>
            <Carousel interval={5000} pause="hover">
              {data.map((item, index) => (
                <Carousel.Item key={index}>
                  <Card className="text-center dashboard-card">
                    <Card.Body>
                      <div className="dashboard-icon">{item.icon}</div>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text className="dashboard-value">
                        {item.value}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>

        {/* Secciones */}
        <Row className="justify-content-center mb-4">
          <Col md={12} className="section-title">
            <h2>Resumen de Usuarios</h2>
          </Col>
          <Col md={3}>
            <SummaryCard title="Total de Usuarios" value={totalUsuarios} Icon={FaUsers} />
          </Col>
          <Col md={3}>
            <SummaryCard title="Usuarios Aceptados" value={usuariosAceptados} Icon={FaHandshake} />
          </Col>
          <Col md={3}>
            <SummaryCard title="Usuarios Rechazados" value={usuariosRechazados} Icon={FaTimesCircle} />
          </Col>
          <Col md={3}>
            <SummaryCard title="Usuarios en Espera" value={usuariosEspera} Icon={FaHourglassHalf} />
          </Col>
        </Row>

        {/* Gráficos */}
        <Row className="justify-content-center mb-4">
          <Col xs={12} md={6}>
            <h2>Estadísticas de Postulaciones</h2>
            <Card >
              <Card.Body >
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card>
              <Card.Body>
                <h2>Estadísticas de Motivos de Rechazo</h2>
                <Bar data={barChartData} options={barChartOptions} />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Notificaciones */}
        <Row className="justify-content-center mb-4">
        <Col xs={12}> {/* Esto asegurará que la columna ocupe todo el ancho en todos los tamaños de pantalla */}
          <ListGroupSection title="Actividades Recientes" items={companyActivities} />
        </Col>
      </Row>
      </Container>
    </div>

  );
}

export default ModuloReportes;