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
            :headers="headers"
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
            :headers="headers"
            :items="api_evaluaciones"
            item-key="fecha"
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
                  <v-row>
                    <v-col>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon color="light-blue">mdi-calendar-month</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                          <v-list-item-subtitle
                            >Fecha de evaluación</v-list-item-subtitle
                          >
                          <v-list-item-title>{{
                            item.fecha
                          }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider inset></v-divider>
                    </v-col>
                    <v-col>
                      <template v-if="rol !== 'TUTOR'">
                        <v-list-item>
                          <v-list-item-icon>
                            <v-icon color="light-blue"
                              >mdi-account-child</v-icon
                            >
                          </v-list-item-icon>
                          <v-list-item-content>
                            <v-list-item-subtitle>Tutor</v-list-item-subtitle>
                            <v-list-item-title>{{
                              item.nombreTutor
                            }}</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                      <template v-else>
                        <v-list-item>
                          <v-list-item-icon>
                            <v-icon color="light-blue">mdi-comment</v-icon>
                          </v-list-item-icon>
                          <v-list-item-content>
                            <v-list-item-subtitle
                              >Comentario</v-list-item-subtitle
                            >
                            <v-list-item-title>{{
                              item.comentario
                            }}</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                      <v-divider inset></v-divider>
                      <template v-if="rol !== 'TUTOR'">
                        <v-list-item>
                          <v-list-item-icon>
                            <v-icon color="light-blue">mdi-numeric</v-icon>
                          </v-list-item-icon>

                          <v-list-item-content>
                            <v-list-item-subtitle>Puntaje</v-list-item-subtitle>
                            <v-list-item-title>{{
                              item.puntaje
                            }}</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider inset></v-divider>
                      </template>
                    </v-col>
                  </v-row>
                  <v-row
                    ><v-col>
                      <v-list-item>
                        <v-list-item-content class="justify-center">
                          <v-btn
                            color="indigo accent-1"
                            @click="
                              goToCrearCita(
                                item.dniEstudiante,
                                item.idEvaluacion
                              )
                            "
                            >Crear Cita</v-btn
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
    </v-tabs-items>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      tab: null,
    };
  },
};
</script>
<style scoped>
.table-container {
  width: 90%;
  margin: 0 auto;
}
</style>