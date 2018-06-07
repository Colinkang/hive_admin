<template>
  <div class="my-content">

    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "",
  data: () => ({

  })
}
</script>
<style lang="" scoped>
.my-content{
  width: 100%;
  height: 100%;
  overflow: scroll;
  background-color:#162f46
}
</style>
