<template>
  <!-- test -->
  <div>
    <router-link to="daorumoren" target="_self">
      <button>homepage</button>
    </router-link>
    {{ islogin }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      islogin: this.global.islogin,
    };
  },
  created() {
    this.global_func("Hi");
  },
};
</script>
    
<style>
</style>