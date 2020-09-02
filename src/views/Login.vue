<template >
  <v-container >
<div >
  <v-app >

        <v-container
          class="fill-height"
          fluid
          
        >
          <v-row
            align="center"
            justify="center"
          >
          <v-col > <img class="elevation-10" src="https://reencontrate.com/wp-content/uploads/2020/05/control-de-las-emociones1.jpg"></v-col>
            <v-col
              cols="12"
              sm="8"
              md="4"
            >
            
            
              <v-card class="elevation-10" height="400px" max-width="800px">
                <v-toolbar
                  color="light-blue"
                  dark
                  flat
                  height="100px"
                >
                  <v-toolbar-title style="font-size:34px;" >Monitoreo Emocional</v-toolbar-title>

                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      v-model ="username"
                      label="Usuario"
                      name="login"
                      prepend-icon="mdi-account"
                      type="text"
                    ></v-text-field>
  
                    <v-text-field
                      v-model = "password"
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
                  <v-btn color="light-blue accent-1" to="/analisis">Iniciar sesión</v-btn>
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
  export default {
    name : "Login",
    data: () => ({
      username: '',
      password: ''
    }),
    methods: {
      login(){

      }
    }
  }
</script>
