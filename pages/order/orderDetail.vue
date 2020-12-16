<template>
	<view class="page">
		<ourLoading v-if="loading" active text="加载中..." />
		<uni-popup ref="popup" type="kefu">
			<keFuPop ref="kefuPop" :phone="phone" @call="call"></keFuPop>
		</uni-popup>
		<view class="main">
			<view class="main-content">
				<view class="content">


					<view class="head">
						<view class="order-status-img">
							<image :src="orderStatusControl[orderDetail.status - 1].statusImg"></image>
						</view>
						<view class="order-status-text">{{orderStatusControl[orderDetail.status - 1].statusText}}</view>
						<view class="order-status-tips">{{orderStatusControl[orderDetail.status - 1].statusTips}}</view>
					</view>

					<!-- 样品生产状态-start 订单状态为进行中、待支付尾款 status:4、5 -->
					<view v-if="orderDetail.status == 4 || orderDetail.status == 5 || orderDetail.status == 6|| orderDetail.status == 7 "
					 class="production">
						<view class="production-item" v-for="(item,index) in orderDetail.production">
							<view class="production-item-title">{{item.prodText}}</view>
							<view class="production-item-value">{{item.createTime}}</view>
						</view>
					</view>

					<!-- 样品生产状态-start -->

					<view class="mid-item">
						<view class="mid-item-title">期待交货时间</view>
						<view class="mid-item-value">2020-11-12</view>
					</view>

					<view class="mid-item-product">
						<view class="mid-item-title">棒球帽</view>
						<view class="product-item">
							<view class="product-title">数量:</view>
							<view class="product-value">1000</view>
						</view>
						<view class="product-item">
							<view class="product-title">预算金额:</view>
							<view class="product-value">1000元</view>
						</view>
						<view class="product-item">
							<view class="product-title">预付比例:</view>
							<view class="product-value">20%</view>
						</view>
					</view>

					<view class="mid-img-des">
						<view class="mid-img-title">附件</view>
						<view class="img">
							<view class="img-item" v-for="(item,index) in orderDetail.imgList" :key="index">
								<image :src="item"></image>
							</view>

						</view>

						<view class="mid-des-title">需求描述</view>
						<view class="mid-des-value">帽子急用帽子急用帽子急用帽子急用</view>

					</view>

					<view class="mid-item-product">
						<view class="mid-item-title">
							<text>张三</text>
							<text class="phone">18895621236</text>
						</view>
						<view class="product-item">
							<view class="product-title">江苏省苏州市吴江区庞金路859号1栋</view>
						</view>
					</view>

					<view class="mid-item-product">
						<view class="mid-item-title">订单信息</view>
						<view class="product-item">
							<view class="product-title">创建时间:</view>
							<view class="product-value">2020-10-12</view>
						</view>
						<block v-if="orderDetail.status == 4  || orderDetail.status == 5 || orderDetail.status == 6 || orderDetail.status == 7">
							<view class="product-item">
								<view class="product-title">订单编号:</view>
								<view class="product-value">{{orderDetail.orderNo}}</view>
							</view>
							<view class="product-item">
								<view class="product-title">定金支付:</view>
								<view class="product-value">{{orderDetail.preMoneyTime}}</view>
							</view>
							<view class="product-item">
								<view class="product-title">支付方式:</view>
								<view v-if="orderDetail.prePayState == 1" class="product-value">微信支付</view>
								<view v-if="orderDetail.prePayState == 2" class="product-value">支付宝支付</view>
							</view>

							<view class="order-bottom" v-if="orderDetail.status == 6 || orderDetail.status == 7">
								<view class="product-item">
									<view class="product-title">尾款支付:</view>
									<view class="product-value">{{orderDetail.endMoneyTime}}</view>
								</view>
								<view class="product-item">
									<view class="product-title">支付方式:</view>
									<view v-if="orderDetail.endPayState == 1" class="product-value">微信支付</view>
									<view v-if="orderDetail.endPayState == 2" class="product-value">支付宝支付</view>
								</view>
							</view>

						</block>
					</view>

					<view class="bottom">
						<view class="btn-item" v-for="(item,index) in btns" :key="index" @tap="btnsConfig(item.opt)">{{item.optText}}</view>
						<view class="btn-item" v-if="orderDetail.status == 4" @tap="btnsConfig('refund')">退款</view>
						<!-- <view class="btn-item">取消订单</view> -->
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
				return this.operationBtns[this.orderDetail.status - 1]
			},
			loading() {
				return this.$store.state.loadingShow
			}
		},
		data() {

			return {
				phone: '18895332654',
				orderId: '',
				orderDetail: {},
				orderStatusControl: [{
						status: 1,
						statusText: '等待受理...',
						statusTips: ' 您已成功发布订单, 请耐心等待~',
						statusImg: '../../static/img/order/oder-status-1.png',
					},
					{
						status: 2,
						statusText: '受理中...',
						statusTips: ' 您的订单正在受理, 请耐心等待~',
						statusImg: '../../static/img/order/oder-status-2.png',
					},
					{
						status: 3,
						statusText: '待支付定金...',
						statusTips: '您的订单已受理, 请尽快支付定金哦~',
						statusImg: '../../static/img/order/oder-status-3.png',
					},
					{
						status: 4,
						statusText: '订单正在进行中...',
						statusTips: ' 您的订单正在努力生产中~',
						statusImg: '../../static/img/order/oder-status-4.png',
					},
					{
						status: 5,
						statusText: '待支付尾款...',
						statusTips: '您的订单已加工完成, 请及时支付尾款哦~',
						statusImg: '../../static/img/order/oder-status-5.png',
					},
					{
						status: 6,
						statusText: '已付尾款,等待收货~',
						statusTips: ' 您的订单已加工完成, 请及时支付尾款哦~',
						statusImg: '../../static/img/order/oder-status-6.png',
					},
					{
						status: 7,
						statusText: '订单已完成',
						statusTips: ' 恭喜您, 订单已成功完成~',
						statusImg: '../../static/img/order/oder-status-7.png',
					},
				],
				operationBtns: [
					[{
						opt: 'editOrder',
						optText: '修改需求'
					}, {
						opt: 'cancelOrder',
						optText: '取消订单'
					}],
					[{
						opt: 'editOrder',
						optText: '修改需求'
					}, {
						opt: 'cancelPublish',
						optText: '取消发布'
					}],
					[{
						opt: 'cancelOrder',
						optText: '取消订单'
					}, {
						opt: 'payPreMoney',
						optText: '支付定金'
					}],
					[{
						opt: 'contact',
						optText: '联系平台'
					}],
					[{
						opt: 'contact',
						optText: '联系平台'
					}, {
						opt: 'payEndMoney',
						optText: '支付尾款'
					}],
					[{
						opt: 'contact',
						optText: '联系平台'
					}, {
						opt: 'editRequire',
						optText: '确认收货'
					}],
					[],

				]
			};
		},
		onLoad(options) {
			console.log(options,this.loading)
			let order = JSON.parse(options.order)
			this.orderDetail = order
		},
		methods: {
			// 修改需求
			editOrder(item) {

				uni.navigateTo({
					url: '../publish/publish-edit'

				})
			},
			// 取消发布
			cancelPublish(item) {
				uni.showModal({
					title: '确认取消发布?',
					content: '',
					cancelText: '关闭',
					success: res => {
						if (res.confirm) {
							// Todo
							console.log('用户点击确认');

						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 取消订单
			cancelOrder(item) {
				uni.showModal({
					title: '确认取消订单?',
					content: '',
					cancelText: '关闭',
					success: res => {
						if (res.confirm) {
							// Todo
							console.log('用户点击确认');

						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 支付定金
			payPreMoney(item) {
				console.log('payPreMoney--', item)
				uni.navigateTo({
					url: 'orderPay'
				
				})
			},
			// 退款
			refund(item) {
				uni.navigateTo({
					url:'orderPay'
				})
			},
			// 联系平台
			contact(item) {
				this.$refs.popup.open()
			},
			// 支付尾款
			payEndMoney(item) {
				console.log('payEndMoney', item)
				uni.navigateTo({
					url: 'orderPay'
				
				})
			},
			// 确认收货
			editRequire(item) {
				console.log('editRequire', item)
				uni.showModal({
					title: '确认收货?',
					content: '',
					cancelText: '关闭',
					success: res => {
						if (res.confirm) {
							// Todo
							console.log('用户点击确认');

						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 拨打电话
			call(phone) {
				// TODO 做一些其他的事情，手动执行 done 才会关闭对话框
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
				this.$refs.kefuPop.close()
			},


			// 订单操作配置
			btnsConfig(opt) {

				this[opt](this.orderDetail)

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
							border-top: 1px solid #f7f7f7;
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
						position: fixed;
						bottom: 0;
						height: 100upx;
						background-color: #FFFFFF;
						display: flex;
						align-items: center;
						width: 100%;
						border-top: 1px solid #f7f7f7;

						.btn-item {
							width: 50%;
							height: 100%;
							display: flex;
							justify-content: center;
							align-items: center;
							color: #6271AC;
							font-size: 30upx;
							border-right: 1px solid #E5E5E5;
						}
					}

				}
			}
		}
	}
</style>
