<template>
	<div class="wrapper">
		<swiper class="swiper" indicator-dots autoplay circular indicator-color="#ccc" indicator-active-color="#fff">
			<block v-for="(item, index) in goods.pics" :key="index">
				<swiper-item>
					<image class="swiper-img" :src="item.pics_big" @click="prevImg(index)"></image>
				</swiper-item>
			</block>
		</swiper>
		<!-- 商品信息 -->
		<div class="goods-info">
			<p class="price">￥{{goods.goods_price}}</p>
			<div class="name-favo">
				<p class="name">{{goods.goods_name}}</p>
				<div class="favo">
					<span class="iconfont icon-share"></span>
					<span>分享</span>
					<button open-type="share">分享</button>
				</div>
			</div>
			<p class="express">快递: 免运费</p>
		</div>
		<div class="promote">
			<ul>
				<li>
					<span class="name">促销</span>
					<span class="detail">满300减30元</span>
				</li>
				<li class="brother">
					<span class="name">已选</span>
					<span class="detail gray">黑色/S/1件</span>
				</li>
			</ul>
		</div>
		<!-- 图文介绍 -->
		<div class="goods-detail">
			<div class="tabs">
				<span :class="{active:index===actIndex}" @click="actIndex=index" v-for="(item, index) in tabs"
					:key="index">{{item}}</span>
			</div>
			<div class="main">
				<div v-show="!actIndex" v-html="goods.goods_introduce">图文介绍</div>
				<div v-show="actIndex">商品参数</div>
			</div>
		</div>
		<div class="fixed-bottom">
			<div class="icon-text">
				<span class="iconfont icon-kefu"></span>
				<span>联系客服</span>
				<button open-type="contact">联系客服</button>
			</div>
			<div class="icon-text" @click="toCart">
				<span class="iconfont icon-cart"></span>
				<span>购物车</span>
			</div>
			<div class="btn add-cart-btn" @click="joinCart()">加入购物车</div>
			<div class="btn buy-btn">立即购买</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				tabs: ['图文介绍', '规格参数'],
				goods: {},
				actIndex: 0
			}
		},
		onLoad(options) {
			// this.good_id = options.id
			this.queryGoods(options.id)
		},
		// 分享转发
		onShareAppMessage() {
			return {
				title: this.goods.goods_name,
				imageUrl: this.goods.pics[0].pics_big
			}
		},
		methods: {
			async queryGoods(id) {
				this.goods = await this.$request({
					url: "/api/public/v1/goods/detail",
					data: {
						goods_id: id
					}
				})
				// console.log(data)
			},
			prevImg(index) {
				let urls = []
				this.goods.pics.forEach(v => {
					urls.push(v.pics_big)
				})
				uni.previewImage({
					// wx 必须传urls[index]
					current: index,
					urls: urls
				})
				// console.log(url)
			},
			toCart() {
				uni.switchTab({
					url: '/pages/cart/index'
				})
			},
			joinCart() {
				// 创建要存入本地购物车的数组，本地购物车无数据则为空
				let cart =uni.getStorageSync('cart') || {}
				// 获取该商品的id
				let goodId = this.goods.goods_id
				cart[goodId] = {
					// 当商品已存在时，数量加1
					num: cart[goodId]?(cart[goodId].num+1) : 1,
					checked: true
				}
				// 存入本地数据
				uni.setStorageSync('cart', cart)
			}
		}
	}
</script>

<style lang="less">
	.iconfont {
		font-size: 40rpx;
	}

	.wrapper {
		background-color: #f4f4f4;
		padding-bottom: 98rpx;
	}

	.swiper {
		height: 720rpx;
	}

	.swiper-img {
		width: 100%;
		height: 720rpx;
	}

	.goods-info {
		padding: 40rpx 0 30rpx 20rpx;
		background-color: #fff;

		.price {
			color: #eb4450;
			font-size: 40rpx;
		}

		.name-favo {
			display: flex;
			height: 78rpx;
			margin-top: 14rpx;

			.name {
				color: #333;
				flex: 1;
				font-size: 28rpx;
				padding-right: 78rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2; // 控制多行的行数
				-webkit-box-orient: vertical;
			}

			.favo {
				border-left: 1px solid #ddd;
				width: 144rpx;
				color: #999;
				font-size: 24rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				position: relative;

				button {
					position: absolute;
					top: 0;
					opacity: 0;
				}
			}
		}

		.express {
			color: #999;
			font-size: 24rpx;
			margin-top: 20rpx;
		}
	}

	.promote {
		margin-top: 20rpx;

		li {
			background-color: #fff;
			height: 96rpx;
			line-height: 96rpx;
			font-size: 28rpx;
			margin-top: 20rpx;
			padding-left: 20rpx;

			&.brother {
				margin-top: 0;
			}

			.name {
				color: #404040;
			}

			.detail {
				color: #ff4055;
				margin-left: 40rpx;

				&.gray {
					color: #dfdfdf;
				}
			}
		}
	}

	.goods-detail {
		margin-top: 20rpx;
		background-color: #fff;

		.tabs {
			display: flex;

			span {
				flex: 1;
				text-align: center;
				color: #404040;
				font-size: 22rpx;
				height: 100rpx;
				line-height: 100rpx;
				box-sizing: border-box;

				&.active {
					color: #ff4055;
					border-bottom: 10rpx solid #ff2644;
				}
			}
		}
	}

	.fixed-bottom {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 98rpx;
		display: flex;
		background-color: #fff;

		.icon-text {
			flex: 2;
			font-size: 20rpx;
			color: #404040;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: relative;

			button {
				position: absolute;
				top: 0;
				opacity: 0;
			}
		}

		.btn {
			flex: 3;
			color: #fff;
			text-align: center;
			line-height: 98rpx;

			&.add-cart-btn {
				background-color: #ffb400;
			}

			&.buy-btn {
				background-color: #ff2d4a;
			}
		}
	}
</style>
