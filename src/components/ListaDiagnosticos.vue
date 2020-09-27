<template>
  <v-container>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="scale-transition"
      >
        <v-card>
          <v-toolbar dark color="light-blue">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-toolbar-title>Diagnóstico</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text @click="dialog = false">Volver</v-btn>
            </v-toolbar-items> </v-toolbar
          ><v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col>
                  <v-row
                    ><v-col>
                      <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        label="Nombres"
                        readonly
                        required
                      ></v-text-field></v-col
                    ><v-col>
                      <v-text-field
                        v-model="apellido"
                        :rules="nameRules"
                        label="Apellidos"
                        readonly
                        required
                      ></v-text-field
                    ></v-col>
                  </v-row>
                </v-col>

                <v-col
                  ><v-row
                    ><v-col>
                      <v-text-field
                        v-model="DNI"
                        :rules="DNIRules"
                        label="Tutor"
                        required
                      ></v-text-field></v-col
                  ></v-row>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-text-field
                    v-model="celular"
                    :rules="celularRules"
                    label="Institución"
                    readonly
                    required
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="correo"
                    :rules="nameRules"
                    label="Sección"
                    readonly
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-text-field
                    v-model="celular"
                    :rules="celularRules"
                    label="Fecha Cita"
                    readonly
                    required
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="correo"
                    :rules="nameRules"
                    label="Tipo Cita"
                    readonly
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-text-field
                    v-model="celular"
                    :rules="celularRules"
                    label="Evaluación"
                    readonly
                    required
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="correo"
                    :rules="nameRules"
                    label="Tipo Depresión"
                    readonly
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <!--v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox-->
              <v-row
                ><v-col>
                  <v-textarea
                    v-model="descripcion"
                    filled
                    label="Descripción del tutor"
                    rows="3"
                    no-resize
                  ></v-textarea> </v-col
              ></v-row>

              <v-row
                ><v-col>
                  <v-textarea
                    v-model="descripcion"
                    filled
                    label="Diagnóstico"
                    rows="5"
                    no-resize
                  ></v-textarea> </v-col
              ></v-row>

              <v-row>
                <v-spacer></v-spacer>

                <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="dialog = false"
                >
                  Guardar
                </v-btn>
              </v-row>
            </v-form></v-container
          >
        </v-card>
      </v-dialog>
    </v-row>
    <v-row><h4>Filtros</h4></v-row>
    <!--v-row>
      <v-col cols="6">
        <v-combobox
          v-model="select"
          :items="coles"
          label="Institución educativa"        
        ></v-combobox>
      </v-col>
      <v-col cols="6">
        <v-combobox
          v-model="select2"
          :items="secciones"
          label="Sección"         
        ></v-combobox>
      </v-col>
    </v-row-->
    <v-row>
      <v-col>
        <v-menu
          v-model="menuIni"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="190px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateIni"
              label="Fecha de Inicio"
              prepend-icon="mdi-calendar-month"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="dateIni"
            @input="menuIni = false"
            locale="es"
            color="light-blue"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col>
        <v-menu
          v-model="menuFin"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="190px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateFin"
              label="Fecha de fin"
              prepend-icon="mdi-calendar-month"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="dateFin"
            @input="menuFin = false"
            locale="es"
            color="light-blue"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-data-table
        :headers="headers"
        :items="api_diagnosticos"
        item-key="codigo"
        :search="search"
        calculate-widths
        class="elevation-6"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Lista de Diagnosticos</v-toolbar-title>
            <v-spacer></v-spacer> <v-spacer></v-spacer> <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Búsqueda"
              single-line
              hide-details
            ></v-text-field>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-plus-thick
          </v-icon>
        </template>
        <!--template #expanded-item="{headers,item}">
      <td :colspan="headers.length"
      style="padding:0;">
    <v-list two-line>
      <v-row>
      <v-col>
       <v-list-item >

        <v-list-item-content>
          <v-list-item-title>{{item.solicitud}}</v-list-item-title>        
        </v-list-item-content>

      </v-list-item>
      </v-col>
      </v-row>
      <v-row >
        <v-col>
        <v-list-item >
        <v-list-item-content class="justify-center">
          <v-btn color="indigo accent-1" >Crear Cita</v-btn>
        </v-list-item-content>
      </v-list-item>
      </v-col>
        <v-col>
        <v-list-item >
        <v-list-item-content class="justify-center">
          <v-btn color="light-blue accent-1" >Crear Evaluación</v-btn>
        </v-list-item-content>
      </v-list-item>
      </v-col>
      </v-row>

    </v-list>   
      </td>
    </template-->
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  async mounted() {
    {
      try {
        const res = await axios.get(
          "https://sistemadepresivotesisupc.azurewebsites.net/api/wConsultaDiagnostico/consulta/diagnostico",
          {
            //crossDomain: true,
            params: {
              idEspecialista: localStorage.userID,
            },
          }
        );
        this.api_diagnosticos = res.data;
        console.log(res);
      } catch (e) {
        console.error(e);
      }
    }
  },
  data: () => ({
    name: "",
    dialog: false,
    headers: [
      {
        text: "Fecha",
        align: "left",
        value: "fechaDiagnostico",
        width: "200px",
      },
      {
        text: "Estudiante",
        align: "left",
        value: "nombreEstudiante",
        width: "230px",
      },
      {
        text: "DNI",
        align: "left",
        value: "dniEstudiante",
        width: "150px",
      },
      { text: "Colegio", value: "nombrecolegio", width: "230px", align: "left" },
      {
        text: "Descripción",
        value: "descripcion",
        width: "230px",
        align: "left",
      },
      { text: "", value: "actions", sortable: false },
    ],
    dateIni: new Date().toISOString().substr(0, 10),
    dateFin: new Date().toISOString().substr(0, 10),
    menuIni: false,
    menuFin: false,
    search: "",
    api_diagnosticos: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      estado: 0,
      edad: 0,
    },
    defaultItem: {
      name: "",
      estado: 0,
      edad: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.api_diagnosticos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.name = item.name;

      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.api_diagnosticos.indexOf(item);
      this.api_diagnosticos.splice(index, 1);
      this.api_diagnosticos.push(item);
      var win = window.open("http://localhost:8080/#/estudiantes-id");
      win.focus();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.api_diagnosticos[this.editedIndex], this.editedItem);
      } else {
        this.api_diagnosticos.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
