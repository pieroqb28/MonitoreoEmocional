<template>
<v-container fluid>
  <v-row class="justify-center">
                <v-btn
                  color="light-blue accent-1"
                  class="mr-4"
                  @click="sendMail()"
                >
                  Mail
                </v-btn></v-row
              >
  <v-row><v-col>Total de alumnos</v-col><v-col>Atención de especialistas</v-col></v-row>
  <v-row>
    <v-col><pie-chart :data="[['Saludables',180],['Depresivos',120]]"></pie-chart></v-col>
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

  const exhale = ms =>
    new Promise(resolve => setTimeout(resolve, ms))

  export default {

    data: () => ({
      checking: false,
      heartbeats: [],
    }),

    computed: {
      avg () {
        const sum = this.heartbeats.reduce((acc, cur) => acc + cur, 0)
        const length = this.heartbeats.length

        if (!sum && !length) return 0

        return Math.ceil(sum / length)
      },
    },

    created () {
      this.takePulse(false)
    },

    methods: {
      heartbeat () {
        return Math.ceil(Math.random() * (120 - 80) + 40)
      },
      async takePulse (inhale = true) {
        this.checking = true

        inhale && await exhale(1000)

        this.heartbeats = Array.from({ length: 20 }, this.heartbeat)

        this.checking = false
      },
      
    },
  }
</script>


