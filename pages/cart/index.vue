<template>
  <div class="content">
    <div class="title">
      <span class="iconfont icon-shop"></span>
      <span>优购生活馆</span>
    </div>
    <!-- 商品列表 -->
    <ul class="goods-list">
      <li class="goods-item" v-for="(item,index) in goodsList" :key="index">
        <span class="iconfont"
		:class= "item.checked? 'icon-check' : 'icon-uncheck'"
		@click="isChecked(item)"
        ></span>
        <img :src="item.goods_small_logo"
             alt="">
        <div class="right">
          <p class="text-line2">{{item.goods_name}}</p>
          <div class="btm">
            <span class="price">￥{{item.goods_price}}<span></span>.00</span>
            <div class="goods-num">
             <button @click="reduce(item)" :disabled="item.num==1">-</button>
             <span>{{item.num}}</span>
             <button @click="add(item)">+</button>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="account">
      <div class="select-all" @click="isAll=!isAll">
        <span class="iconfont"
		:class="isAll?'icon-check':'icon-uncheck'"
        ></span>
        <span>全选</span>
      </div>

      <div class="price">
        <p>合计:<span class="num">￥{{totalPrice}}.00</span></p>
        <p class="info">包含运费</p>
      </div>
      <div class="account-btn" >结算({{toalNum}})</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goodsList: [],
	  cart:[]
    }
  },
  onShow () {
	  // 从本地获取购物车数据
	  this.cart = uni.getStorageSync('cart') || []
	  this.getGoodsList()
  },
  onHide () {
	  // 页面隐藏时把新的购物车数据存入本地
	  let cart = {}
	  this.goodsList.forEach(v=>{
		  cart[v.goods_id] = {
			  num:v.num,
			  checked:v.checked
		  }
	  })
	  uni.setStorageSync('cart',cart)
  },
  methods: {
	  isChecked(item) {
		  item.checked = !item.checked
	  },
	  reduce(item) {
		  item.num= item.num - 1
	  },
	  add(item) {
		item.num= item.num +1
	  },
	  async getGoodsList() {
		  // // 从本地获取购物车数据
		  // this.cart = uni.getStorageSync('cart') || []
		  // 把goodsId的所有键取出组成数组,使用Object.keys()这个方法
		  let ids = Object.keys(this.cart)
		  // console.log(ids)
		  // 如果购物车数据为空，则不发请求
		  if (!ids.length){
			  return
		  }
		  let goodsList = await this.$request({
			  url: '/api/public/v1/goods/goodslist?goods_ids=' + ids
		  })
		  // 数据合并
		  goodsList.forEach(v => {
			  v.num = this.cart[v.goods_id].num
			  v.checked = this.cart[v.goods_id].checked
		  })
		  this.goodsList = goodsList
	  }
  },
  computed: {
	  isAll: {
		 get() {
			 //  // 商品全部选中就全选
			 //  // every() 方法用于检测数组所有元素是否都符合指定条件,这个方法不会改变原数组
			 //  // 如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测。
			 //  // 如果所有元素都满足条件，则返回 true
			  return this.goodsList.every(v=>v.checked)
		 }, 
		 set(status) {
			 // 所有商品checked应该与isAll一致
			 this.goodsList.forEach(v=>{
				 v.checked = status
			 })
			 // console.log(status)
		 }
	  },
	  toalNum() {
		  // 只有选中的商品才能参与计算
		  return this.goodsList.reduce((sum,v)=>{
			  return sum+(v.checked? v.num:0)
		  },0)
	  },
	  totalPrice() {
		  // 只有选中的商品才能参与计算
		  return this.goodsList.reduce((sum,v)=>{
		  			  return sum+(v.checked? v.goods_price:0)
		  },0)
	  }
  }
}
</script>


<style lang="less">
.iconfont{
  font-size: 44rpx;
}
.title {
  height: 88rpx;
  display: flex;
  align-items: center;
  .iconfont {
    color: #999;
    margin: 6rpx 12rpx 0 32rpx;
  }
}

.goods-item {
  height: 206rpx;
  background-color: #fff;
  border-top: 1rpx solid #ddd;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  .iconfont {
    color: #eb4450;
    margin: 0 30rpx;
  }
  img {
    width: 160rpx;
    height: 160rpx;
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 0 20rpx 0 18rpx;
    .btm {
      display: flex;
      margin-top: 40rpx;
      justify-content: space-between;
      .price {
        color: #eb4450;
        > span {
          font-size: 24px;
        }
      }
      .goods-num {
        display: flex;
        align-items: center;
        button {
          width: 60rpx;
          height: 50rpx;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 4rpx solid #666;
        }
        span {
          margin: 0 30rpx;
        }
      }
    }
  }
}
.goods-list {
  position: absolute;
  bottom: 98rpx;
  top: 88rpx;
  width: 100%;
  overflow: auto;
  padding-bottom: 60rpx;
  background-color: #f4f4f4;
}

.account {
  height: 98rpx;
  border-bottom: 1rpx solid #ddd;
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  .iconfont {
    color: #eb4450;
    margin: 0 30rpx;
  }
  .account-btn {
    width: 230rpx;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #eb4450;
  }
  .select-all {
    flex: 1;
  }
  .price {
    margin-right: 20rpx;
    .num {
      color: #eb4450;
    }
    .info {
      color: #999;
    }
  }
}
</style>