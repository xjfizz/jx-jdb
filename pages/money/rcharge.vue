<template>
	<view class="page">
		<uni-popup ref="popupP" type="passwordPay" @change="mbClose">
			<passwordPay ref="passwordPayPop" @submitPassword="submit"></passwordPay>
		</uni-popup>
		<view class="main">
			<view class="main-content">
				<view class="content">
					<view class="head">
						<view class="head-title">
							提现(元)
						</view>
						<view class="head-input" style="border-bottom: 1px solid #E5E5E5;padding-bottom:14upx;">
							<input placeholder-style="font-weight:400;font-size:28upx; color:#CCCCCC"  type="number"  placeholder="￥ 请输入提现金额" v-model="MoneyNum" @input="MoneyInput" />
							
						</view>
						<view class="head-tips">
							<text class="withdrawal-tip">可提现余额</text><text class="withdrawal-money">{{balance || 0}}</text><text class="all-withdrawal" @tap="withdrawalAll">全部提现</text>
						</view>
					</view>
				
					<view class="bottom">
						<view class="bottom-head">转到银行卡</view>
						<!-- <view class="bottom-item">
							<image src="../../static/img/money/wx-pay.png" mode=""></image>
							<text>微信支付</text>
							<radio  value="1" :checked=" index === 1 " @tap="selectPayType(1)" />
						</view> -->
						<view class="bottom-item">
							<image src="../../static/img/money/yl-pay.png" mode=""></image>
							<text>{{bankCardInfo.bankName}}</text>
							<!-- <radio value="2" :checked=" index === 2 " @tap="selectPayType(2)" /> -->
						</view>
					</view>
					<view class="sub">
						<view class="sub-btn" @tap="rcharge">确认提现</view>
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
		data() {
			return {
				userPkid:uni.getStorageSync('userPkid') || '',
				MoneyNum: '',
				index:1,
				balance:'',
				bankCardInfo:{}
			};
		},
		onShow() {
			this.init()
		},
		methods:{
			//初始化
			init() {
				this.MoneyNum = ''
				this.mbClose()
				this.$refs.popupP.close()
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
						this.balance= res.data.balanceAmount
					}
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
					}
				})
			},
			// 输入金额校验
			MoneyInput: function(event) {
				if(this.balance <= 0){
					return app.globalData.showToast('当前账户可用余额不足!');
				}
				// this.MoneyNum = String(Math.abs((parseFloat((event.target.value))).toFixed(2)));
				var num = parseFloat(event.target.value);
				if(num<0){
					app.globalData.showToast('金额请大于0');
					this.$nextTick(() => {
						this.MoneyNum = ''
					})
					return false
				}
				if(isNaN(this.MoneyNum)) {
					app.globalData.showToast('金额只能为数字');
					this.$nextTick(() => {
						this.MoneyNum = ''
					})
					return false
				}
				if(event.target.value.split(".")[1] && event.target.value.split(".")[1].length>2){
					app.globalData.showToast('金额小数后两位');
					this.$nextTick(() => {
						this.MoneyNum = ''
					})
					return false
				}
				if(num > this.balance) {
					this.$nextTick(() => {
						this.MoneyNum = this.balance
					})
					console.log('this.MoneyNum', this.MoneyNum)
					return false
					
				}
				this.MoneyNum = num;
			},
			selectPayType(val) {
				this.index = val
			},
			mbClose() {
				console.log('mbClose')
				 // this.$refs.passwordPayPop.close()
				 setTimeout(() => {
				      this.$refs.passwordPayPop.clearInput()
				 }, 500)
			},
			
			//提交
			submit(val) {
				 this.rchargeGo(val)
				// uni.navigateTo({
				// 	url:"withdrawal-success"
				// })
			},
			// 提交-go
			rchargeGo(val) {
				let params = {
					withdrawalAmount: this.MoneyNum,
					payPassword:val,
					supplierPkid:this.userPkid
				}
				this.API.service.postToken(this.URL.cashWithdrawal,params).then(res => {
					if (res.code == 200) {
							uni.navigateTo({
								url:"withdrawal-success"
							})
					} else {
						app.globalData.showToast(res.msg);
					}
				})
			},
			
			// 提现
			rcharge() {
				console.log('rcharge')
				if(this.MoneyNum <= 0) {
					return app.globalData.showToast('提现金额必须大于0');
				}
				this.$refs.popupP.open()
				setTimeout(() => {
					this.$refs.passwordPayPop.KeyboarOpen()
				}, 50)
			},
			
			// 全部提现
			withdrawalAll() {
				this.MoneyNum = this.balance
			}
		}
	}
</script>

<style lang="less">
.page{
	.main{
		width: 100%;
		min-height: 100%;
		margin-bottom: 200upx;
		background-color: #F7F7F7;;
		.main-content{
			width: 100%;
			min-height: 100%;
			// padding: 30upx;
			.content{
				.head{
					background-color: #FFFFFF;
					 padding: 30upx;
					.head-title{
						color: #333333;
						font-size: 30upx;
					}
					.head-input{
						margin-top: 30upx;
						// border-bottom: 1px solid #F7F7F7 ;
						
					}
					.head-tips{
						margin-top: 30upx;
						color: #FFC800;
						font-size: 28upx;
						display: flex;
						align-items: center;
						justify-content: flex-start;
						.withdrawal-tip{
							color:#999999;
						}
						.withdrawal-money{
							margin-left: 10upx;
						}
						.all-withdrawal{
							margin-left: auto;
						}
					}
				}
				.bottom{
					
					.bottom-head{
						color: #999999;
						padding: 30upx;
					}
					.bottom-item{
						padding-left: 30upx;
						padding-right: 30upx;
						background-color: #FFFFFF;
						border-bottom: 1px solid #E5E5E5 ;
						display: flex;
						align-items: center;
						justify-content: flex-start;
						height: 80upx;
						image{
							width: 48upx;
							height: 48upx;
						}
						text{
							margin-left: 15upx;
						}
						radio{
							margin-left: auto;
							color: #FFC800;
							
						}
					}
				}
				.sub{
					width: 100%;
					margin-top: 30upx;
					display: flex;
					align-items: center;
					justify-content: center;
					.sub-btn{
						background-color: #FFC800;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 33upx;
						width: 94%;
						border-radius: 15upx;
						height:80upx;
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
