<template>
	<view class="page">
		<ourLoading v-if="loading" active text="加载中..." />
		<uni-popup ref="popup" type="circleProgress">
			<circle-progress ref="circleProgressPop" :phone="phone" @circleRob="robGo"></circle-progress>
		</uni-popup>
		<view class="main">
			<view class="main-content">
				<view class="content">
					<view class="head">
						<view class="bac-img">
							<image src="../../static/img/money/balance-bac-index.png"></image>
						</view>

						<view class="money-title">我的收益(元)</view>
						<view class="money-count">5000.00</view>
					</view>
					<view class="list">
						<view class="list-title">需求大厅</view>
						<!-- <view v-if="orderList && orderList.length == 0" class="no-data">暂无数据</view> -->

						<view class="main-no" v-if="orderList && orderList.length == 0">

							<view class="no-image">
								<image src="../../static/img/no-data.png"></image>
							</view>
							<view class="no-title">暂无数据</view>
						</view>

						<view class="item" v-for="(item,index) in orderList" :key="index" @tap="goDetail(item)">
							<block v-if="item.orderStatus == 4">
								<view class="item-name">{{item.serverClassificationName}}</view>
								<view class="item-mid">
									<view class="mid-left">
										<view class="mid-title">交货:</view>
										<view class="mid-value">{{item.orderExpectTime}}</view>
									</view>
									<view class="mid-right">
										<view class="mid-title">数量:</view>
										<view class="mid-value">{{item.orderTotalQuantity}}<text>件</text></view>
									</view>
								</view>
								<view class="item-mid">
									<view class="mid-left">
										<view class="mid-title">预算:</view>
										<view class="mid-value">{{item.orderBudgetAmount}}<text>元</text></view>
									</view>
									<view class="mid-right">
										<view class="mid-title">预付:</view>
										<view class="mid-value">{{item.orderBudgetProportion}}<text>%</text></view>
									</view>
								</view>
								<view class="item-bottom" @tap.stop="robOrder(item)">抢单</view>
							</block>

						</view>

						<view v-if="isBottom && orderList.length > 0" class="isBottom">我是最后的底线~</view>
					</view>
				</view>



			</view>
		</view>

	</view>
</template>

