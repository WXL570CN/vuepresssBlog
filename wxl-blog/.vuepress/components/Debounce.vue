<template>
  <div id="text-box" class="flex-center-center">
    <span>防抖：</span>
    <span @mouseenter="mouseIn()">{{ count }}</span>
  </div>
</template>

<script>
import { debounce } from "../public/utils/packgingFunction";
export default {
  name: "name",
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    mouseIn: debounce(function() {
      this.count++;
    }, 500),
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
