<template>
  <div class="wrapper">
    <SearchBar @search="toSearchList" :query="query"></SearchBar>
    <div class="history-search">
      <div class="title">
        <span class="title">历史搜索</span>
        <icon type="clear" size="18" @click="clearAll"> </icon>
      </div>
      <ul>
        <li v-for="(item,index) in key_word" :key="index" @click="toSearchList(item,true)">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar'

export default {
  data () {
    return {
		key_word: [],
		query:''
    }
  },
  components: {
    SearchBar
  },
  onShow () {
	this.key_word = uni.getStorageSync('keyWordList') || []
  },
  onHide() {
  	this.query = ''
  },
  methods: {
	  toSearchList(keyword,noshow) {
		  // 点击搜索记录不需要给query赋值
		  if(!noshow){
			  this.query = keyword
		  }
		  let _keyWord = this.key_word.filter(v => {
			  return v !== keyword
		  })
		   _keyWord.unshift(keyword)
		   // this.key_word = _keyWord
		  // console.log(this.key_word)
		  // 同时把搜索关键字存入Storage
		  uni.setStorageSync('keyWordList',_keyWord)
		  this.search(keyword)
	  },
	  // 跳转到搜索页面
	  search(query) {
		  uni.navigateTo({
		  	url: '/pages/search_list/index?query=' + query
		  })
	  },
	  //清除本地所有搜索关键词
	  clearAll() {
		  uni.showModal({
		  	title: '提示',
		  	content: '是否删除所有记录',
			success: res => {
				// 点击确认删除记录
				if(res.confirm) {
					uni.removeStorageSync('keyWordList')
					// 重置this.key_word
					this.key_word = []
				}
			}
		  })
	  }
	},
}
</script>

<style lang="less">
.search {
  background-color: #eee;
  padding: 30rpx 15rpx;
  display: flex;
  justify-content: space-between;
  font-size: 28rpx;
  position: relative;
  icon {
    position: absolute;
    top: 50rpx;
    left: 38rpx;
  }
  input {
    height: 60rpx;
    flex: 1;
    background-color: #fff;
    padding-left: 70rpx;
    box-sizing: border-box;
    border-radius: 4rpx;
  }
  button {
    width: 160rpx;
    height: 60rpx;
    line-height: 60rpx;
    border-radius: 8rpx;
    font-size: 28rpx;
    border: 1rpx solid #bfbfbf;
    background-color: #eee;
    margin-left: 20rpx;
  }
}

.history-search {
  color: #333;
  font-size: 28rpx;
  padding: 30rpx 30rpx 30rpx 15rpx;
  .title {
    display: flex;
    justify-content: space-between;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30rpx;
    li {
      height: 64rpx;
      line-height: 64rpx;
      padding: 0 26rpx;
      background-color: #ddd;
      margin: 0 30rpx 16rpx 0;
    }
  }
}
</style>
