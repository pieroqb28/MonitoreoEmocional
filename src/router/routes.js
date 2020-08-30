import Analisis from '@/views/Analisis.vue'
import ConsultaEstudiantes from '@/views/ConsultaEstudiantes.vue'
import DatosEstudiante from '@/views/DatosEstudiante.vue'


export default [
  { path: '/', name: 'analisis', component: Analisis },
  { path: '/estudiantes', name: 'ConsultaEstudiantes', component: ConsultaEstudiantes },
  { path: '/estudiantes-id', name: 'DatosEstudiante', component: DatosEstudiante }
]
