<template>
  <div id="app">
    <div class="bg-white">
      <div class="container">
        <div class="row">
          <div class="col">
            <nav class="navbar navbar-expand-lg navbar-light mb-2">
              <router-link class="navbar-brand" :to="{ name: 'Oglasi' }">
                <h1 class="logo">SneakFreak</h1>
              </router-link>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <form class="form-inline my-2 my-lg-0 mr-auto ml-5">
                </form>
                <router-link  v-if="auth.authenticated" class="rl" to="/upiti" >Upiti</router-link >
                <router-link v-if="!auth.authenticated" class="btn btn-outline my-2 my-sm-0 mr-2" to="/prijava" >Login</router-link >
                <span v-if="auth.authenticated">
                  <a @click="logout" class="odjava" href="#">Odjava</a>
                </span>
                <router-link v-if="!auth.authenticated" class="btn btn-outline my-2 my-sm-0 mr-2" to="/registracija" >Signup</router-link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script type="text/javascript">
import store from '@/store.js'
import { Auth } from '@/services'
export default {

methods:{
logout() {
      Auth.logout();
      this.$router.go();
    },
},
  data () {
  return {
    ...store,
    auth: Auth.state,
  };
  },
  created () {
    
    
    
  },
  
}
</script>


<style lang="scss">
.odjava{
  color:rgb(16, 12, 236);
}
.logo{
  font-weight: 900;
  font-style: oblique
 
}
.rl{
color: black; 
margin-right: 20px;
}
.rl:hover{
color: black;
}
body {
  background-color: rgba(119, 132, 134, 0.74);
}

.bg-white {
  background-color: white;
  border-bottom: rgb(151, 150, 150) 1px solid;
  margin-bottom: 20px;
  padding: 10px;
}

nav.navbar {
  background-color: white;

  a {
    svg {
      border-right: rgb(0, 0, 0) 1px solid;
      margin-right: 10px;
      padding-right: 10px;
    }

    img {
      position: relative;
      top: 3px;
    }
  }
}

.btn-primary {
  color: #007bff;
  background: none;
  border-color: #007bff;
}
</style>