<template>
<div>
    <oglas :oglas="oglas"/>
    <h5>Komentari</h5>
    <div  v-for="comments in comments" :key="comments.id">
            <komentar :komentar="comments"/>
        </div>
        <div><form @submit.prevent="postcomment" class="form-inline mb-5">
              <div class="form-group">
                <input v-model="contentcom" type="text" class="form-control" placeholder="Ostavite komentar">
              </div>
              <button type="submit" class="btn btn-primary ml-2">Komentiraj</button>
              
            </form></div>
  </div>


</template>

<script>
import oglas from '@/components/oglas.vue'
import komentar from '@/components/komentar.vue'
import { Oglasi, Auth } from '@/services'
import { Komentari } from '@/services'
import store from '@/store.js'
export default {
props: ['id'],
data () {
  
    return {
      ...store,
      contentcom: '',
      auth: Auth.state,
      }
  },
   components: {
    oglas,
    komentar
  },


created(){
      this.getoglasp();
      this.getcomments();
  },

methods:{
    async getoglasp(){
      this.oglas = await Oglasi.getoglasp(this.id)
    },
     async getcomments(){
      this.comments = await Komentari.getcomments(this.id)
    },
    async postcomment() {

                let novikomentar = {
                    by: this.auth.username,
                    content: this.contentcom,
                    oglasid: this.id,
                }
                let nkomentar = await Komentari.add(novikomentar).then(alert("Uspješno postavljen komentar")).then(location.reload()) 
                     
        }
  
}
}
</script>

