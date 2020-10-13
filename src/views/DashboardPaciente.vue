<template>
  <v-card class="table-container">
    <v-tabs v-model="tab" fixed-tabs background-color="#03a9f4 " dark>
      <v-tab :key="appointments"> Citas </v-tab>
      <v-tab :key="evaluations"> Evaluaciones </v-tab>
      <v-tab :key="diagnostics"> Diagnosticos </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item :key="appointments">
        <v-card flat>
          <v-data-table
            :headers="cita_headers"
            :items="api_citas"
            item-key="idCita"
            no-results-text="Búsqueda sin coincidencias"
            no-data-text="No hay citas disponibles"
            :search="search"
            calculate-widths
            show-expand
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Búsqueda"
                  single-line
                  hide-details
                ></v-text-field>
              </v-toolbar>
            </template>
            <template #expanded-item="{ headers, item }">
              <td :colspan="headers.length" style="padding: 0">
                <v-list two-line>
                  <v-row
                    ><v-col>
                      <v-list-item>
                        <v-list-item-content class="justify-center">
                          <v-btn
                            color="indigo accent-1"
                            @click="showCreateDiagDialog(item)"
                            >Crear Diagnostico</v-btn
                          >
                        </v-list-item-content>
                      </v-list-item>
                    </v-col></v-row
                  >
                </v-list>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>
      <v-tab-item :key="evaluations">
        <v-card flat>
          <v-data-table
            :headers="eva_headers"
            :items="info_evaluaciones"
            item-key="fecha"
            :search="search"
            calculate-widths
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Búsqueda"
                  single-line
                  hide-details
                ></v-text-field>
              </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon class="mr-2" @click="showAnswers(item)">
                mdi-play
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>
      <v-tab-item :key="diagnostics">
        <v-card flat>
          <v-data-table
            :headers="headers"
            :items="api_diagnosticos"
            item-key="codigo"
            :search="search"
            calculate-widths
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Búsqueda"
                  single-line
                  hide-details
                ></v-text-field>
              </v-toolbar>
            </template>
            <template>
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-plus-thick
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>
      <v-dialog v-model="dialogRespuestas" max-width="500px">
        <v-card>
          <v-card-title class="headline"
            >Respuestas</v-card-title
          >
           <v-data-table
            :headers="respuestas_headers"
            :items="respuestas"
            item-key="resp"
            calculate-widths
          ></v-data-table>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogRespuestas = false"
              >Cerrar</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-tabs-items>
  </v-card>
</template>
<script>
import axios from "axios";
export default {
  mounted() {
    this.getEvaluaciones();
    this.getCitas();
  },
  data() {
    return {
      tab: null,
      dni: this.$route.query.dni || "",
      api_evaluaciones: [],
      api_citas: [],
      info_evaluaciones: [],
      respuestas: [],
      dialogRespuestas: false,
      respuestas_headers: [
        { text: "Pregunta", value: "nombrePregunta", align: "left" },
        { text: "Respuesta", value: "nombreAlternativa", align: "left" },
        { text: "Puntaje", value:"puntaje"},
      ],
      cita_headers: [
        { text: "Fecha", value: "fechaDiagnostico", align: "left" },
        { text: "Descripción", value: "descriDiag", align: "left" },
        { text: "Tipo depresión", value: "tipodepresion", align: "left" },
        { text: "Comentario", value:"comentario"},
      ],
      eva_headers: [
        { text: "Nombre", value: "nombre", align: "left" },
        { text: "Nro. Telef.", value: "celular", align: "left" },
        { text: "Estado depresivo", value: "estadoDepresivo", align: "left" },
        { text: "Puntaje", value: "puntaje", align: "left" },
        { text: "Estado", value: "estado", align: "left" },
        {
          text: "Ver respuestas",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
    };
  },
  methods: {
    showAnswers(infoEvaluacion) {
      this.respuestas = this.api_evaluaciones.find(
        (x) => x.infoEvaluacion.idEvaluacion === infoEvaluacion.idEvaluacion
      ).preguntas;
      this.dialogRespuestas = true;
    },
    async getEvaluaciones() {
      try {
        const res = await axios.get(
          "https://sistemadepresivotesisupc.azurewebsites.net/api/wConsultaHistorialClinia/consulta/historial/evlauaciones",
          {
            //crossDomain: true,
            params: {
              idAuEstudiante: this.dni,
            },
          }
        );
        this.api_evaluaciones = res.data;
        this.info_evaluaciones = this.api_evaluaciones.map(
          (x) => x.infoEvaluacion
        );
        console.log(this.info_evaluaciones);
        console.log(this.api_evaluaciones);
      } catch (e) {
        console.error(e);
      }
    },
    async getCitas() {
      try {
        const res = await axios.get(
          "https://sistemadepresivotesisupc.azurewebsites.net/api/wConsultaHistorialClinia/consulta/citas/estudiante",
          {
            //crossDomain: true,
            params: {
              dniEstudiante: this.dni,
            },
          }
        );
        this.api_citas = res.data;
        console.log(this.api_citas);
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
<style scoped>
.table-container {
  width: 90%;
  margin: 0 auto;
}
</style>