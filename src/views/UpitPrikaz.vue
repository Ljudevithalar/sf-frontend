<template>
<div>
<div>Upit za artikal <h4><i>{{ this.$route.query.artikalime }}</i></h4></div>
<div>
    <div  v-for="poruke in poruke" :key="poruke.id">
            <poruke :poruke="poruke"/>
        </div>
  </div>
<form @submit.prevent="posaljiporuku" class="form-inline mb-5">
              <div class="form-group">
                <input v-model="content" class="form-control" placeholder="Pošalji odgovor">
              </div>
              <button type="submit" class="btn btn-primary ml-2">Odgovori</button>
              
            </form>
</div>

</template>

<script>
import poruke from '@/components/poruke.vue'
import { Poruke, Auth } from '@/services'
import store from '@/store.js'
export default {
props: ['id'],
data () {
  
    return {
    ...store,
    auth: Auth.state
    }
  },
   components: {
    poruke
  },


created(){
      this.getporuke();
  },

methods:{
     async getporuke(){
       let sudionik
       if (this.$route.query.itemowner==this.auth.username){
         sudionik=this.$route.query.querysender
       } else {
         sudionik=this.$route.query.itemowner
       }

      this.poruke = await Poruke.getporuke(this.id, this.auth.username, sudionik )
    },
  async posaljiporuku() {

                let novaporuka = {
                    by: this.auth.username,
                    content: this.content,
                    artikalid: this.id,
                    artikalime: this.$route.query.artikalime,
                    itemowner: this.$route.query.itemowner,
                    querysender: this.$route.query.querysender
                }
                let nporuka = await Poruke.add(novaporuka).then(alert("Odgovorili ste!")).then(this.$router.push({ name: 'Upiti' })) 
                     
        }
}
}
</script>