<template>
	<view class="page">
		<view class="main-no">
			<view class="content">
				<view class="content-left">
					<view class="progress-top">
						<image  class="progress-end-img" src="../../static/img/money/progress.png"></image>
						<view class="progress-end"></view>
					</view>
					<view class="progress-bottom">
						<view class="progress-start"></view>
						<view class="progress-start-img"></view>
					</view>
				</view>
				<view class="content-right">
					<view class="item-top">
						<view class="item-title" :class="status == 2 ? 'isStatusSty' : '' ">提现已到账</view>
						<view class="item-tips">提现到银行卡已经到账请查看</view>
					</view>
					<view class="item-bottom">
						<view class="item-title" :class="status == 1 ? 'isStatusSty' : '' ">提现进行中</view>
						<view class="item-tips">成功发起提现，24小时到账请注意查看信息</view>
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
				status:2, //已到账
			};
		},
		methods:{
			back() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="less">
	.page {
		width: 100%;
	}
	.main-no{
		width: 100%;
		display: flex;
		.content{
			display: flex;
			// align-items: center;
			background-color: #FFFFFF;
			padding-top: 30upx;
			padding-bottom: 30upx;
			width: 100%;
			height: 350upx;
			.content-left{
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				width: 20%;
				.progress-top{
					height: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					margin-top: 20upx;
					.progress-end-img{
						width: 32upx;
						height: 32upx;
						
					}
					.progress-end{
						background-color: #FFC800;
						height: 70%;
						width: 4upx;
					}
				}
				.progress-bottom{
					margin-bottom: 90upx;
					height: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					.progress-start{
						
						background-color: #f7f7f7;
						height: 100%;
						width: 4upx;
					}
					.progress-start-img{
						background-color: #f7f7f7;
						height: 15upx;
						width: 15upx;
						border-radius: 50%;
					}
				}

				
			}
			.content-right{
				width: 80%;
				.item-top{
					margin-top: 15upx;
					.item-title{
						color: #333333;
						font-size: 32upx;
						font-weight: 600;
					}
					.item-tips{
						margin-top: 10upx;
						color: #999999;
						font-size: 26upx;
					}
				}
				.item-bottom{
					margin-top: 60upx;
					.item-title{
						color: #333333;
						font-size: 32upx;
						font-weight: 600;
					}
					.item-tips{
						margin-top: 10upx;
						color: #999999;
						font-size: 26upx;
					}
				}

			}
		}
		
	}
	.isStatusSty{
		color: #FFC800!important;
	}
</style>
