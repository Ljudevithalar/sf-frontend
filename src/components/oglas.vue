<template>

      <div class="card text-center">
        <div class="card-header text-left">
          <h4>{{oglas.title}} </h4> Oglašivač: <strong>{{ oglas.author }}</strong>
          <h5>Cijena: <strong>{{ oglas.price }} kn</strong></h5>
          
        </div>
        <div class="desc">
          <h5>Opis artikla</h5>
          <div>{{ oglas.description }}</div>
        </div>
        <div class="card-body">
          <img class="card-img-top" :src="oglas.image">
        </div>
        <div class="card-footer text-left">

            <form v-if="oglas.author!==auth.username && Prikaz===true" @submit.prevent="posaljiupit" class="form-inline mb-5">
              <div class="form-group">
                <input v-model="content" class="form-control" placeholder="Pošalji upit za artikal">
              </div>
              <button class="btn btn-primary ml-2">Pošalji</button>
              
            </form>
            <form v-if="(oglas.author==auth.username || auth.username=='admin@sneakfreak.com') && Prikaz===true" @submit.prevent="obrisioglas">
         <button class="btn btn-danger">Obriši</button>
        </form>
        </div>
      </div>

</template>



<script>
import store from '@/store.js'
import { Poruke, Upiti, Auth, Oglasi } from '@/services'


export default {
props:['oglas',],
  data(){
    return {
      ...store,
      auth: Auth.state
    }
  },


  computed: {
  Prikaz() {
     if (this.$route.name==='OglasPrikaz') {
       return true
     }else {return false}
  }
},
    methods:{

    async posaljiupit() {
                
               let noviupit = {
                    by: this.auth.username,
                    artikalid: this.oglas.id,
                    artikalime: this.oglas.title,
                    to: this.oglas.author
                }
          
 
                let nupit = await Upiti.add(noviupit).then(alert("Uspješno poslan upit"))
                let novaporuka = {
                    by: this.auth.username,
                    content: this.content,
                    artikalid: this.oglas.id,
                    artikalime: this.oglas.title,
                    itemowner: this.oglas.author,
                    querysender: this.auth.username
                }
                let nporuka = await Poruke.add(novaporuka).then(location.reload())
                     
        },

  async obrisioglas() {
    let obrisi = await Oglasi.delete(this.oglas.id).then(alert("Uspješno obrisano")).then(this.$router.push({ name: 'Oglasi' }))
  }
}

}
</script>





<style>
  .desc{
  padding-left: 20px;
  text-align: left;
  background-color:white;
  border-bottom: 1px solid rgba(0,0,0,.125);

  }
  .card {
    margin-bottom: 10px
  }
  .comments {
    margin: 20px 0
  }


</style>