<template>
  <div>
    <div class="row">
      <div class="col">
        <h1 class="text-center mb-5">Registracija</h1>
      </div>
    </div>
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <form @submit.prevent="register">
          <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
          </div>
          <div class="form-group">
            <label>Unesite email</label>
            <input
              v-model="email"
              class="form-control"
              placeholder="Enter email"
            />
          </div>
          <div class="form-group">
            <label for="passwordField">Unesite lozinku</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Lozinka"
            />
          </div>
          <div class="form-group">
            <label>Ponovite lozinku</label>
            <input
              v-model="password2"
              type="password"
              class="form-control"
              placeholder="Lozinka"
            />
          </div>
          <button type="submit" class="btn btn-primary mt-5">Registracija</button>
        </form>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
import { Register } from '@/services'
export default {
  data () {
    return {
      email: '',
      password: '',
      password2: '',

    }
  },
  methods: {
    async register () {
      if (this.password === (this.password2) && this.password!="") {
      let success = await Register.register(this.email, this.password);
      console.log('Rezultat registracije', success);
      this.$router.push({ name: 'Prijava' });

    }
      else{
        console.log("Lozinke se ne podudaraju!&quot;");
        return;
      }
    }
  }
}
</script>

<style>

.regist{
padding:30px;
}

#naslov{
  color: white;
  margin-right: 0;
  font-size: 35px;
}
#reg1{
  color: white;
  margin-right: 70%;
  font-size: 20px;
}

#reg2{
  color: white;
  margin-right: 80%;
  font-size: 20px;
}

#reg3{
  color: white;
  margin-right: 70%;
  font-size: 20px;
}
 #lpos{
  margin: auto;
  width: 50%;
  padding: 10px;
}
</style>