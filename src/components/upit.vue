<template>

      <div class="card text-center">
        <div class="card-header text-left">
           Upit za artikal <strong>{{upit.artikalime}}</strong>
          <h6 class="ime"><i><b>{{upit.by}}</b></i></h6>
          <button  @click="show(upit)" class="btn btn-primary">Prikaži</button>
          <form @submit.prevent="Obrisi">
               <button class="btn btn-danger">Obriši</button>
               </form>
        </div>
      </div>

</template>



<script>
import store from '@/store.js'
import {Upiti, Poruke} from '@/services'

export default {
props:['upit',],
  data(){
    return store
  },

  methods:{
 async Obrisi() {
                
let obrisi = await Poruke.delete(this.upit.artikalid).then(Upiti.delete(this.upit.id)).then(alert("Uspješno obrisano")).then(location.reload())
                    },
                    show(upit) {
      this.$router.push({path: `upiti/${upit.artikalid}`, query : { artikalime: upit.artikalime, querysender: upit.by, itemowner: upit.to}})
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

.ime{
color:red;
}
</style>