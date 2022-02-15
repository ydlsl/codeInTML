<template>
  <div class="test">
    <div>
      <Scale1 />
    </div>
    <div>
      <Scale2 />
    </div>
    <div>
      <Scale3 />
    </div>
    <div>
      <Scale4 />
    </div>
    <div>
      <Scale5 />
    </div>
  </div>
</template>

<script>
import Scale1 from './scale/scale1'
import Scale2 from './scale/scale2'
import Scale3 from './scale/scale3'
import Scale4 from './scale/scale4'
import Scale5 from './scale/scale5'
export default {
  components:{
    Scale1,
    Scale2,
    Scale3,
    Scale4,
    Scale5,
  },
  data() {
    return {
      
    }
  },
  created() {
    
  },
  mounted() {
    
  }
}
</script>
<style lang='scss' scoped>
/* @import url(); 引入css类 */
.test{
  display: flex;
  justify-content: center;
}
</style>