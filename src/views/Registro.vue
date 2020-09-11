<template >
  <v-main>
        <v-container
          class="fill-height"
          fluid
        >
          <v-row
            align="center"
            justify="center"
          >
            <v-col
              cols="12"
              sm="8"
              md="4"
            >
              <v-card class="elevation-12">
                <v-toolbar
                  color="light-blue"
                  dark  
                  flat
                >
                  <v-toolbar-title>Registro</v-toolbar-title> 
                  <v-spacer></v-spacer>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        :href="source"
                        icon  
                        large
                        to="/"
                        v-on="on"
                      >
                        <v-icon>mdi-keyboard-backspace</v-icon>
                      </v-btn>
                    </template>
                    <span>Volver a Login</span>
                  </v-tooltip>                
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      id="correo"
                      label="Correo"
                      name="correo"
                      prepend-icon="mdi-account"
                      type="text"
                      v-model="correo"
                      required
                    ></v-text-field>
  
                    <v-text-field
                      id="contrasena"
                      label="Contraseña"
                      name="contrasena"
                      prepend-icon="mdi-lock"
                      type="password"
                      v-model="contrasena"
                      required
                    ></v-text-field>
                    <v-text-field
                      id="confirmarContrasena"
                      label="Confirmar contraseña"
                      name="confirmarContrasena"
                      prepend-icon="mdi-lock"
                      type="password"
                      v-model="confirmarContrasena"
                      required
                    ></v-text-field>
                    <v-text-field
                      id="primerNombre"
                      label="Primer nombre"
                      name="primerNombre"
                      type="text"
                      v-model="primerNombre"
                      required
                    ></v-text-field>         
                    <v-text-field
                      id="segundoNombre"
                      label="Segundo nombre"
                      name="segundoNombre"
                      v-model="segundoNombre"
                      type="text"
                    ></v-text-field>
                    <v-text-field
                      id="primerApellido"
                      label="Primer apellido"
                      name="primerApellido"
                      v-model="primerApellido"
                      type="text"
                      required
                    ></v-text-field>  
                    <v-text-field
                      id="segundoApellido"
                      label="Segundo apellido"
                      name="segundoApellido"
                      v-model="segundoApellido"
                      type="text"
                      required
                    ></v-text-field>  
                    <v-text-field
                      id="numeroCelular"
                      label="Número de celular"
                      name="numeroCelular"
                      v-model="numeroCelular"
                      type="text"
                      required
                    ></v-text-field>
                    <v-text-field
                      id="dni"
                      label="Número de DNI"
                      name="dni"
                      type="text"
                      v-model="dni"
                      required
                    ></v-text-field>  
                     <v-select
                      id = "roleusuario"
                      label="Rol"
                      name="roleusuario"
                      v-model="roleusuario"
                      :items="['ESPECIALISTA', 'TUTOR']"                    
                      required
                    ></v-select>    


                    
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="teal accent-3" @click="registro()">Registrar </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
</template>

<script>
import axios from "axios"
  export default {
    name : "Login",
    data: () => ({
            correo: '',
            contrasena: '',
            confirmarContrasena: '',
            primerNombre: '',
            segundoNombre: '',
            primerApellido: '',
            segundoApellido: '',
            numeroCelular: '',
            dni: '',
            roleusuario: ''
    }),

    methods: {
      async registro(){
      try{
        const res = await axios.put('https://sistemadepresivoapi.azurewebsites.net/api/LoginWeb/Create/especialista',{
            //crossDomain: true,
            correo: this.correo,
            contrasena: this.contrasena,
            confirmarContrasena: this.confirmarContrasena,
            primerNombre: this.primerNombre,
            segundoNombre: this.segundoNombre,
            primerApellido: this.primerApellido,
            segundoApellido: this.segundoApellido,
            numeroCelular: this.numeroCelular,
            dni: this.dni,
            roleusuario: this.roleusuario
        })
        console.log(res)
      } catch(e){
        console.error(e)
      }
    },
      login(){

      }
    }
  }
</script>
