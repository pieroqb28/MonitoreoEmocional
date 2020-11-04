<template>
<v-container fluid>
  <v-row><v-col>Tipo de depresión</v-col><v-col>Atención de especialistas</v-col></v-row>
  <v-row>
    <v-col><pie-chart :data="this.api_TipoDepresion"></pie-chart></v-col>
    <v-col><pie-chart :data="[['Gianmarco Chávez',50],['Alvin Gonzáles',37],['Piero Quiroz',24]]"></pie-chart></v-col>
  </v-row>
  <v-row><v-col></v-col></v-row><v-row><v-col></v-col></v-row><v-row><v-col>Alumnos depresivos por colegio</v-col></v-row>
  <v-row>
    <column-chart :data="[['Carmelitas', 32], ['Lord Byron', 46], ['Newton School', 28]]"></column-chart>
  </v-row>
  <v-row>
  <!--v-card
    class="mx-auto"
    color="grey lighten-4"
    max-width="600"
  >
    <v-card-title>
      <v-icon
        :color="checking ? 'red lighten-2' : 'light-blue '"
        class="mr-12"
        size="64"
        @click="takePulse"
      >
        mdi-emoticon-cry
      </v-icon>
      <v-row align="start">
        <div class="caption grey--text text-uppercase">
          Depresión general
        </div>
        <div>
          <span
            class="display-2 font-weight-black"
            v-text="avg || '—'"
          ></span>
         <strong v-if="avg">%-</strong>
        </div>
      </v-row>

      <v-spacer></v-spacer>

      <v-btn icon class="align-self-start" size="28">
        <v-icon>mdi-arrow-right-thick</v-icon>
      </v-btn>
    </v-card-title>

    <v-sheet color="transparent">
      <v-sparkline
        :key="String(avg)"
        :smooth="16"
        :gradient="['#00c6ff', '#F0F', '#FF0']"
        :line-width="3"
        :value="heartbeats"
        auto-draw
        stroke-linecap="round"
      ></v-sparkline>
    </v-sheet>
  </v-card>
  <v-card
    class="mx-auto"
    color="grey lighten-4"
    max-width="600"
  >
    <v-card-title>
      <v-icon
        :color="checking ? 'red lighten-2' : 'light-blue '"
        class="mr-12"
        size="64"
        @click="takePulse"
      >
        mdi-emoticon
      </v-icon>
      <v-row align="start">
        <div class="caption grey--text text-uppercase">
          Recuperados
        </div>
        <div>
          <span
            class="display-2 font-weight-black"
            v-text="avg || '—'"
          ></span>
          <strong v-if="avg">%+</strong>
        </div>
      </v-row>

      <v-spacer></v-spacer>

      <v-btn icon class="align-self-start" size="28">
        <v-icon>mdi-arrow-right-thick</v-icon>
      </v-btn>
    </v-card-title>

    <v-sheet color="transparent">
      <v-sparkline
        :key="String(avg)"
        :smooth="16"
        :gradient="['#00c6ff', '#F0F', '#FF0']"
        :line-width="3"
        :value="heartbeats"
        auto-draw
        stroke-linecap="round"
      ></v-sparkline>
    </v-sheet>
  </v-card>
   <v-card
    class="mx-auto"
    color="grey lighten-4"
    max-width="600"
  >
    <v-card-title>
      <v-icon
        :color="checking ? 'red lighten-2' : 'light-blue '"
        class="mr-12"
        size="64"
        @click="takePulse"
      >
        mdi-folder-alert
      </v-icon>
      <v-row align="start">
        <div class="caption grey--text text-uppercase">
          Solicitudes
        </div>
        <div>
          <span
            class="display-2 font-weight-black"
            v-text="avg || '—'"
          ></span>
          <strong v-if="avg">%-</strong>
        </div>
      </v-row>

      <v-spacer></v-spacer>

      <v-btn icon class="align-self-start" size="28">
        <v-icon>mdi-arrow-right-thick</v-icon>
      </v-btn>
    </v-card-title>

    <v-sheet color="transparent">
      <v-sparkline
        :key="String(avg)"
        :smooth="16"
        :gradient="['#00c6ff', '#F0F', '#FF0']"
        :line-width="3"
        :value="heartbeats"
        auto-draw
        stroke-linecap="round"
      ></v-sparkline>
    </v-sheet>
  </v-card-->
  </v-row>
</v-container>
</template>

<script>
import axios from "axios";

  export default {
    mounted() {
      this.getTipoDepresion() 
    },
    data: () => ({
      api_TipoDepresion: [],
    }),



    methods: {

     async getTipoDepresion() {
      try {
        const res = await axios.get(
          "https://sistemadepresivotesisupc.azurewebsites.net​/api/wDashboard/consulta/tipo/depresion"
        )
        let depres = res.data.map((a) => a.depresion);
        let nums = res.data.map((a) => a.cont);
        let aux = depres.map((Tipo_Depresion, i) => ({
          Tipo_Depresion,
          Cantidad_Alumnos: nums[i],
        }));
        //console.log(aux)
        this.api_TipoDepresion = (aux).map(Object.values)
        //console.log(this.api_TipoDepresion)
        //return datos
      } catch (e) {
        console.error(e);
      }
      
    },
      
    },
  }
</script>


