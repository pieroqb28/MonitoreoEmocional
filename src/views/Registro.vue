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
                  <v-form
                      ref="form"
                      v-model="valid"
                      lazy-validation>
                    <v-text-field
                      label="Correo"
                      name="correo"
                      prepend-icon="mdi-account"
                      type="text"
                      v-model="correo"
                      :rules="correoRules"
                      maxlength="25" 
                      required
                    ></v-text-field>
  
                    <v-text-field
                      label="Contraseña"
                      prepend-icon="mdi-lock"
                      type="password"
                      :rules="textRules"
                      v-model="contrasena"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Confirmar contraseña"
                      prepend-icon="mdi-lock"
                      type="password"
                      :rules="[textRules, passwordMatchError]"
                      v-model="confirmarContrasena"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Primer nombre"
                      :rules="textRules"                 
                      type="text"
                      v-model="primerNombre"
                      required
                    ></v-text-field>         
                    <v-text-field
                      label="Segundo nombre"
                      v-model="segundoNombre"
                      type="text"
                    ></v-text-field>
                    <v-text-field
                      label="Primer apellido"
                      :rules="textRules"
                      v-model="primerApellido"
                      type="text"
                      required
                    ></v-text-field>  
                    <v-text-field
                      label="Segundo apellido"
                      :rules="textRules"
                      v-model="segundoApellido"
                      type="text"
                      required
                    ></v-text-field>  
                    <v-text-field
                      label="Número de celular"
                      :rules="celularRules"
                      v-model="numeroCelular"
                      type="text"
                      :counter="9"
                      maxlength="9"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="dni"
                      :counter="8"
                      :rules="DNIRules"
                      label="Número de DNI"
                      maxlength="8"
                      required
                    ></v-text-field>  
                     <v-select
                      label="Rol"
                      :rules ="selectRolRules"
                      v-model="roleusuario"
                      :items="['ESPECIALISTA', 'TUTOR']"                    
                      required
                    ></v-select>    


                    
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="teal accent-3" @click="validate()">Registrar </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
             <v-dialog
              v-model="postDialog"
              max-width="400"
            >
              <v-card>
                <v-card-title class="headline">{{this.textDialog}}</v-card-title>

                <!--v-card-text>
                  La evaluación se ha registrado correctamente.
                </v-card-text-->

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    color="green darken-1"
                    text
                    @click="goTo()"
                  >
                    Entendido
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
        </v-container>
      </v-main>
</template>

<script>
import axios from "axios"
  export default {
    name : "Login",
    data: () => ({
            didRegister: false,
            postDialog: false,
            textDialog:'',
            correo: '',
            contrasena: '',
            confirmarContrasena: '',
            primerNombre: '',
            segundoNombre: '',
            primerApellido: '',
            segundoApellido: '',
            numeroCelular: '',
            dni: '',
            roleusuario: '',
            DNIRules: [
              v => !!v || 'El DNI es obligatorio',
              v => (v && v.length == 8) || 'El DNI debe contener 8 dígitos',
            ],
            celularRules: [
              v => !!v || 'El número de celular es obligatorio',
              v => (v && v.length == 9) || 'El número de celular debe contener 9 dígitos',
            ],
            selectRolRules: [
              v => !!v || 'Debe seleccionar un rol',
            ],
            correoRules: [
              v => !!v || 'El correo es obligatorio',
              v => /.+@.+\..+/.test(v) || 'El correo debe ser válido',
            ],
            textRules: [
              v => !!v || 'Este campo es obligatorio',
              //v => (v && v.length <= 20) || 'El máximo de caracteres es 20',
            ],


    }),
    computed:{     
      passwordMatchError () { 
       return () => (this.contrasena === this.confirmarContrasena) || 'Las contraseñas no coinciden'
      },
    },
    methods: {
      async registro(){
      try{
        const res = await axios.put('https://sistemadepresivotesisupc.azurewebsites.net/api/LoginWeb/Create/especialista',{
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
        console.log(this.correo)
        console.log(this.contrasena)
        console.log(this.confirmarContrasena)
        console.log(this.primerNombre)
        console.log(this.segundoNombre)
        console.log(this.primerApellido)
        console.log(this.segundoApellido)
        console.log(this.numeroCelular)
        console.log(this.dni)
        console.log(this.roleusuario)
        console.log(res)
       if (res.status === 200)
        {
          this.textDialog = 'El registro se ha realizado correctamente'
          this.didRegister = true
        }
        else 
        {
          this.textDialog = 'Ha ocurrido un problema, intente nuevamente'
          this.didRegister = false
        }
        this.postDialog = true;

      } catch(e){
        console.error(e)
        this.didRegister = false
        this.textDialog = 'Ha ocurrido un problema, intente nuevamente'
        this.postDialog = true;
      }
    },
      validate () {

        if (this.$refs.form.validate())
        {
          this.registro()
          console.log("true")
        }
      },

     goTo(){
       if (this.didRegister) this.$router.push('/')

       this.postDialog = false
     },

    }
  }
</script>
