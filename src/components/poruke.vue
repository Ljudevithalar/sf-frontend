<template>
<div>

            <div  class="comments list-group">
              <a class="animate list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <small><b>{{ poruke.by }} </b></small>
                </div>
                <small>{{ poruke.content }}</small>
              </a>
            </div>
</div>
 
</template>



<script>
import store from '@/store.js'


export default {
props:['poruke'],
  data(){
    return store
  },

}
</script>





<style>
  .card {
    margin-bottom: 10px
  }
  .comments {
    margin: 20px 0
  }
</style>