<template>
  <section id="article">
    <div class="newshead">
      <h1></h1>
      <p class="titlebuttom"><span class="fl articletime"></span><!-- <span class="fr">23</span> --></p>
    </div>
    <div class="articlecontent">
      
    </div>
  </section>
</template>

<script>
export default {
  name : 'News',
  data(){
    return {
        ArcData:'',
    }
  },
  mounted:function(){
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
img{
  width:200px;
}
</style>
