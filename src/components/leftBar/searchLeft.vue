<template>
  <ul class="left-bar-main">
    <li>
      <div>
        <span class="iconfont icon-duocengjiegou"></span>
      </div>
      <p>匹配问题</p>
    </li>
    <li>
      <div>
        <span class="iconfont icon-shoucang1"></span>
      </div>
      <p>收藏</p>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  components: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {}
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.left-bar-main {
  height: 100%;
  background: $color-left-bar-light;
  li {
    height: 103px;
    border-top: 1px solid #07332d;
    border-bottom: 1px solid #0d665a;
    text-align: center;
    color: white;
    cursor: pointer;
    &:first-of-type {
      border-top: none;
    }
    &:last-of-type {
      border-bottom: none;
    }
    div {
      padding-top: 12px;
      span {
        font-size: 34px;
      }
    }
    p {
      font-size: 13px;
    }
  }
}
</style>
