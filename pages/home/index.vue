<template>
	<div>
		<SearchLink></SearchLink>
		<!-- 轮播图 -->
		<swiper indicator-dots autoplay circular indicator-color="rgba(255,255,255,0.3)" indicator-active-color="#fff ">
			<block v-for="(item,index) in swiperData" :key="index">
				<swiper-item>
					<image :src="item.image_src"></image>
				</swiper-item>
			</block>
		</swiper>
		<!-- 导航 -->
		<ul class="catitems">
			<li class="item" v-for="(item,index) in catitemsData" :key="index">
				<a href="">
					<image :src="item.image_src"></image>
				</a>
			</li>
		</ul>
		<!-- 楼层 -->
		<ul class="floordata">
			<li class="floor-item" v-for="(item2,index2) in floordata" :key="index2">
				<img :src="item2.floor_title.image_src" />
				<div class="product_list">
					<img :src="item2.product_list[0].image_src" />
					<div class="right">
						<block v-for="(pitem,pindex) in item2.product_list" :key="pindex" >
							<!-- product_list里的第一张图不显示 -->
							<img v-if="pindex" :src="pitem.image_src"/>
						</block>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	// 导入搜索组件
	import SearchLink from '../../components/SearchLink.vue'
	export default {
		components: {
			SearchLink
		},
		data() {
			return {
				swiperData: [],
				catitemsData: [],
				floordata: []

			}
		},
		created() {
			this.getSwiperdata(),
			this.getCatitems(),
			this.getFloordata()
		},
		methods: {
			async getSwiperdata() {
				this.swiperData = await this.$request({
					url: '/api/public/v1/home/swiperdata',
					loading: 'loading'
				})
				// wx.request({
				// 	url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
				// 	success: res => {
				// 		console.log(res)
				// 		let {meta,message} = res.data
				// 		if (meta.status === 200) {
				// 			this.swiperdata = message
				// 		}
				// 	}
				// })
			},
			async getCatitems() {
				this.catitemsData = await this.$request({
					url: '/api/public/v1/home/catitems'
				})
			},
			async getFloordata() {
				this.floordata = await this.$request({
					url: '/api/public/v1/home/floordata'
				})
			}
		}
	}
</script>

<style lang="less" scoped>


	swiper {
		height: 340rpx;

		image {
			width: 100%;
			height: 340rpx;
		}
	}

	.catitems {
		height: 194rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;

		image {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-item {
		margin-bottom: 20rpx;

		>img {
			width: 100%;
			height: 88rpx;
		}

		.product_list {
			padding: 20rpx 0 0 17rpx;
			display: flex;

			>img {
				width: 232rpx;
				height: 386rpx;
			}

			.right {
				flex: 1;
				font-size: 0;

				>img {
					height: 188rpx;
					width: 232rpx;
					margin-left: 10rpx;
					margin-bottom: 10rpx
				}
			}
		}
	}
</style>
