<template>
  <div v-if="totalCount" class="page-wrap">
    <span v-if="currentPage != 1" class="li-page" @click="goPrePage">
      上一页
    </span>
    <ul>
      <li
        v-for="(i, index) in showPageBtn"
        :key="index"
        :class="{ active: i === currentPage }"
        @click="pageOffset(i)"
      >
        <span v-if="i">{{ i }}</span>
        <span v-else>···</span>
      </li>
    </ul>
    <span v-if="totalCount > limit && currentPage < totalPage" class="li-page" @click="goNextPage">
      下一页
    </span>
  </div>
</template>

<script>
export default {
  props: {
    // 数据总数
    totalCount: {
      type: Number,
      default: 100,
    },
    // 每页显示的数据量
    limit: {
      type: Number,
      default: 25,
    },
  },
  data() {
    return {
      offset: 0
    }
  },
  computed: {
    prePage() {
      return this.offset !== 0 && this.totalCount
    },
    nextPage() {
      return this.offset + this.limit < this.totalCount && this.totalCount
    },
    totalPage() {
      return Math.ceil(this.totalCount / this.limit)
    },
    currentPage() {
      return Math.ceil(this.offset / this.limit) + 1
    },
    showPageBtn() {
      const pageNum = this.totalPage
      const index = this.currentPage
      if (pageNum <= 5) return [...new Array(pageNum)].map((v, i) => i + 1)
      if (index <= 2) return [1, 2, 3, 0, pageNum]
      if (index >= pageNum - 1) return [1, 0, pageNum - 2, pageNum - 1, pageNum]
      if (index === 3) return [1, 2, 3, 4, 0, pageNum]
      if (index === pageNum - 2)
        return [1, 0, pageNum - 3, pageNum - 2, pageNum - 1, pageNum]
      return [1, 0, index - 1, index, index + 1, 0, pageNum]
    },
  },
  methods: {
    pageOffset(i) {
      if (i === 0 || i === this.currentPage) return
      this.GO_PAGE((i - 1) * this.limit)
    },
    goPrePage() {
      if (this.currentPage >= 2) {
        this.PRE_PAGE(this.limit)
      }
    },
    goNextPage() {
      if (this.currentPage <= this.totalPage) {
        this.NEXT_PAGE(this.limit)
      }
    },
    GO_PAGE(offset){
      this.offset = offset
    },
    PRE_PAGE(offset) {
      this.offset -= offset
    },
    // 分页 下一页
    NEXT_PAGE(offset) {
      this.offset += offset
    },
  },
}
</script>

<style scoped>
.page-wrap {
  display: flex;
  align-items: center;
  text-align: right;
  user-select: none;
}
.page-wrap .li-page {
  cursor: pointer;
  width: 65px;
  height: 32px;
  line-height: 32px;
  border: 1px solid #cccccc;
  border-radius: 2px;
  text-align: center;
  margin-left: 12px;
}
.page-wrap .li-page:hover {
  color: #fff;
  background: #4389ff;
}
.page-wrap ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.page-wrap ul li {
  position: relative;
  float: left;
  width: 40px;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  border: 1px solid #cccccc;
  border-radius: 2px;
  text-align: center;
  margin-left: 12px;
  cursor: pointer;
}
.page-wrap ul li div {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
}
.page-wrap ul li a:hover {
  color: #fff;
}
.page-wrap ul li:hover,
.page-wrap ul li.active {
  color: #fff;
  background: #4389ff;
}
.page-wrap ul li:hover a,
.page-wrap ul li.active a {
  color: #fff;
}
</style>
