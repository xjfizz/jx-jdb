<template>
	<view class="page">
		<ourLoading v-if="loading" active text="加载中..." />
		<uni-popup ref="popup" type="kefu">
			<keFuPop ref="kefuPop" :phone="phone" @call="call"></keFuPop>
		</uni-popup>
		<view class="main" v-if="isShow">
			<view class="content">
				<view class="item" v-for="(item,index) in orderList" :key="index" @tap="goDetail(item)">
					<view class="top" >
						<!-- <text>{{item.status}}</text> -->
						<!-- 状态控制-start -->


						<view class="status-icon" :style="{backgroundColor: statusUnit[item.orderStatus].color}"></view>
						<view class="status-text" :style="{color: statusUnit[item.orderStatus].color}">{{statusUnit[item.orderStatus].statusText}}</view>

						<!-- 状态控制end -->

						<view class="order-tips" v-if="( item.orderStatus == 6) && item.pdbWechatOrderOperateHistories">
							{{item.pdbWechatOrderOperateHistories[0].orderOperateTitle}}
						</view>
						<view class="item-left">
							<image src="../../static/img/right.png" mode=""></image>
						</view>
					</view>
					<view class="mid" :class="item.orderStatus == 7 ? 'no-bottom-btn' : '' ">
						<view class="mid-top">{{item.serverClassificationName}}</view>
						<view class="mid-item">
							<view class="item-left">
								<view class="item-title">交货:</view>
								<view class="item-value">{{item.orderExpectTime}}</view>
							</view>
							<view class="item-right">
								<view class="item-title">数量:</view>
								<view class="item-value">{{item.orderTotalQuantity}}件</view>
							</view>
						</view>
						<view class="mid-item">
							<view class="item-left">
								<view class="item-title">预算:</view>
								<view class="item-value">{{item.orderBudgetAmount}}元</view>
							</view>
							<view class="item-right">
								<view class="item-title">预付:</view>
								<view class="item-value">{{item.orderBudgetProportion}}%</view>
							</view>
						</view>
					</view>
					<view class="bottom" v-if="(item.orderStatus)">
						<!-- v-if="operationBtns[item.status].length > 0" -->
						<!-- 						<view  class="bottom-item" v-for="(btn,btnIndex) in operationBtns[item.status -1]" :key="btnIndex"  @tap="btnsConfig(item, btn.optText)">
							<text>{{btn.optText}}</text>
						</view> -->
						<view v-if="item.orderStatus == 5" class="bottom-item" @tap.stop="btnsConfig(item, 'receiverOrder')">
							<text>确定接单</text>
						</view>
						<view v-if="item.orderStatus == 5" class="bottom-item" @tap.stop="btnsConfig(item, 'contact')">
							<text>联系平台</text>
						</view>
						<view v-if="item.orderStatus == 5" class="bottom-item" @tap.stop="btnsConfig(item, 'cancelRob')">
							<text>取消抢单</text>
						</view>
						<view v-if="item.orderStatus == 6" class="bottom-item" @tap.stop="btnsConfig(item, 'finishProduct')">
							<text>加工完成</text>
						</view>
						<view v-if="item.orderStatus == 6" class="bottom-item" @tap.stop="btnsConfig(item, 'uploadProgress')">
							<text>上报进度</text>
						</view>
						<view v-if="item.orderStatus == 7 || item.orderStatus == 8 || item.orderStatus == 9 || item.orderStatus == 10 || item.orderStatus == 11 || item.orderStatus == 12"
						 class="bottom-item" @tap.stop="btnsConfig(item, 'contact')">
							<text>联系平台</text>
						</view>
						<view v-if="item.orderStatus == 7" class="bottom-item" @tap.stop="btnsConfig(item, 'cancelFinish')">
							<text>取消验货</text>
						</view>
					</view>
				</view>

				<view v-if="isBottom && orderList.length > 0" class="isBottom">我是最后的底线~</view>

			</view>

		</view>
		<view class="main-no" v-else>

			<view class="no-image">
				<image src="../../static/img/no-data.png"></image>
			</view>
			<view class="no-title">暂无订单</view>
			<view class="no-tips">您还没有订单哦~</view>
			<view class="publish-btn" @tap="goRob()">去抢单</view>
		</view>

	</view>
