<template>
  <div id="text-box"  class="flex-center-center">
    <span>节流：</span>
    <span @mouseenter="mouseIn()">{{ count }}</span>
  </div>
</template>

<script>
import { throttle } from '../public/utils/packgingFunction'
export default {
  name: "name",
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    mouseIn: throttle(function(){this.count++;}, 1000),
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
