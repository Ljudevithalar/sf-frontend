<template>
<div>
<div>Primljeni upiti</div>
<div>
<div v-for="upit in upit" :key="upit.id">
            <upit :upit="upit"/>
        </div>
</div>
</div>
</template>



<script>
import upit from '@/components/upit.vue'
import { Upiti, Auth } from '@/services'
import store from '@/store.js'
export default {

data () {
    return {...store,
    auth: Auth.state
    }
  },

  components: {
    upit
  },

created(){
      this.getupit();
  },

methods:{

    async getupit(){
      this.upit = await Upiti.getupit(this.auth.username)
    },
    show(upit) {
      this.$router.push({path: `upiti/${upit.artikalid}`, query : { artikalime: upit.artikalime, querysender: upit.by, itemowner: upit.to}})
    }
}
}
</script>

