<template>
	<view class="page">
		<ourLoading v-if="loading" active text="加载中..." />
		<view class=" main">
			<view class="top">
				<view class="title">
					<view class="top-left">我的余额</view>
					<view class="top-right" @tap="goRechargeList">明细</view>
				</view>
				<view class="content">
					<view class="bac-img">
						<image src="../../static/img/money/balance-bac.png"></image>
					</view>

					<view class="recharge-btn" @tap="goRecharge">提现</view>
					<view class="money-title">账户余额(元)</view>
					<view class="money-count">{{banlance || 0}}</view>
				</view>
			</view>
			<view class="bottom">
				<view class="title">
					<view class="top-left">我的银行卡</view>
					<view v-if="bankCardInfo.bankAccount"  class="top-right" @tap="edit()">更换</view>
				</view>
				<view v-if="bankCardInfo.bankAccount" class="content">
					<view class="bac-img">
						<image src="../../static/img/money/bank-gsyh.png"></image>
					</view>


					<view class="money-title">{{bankCardInfo.bankName}}</view>
					<view class="money-count">{{factory.formatBankNo(bankCardInfo.bankAccount)}}</view>
				</view>
				<view v-else class="content-add">
					<view class="add-btn" @tap="addBank()">
						<image class="add-icon" src="../../static/img/money/jia.png"></image>
						<text class="add-text">添加银行卡</text>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import factory from '@/utils/factory';
	const app = getApp();
	// ||'../../static/img/text.png'
	export default {
		data() {
			return {
				userPkid:uni.getStorageSync('userPkid') || '',
				factory: require('@/utils/factory.js'),
				// imgHost: app.globalData.baseUrl + '/',../../static/img/text.png
				imgHost: '../../static/img/text.png',
				imageSrc: '../../static/img/money/balance-bac.png',
				bankCard:'1234567812345678',
				bankCardInfo:{},
				banlance:''
			};
		},
		computed:{
			loading() {
				return this.$store.state.loadingShow
			},
		},
		onShow() {
			this.init()
		},
		
		methods:{
			//初始化
			init() {
				this.getBanlance()
				this.getBankCard()
			},
			
			// 获取余额
			getBanlance() {
				let params = {
					supplierPkid:this.userPkid
				}
				this.API.service.getToken(`${this.URL.myBanlance}/${params.supplierPkid}`).then(res => {
					if (res.code == 200) {
						this.banlance= res.data.balanceAmount
					}
				})
			},
			// 余额明细页面
			goRechargeList() {
				uni.navigateTo({
					url:"rcharge-list-detail"
				})
			},
			// 充值页面
			goRecharge() {
				uni.navigateTo({
					url:"rcharge"
				})
			},
			//获取银行卡
			getBankCard() {
				let params = {
					supplierPkid:this.userPkid
				}
				this.API.service.getToken(`${this.URL.getMyBankCard}/${params.supplierPkid}`).then(res => {
					if (res.code == 200) {
						this.bankCardInfo = res.data
						uni.setStorageSync('bankInfo',this.bankCardInfo)
					}
				})
			},
			// 添加银行卡
			addBank() {
				uni.navigateTo({
					url:"bank-add"
				})
			},
			//更换银行卡
			edit() {
				let bankInfo = JSON.stringify(this.bankCardInfo)
				
				let pages = getCurrentPages();
				let curPage = pages[pages.length-1].is;
				uni.navigateTo({
					url: `identifyConfirm?bankInfo=${bankInfo}&curPage=${curPage}`
				})
				
				// uni.navigateTo({
				// 	url: `bank-edit?bankInfo=${bankInfo}`
				// })
			},
			// 下拉刷新
			onPullDownRefresh() {
				this.init()
				setTimeout(() => {
					uni.stopPullDownRefresh(); //停止下拉刷新动画
				}, 500)
			},
		}
	}
</script>

<style lang="less">
	.page {
		.main {
			width: 100%;
			min-height: 100%;
			background-color: #FFFFFF;
			padding: 30upx;

			.top {
				margin-top: 30upx;

				.title {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.top-left {
						color: #333333;
						font-size: 32upx;
						font-weight: 600;
					}

					.top-right {
						color: #333333;
						font-size: 28upx;
					}
				}

				.content {
					margin-top: 15upx;
					position: relative;
					height: 330upx;

					.bac-img {
						width: 100%;
						position: absolute;

						image {
							width: 100%;
							height: 324upx;
							background-repeat: no-repeat;
							background-size: cover;
						}
					}

					.recharge-btn:active {
						opacity: 0.55;
					}

					.recharge-btn {
						font-size: 24upx;
						color: #FFC800;
						position: absolute;
						right: 0upx;
						top: 40rpx;
						line-height: 51upx;
						text-align: center;
						z-index: 99;

						width: 108upx;
						height: 51upx;
						background: linear-gradient(270deg, #FFF0BB 0%, #FFF9DB 100%);
						border-radius: 24px 0px 0px 24px;
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

			}

			.bottom {
				margin-top: 30upx;

				.title {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.top-left {
						color: #333333;
						font-size: 32upx;
						font-weight: 600;
					}

					.top-right {
						color: #333333;
						font-size: 28upx;
					}
				}

				.content {
					margin-top: 15upx;
					position: relative;
					height: 330upx;

					.bac-img {
						width: 100%;
						position: absolute;

						image {
							width: 100%;
							height: 292upx;
							background-repeat: no-repeat;
							background-size: cover;
						}
					}

					.recharge-btn:active {
						opacity: 0.55;
					}

					.recharge-btn {
						font-size: 24upx;
						color: #FFC800;
						position: absolute;
						right: 0upx;
						top: 40rpx;
						line-height: 51upx;
						text-align: center;
						z-index: 99;

						width: 108upx;
						height: 51upx;
						background: linear-gradient(270deg, #FFF0BB 0%, #FFF9DB 100%);
						border-radius: 24px 0px 0px 24px;
					}

					.money-title {
						position: absolute;
						top: 13%;
						// width: 100%;
						left: 8%;
						display: flex;
						align-items: center;
						color: #FFFFFF;
						font-size: 28upx;

					}

					.money-count {
						position: absolute;
						left: 8%;
						top: 53%;
						display: flex;
						align-items: center;
						// width: 100%;
						color: #FFFFFF;
						font-size: 50upx;

					}
				}
				.content-add{
					margin-top: 20upx;
					position: relative;
					height: 330upx;
					.add-btn:active{
						background-color: #ece7e7;
					}
					.add-btn{
						display: flex;
						justify-content: center;
						align-items: center;
						box-shadow: 0upx 0upx 10upx #ebe8d8;
						height: 100upx;
						border-radius: 15upx;
						image{
								width: 32upx;
								height: 32upx;
						}
						.add-text{
							margin-left: 10upx;
							color: #333333;
							font-size: 32upx;
							font-weight: 600;
						}
					}
				}
			}

		}
	}
</style>
