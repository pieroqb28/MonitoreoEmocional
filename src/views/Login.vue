<template >
  <v-container>
    <div>
      <v-app>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col class="hidden-xs-only">
              <img
                class="elevation-10"
                src="https://reencontrate.com/wp-content/uploads/2020/05/control-de-las-emociones1.jpg"
              />
            </v-col>
            <v-col cols="12" sm="8" md="4">
              <v-card class="elevation-10" height="400px" max-width="800px">
                <v-toolbar color="light-blue" dark flat height="100px"><v-spacer></v-spacer>
                  <v-toolbar-title style="font-size:30px">Monitoreo Emocional</v-toolbar-title><v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      v-model="correo"
                      id="correo"
                      label="Correo"
                      name="correo"
                      prepend-icon="mdi-account"
                      type="text"
                    ></v-text-field>

                    <v-text-field
                      v-model="password"
                      id="password"
                      label="Contraseña"
                      name="password"
                      prepend-icon="mdi-lock"
                      type="password"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="light-blue accent-1" @click="onClickLogin()">Iniciar sesión</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
                <v-card-actions>
                  <v-spacer></v-spacer>   
                  <v-btn color="indigo accent-1" to="/registro">Registrarse</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-app>
    </div>
  </v-container>
</template>

<script>
//import axios from "axios";
import { mapActions } from "vuex";
export default {
  name: "Login",
  data: () => ({
    correo: "",
    password: "",
  }),
  methods: {
    /*async login() {
      try {
        const res = await axios.post(
          "https://sistemadepresivotesisupc.azurewebsites.net/api/LoginWeb/registro",
          {
            //crossDomain: true,
            correo: this.correo,
            Password: this.password,
          }
        );
        console.log(res);
      } catch (e) {
        console.error(e);
      }
    },*/
    onClickLogin() {
      this.doLogin({correo: this.correo, Password: this.password})
    },
    ...mapActions("auth", ["doLogin"]),
  },
};
</script>