</template>

<script>
	// import API from '../../api/index.js'
	import config from '@/utils/public/config.js'
	// import operationBtns from '@/components/custom-components/operationBtns/operationBtns.vue'


	const app = getApp();
	export default {
		components: {
			// operationBtns
		},
		data() {
			return {
				userPkid: uni.getStorageSync('userPkid'),
				isShow: false,
				phone: uni.getStorageSync('customerPhone'),
				orderList: [],
				orderStatusList: [{
						key: 1,
						value: '待受理'
					},
					{
						key: 2,
						value: '受理中'
					},
					{
						key: 3,
						value: '待支付定金'
					},
					{
						key: 4,
						value: '进行中'
					},
					{
						key: 5,
						value: '待支付尾款'
					},
					{
						key: 6,
						value: '确认收货'
					},
					{
						key: 7,
						value: '已完成'
					},
				],
				operationBtns: [
					[],
					[{ //1
						opt: 'editOrder',
						optText: '修改需求'
					}, {
						opt: 'cancelPublish',
						optText: '取消发布'
					}],
					[{ //2
						opt: 'editOrder',
						optText: '修改需求'
					}, {
						opt: 'cancelPublish',
						optText: '取消发布'
					}],
					[{ //3
						opt: 'cancelOrder',
						optText: '取消订单'
					}, {
						opt: 'payPreMoney',
						optText: '支付定金'
					}],
					[{ //4
						opt: 'contact',
						optText: '联系平台'
					}],
					[{ //5
						opt: 'receivingOrder',
						optText: '确定接单'
					}, {
						opt: 'cancelReceiver',
						optText: '取消抢单'
					}],
					[{ //6
						opt: 'finishProduct',
						optText: '加工完成'
					}, {
						opt: 'uploadProgress',
						optText: '上报进度'
					}],
					[{ //7
						opt: 'contact',
						optText: '联系平台'
					}],
					[{ //8
						opt: 'contact',
						optText: '联系平台'
					}],
					[{ //9
						opt: 'contact',
						optText: '联系平台'
					}],
					[{ //10
						opt: 'contact',
						optText: '联系平台'
					}],
					[{ //11
						opt: 'contact',
						optText: '联系平台'
					}],
					[{ //12
						opt: 'contact',
						optText: '联系平台'
					}],
				],
				page: {
					pageNum: 1,
					pageSize: 10
				},
				isBottom: false,
				total: 0
			}
		},
		computed: {
			loading() {
				return this.$store.state.loadingShow
			},
			statusUnit() {
				return this.$config.statusSty
			}
		},
		onShow() {
			this.init()
		},
		onLoad(val) {},
		methods: {
			// 初始化
			init() {
				this.page.pageNum = 1
				this.orderList = []
				this.isShow = this.orderList.length
				this.isBottom = false
				this.getList()
			},
			// 获取订单列表
			getList() {
				let params = {
					supplierPkid: this.userPkid,
					pageNum: this.page.pageNum,
					pageSize: this.page.pageSize,
				}
				this.API.service.getToken(this.URL.orderList, params).then(res => {
					if (res.code == 200) {
						this.total = res.total
						this.orderList = this.orderList.concat(res.rows) || []
						this.isShow = this.orderList.length

						// app.globalData.showToast('加载成功');
					}
				})
			},
			goRob() {
				console.log('goRob')
				// this.isShow = !this.isShow
				uni.reLaunch({
					url: '../index/index'

				})

			},


			// 执行取消订单API
			cancelOrderGo(item) {
				let params = {
					userPkid: this.userPkid,
					pkid: item.pkid
				}
				this.API.service.putToken(this.URL.orderCancel, params).then(res => {
					if (res.code == 200) {
						app.globalData.showToast('取消成功!');

					}
				})
			},


			// 联系平台
			contact(item) {
				this.$refs.popup.open()
			},
			
			// 执行取消验货API
			cancelInspection(item) {
				let params = {
					supplierPkid: this.userPkid,
					orderPkid: item.pkid,
					orderStatus: item.orderStatus,
					userPkid: item.userPkid,
				}
				this.API.service.putToken(this.URL.cancelInspection, params).then(res => {
					if (res.code == 200) {
						app.globalData.showToast('取消成功!');
						this.init()
					}
				})
			},
			
			// 取消验货
			cancelFinish(item) {
				console.log('uploadProgress', item)
				uni.showModal({
					title: '取消验货?',
					content: '',
					cancelText: '关闭',
					success: res => {
						if (res.confirm) {
							// Todo
							console.log('用户点击确认');
							this.cancelInspection(item)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},

			// 上报进度
			uploadProgress(item) {
				console.log('uploadProgress', item)
				let order = JSON.stringify(item)
				uni.navigateTo({
					url: `../order/orderGDetail?order=${order}&&orderIndexCome=true`
				})
				// 	uni.showModal({
				// 		title: '上报进度?',
				// 		content: '',
				// 		cancelText: '关闭',
				// 		success: res => {
				// 			if (res.confirm) {
				// 				// Todo
				// 				console.log('用户点击确认');

				// 			} else if (res.cancel) {
				// 				console.log('用户点击取消');
				// 			}
				// 		}
				// 	});
			},
			
			// 加工完成
			 finishProductGo(item) {
				 let params = {
				 	orderPkid: item.pkid,
				 	userPkid: item.userPkid,
				 	orderStatus:item.orderStatus,
				 	supplierPkid: this.userPkid,
				 }
				 this.API.service.putToken(this.URL.finishProgress, params).then(res => {
				 	if (res.code == 200) {
				 		app.globalData.showToast('操作成功!');
				 		this.init()
				 	}
				 })
			 },
			
			// 加工完成
			finishProduct(item) {
				console.log('finishProduct', item)
				uni.showModal({
					title: '加工完成?',
					content: '',
					cancelText: '关闭',
					success: res => {
						if (res.confirm) {
							// Todo
							console.log('用户点击确认');
							this.finishProductGo(item)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},

			// 取消抢单-api
			cancelRobGo(item) {
				let params = {
					orderPkid: item.pkid,
					supplierPkid: this.userPkid,
				}
				this.API.service.putToken(this.URL.cancelRob, params).then(res => {
					if (res.code == 200) {
						app.globalData.showToast('取消成功!');
						this.init()
					}
				})
			},

			// 取消抢单
			cancelRob(item) {
				console.log('cancelRob', item)
				uni.showModal({
					title: '取消抢单?',
					content: '',
					cancelText: '关闭',
					success: res => {
						if (res.confirm) {
							// Todo
							console.log('用户点击确认');
							this.cancelRobGo(item)

						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 接单-api
			confirmOrder(item) {
				let params = {
					supplierPkid: this.userPkid,
					orderPkid: item.pkid,
					orderStatus: item.orderStatus,
					userPkid: item.userPkid,
				}
				this.API.service.putToken(this.URL.orderConfirm, params).then(res => {
					if (res.code == 200) {
						app.globalData.showToast('接单成功!');
						this.init()
					}
				})
			},

			// 确认接单
			receiverOrder(item) {
				console.log('receiverOrder', item)
				uni.showModal({
					title: '确认接单?',
					content: '',
					cancelText: '关闭',
					success: res => {
						if (res.confirm) {
							// Todo
							console.log('用户点击确认');
							this.confirmOrder(item)

						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},


			// 订单操作配置
			btnsConfig(item, btn) {
				console.log(item, btn)
				this[btn](item)

			},

			// 拨打电话
			call(phone) {
				// TODO 做一些其他的事情，手动执行 done 才会关闭对话框
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
				this.$refs.kefuPop.close()
			},
			// 订单详情
			goDetail(item) {
				let order = JSON.stringify(item)
				uni.navigateTo({
					url: `../order/orderGDetail?order=${order}`
				})
			},
			// 下拉刷新
			onPullDownRefresh() {
				this.init()
				setTimeout(() => {
					uni.stopPullDownRefresh(); //停止下拉刷新动画
				}, 500)
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
		}
	}
</script>

<style scoped lang="less">
	.page {
		width: 100%;
	}

	.main {
		width: 100%;
		margin-bottom: 200upx;

		.content {
			width: 100%;
			padding: 25upx;

			.item {
				//padding: 10upx;
				padding-top: 10upx;
				//padding-bottom: 20upx;
				margin-top: 20upx;
				width: 100%;
				background: #fff;
				border-radius: 15upx;

				.top {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					padding-top: 15upx;
					padding-bottom: 15upx;
					padding-right: 15upx;
					padding-left: 30upx;
					border-bottom: 1px solid #E5E5E5;

					.status-icon {
						width: 10upx;
						height: 10upx;
						background-color: #007AFF;
					}

					.status-text {
						color: #007AFF;
						margin-left: 10upx;
						font-size: 27upx;
						letter-spacing: 1upx;

					}

					.order-tips {
						// background-color:#FF7F00;
						background: linear-gradient(270deg, #FF7F00 0%, #ffb663 100%);
						color: #FFFFFF;
						border-radius: 40upx;
						padding-top: 2upx;
						padding-bottom: 2upx;
						padding-left: 12upx;
						padding-right: 12upx;
						font-size: 22upx;
						margin-left: 10upx;
					}

					.item-left {
						margin-left: auto;

						image {
							width: 32upx;
							height: 32upx;
						}
					}
				}

				.no-bottom-btn {
					border-radius: 15upx !important;
				}

				.mid {
					margin-top: 15upx;
					padding-left: 30upx;
					padding-right: 20upx;
					padding-bottom: 20upx;
					border-bottom: 1px solid #E5E5E5;

					.mid-top {
						font-size: 31upx;
						color: #333333;
						font-weight: 600;
						margin-top: 10upx;
					}

					.mid-item {
						margin-top: 10upx;
						display: flex;
						justify-content: space-between;
						font-size: 28upx;
						color: #999999;

						.item-left {
							display: flex;
							align-items: center;
							width: 60%;

							.item-title {}

							.item-value {
								margin-left: 10upx;
							}
						}

						.item-right {
							width: 40%;
							display: flex;
							align-items: center;

							.item-title {}

							.item-value {
								margin-left: 10upx;
							}
						}

					}

				}

				.bottom {
					display: flex;

					color: #6271AC;
					font-size: 30upx;
					//margin-top: 10upx;
					height: 80upx;
					justify-content: center;
					align-items: center;

					.bottom-item {
						// width: 50%;
						flex: 1;
						height: 100%;
						display: flex;
						justify-content: center;
						align-items: center;
						border-right: 1px solid #E5E5E5;
					}

					view:last-child {
						border: none;
						// width: 100%;
					}
				}
			}
		}
	}

	.main-no {
		width: 100%;
		display: flex;
		// justify-content: center;
		margin-top: 40%;
		align-items: center;
		flex-direction: column;

		.no-image {
			image {
				width: 243upx;
				height: 130upx;

			}
		}

		.no-title {
			color: #333333;
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

	.order-status-sty-1 {
		//待受理
		color: #007AFF !important;
	}

	.order-status-sty-2 {
		//受理中
		color: #0ACFF4 !important;
	}

	.order-status-sty-3 {
		//待支付定金
		color: #FFC800 !important;
	}

	.order-status-sty-4 {
		//进行中
		color: #1EC9FE !important;
	}

	.order-status-sty-5 {
		//待支付尾款
		color: #FF8500 !important;
	}

	.order-status-sty-6 {
		// 确认收货
		color: #405CFF !important;
	}

	.order-status-sty-7 {
		// 已完成
		color: #00DB7B !important;
	}

	.isBottom {
		margin-top: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 25upx;
		color: #999999;
	}
</style>
