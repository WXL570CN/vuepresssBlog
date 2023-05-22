<template>
  <div class="color-box">
    <div class="color" v-bind:style="{ background: color }"></div>
    <input class="color-input" type="text" v-model="color" @change="onColorChange" />
  </div>
</template>

<script>
export default {
  name: "name",
  props: {},
  data() {
    return {
      color: "rgba(0, 0, 0, 0.85)",
    };
  },
  methods: {
    onColorChange(e) {
      const value = e.target.value;
      this.data.color = value;
    },
  },
  components: {},
};
</script>

<style lang="scss" scoped>
.color-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .color {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
  .color-input {
    margin-top: 20px;
    width: 200px;
    text-align: center;
  }
}
</style>
