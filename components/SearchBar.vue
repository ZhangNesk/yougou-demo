<template>
  <div class="header">
    <input type="text" confirm-type="search" v-model.trim="query" @confirm="comfirmHandler">
    <icon class="search-icon"
          type="search"
          size="16">
    </icon>
    <icon class="clear-icon"
          type="clear"
          size="16"
		  v-show="query"
		  @click="keyword=''"
          color="#ccc">
    </icon>
  </div>
</template>

<script>
export default {
  props: ['query'],
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
		comfirmHandler() {
		  // 不为空则吧keyword传到父组件
		  if(this.keyword){
			  this.$emit('search',this.keyword)
		  }
	  }
  //   confirmHandler () {
  //     // 为空不跳转
  //     if (!this.keyword) {
  //       return
  //     }
  //     this.$emit('confirm', this.keyword)
  //   }
  // },
  // watch: {
  //   query (newValue) {
  //     this.keyword = newValue
  //   }
   }
}
</script>

<style lang="less" scoped>
.header {
  height: 120rpx;
  background-color: #eee;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    background-color: #fff;
    height: 60rpx;
    width: 720rpx;
    padding-left: 74rpx;
    box-sizing: border-box;
  }
  .search-icon {
    position: absolute;
    left: 44rpx;
  }

  .clear-icon {
    position: absolute;
    right: 44rpx;
    z-index: 100;
  }
}
</style>