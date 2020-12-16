<template>
	<view class="page">
		<ourLoading v-if="loading" active text="加载中..." />
		<uni-popup ref="popup" type="kefu">
			<keFuPop ref="kefuPop" :phone="phone" @call="call"></keFuPop>
		</uni-popup>
		<view class="main">
			<view class="main-content">
				<view class="content">
					<view class="mid-item">
						<view class="mid-item-title">期待交货时间</view>
						<view class="mid-item-value">{{orderDetail.orderExpectTime}}</view>
					</view>

					<view class="mid-item-product">
						<view class="mid-item-title">{{orderDetail.serverClassificationName}}</view>
						<view class="product-item">
							<view class="product-title">数量:</view>
							<view class="product-value">{{orderDetail.orderTotalQuantity}}件</view>
						</view>
						<view class="product-item">
							<view class="product-title">预算金额:</view>
							<view class="product-value">{{orderDetail.orderBudgetAmount}}元</view>
						</view>
						<view class="product-item">
							<view class="product-title">预付比例:</view>
							<view class="product-value">{{orderDetail.orderBudgetProportion}}%</view>
						</view>
					</view>

					<view class="mid-img-des">
						<view class="mid-img-title">附件</view>
						<view class="img">
							<view class="img-item" v-for="(item,index) in orderDetail.pdbWechatOrderItems" :key="index">
								<image :src="item.serverClassificationPic" @tap="previewImage(item.serverClassificationPic,index)"></image>
							</view>

						</view>

						<view class="mid-des-title">需求描述</view>
						<view class="mid-des-value">{{orderDetail.orderNote || '暂无描述'}}</view>

					</view>

					<!-- <view class="mid-item-product">
						<view class="mid-item-title">
							<text>{{orderDetail.receiverName}}</text>
							<text class="phone">{{orderDetail.receiverPhone}}</text>
						</view>
						<view class="product-item">
							<view class="product-title">{{orderDetail.receiverProvince}}{{orderDetail.receiverCity}}{{orderDetail.receiverRegion}}{{orderDetail.receiverDetailAddress}}</view>
						</view>
					</view> -->

					
					<view class="bottom">
						<view class="bottom-btn" @tap="robOrder(orderDetail)">抢单</view>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	// ||'../../static/img/text.png'
	export default {
		computed: {
			btns() {
				return this.operationBtns[this.orderDetail.orderStatus - 1]
			},
			loading() {
				return this.$store.state.loadingShow
			}
		},
		data() {

			return {
				userPkid: uni.getStorageSync('userPkid'),
				phone: uni.getStorageSync('customerPhone'),
				orderId: '',
				orderDetail: {},
				orderStatusControl: [{
						status: 0,
						statusText: '已取消...',
						statusTips: ' 订单已取消',
						statusImg: '../../static/img/order/order-status-1.png',
					},
					{
						status: 1,
						statusText: '等待受理...',
						statusTips: ' 您已成功发布订单, 请耐心等待~',
						statusImg: '../../static/img/order/order-status-1.png',
					},
					{
						status: 2,
						statusText: '受理中...',
						statusTips: ' 您的订单正在受理, 请耐心等待~',
						statusImg: '../../static/img/order/order-status-2.png',
					},
					{
						status: 3,
						statusText: '待支付定金...',
						statusTips: '您的订单已受理, 请尽快支付定金哦~',
						statusImg: '../../static/img/order/order-status-3.png',
					},
					{
						status: 4,
						statusText: '订单待生产...',
						statusTips: ' 您的订单正在大厅等待~',
						statusImg: '../../static/img/order/order-status-4.png',
					},
					{
						status: 5,
						statusText: '订单待生产...',
						statusTips: ' 您的订单正在大厅等待~',
						statusImg: '../../static/img/order/order-status-4.png',
					},
					{
						status: 6,
						statusText: '订单正在进行中...',
						statusTips: ' 您的订单正在努力生产中~',
						statusImg: '../../static/img/order/order-status-4.png',
					},
					{
						status: 7,
						statusText: '订单正在进行中...',
						statusTips: ' 您的订单正在努力生产中~',
						statusImg: '../../static/img/order/order-status-4.png',
					},
					{
						status: 8,
						statusText: '待支付尾款...',
						statusTips: '您的订单已加工完成, 请及时支付尾款哦~',
						statusImg: '../../static/img/order/order-status-5.png',
					},
					{
						status: 9,
						statusText: '已付尾款,等待发货~',
						statusTips: ' 您的订单已付尾款，请等待发货~',
						statusImg: '../../static/img/order/order-status-6.png',
					},
					{
						status: 10,
						statusText: '已发货,等待收货~',
						statusTips: ' 您的订单已发货, 请等待收货~',
						statusImg: '../../static/img/order/order-status-6.png',
					},
					{
						status: 7,
						statusText: '订单已完成',
						statusTips: ' 恭喜您, 订单已成功完成~',
						statusImg: '../../static/img/order/order-status-7.png',
					},
				],
				operationBtns: [
					[{//1
						opt: 'editOrder',
						optText: '修改需求'
					}, {
						opt: 'cancelOrder',
						optText: '取消订单'
					}],
					[{//2
						opt: 'editOrder',
						optText: '修改需求'
					}, {
						opt: 'cancelPublish',
						optText: '取消发布'
					}],
					[{//3
						opt: 'cancelOrder',
						optText: '取消订单'
					}, {
						opt: 'payPreMoney',
						optText: '支付定金'
					}],
					[{//4
						opt: 'contact',
						optText: '联系平台'
					}, {
						opt: 'returnPreMoney',
						optText: '退款'
					}],
					[{//5
						opt: 'contact',
						optText: '联系平台'
					}, {
						opt: 'returnPreMoney',
						optText: '退款'
					}],
					[{//6
						opt: 'contact',
						optText: '联系平台'
					}],
					[{//7
						opt: 'contact',
						optText: '联系平台'
					}],
					[{//8
						opt: 'contact',
						optText: '联系平台'
					}, {
						opt: 'payEndMoney',
						optText: '支付尾款'
					}],
					[{//9
						opt: 'contact',
						optText: '联系平台'
					}],
					[{//10
						opt: 'contact',
						optText: '联系平台'
					}, {
						opt: 'editRequire',
						optText: '确认收货'
					}],
					[{//11
						opt: 'contact',
						optText: '联系平台'
					}],
					[{//12
						opt: 'contact',
						optText: '联系平台'
					}],
					[],

				]
			};
		},
		onLoad(options) {
			
			let order = JSON.parse(options.order)
			this.orderDetail = order
			this.getDetail()
		},
		methods: {
			// 获取订单详情
			getDetail() {
				let params = {
					userPkid: this.orderDetail.userPkid,
					// supplierPkid:this.userPkid,
					pkid:this.orderDetail.pkid,
					orderStatus:this.orderDetail.orderStatus,
				}
				this.API.service.getToken(`${this.URL.orderRobDetail}/${this.orderDetail.pkid}`, params).then(res => {
					if (res.code == 200) {
						this.orderDetail = res.data || {}
					}
				})
			},
			// 抢单
			robOrder(item) {
				console.log('robOrder')
				let params = {
					orderPkid: this.orderDetail.pkid,
					pkid:this.userPkid,
				}
				this.API.service.putToken(this.URL.orderRob, params).then(res => {
					if (res.code == 200) {
						app.globalData.showToast('抢单成功');
						setTimeout( () => {
							let order = JSON.stringify(item)
							uni.navigateTo({
								url: `../order/rob-success?order=${order}`
							})
						},500)
						
					} else {
						app.globalData.showToast('此单已经被抢啦~');
						// setTimeout( () => {
						// 	uni.reLaunch({
						// 		url: 'index'
						// 	})
						// },500)
					}
				})
			},
			// 预览图片
			previewImage(image,index) {
				let imgArr = [];
				// imgArr.push(image);
				this.orderDetail.pdbWechatOrderItems.forEach( item => {
					imgArr.push(item.serverClassificationPic)
				})
				//预览图片
				uni.previewImage({
					urls: imgArr,
					current: imgArr[index]
				});
			},

		}
	}
