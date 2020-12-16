<template>
	<view class="page">
		<view class="main">
			<view class="main-content">
				<view class="content">
					<view class="item" @tap="selectAddress(item)" v-for="(item,index) in addressList" :key="index">
						<view class="head">
							<text class="head-name">{{item.username}}</text>
							<text class="head-phone">{{item.phone}}</text>
						</view>
						<view class="mid">
							<text class="mid-address">{{item.address}}</text>
						</view>
						<view class="bottom">
							<view class="bottom-left">
								<radio value=true :checked=" item.isDefault === true " @tap.stop="selectPayType(item)" />
								<text class="radio-tips">设为默认</text>
							</view>
							<view class="bottom-right">
								<view class="delete-btn" @tap="del">删除</view>
								<view class="edit-btn" @tap="edit">编辑</view>
							</view>
						</view>
					</view>

					<view class="add-btn" :class="btnFix ? 'btn-fix' : '' " @tap="goAdd">
						<image class="add" src="../../static/img/address/add.png"></image>

						<text>新增</text>

					</view>

					<image class="add-icon" src="../../static/img/address/add-icon.png" @tap="goAdd"></image>

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
				index: 1,
				btnFix: false,
				addressList: [{
						username: '张三',
						phone: '18895336221',
						address: '江苏省苏州市吴江区庞金路859号1栋',
						isDefault: false
					},
					{
						username: '李四',
						phone: '18895336221',
						address: '江苏省苏州市吴江区庞金路100号1栋',
						isDefault: false
					},
					{
						username: '张三1',
						phone: '18895336221',
						address: '江苏省苏州市吴江区庞金路456号1栋',
						isDefault: false
					},
					{
						username: '张三4',
						phone: '18895336221',
						address: '江苏省苏州市吴江区庞金路409号1栋',
						isDefault: false
					}
				]
			};
		},
		computed: {

		},
		methods: {
			selectPayType(item) {
				item.isDefault = !item.isDefault
			},
			// 删除
			del() {
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
			// 编辑
			edit() {
				// Todo
			},
			// 新增
			goAdd() {
				uni.navigateTo({
					url: 'addressAdd'
				})
			},
			// 选择地址
			selectAddress(item) {
			
				let pages = getCurrentPages(); //获取所有页面栈实例列表
				let nowPage = pages[pages.length - 1]; //当前页页面实例
				let prevPage = pages[pages.length - 2]; //上一页页面实例
				prevPage.$vm.form.address = item.address; //修改上一页data里面的searchVal参数值为1211
				prevPage.$vm.form.username = item.username;
				prevPage.$vm.form.phone = item.phone;
				uni.navigateBack({ //uni.navigateTo跳转的返回，默认1为返回上一级
					delta: 1
				});
			},
		},

		onPageScroll(e) {
			// this.btnFix = true
		}
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
					padding: 25upx;
					width: 100%;

					.item {
						margin-top: 20upx;
						background: #FFFFFF;
						padding: 20upx;
						border-radius: 15upx;
						min-height: 100upx;

						.head {
							display: flex;
							align-items: center;
							color: #333333;
							font-size: 35upx;

							// font-weight: 600;
							.head-name {}

							.head-phone {
								margin-left: 20upx;
							}
						}

						.mid {
							display: flex;
							align-items: center;
							padding-top: 20upx;
							padding-bottom: 20upx;

							.mid-address {
								color: #999999;
								font-size: 28upx;
							}
						}

						.bottom {
							display: flex;
							align-items: center;
							border-top: 1px solid #E5E5E5;
							padding-top: 25upx;

							// padding-bottom: 15upx;
							.bottom-left {
								width: 70%;
								display: flex;

								radio {}

								.radio-tips {
									margin-left: 15upx;
									color: #999999;
									font-size: 28upx;
								}
							}

							.bottom-right {
								width: 30%;
								display: flex;
								align-items: center;
								justify-content: space-around;
								color: #6271AC;
								font-size: 28upx;

								.delete {}

								.edit {}
							}
						}
					}

					.add-btn {
						position: sticky;
						bottom: 0;
						margin-top: 20upx;
						background-color: #FFFFFF;
						display: flex;
						justify-content: center;
						align-items: center;
						height: 80upx;
						border-radius: 15upx;

						// border-top: 1px solid #E5E5E5;
						.add {
							width: 32upx;
							height: 32upx;
						}

						text {
							margin-left: 10upx;
							color: #333333;
							font-size: 30upx;
							font-weight: 600;
						}
					}

					.btn-fix {
						width: 100%;
						position: fixed;
						bottom: 20%;

					}

					.add-icon {
						width: 64upx;
						height: 64upx;
						position: fixed;
						right: 30upx;
						bottom: 20%;
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
