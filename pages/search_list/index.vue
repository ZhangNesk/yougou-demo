<template>
	<div>
		<div class="header">
			<icon type="search" size="32rpx" color="#c0c0c0"></icon>
			<input type="text" value="小米" v-model="searchKey" @confirm="reload(searchKey)">
		</div>
		<!-- 过滤菜单 -->
		<ul class="filter-menu">
			<li :class="{active:index===actIndex}" v-for="(item,index) in meunList" :key="index"
				@click="actIndex=index">{{item}}</li>
		</ul>
		<!-- 商品列表 -->
		<ul class="goods_list">
			<li v-for="(item,index) in goodList" :key="index" @click="toItem(item.goods_id)">
				<img :src="item.goods_small_logo" alt="" />
				<div class="right">
					<p class="text-line2">{{item.goods_name}}</p>
					<p id="price">
						￥<span>{{item.goods_price}}</span>
						<span>.00</span>
					</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	let PAGE_SIZE = 6
	export default {
		data() {
			return {
				meunList: [
					'综合',
					'销量',
					'价格'
				],
				actIndex: 0,
				searchKey: '',
				query: '',
				goodList: [],
				lastPage: false
			}
		},
		onLoad(options) {
			// mpvue需要设置下面3步
			// this.goodList = []
			// this.isRequest = false
			// this.lastPage = false
			// 判断当前是否在发请求的值
			this.pageNum = 1,
			// console.log(options)
			this.query = options.query
			this.searchKey = options.query
			this.queryGoods()
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.searchKey = this.query
			this.reload()
		},
		// 上拉加载
		onReachBottom() {
			this.pageNum++,
				this.queryGoods()
		},
		methods: {
			async queryGoods(searchKey) {
				// 如果正在发请求中，直接return
				if (this.isRequest || this.lastPage) {
					return
				}
				// 开始发请求是isRequest设置为true
				this.isRequest = true
				let data = await this.$request({
					url: '/api/public/v1/goods/search',
					data: {
						query: searchKey || this.query,
						pageNum: this.pageNum,
						pagesize: PAGE_SIZE
					}
				})
				this.goodList = [...this.goodList, ...data.goods]
				// 结束时isRequest设置为false
				this.isRequest = false
				// 最后一页数据时设置lastPage为true
				if (this.goodList.length === data.total) {
					this.lastPage = true
				}
			},
			reload(searchKey) {
				this.pageNum = 1
				this.goodList = []
				this.isRequest = false
				this.lastPage = false
				this.queryGoods(searchKey)
			},
			toItem (id) {
				wx.navigateTo({
					url: "../item/index?id=" + id
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.header {
		height: 120rpx;
		padding: 30rpx 16rpx;
		background-color: #eee;

		// box-sizing: border-box;
		// position: relative;
		icon {
			position: absolute;
			left: 48rpx;
			top: 46rpx;
		}

		input {
			height: 60rpx;
			background-color: #FFFFFF;
			border-radius: 8rpx;
			padding-left: 76rpx;
		}
	}

	.filter-menu {
		display: flex;
		height: 100rpx;
		line-height: 100rpx;
		justify-content: space-around;
	}

	.active {
		color: #eb4450;
	}

	.goods_list {
		li {
			height: 260rpx;
			display: flex;
			padding: 0 20rpx;
			border-top: 1rpx solid #ddd;
			align-items: center;

			>img {
				width: 200rpx;
				height: 200rpx;
				// border: 1rpx solid green;
			}
		}

		.right {
			flex: 1;
			margin-left: 24rpx;
		}
	}

	#price {
		margin-top: 84rpx;
		font-size: 24rpx;
		color: #eb4450;

		span {
			font-size: 32rpx;
		}
	}
</style>
