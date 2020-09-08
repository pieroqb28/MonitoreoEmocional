import Analisis from '@/views/Analisis.vue'
import ConsultaEstudiantes from '@/views/ConsultaEstudiantes.vue'
import ConsultaEvaluaciones from '@/views/ConsultaEvaluaciones.vue'
import ConsultaCitas from '@/views/ConsultaCitas.vue'
import ConsultaSolicitudes from '@/views/ConsultaSolicitudes.vue'
import DatosEstudiante from '@/views/DatosEstudiante.vue'
import Login from '@/views/Login.vue'
import Perfil from '@/views/Perfil.vue'
import Registro from '@/views/Registro.vue'

export default [
  { path: '/', name: 'Login', component: Login},
  { path: '/analisis', name: 'Analisis', component: Analisis },
  { path: '/estudiantes', name: 'ConsultaEstudiantes', component: ConsultaEstudiantes },
  { path: '/evaluaciones', name: 'ConsultaEvaluaciones', component: ConsultaEvaluaciones },
  { path: '/solicitudes', name: 'ConsultaSolicitudes', component: ConsultaSolicitudes },
  { path: '/citas', name: 'ConsultaCitas', component: ConsultaCitas },
  { path: '/estudiantes-id', name: 'DatosEstudiante', component: DatosEstudiante },
  { path: '/perfil', name: 'Perfil', component: Perfil},
  { path: '/registro', name: 'Registro', component: Registro}
]
