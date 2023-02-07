<template>
  <div id="text-box" class="flex-center-center">
    <span>普通：</span>
    <span @mouseenter="mouseIn()">{{ count }}</span>
  </div>
</template>

<script>
export default {
  name: "name",
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    mouseIn() {
      this.count++;
    },
  },
};
</script>

<style scoped>
#text-box span:first-child {
  font-size: 2.5rem;
}
#text-box span:last-child {
  margin-left: 20px;
}
</style>
