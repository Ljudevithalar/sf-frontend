<template>
<div>
  <div>
  <h4>Stvori novi oglas</h4>

  <div class="novioglas">
      <div class="col">
        <form @submit.prevent="stvorioglas">
          <div class="form-group">
            <label>Naziv artikla</label>
            <input v-model="title"  class="form-control" placeholder="Artikal">
          </div>
          <div class="form-group">
            <label >Opis oglasa</label>
            <input v-model="description"  class="form-control" placeholder="Opis">
          </div>
          <div class="form-group">
            <label >Cijena u kn</label>
            <input v-model="price" class="form-control" placeholder="Cijena">
          </div>
          <croppa :width="300" :height="300" v-model="imageData"></croppa>
          <div class="col">
          <button type="submit" class="btn btn-primary">Kreiraj</button>
         </div>
        </form>
      </div>
      </div>

  </div>
<div class="og">
 <h4>Oglasi</h4>
</div>
<div class="oglas" @click="show(oglasi)" v-for="oglasi in oglasi" :key="oglasi.id">
            <oglas :oglas="oglasi"/>
        </div>
</div>

</template>



<script>

import oglas from '@/components/oglas.vue'
import { Oglasi, Auth } from '@/services'
import store from '@/store.js'
export default {

data () {
    return {...store,
    auth: Auth.state,
    imageData: null,
    
    }
  },

  components: {
    oglas,

  },

created(){
      this.getoglasi();


  },

methods:{

   getImageBlob() {
      return new Promise((resolve, reject) => {
        this.imageData.generateBlob(blobData => {
          if (blobData != null) {
            resolve(blobData)
          }
        })
      })
    },

    async getoglasi(){
      this.oglasi = await Oglasi.getoglasi()
    },
    show(oglasi) {
      this.$router.push({path: `oglasi/${oglasi.id}`})
    },
    async stvorioglas() {
      let blobData = await this.getImageBlob()
      let imageName = this.auth.username + "/" + Date.now() + ".png";
      let result = await storage.ref(imageName).put(blobData)
      let img = await result.ref.getDownloadURL()
                
               let novioglas = {
                    title: this.title,
                    author: this.auth.username,
                    image: img,
                    price: this.price,
                    description: this.description
                }
                let noglas = await Oglasi.add(novioglas).then(alert("Uspješno kreirano")).then(location.reload()) 
                this.imageData = null;
        }
}
}
</script>

<style>
.og{
margin-top: 50px;
}
.oglas{
margin-right: 40%
}
.novioglas{
margin-right: 60%
}
</style>

