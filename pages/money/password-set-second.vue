<template>
	<view class="page">
		<ourLoading v-if="loading" active text="加载中..." />
		<number-keyboard tabBar ref='KeyboarHid' @input='setInput' psdLength='6'></number-keyboard>
		<view class="main">
			<view class="main-content">
				<view class="content">
					<view class="title">请再次设置支付密码</view>
					<view class="title-msg">支付密码不要设置重复，连续的数字更安全哦</view>
					<view class="password-input" @tap="KeyboarOpen()">
						<password-input :numLng='secondPassword'></password-input>
					</view>
					<view class="item-bottom">
						<view v-if="secondPassword.length == 6" class="item-submit" @tap="submit()">
							<text>确认提交</text>
						</view>
						<view v-else class=" item-submit item-submit-no">
							<text>确认提交</text>
						</view>
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
				userPkid:uni.getStorageSync('userPkid') || '',
				secondPassword: "", //二次密码
				bankInfo:{},
			};
		},
		computed: {
			loading() {
				return this.$store.state.loadingShow
			},
		},
		onLoad(options) {
			this.bankInfo = JSON.parse(options.bankInfo)
			//因为此时实例没有挂载完成，需要延迟操作
			setTimeout(() => {
				this.$refs.KeyboarHid.open()
			}, 50)
		},
		methods: {
			//打开键盘
			KeyboarOpen(e) {
				this.$refs.KeyboarHid.open();
			},
			//输入的值
			setInput(val) {
				this.secondPassword = val;
			},
			// 提交
			submit() {
				if(this.secondPassword.length != 6) {
					return app.globalData.showToast('支付密码未输入完整!');
				}
				if(this.bankInfo.password != this.secondPassword) {
					return app.globalData.showToast('两次支付密码设置不一致!');
				}
				this.addBankCard()
			},
			//增加银行卡
			addBankCard() {
				let params = {
					bankAccount: this.bankInfo.bankAccount,
					bankName:this.bankInfo.bankName,
					payPassword:this.bankInfo.password,
					userIdNumber:this.bankInfo.userIdNumber,
					userName:this.bankInfo.userName,
					userPhone:this.bankInfo.userPhone,
					supplierPkid:this.userPkid
				}
				this.API.service.postToken(this.URL.addBankCard,params).then(res => {
					if (res.code == 200) {
						uni.reLaunch({url:'money'})
					}
				})
			},
		},
	}
</script>

<style lang="less">
	.page {
		height: 100%;

		.main {
			width: 100%;
			//margin-bottom: 150upx;
			background-color: #FFFFFF;
			height: 100%;

			.main-content {
				.content {
					padding: 25upx;
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;

					.title {
						margin-top: 200upx;
						color: #333333;
						font-size: 32upx;
						font-weight: 600;

					}

					.title-msg {
						margin-top: 20upx;
						color: #999999;
						font-size: 25upx;
					}
					.password-input{
						width: 95%;
						padding: 10rpx 0rpx;
						margin-top: 40upx;
					}

					.item-bottom {
						width: 100%;
						margin-top: 40upx;
						display: flex;
						justify-content: center;

						.item-submit:active {
							opacity: 0.55;
						}

						.item-submit {
							display: flex;
							align-items: center;
							justify-content: center;
							width: 95%;
							height: 80upx;
							background: #ffc800;
							font-size: 28upx;
							font-weight: 600;
							color: #333333;
							border-radius: 15upx;
							// border: 1px solid #ffaa83;
						}
						.item-submit-no{
							background-color: #FFEBA4;
							color: #FFFFFF;
						}
					}
				}




			}
		}

	}
</style>