</script>

<style lang="less">
	.page {
		.main {
			width: 100%;
			margin-bottom: 150upx;

			.main-content {
				.content {
					.head {
						padding: 20upx;
						background-color: #FFFFFF;
						display: flex;
						justify-content: center;
						flex-direction: column;
						align-items: center;
						height: 350upx;

						.order-status-img {
							image {
								width: 240upx;
								height: 143upx;
							}
						}

						.order-status-text {
							margin-top: 10upx;
							color: #333333;
							font-size: 30upx;
							font-weight: 600;
						}

						.order-status-tips {
							margin-top: 15upx;
							color: #999999;
							font-size: 24upx;
						}
					}

					.mid-item {
						margin-top: 25upx;
						margin-left: 20upx;
						margin-right: 20upx;
						padding: 15upx;
						border-radius: 15upx;
						background-color: #FFFFFF;

						.mid-item-title {
							color: #333333;
							font-size: 29upx;
							font-weight: 600;
							padding-top: 8upx;
							padding-bottom: 8upx;
						}

						.mid-item-value {
							color: #999999;
							font-size: 26upx;
							font-weight: 600;
							padding-top: 8upx;
							padding-bottom: 8upx;
						}
					}

					.production {
						margin-top: 25upx;
						margin-left: 20upx;
						margin-right: 20upx;
						padding-top: 5upx;
						padding-bottom: 15upx;
						padding-left: 15upx;
						padding-right: 15upx;
						border-radius: 15upx;
						background-color: #FFFFFF;

						.production-item {

							margin-top: 25upx;

							.production-item-title {
								color: #888888;
								font-size: 29upx;
								font-weight: 600;
								padding-top: 8upx;
								padding-bottom: 8upx;
							}


							.production-item-value {
								color: #999999;
								font-size: 25upx;
								font-weight: 600;
								padding-top: 8upx;
								padding-bottom: 8upx;
							}
						}

						.production-item:first-child {

							.production-item-title {
								color: #333333 !important;

							}

						}
					}



					.mid-item-product {
						margin-top: 25upx;
						margin-left: 20upx;
						margin-right: 20upx;
						padding: 15upx;
						border-radius: 15upx;
						background-color: #FFFFFF;

						.mid-item-title {
							color: #333333;
							font-size: 29upx;
							font-weight: 600;
							padding-top: 8upx;
							padding-bottom: 8upx;
						}

						.phone {
							margin-left: 15upx;
						}

						.product-item {
							color: #999999;
							font-size: 26upx;
							padding-top: 8upx;
							padding-bottom: 8upx;
							display: flex;
							align-items: center;

							.product-title {}

							.product-value {
								margin-left: 15upx;
							}
						}

						.order-bottom {
							margin-top: 20upx;
							padding-top: 20upx;
							border-top: 1px solid #E5E5E5;
						}

					}

					.mid-img-des {
						margin-top: 25upx;
						margin-left: 20upx;
						margin-right: 20upx;
						padding: 15upx;
						border-radius: 15upx;
						background-color: #FFFFFF;

						.mid-img-title {
							color: #333333;
							font-size: 29upx;
							font-weight: 600;
							padding-top: 8upx;
							padding-bottom: 8upx;
						}

						.img {
							display: flex;
							align-content: flex-start;
							// justify-content: space-between;
							flex-flow: row wrap;
							border-radius: 10upx;

							.img-item {
								padding: 8upx;
								flex: 0 0 24%;

								image {
									border-radius: 15upx;
									width: 150upx;
									height: 150upx;
								}
							}

						}

						.mid-des-title {
							margin-top: 15upx;
							color: #333333;
							font-size: 29upx;
							font-weight: 600;
							padding-top: 8;
							padding-bottom: 8upx;
						}

						.mid-des-value {
							color: #999999;
							font-size: 26upx;
							padding-top: 8upx;
							padding-bottom: 8upx;
						}
					}

					.bottom {
						// position: fixed;
						// bottom: 30upx;
						margin-top: 30upx;
						display: flex;
						align-items: center;
						justify-content: center;
						width: 100%;
						.bottom-btn{
							width: 90%;
							height: 70upx;
							display: flex;
							align-items: center;
							justify-content: center;
							background-color: #FFC800;
							color: #333333;
							font-size: 30upx;
							border-radius: 15upx;
						}
						
					}

				}
			}
		}
	}
</style>
