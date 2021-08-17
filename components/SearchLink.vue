<template>
	<div>
		<div class="header">
			<div class="inner" @click="toSearch">
				<icon type="search" size="16" color="#bbb"></icon>
				<span>搜索</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			toSearch() {
				uni.navigateTo({
					url: '/pages/search/index'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.header {
		height: 100rpx;
		background-color: #eb4450;
		display: flex;
		align-items: center;
		padding: 0 16rpx;

		.inner {
			flex: 1;
			height: 60rpx;
			background-color: #fff;
			border-radius: 8rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			span {
				color: #bbb;
			}
		}
	}
</style>
