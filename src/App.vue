<!--
 * @Author: wzn
 * @Date: 2021-06-23 23:44:20
 * @description: 
-->
<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "app",
  mounted() {
    this.$http.Login().then((res) => {
      console.log(res);
    });
  }
};
</script>

<style>
</style>
