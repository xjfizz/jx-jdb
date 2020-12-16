<template>
	<view class="page">
		<view class="main">
			<view class="main-content">
				<view class="content">
					<view class="head">
						<view class="head-tips">需支付金额</view>
						<view class="head-money">
							<text class="head-money-fh">￥</text>
							<text>2000.00</text>
						</view>
						<view class="head-bottom">
							<text>棒球帽</text>
							<text>加工生产</text>
							<text>1724597885444555</text>
						</view>
					</view>

					<view class="bottom">
						<view class="bottom-head">支付方式</view>
						<view class="bottom-item">
							<image src="../../static/img/money/wx-pay.png" mode=""></image>
							<text>微信支付</text>
							<radio value="1" :checked=" index === 1 " @tap="selectPayType(1)" />
						</view>
						<view class="bottom-item">
							<image src="../../static/img/money/balance-pay.png" mode=""></image>
							<text>钱包支付</text>
							<radio value="2" :checked=" index === 3 " @tap="selectPayType(3)" />
						</view>
						<view class="bottom-item">
							<image src="../../static/img/money/yl-pay.png" mode=""></image>
							<text>银联支付</text>
							<radio value="2" :checked=" index === 2 " @tap="selectPayType(2)" />
						</view>
					</view>
					<view class="sub">
						<view class="sub-btn" @tap="pay">确认支付</view>
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
				MoneyNum: '',
				index: 1
			};
		},
		methods: {
			// 输入金额校验
			MoneyInput: function(event) {
				// if(){

				// }
				console.log(event.target.value)
				// this.MoneyNum = String(Math.abs((parseFloat((event.target.value))).toFixed(2)));
				var num = parseFloat(event.target.value);
				if (num < 0) {
					app.globalData.showToast('金额请大于0');
					this.MoneyNum = '';
					return false
				}
				if (event.target.value.split(".")[1] && event.target.value.split(".")[1].length > 2) {
					app.globalData.showToast('金额小数后两位');
					this.MoneyNum = '';
					return false
				}
				this.MoneyNum = num;
			},
			selectPayType(val) {
				this.index = val
			},
			// 支付
			pay() {

				uni.navigateTo({
					url:"pay-success"
				})
				const that = this;

				console.log(that.MoneyNum)
				// if (!that.MoneyNum) {
				// 	app.globalData.showToast('请输入金额');
				// 	return false
				// }

				let params = {
					openId: uni.getStorageSync('openId'),
					money: that.MoneyNum,
					consumingDescribe: '余额充值'
				};

				this.API.service.getTokenForm(this.URL.payCharge, params).then(res => {
					console.log('res', res)
					if (res.code == 10000) {
						uni.requestPayment({
							timeStamp: data.data.timeStamp, //当前的时间(毫秒)
							nonceStr: data.data.nonceStr, //随机字符串(32)
							package: data.data.package, //统一下单接口返回的 prepay_id 参数值
							signType: data.data.signType, //签名类型，默认为MD5
							paySign: data.data.paySign, //签名
							success: function(ord) {
								console.log(ord)
								uni.navigateTo({
									url: "rcharge-success"
								})
								// uni.showToast({
								// 	title: '支付成功',
								// 	duration: 2000,
								// 	icon: 'success'
								// });
							},
							fail: function(res) {
								console.log(JSON.stringify(res))
								if (res.errMsg == 'requestPayment:fail cancel') {
									app.globalData.showToast('支付取消');
								} else {
									app.globalData.showToast('支付失败');
								}
								// setTimeout(function() {
								// 	uni.switchTab({
								// 		url: '/pages/order/orderYu/orderYu'
								// 	});
								// }, 1000);
							}
						});
					}
				})


			}
		}
	}
</script>

<style lang="less">
	.page {
		.main {
			width: 100%;
			min-height: 100%;
			margin-bottom: 200upx;
			background-color: #F7F7F7;
			;

			.main-content {
				width: 100%;
				min-height: 100%;

				// padding: 30upx;
				.content {
					.head {
						background-color: #FFFFFF;
						padding: 30upx;
						display: flex;
						justify-content: center;
						align-items: center;
						flex-direction: column;

						.head-tips {
							color: #333333;
							font-size: 26upx;
							margin-top: 20upx;
						}

						.head-money {
							margin-top: 20upx;
							color: #FFC800;
							font-size: 45upx;
							font-weight: 600;
							.head-money-fh{
								font-size: 23upx;
							}
						}
						.head-bottom{
							margin-top: 20upx;
							width: 70%;
							color: #999999;
							font-size: 26upx;
							display: flex;
							justify-content: space-around;
							align-items: center;
						}

					}

					.bottom {

						.bottom-head {
							color: #999999;
							padding: 30upx;
						}

						.bottom-item {
							padding-left: 30upx;
							padding-right: 30upx;
							background-color: #FFFFFF;
							border-bottom: 1px solid #E5E5E5;
							display: flex;
							align-items: center;
							justify-content: flex-start;
							height: 80upx;

							image {
								width: 48upx;
								height: 48upx;
							}

							text {
								margin-left: 15upx;
							}

							radio {
								margin-left: auto;
								color: #FFC800;

							}
						}
					}

					.sub {
						width: 100%;
						margin-top: 30upx;
						display: flex;
						align-items: center;
						justify-content: center;

						.sub-btn {
							background-color: #FFC800;
							display: flex;
							align-items: center;
							justify-content: center;
							font-size: 33upx;
							width: 94%;
							border-radius: 15upx;
							height: 80upx;
							font-weight: 600;
						}
					}

				}

			}
		}
	}
</style>
<style>
	radio .wx-radio-input.wx-radio-input-checked {
		border: 1rpx solid #FFC800 !important;
		background: #FFC800 !important;
	}
</style>
