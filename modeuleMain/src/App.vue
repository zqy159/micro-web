<template>
  <div id="main-root">
    <!-- loading -->
    <div v-if="loading">loading</div>
    <!-- 子应用盒子 -->
    <div id="sub-One"></div>
    <div id="sub-Two"></div>
  </div>
</template>

<script>
export default {
  name: "App",
  props: {
    loading: Boolean,
    content: String
  }
};
</script>