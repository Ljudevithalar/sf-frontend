<template>
<div>
  <div class="row">
    <div class="col">
      <h1 class="text-center mb-5">Prijava</h1>
    </div>
  </div>
  <div class="row">
      <div class="col">
      </div>
      <div class="col">
        <form @submit.prevent="login">
          <div class="form-group">
            <label>Unesite email</label>
            <input v-model="email"  class="form-control" id="exampleInputEmail1"  placeholder="Email">
        
          </div>
          <div class="form-group">
            <label>Unesite lozinku</label>
            <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Lozinka">
          </div>
          <button type="submit" class="btn btn-primary mt-5">Prijava</button>
        </form>
      </div>
      <div class="col">
      </div>
    </div>
  </div>
</template>




<script>
import { Auth } from '@/services'
export default {
  data () {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async login() {
      let success = await Auth.login(this.email, this.password);
      console.log('Rezultat prijave', success);

      if (Auth.authenticated() == true) {
 this.$router.push({ name: 'Oglasi' });
      }
    }
  }
};
</script>