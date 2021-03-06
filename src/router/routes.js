import Analisis from "@/views/Analisis.vue";
import ListaPacientes from "@/views/ConsultaPacientes.vue";
import DashboardPaciente from "@/views/DashboardPaciente.vue";
import ConsultaEstudiantes from "@/views/ConsultaEstudiantes.vue";
import ConsultaEvaluaciones from "@/views/ConsultaEvaluaciones.vue";
import ConsultaCitas from "@/views/ConsultaCitas.vue";
import CrearCita from "@/views/CrearCita.vue";
import CrearEvaluacion from "@/views/CrearEvaluacion.vue";
import CrearSeccion from "@/views/CrearSeccion.vue";
import CrearActividad from "@/views/CrearActividad.vue";
import AsignarSeccion from "@/views/AsignarSeccion.vue";
import AsignarPaciente from "@/views/AsignarPaciente.vue";
import ConsultaSolicitudes from "@/views/ConsultaSolicitudes.vue";
import ConsultaDiagnosticos from "@/views/ConsultaDiagnosticos.vue";
import DatosEstudiante from "@/views/DatosEstudiante.vue";
import Login from "@/views/Login.vue";
import Perfil from "@/views/Perfil.vue";
import Registro from "@/views/Registro.vue";
import Calendario from "@/views/Calendario.vue";
import BIDiagram from "@/views/BIDiagram.vue";

/*
 * allowAnonymous: puede verse sin un token
 * onlyAnonymous: solo puede verse sin token
 */

export default [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      allowAnonymous: true,
      onlyAnonymous: true,
    },
  },
  {
    path: "/analisis",
    name: "Analisis",
    component: Analisis,
  },
  {
    path: "/estudiantes",
    name: "ConsultaEstudiantes",
    component: ConsultaEstudiantes,
  },
  {
    path: "/evaluaciones",
    name: "ConsultaEvaluaciones",
    component: ConsultaEvaluaciones,
  },
  { path: "/crear_evaluacion", name: "CrearEvaluacion", component: CrearEvaluacion },
  { path: "/crear_seccion", name: "CrearSeccion", component: CrearSeccion },
  { path: "/crear_actividad", name: "CrearActividad", component: CrearActividad },
  { path: "/asignar_seccion", name: "AsignarSeccion", component: AsignarSeccion },
  {
    path: "/solicitudes",
    name: "ConsultaSolicitudes",
    component: ConsultaSolicitudes,
  },
  {
    path: "/diagnosticos",
    name: "ConsultaDiagnosticos",
    component: ConsultaDiagnosticos,
  },
  {
    path: "/pacientes",
    name: "ListaPacientes",
    component: ListaPacientes,
  },
  {
    path: "/paciente_detalle",
    name: "DashboardPaciente",
    component: DashboardPaciente,
  },
  {
    path: "/paciente_asignar",
    name: "AsignarPaciente",
    component: AsignarPaciente,
  },
  {
    path: "/calendario_citas",
    name: "Calendario de citas",
    component: Calendario,
  },
  { path: "/citas", 
    name: "ConsultaCitas", 
    component: ConsultaCitas },

  { path: "/crear_cita", name: "CrearCita", component: CrearCita },
  {
    path: "/estudiantes-id",
    name: "DatosEstudiante",
    component: DatosEstudiante,
  },
  {
    path: "/bi-diagram",
    name: "BIDiagram",
    component: BIDiagram,
  },
  { path: "/perfil", name: "Perfil", component: Perfil },
  {
    path: "/registro",
    name: "Registro",
    component: Registro,
    meta: {
      allowAnonymous: true,
      onlyAnonymous: true,
    },
  },
];
