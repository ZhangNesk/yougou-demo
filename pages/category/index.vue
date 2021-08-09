<template>
	<div>
		<SearchLink></SearchLink>
		<!-- 主体部分 -->
		<div class="content" v-if="categories.length">
			<ul class="left">
				<li :class="{active:actIndex===index}" v-for="(cate,index) in categories" @click="actIndex=index"
					:key="index">
					{{cate.cat_name}}
				</li>
			</ul>
			<div class="right">
				<img src="../../static/images/1.jpg" />
				<div class="cate2" v-for="(cate2,index2) in categories[actIndex].children" :key="index2">
					<p class="title">
						<span>{{cate2.cat_name}}</span>
					</p>
					<ul>
						<li class="cate3" v-for="(cate3,index3) in cate2.children" :key="index3"
							@click="toSearh_list(cate3.cat_name)">
							<img :src="cate3.cat_icon" />
							<p>{{cate3.cat_name}}</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// 导入搜索组件	
	import SearchLink from '../../components/SearchLink.vue'
	export default {
		// 挂载组件
		components: {
			SearchLink
		},
		data() {
			return {
				actIndex: 0,
				categories: []
			}

		},
		created() {
			console.log("分类created")
			this.getCategories()
		},
		onLoad() {
			console.log("分类onLoad")
		},
		onShow() {
			console.log("分类onShow")
		},
		// mounted() {
		// 	this.getCategories()
		// },
		methods: {
			async getCategories() {
				this.categories = await this.$request({
					url: '/api/public/v1/categories'
				})
			},
			toSearh_list(catName) {
				wx.navigateTo({
					url: '../search_list/index?query=' + catName
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {
		display: flex;
		position: absolute;
		top: 100rpx;
		left: 0;
		right: 0;
		bottom: 0;

		.left {
			width: 198rpx;
			height: 100%;
			overflow: auto;

			li {
				height: 100rpx;
				// box-sizing: 1px solid #eee;
				border-bottom: 1px solid #eee;
				background-color: #f4f4f4;
				text-align: center;
				line-height: 100rpx;

			}

			.active {
				color: #eb4450;
				background-color: #fff;
				position: relative;

				&::before {
					position: absolute;
					content: '';
					top: 20rpx;
					left: 0;
					width: 8rpx;
					height: 60rpx;
					background-color: #eb4450;
				}
			}

		}

		.right {
			padding: 20rpx 16rpx 0;
			flex: 1;
			height: 900rp100%x;
			overflow: auto;

			>img {
				height: 180rpx;
				width: 520rpx;
			}
		}

		.cate2 {
			margin-bottom: 40rpx;

			ul {
				display: flex;
				flex-wrap: wrap;
			}

			.title {
				color: #e0e0e0;
				height: 110rpx;
				text-align: center;
				line-height: 110rpx;
			}
		}

		.cate3 {
			width: 33.33%;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 40rpx;

			>img {
				width: 120rpx;
				height: 120rpx;
			}
		}
	}
</style>