<script>
	const app = getApp();

	export default {
		data() {
			return {
				userPkid: uni.getStorageSync('userPkid'),
				isShow: false,
				phone: uni.getStorageSync('customerPhone'),
				orderList: [],
				page: {
					pageNum: 1,
					pageSize: 10
				},
				isBottom: false,
				total: 0
			};
		},
		computed: {
			loading() {
				return this.$store.state.loadingShow
			},
		},
		onShow() {
			this.init()
		},
		onLoad(options) {

		},
		methods: {
			// 初始化
			init() {
				this.page.pageNum = 1
				this.orderList = []
				this.isBottom = false
				this.getList()
			},
			// 获取订单列表
			getList() {
				let params = {
					//userPkid: this.userPkid,
					pageNum: this.page.pageNum,
					pageSize: this.page.pageSize,
				}
				this.API.service.getToken(this.URL.orderRobList, params).then(res => {
					if (res.code == 200) {

						this.total = res.total
						this.orderList = this.orderList.concat(res.rows) || []
						this.isShow = this.orderList.length

						// app.globalData.showToast('加载成功');
					}
				})
			},
			// 订单详情
			goDetail(item) {
				let order = JSON.stringify(item)
				uni.navigateTo({
					url: `indexDetail?order=${order}`
				})
			},
			//是否抢单
			robOrder(item) {
				uni.showModal({
					title: '确定抢单?',
					content: item.serverClassificationName || '',
					cancelText: '关闭',
					success: res => {
						if (res.confirm) {
							// Todo
							console.log('用户点击确认');
							this.robOrderGo(item)
							// this.$refs.popup.open()
							// this.$refs.circleProgressPop.initCircle(item)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},

			//抢单成功跳转
			robGo(item) {
				if (item) {
					app.globalData.showToast('抢单成功');
					setTimeout(() => {
						let order = JSON.stringify(item)
						uni.navigateTo({
							url: `../order/rob-success?order=${order}`
						})
					}, 500)
				} else {
					app.globalData.showToast('此单已经被抢啦~');
					setTimeout(() => {
						this.init()
					}, 500)
				}
			},
			// 抢单api
			robOrderGo(item) {
				console.log('robOrder')
				let params = {
					orderPkid: item.pkid,
					pkid: this.userPkid,
				}
				this.API.service.putToken(this.URL.orderRob, params).then(res => {
					if (res.code == 200) {
						app.globalData.showToast('抢单成功');
						setTimeout(() => {
							let order = JSON.stringify(item)
							uni.navigateTo({
								url: `../order/rob-success?order=${order}`
							})
						}, 500)
					} else {
						 app.globalData.showToast('此单已经被抢啦~');
						 setTimeout(() => {
						 	 this.init()
						 }, 500)
					}
				})
			},
			// 下拉刷新
			onPullDownRefresh() {
				this.init()
				setTimeout(() => {
					uni.stopPullDownRefresh(); //停止下拉刷新动画
				}, 500)
			},
			// 拨打电话
			call(phone) {
				// TODO 做一些其他的事情，手动执行 done 才会关闭对话框
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
				this.$refs.circleProgressPop.close()
			},
			// 上拉加载
			onReachBottom() { //监听下拉加载生命周期

				if (this.orderList.length >= this.total) {
					this.isBottom = true
				} else {
					this.isBottom = false
				}

				if (this.isBottom) {
					return app.globalData.showToast('已经到底啦(*^▽^*)');
				}
				this.page.pageNum = this.page.pageNum + 1
				this.getList()
			},
		},
	}
</script>

<style lang="less">
	.page {
		.main {
			width: 100%;
			margin-bottom: 150upx;
			background-color: #F7F7F7;

			.main-content {
				.content {
					width: 100%;

					.head {
						margin-top: 15upx;
						position: relative;
						height: 330upx;
						background-color: #ffffff;

						.bac-img {
							width: 100%;
							position: absolute;

							image {
								width: 100%;
								height: 322upx;
								background-repeat: no-repeat;
								background-size: cover;
							}
						}

						.money-title {
							position: absolute;

							top: 27%;
							width: 100%;
							text-align: center;
							color: #FFFFFF;
							font-size: 25upx;

						}

						.money-count {
							position: absolute;

							top: 43%;
							width: 100%;
							text-align: center;
							color: #FFFFFF;
							font-size: 50upx;

						}
					}

					.list {
						padding: 30upx;

						.list-title {
							display: flex;
							justify-content: center;
							color: #999999;
							font-size: 28upx;

						}

						.item {
							margin-top: 30upx;
							background-color: #FFFFFF;
							border-radius: 15upx;

							// padding: 20upx;
							.item-name {
								padding-top: 20upx;
								padding-left: 20upx;
								padding-right: 20upx;
								color: #333333;
								font-size: 30upx;
								font-weight: 600;
							}

							.item-mid {
								display: flex;
								justify-content: space-between;
								align-items: center;
								color: #999999;
								font-size: 26upx;
								margin-top: 15upx;
								padding-left: 20upx;
								padding-right: 20upx;

								.mid-left {
									width: 50%;
									display: flex;
									align-items: center;

									.mid-title {}

									display: flex;
									align-items: center;

									.mid-value {
										display: flex;
										align-items: center;
										margin-left: 15upx;
									}
								}

								.mid-right {
									width: 50%;
									display: flex;
									align-items: center;

									.mid-title {
										display: flex;
										align-items: center;
									}

									.mid-value {
										display: flex;
										align-items: center;
										margin-left: 15upx;
									}
								}
							}
						}

						.item-bottom {
							margin-top: 30upx;
							padding-top: 20upx;
							padding-bottom: 20upx;
							display: flex;
							justify-content: center;
							align-items: center;
							border-top: 1px solid #E5E5E5;
							color: #6271AC;
							font-size: 28upx;
						}
					}
				}




			}
		}

	}

	.isBottom {
		margin-top: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 25upx;
		color: #999999;
	}

	.no-data {
		margin-top: 300upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 25upx;
		color: #999999;
	}

	.main-no {
		width: 100%;
		display: flex;
		// justify-content: center;
		margin-top: 20%;
		align-items: center;
		flex-direction: column;

		.no-image {
			image {
				width: 243upx;
				height: 130upx;

			}
		}

		.no-title {
			color: #999999;
			font-size: 33upx;
			font-weight: 600;
		}

		.no-tips {
			color: #999999;
			font-size: 25upx;
			margin-top: 20upx;
		}

		.publish-btn {
			width: 400upx;
			height: 80upx;
			background-color: #FFC800;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 15upx;
			margin-top: 55upx;
			color: #333333;
			font-size: 32 upx;
		}
	}
</style>
