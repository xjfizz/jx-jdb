<template>
	<view class="page">
		<ourLoading v-if="loading" active text="加载中..." />
		<view class="main">
			<view class="main-content">
				<view class="content">
					<view class="item">
						<view class="item-title">身份验证</view>
						<view class="item-input-text">为保障账户和资金安全,请验证本人真实信息</view>
					</view>
					
					<!-- <view class="item">
						<view class="item-title-msg">卡号</view>
						<view class="item-input">
							<input class="uni-input" maxlength="24" @input="bankAccountInput" cursor-spacing="30" v-model="form.bankAccount"
							 placeholder-style="font-size:24upx; color:#CCCCCC;text-align:left" type="number"  placeholder="请填写银行卡号" />
						</view>
					</view> -->
					
					<!-- <view class="item">
						<view class="item-title-msg">卡类型</view>
						<view class="item-input">
							<input disabled class="uni-input" @input="preMoneyInput" cursor-spacing="30" v-model="form.bankName" placeholder-style="font-size:24upx; color:#CCCCCC;text-align:left"
							 placeholder="请填写银行类型 如: 中国工商银行" />
						</view>
					</view> -->

					

					<view class="item">
						<view class="item-title-msg">姓名</view>
						<view class="item-input">
							<input class="uni-input"  cursor-spacing="30" v-model="form.userName" placeholder-style="font-size:24upx; color:#CCCCCC;text-align:left"
							  placeholder="请填写真实姓名" />
						</view>
					</view>

					<view class="item">
						<view class="item-title-msg">身份证号</view>
						<view class="item-input">
							<input class="uni-input"  cursor-spacing="30" v-model="form.userIdNumber"
							 placeholder-style="font-size:24upx; color:#CCCCCC;text-align:left" type="idcard" placeholder="请填写您的身份证号" />
						</view>
					</view>

					<view class="item">
						<view class="item-title-msg">手机号</view>
						<view class="item-input">
							<input class="uni-input"  cursor-spacing="30" v-model="form.userPhone" placeholder-style="font-size:24upx; color:#CCCCCC;text-align:left"
							 type="number" placeholder="请填写银行卡预留手机号" />
						</view>
					</view>
				<!-- 	<view class="item-agree">
						<radio :checked="isAgree" @tap.stop="agreePass()" />
						<text class="agree-text" @tap.stop="agreePass()">已阅读并同意</text>
						<text class="agree-agreement">《<text class="agreement-go">巨像支付协议</text>》</text>

					</view> -->
					<view class="item-bottom">
						<view v-if="isAgree" class="item-submit" @tap="submit()">
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
				bank: require('@/utils/bank.js'),
				factory: require('@/utils/factory.js'),
				// isAgree:false,
				form: {
					//bankName: '',
					//bankAccount: '',
					userName: '',
					userIdNumber: '',
					userPhone: '',
				},
				bankInfo:{},
				curPage:''
			};
		},
		computed: {
			loading() {
				return this.$store.state.loadingShow
			},
			isAgree() {
				return this.form.userName && this.form.userIdNumber && this.form.userPhone
			}
		},
		onLoad(options) {
			console.log('===',options)
			this.bankInfo= JSON.parse(options.bankInfo)
			this.curPage= options.curPage
			console.log('==',this.bankInfo, this.curPage)
		},
		methods: {
			//银行卡号正则
			bankAccountInput(e) {
				let yhkd = e.detail.value
				let yhkchange = yhkd.replace(/(\d{4})(?=\d)/g, "$1 "); //replace(/\s/g,'');
				this.form.bankAccount = yhkchange
			    const bank = this.bank.bankCardAttribution(yhkd.replace(/\s/g,'')) //6222031302003441802
				this.form.bankName = bank.bankName
				
			},
			// 身份证正则
			userIdNumberInput() {
				 let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
				 if (reg.test(this.form.userIdNumber) === false) {
				        wx.showToast({
				          title: '请输入正确的身份证号码',
				          icon: 'none'
				        })
				        return false
				      } else {
						  return true
					  }
			},
			
			// 用户验证
			identify(){
				if(this.form.userName != this.bankInfo.userName) {
					app.globalData.showToast('用户姓名验证错误!');
					return false
				}
				if(this.form.userIdNumber != this.bankInfo.userIdNumber) {
					app.globalData.showToast('用户身份证号验证错误!');
					return false
				}
				if(this.form.userPhone != this.bankInfo.userPhone) {
					app.globalData.showToast('用户手机号验证错误!');
					return false
				}
				return true
			//	return (this.form.userName == this.bankInfo.userName) && (this.form.userIdNumber == this.bankInfo.userIdNumber) && (this.form.userPhone == this.bankInfo.userPhone) 
			},
			 
			// 提交
			submit() {
				/* 信息检验-start */
				
				
				
				// 用户姓名检测
				if(!this.form.userName) {
					return app.globalData.showToast('未填写用户姓名!');
				}
				
				// 身份证检测
				if(!this.userIdNumberInput()) {
					return
				}
				
				// 手机检测
				if(!this.factory.isPhone(this.form.userPhone)) {
					return app.globalData.showToast('手机号不正确!');
				}
				
				// 身份验证
				if(!this.identify()) {
					return
				}
				 
				/* 信息检验-end */
				let bankInfo = JSON.stringify(this.bankInfo)
				if(this.curPage == 'pages/money/money') { // 钱包首页进入-身份验证
					uni.navigateTo({
						url: `bank-edit?bankInfo=${bankInfo}`
					})
				} else if(this.curPage == 'pages/money/rcharge') { // 提现页面进入-身份验证
					uni.navigateTo({
						url: `password-set-edit?bankInfo=${bankInfo}`
					})
				}
				
			}
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
					padding: 30upx;
					width: 100%;

					.item-agree {
						min-height: 60upx;
						margin-top: 15upx;
						display: flex;
						align-items: center;

						.agree-text {
							margin-left: 10upx;
							font-size: 24upx;
							color: #cccccc;
						}

						.agree-agreement {
							margin-left: 10upx;
							font-size: 24upx;
							color: #cccccc;

							.agreement-go {
								font-size: 24upx;
								color: #7683B7;
							}
						}
					}

					.item {
						min-height: 100upx;
						border-bottom: 1px solid #E5E5E5;
						margin-top: 20upx;

						.item-title {
							font-size: 30upx;
							color: #333333;
						}

						.item-title-msg {
							font-size: 28upx;
							color: #999999;
						}

						.item-input-text {
							margin-top: 10upx;
							font-size: 25upx;
							color: #999999;
						}

						.item-input {
							margin-top: 5upx;
							display: flex;
							align-items: center;
							justify-content: space-between;

							input {
								height: 70upx;
								width: 100%;
								padding-top: 8upx;
								padding-bottom: 5upx;
								line-height: normal;
								text-align: left;
								font-size: 24upx;
								color: #333333;
							}
						}
					}

					.item-bottom {
						width: 100%;
						margin-top: 60upx;
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
							height: 70upx;
							background: #ffc800;
							font-size: 28upx;
							font-weight: 600;
							color: #333333;
							border-radius: 15upx;
							//border: 1px solid #ffaa83;
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
<style>
	radio .wx-radio-input.wx-radio-input-checked {
		border: 1rpx solid #FFC800 !important;
		background: #FFC800 !important;
	}
</style>
