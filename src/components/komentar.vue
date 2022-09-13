<template>

            <div  class="comments list-group">
              <a class="animate list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <small><b>{{ komentar.by }} </b></small>
                </div>
                <a class="tekstkom">{{ komentar.content }}</a>
              </a>
              <form v-if="(komentar.by==this.auth.username || this.auth.username=='admin@sneakfreak.com')" @submit.prevent="Obrisi">
         <button class="btn btn-danger">Obriši</button>
        </form>
            </div>

 
</template>



<script>
import store from '@/store.js'
import {Komentari, Auth} from '@/services'

export default {
props:['komentar'],
  data(){
    return {
    ...store,
    auth: Auth.state
    }
  }, 

methods:{
 async Obrisi() {
                
let obrisi = await Komentari.delete(this.komentar.id).then(alert("Uspješno obrisano")).then(location.reload())
                    }
         }
}
</script>





<style>
  .card {
    margin-bottom: 10px
  }
  .comments {
    margin: 20px 0
  }
  .tekstkom{
  font-size: 15px;
  }
</style>