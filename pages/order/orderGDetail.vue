<template>
	<view class="page">
		<ourLoading v-if="loading" active text="加载中..." />
		<uni-popup ref="popup" type="kefu">
			<keFuPop ref="kefuPop" :phone="phone" @call="call"></keFuPop>
		</uni-popup>
		<uni-popup ref="popupU" type="uploadProgress" @change="mbClose">
			<uploadProgress ref="uploadProgressPop"  @submitProgress="submitProgress"></uploadProgress>
		</uni-popup>
		<view class="main">
			<view class="main-content">
				<view class="content">


					<view class="head">
						<view class="order-status-img">
							<image :src="orderStatusControl[orderDetail.orderStatus].statusImg"></image>
						</view>
						<view class="order-status-text">{{orderStatusControl[orderDetail.orderStatus].statusText}}</view>
						<view class="order-status-tips">{{orderStatusControl[orderDetail.orderStatus].statusTips}}</view>
					</view>

					<!-- 样品生产状态-start 订单状态为进行中、待支付尾款 status:6、7、8、9、10、11、12 -->
					<view v-if="(orderDetail.orderStatus != 4 && orderDetail.orderStatus != 5) && orderProcessList.length > 0"
					 class="production">
						<view class="production-item" v-for="(item,index) in orderProcessList">
							<view class="production-item-title">
								
								<text class="production-item-title-left">[{{item.orderOperateTitle}}]</text>
								
								<text class="production-item-title-des">{{item.orderOperateContent}}</text>
							</view>
							<view class="production-item-value">{{item.createTime}}</view>
						</view>
						<view v-if="!isBottom" class="more" @tap="more">
							<image src="../../static/img/down.png"></image>
						</view>
						<view v-else class="more" @tap="more">到底了~</view>
					</view>
					<view class="processNoData" v-if="(orderDetail.orderStatus != 4 && orderDetail.orderStatus != 5) && orderProcessList.length == 0" >
						暂无生产进度
					</view>

					<!-- 样品生产状态-start -->

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
						<view class="mid-des-value">{{orderDetail.orderNote}}</view>

					</view>

<!-- 					<view class="mid-item-product">
						<view class="mid-item-title">
							<text>{{orderDetail.receiverName}}</text>
							<text class="phone">{{orderDetail.receiverPhone}}</text>
						</view>
						<view class="product-item">
							<view class="product-title">{{orderDetail.receiverProvince}}{{orderDetail.receiverCity}}{{orderDetail.receiverRegion}}{{orderDetail.receiverDetailAddress}}</view>
						</view>
					</view> -->

					<view class="mid-item-product">
						<view class="mid-item-title">订单信息</view>
						<view class="product-item">
							<view class="product-title">创建时间:</view>
							<view class="product-value">{{orderDetail.orderCreateTime}}</view>
						</view>
						<block v-if="orderDetail.orderStatus != 1  && orderDetail.orderStatus != 2 && orderDetail.orderStatus != 3 && orderDetail.orderStatus != 4 && orderDetail.orderStatus != 5">
							<view class="product-item">
								<view class="product-title">订单编号:</view>
								<view class="product-value">{{orderDetail.orderNo}}</view>
							</view>
							<view class="product-item">
								<view class="product-title">定金支付:</view>
								<view class="product-value">{{orderDetail.orderDepositPaymentTime}}</view>
							</view>
							<view class="product-item">
								<view class="product-title">支付方式:</view>
								<view v-if="orderDetail.orderDepositPayType == 1" class="product-value">微信支付</view>
								<view v-if="orderDetail.orderDepositPayType == 2" class="product-value">余额支付</view>
								<view v-if="orderDetail.orderDepositPayType == 3" class="product-value">银联支付</view>
							</view>

							<view class="order-bottom" v-if="orderDetail.orderStatus == 9 || orderDetail.orderStatus == 10 || orderDetail.orderStatus == 11 || orderDetail.orderStatus == 12">
								<view class="product-item">
									<view class="product-title">尾款支付:</view>
									<view class="product-value">{{orderDetail.orderFinalPaymentTime}}</view>
								</view>
								<view class="product-item">
									<view class="product-title">支付方式:</view>
									<view v-if="orderDetail.orderFinalPayType == 1" class="product-value">微信支付</view>
									<view v-if="orderDetail.orderFinalPayType == 2" class="product-value">余额支付</view>
									<view v-if="orderDetail.orderFinalPayType == 3" class="product-value">银联支付</view>
								</view>
							</view>

						</block>
					</view>

					<view v-if="(orderDetail.orderStatus && orderDetail.orderStatus != 11 && orderDetail.orderStatus != 12)"  class="bottom">
						<view class="btn-item" v-for="(item,index) in btns" :key="index" @tap="btnsConfig(item.opt)">{{item.optText}}</view>
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
				return this.operationBtns[this.orderDetail.orderStatus]
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
						statusText: '洽谈中...',
						statusTips: ' 您正在确定订单详细要求~',
						statusImg: '../../static/img/order/order-status-5.png',
					},
					{
						status: 6,
						statusText: '订单正在进行中...',
						statusTips: ' 正在努力的生产中~',
						statusImg: '../../static/img/order/order-status-6.png',
					},
					{
						status: 7,
						statusText: '订单正在待验收...',
						statusTips: ' 平台正在对订单进行验收~',
						statusImg: '../../static/img/order/order-status-7.png',
					},
					{
						status: 8,
						statusText: '配送中...',
						statusTips: '订单已验收完成, 正在火速派送中~',
						statusImg: '../../static/img/order/order-status-8.png',
					},
					{
						status: 9,
						statusText: '配送中...',
						statusTips: '订单已验收完成, 正在火速派送中~',
						statusImg: '../../static/img/order/order-status-9.png',
					},
					{
						status: 10,
						statusText: '已发货...',
						statusTips: '订单已发货, 请等待确认~',
						statusImg: '../../static/img/order/order-status-10.png',
					},
					{
						status: 11,
						statusText: '待收尾款',
						statusTips: ' 您的订单已派送完成,请等待支付尾款',
						statusImg: '../../static/img/order/order-status-11.png',
					},
					{
						status: 12,
						statusText: '订单已完成',
						statusTips: ' 恭喜您,订单已成功完成~',
						statusImg: '../../static/img/order/order-status-12.png',
					},
				],
				operationBtns: [
					[],
					[{//1
						opt: 'editOrder',
						optText: '修改需求'
					}, {
						opt: 'cancelPublish',
						optText: '取消发布'
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
					}],
					[{//5
						opt: 'receiverOrder',
						optText: '确定接单'
					},
					{
						opt: 'contact',
						optText: '联系平台'
					},
					{
						opt: 'cancelRob',
						optText: '取消抢单'
					}],
					[{//6
						opt: 'finishProduct',
						optText: '加工完成'
					}, {
						opt: 'uploadProgress',
						optText: '上报进度'
					}],
					[{//7
						opt: 'contact',
						optText: '联系平台'
					},
					{
						opt: 'cancelFinish',
						optText: '取消验货'
					}
					],
					[{//8
						opt: 'contact',
						optText: '联系平台'
					}],
					[{//9
						opt: 'contact',
						optText: '联系平台'
					}],
					[{//10
						opt: 'contact',
						optText: '联系平台'
					}],
					[{//11
						opt: 'contact',
						optText: '联系平台'
					}],
					[{//12
						opt: 'contact',
						optText: '联系平台'
					}],

				],
				page: {
					pageNum: 1,
					pageSize: 3
				},
				isBottom: false,
				orderProcessList:[],
				total:0
			};
		},
		onLoad(options) {
			console.log(options, this.loading)
			let order = JSON.parse(options.order)
			// 判断用户是否在订单页点击上报进度
			console.log('options.orderIndexCome', options.orderIndexCome)
			if(options.orderIndexCome && options.orderIndexCome == 'true') {
				this.uploadProgress()
			}
			
			this.orderDetail =  order
			//  this.orderDetail =  {}
			 this.getDetail()
			 this.init()
			

		},
		methods: {
			// 初始化
			init() {
				this.page.pageNum = 1
				this.orderProcessList = []
				this.isBottom = false
				this.getProcessList()
			},
			// 获取订单详情
			getDetail() {
				let params = {
					supplierPkid: this.userPkid,
					orderStatus:this.orderDetail.orderStatus,
					userPkid: this.orderDetail.userPkid,
				}
				this.API.service.getToken(`${this.URL.orderDetail}/${this.orderDetail.pkid}`, params).then(res => {
					if (res.code == 200) {
						this.orderDetail = res.data || {}
					}
				})
			},
			// 更多
			more() {
				
				if (this.orderProcessList.length >= this.total) {
					 this.isBottom = true
				} else {
					this.isBottom = false
				}
				
				if (this.isBottom) {
					return app.globalData.showToast('已经到底啦(*^▽^*)');
				}
				this.page.pageNum = this.page.pageNum + 1
				this.getProcessList()
			},
			// 获取加工列表
			getProcessList() {
				let params = {
					supplierPkid: this.userPkid,
					orderPkid:this.orderDetail.pkid,
					pageNum: this.page.pageNum,
					pageSize: this.page.pageSize,
					orderByColumn: 'createTime',
					isAsc: 'desc',
				}
				this.API.service.getToken(this.URL.processList, params).then(res => {
					if (res.code == 200) {
						this.total = res.total
						this.orderProcessList = this.orderProcessList.concat(res.rows) || []
						//app.globalData.showToast('加载成功');
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
			// 修改需求
			editOrder() {
				let order = JSON.stringify(this.orderDetail)
				uni.navigateTo({
					url: `../publish/publish-edit?order=${order}`
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
			// 执行取消订单API
			cancelOrderGo() {
				let params = {
					userPkid: this.userPkid,
					pkid:this.orderDetail.pkid
				}
				this.API.service.putToken(this.URL.orderCancel, params).then(res => {
					if (res.code == 200) {
						app.globalData.showToast('取消成功!');
						setTimeout(() => {
							uni.navigateTo({
								url:'../index/index'
							})
						},500)
					}
				})
			},
			// 联系平台
			contact(item) {
				this.$refs.popup.open()
			},

			// 执行取消验货API
			cancelInspection() {
				let params = {
					supplierPkid: this.userPkid,
					orderPkid: this.orderDetail.pkid,
					orderStatus: this.orderDetail.orderStatus,
					userPkid: this.orderDetail.userPkid,
				}
				this.API.service.putToken(this.URL.cancelInspection, params).then(res => {
					if (res.code == 200) {
						app.globalData.showToast('取消成功!');
						setTimeout(() => {
							uni.reLaunch({
								url:'order'
								
							})
						},500)
					}
				})
			},
			
			// 取消验货
			cancelFinish() {
				console.log('uploadProgress')
				uni.showModal({
					title: '取消验货?',
					content: '',
					cancelText: '关闭',
					success: res => {
						if (res.confirm) {
							// Todo
							console.log('用户点击确认');
							this.cancelInspection()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			mbClose() {
				console.log('mbClose')
				setTimeout(() => {
				     this.$refs.uploadProgressPop.inputFocus = false
				}, 500)
			},
			// 上报进度
			uploadProgress() {
				this.$refs.popupU.open()
				setTimeout(() => {
				     this.$refs.uploadProgressPop.inputFocus = true
					// this.$refs.uploadProgressPop.plcolor = "color:#CCCCCC"
						this.$refs.uploadProgressPop.setPlSty()
				}, 500)
				
				
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
			 finishProductGo() {
				 let params = {
				 	orderPkid: this.orderDetail.pkid,
				 	userPkid: this.orderDetail.userPkid,
				 	orderStatus:this.orderDetail.orderStatus,
				 	supplierPkid: this.userPkid,
				 }
				 this.API.service.putToken(this.URL.finishProgress, params).then(res => {
				 	if (res.code == 200) {
				 		app.globalData.showToast('操作成功!');
				 		setTimeout(() => {
				 			uni.reLaunch({
				 				url:'order'
				 				
				 			})
				 		},500)
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
							this.finishProductGo()
			
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
						setTimeout(() => {
							uni.reLaunch({
								url:'../index/index'
								// url:'order'
							})
						},500)
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
						
						setTimeout(() => {
							uni.reLaunch({
								url:'order'
							})
						},500)
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
			// 拨打电话
			call(phone) {
				// TODO 做一些其他的事情，手动执行 done 才会关闭对话框
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
				this.$refs.kefuPop.close()
			},
			// 上传进度
			submitProgress(form) {
				// TODO 做一些其他的事情，手动执行 done 才会关闭对话框
				console.log('submitProgress', form)
				
				form.title = form.title.replace(/\s*/g,"");
				form.des = form.des.replace(/\s*/g,"");


				if(!form.title) {
					return app.globalData.showToast('未填写进度标题!');
				}
				if(!form.des) {
					return app.globalData.showToast('未填写进度需求!');
				}
				this.submitProgressGo(form)
			},
			// 上传进度api
			submitProgressGo(item) {
				
				let params = {
					orderOperateContent:item.des,
					orderOperateTitle:item.title,
					orderPkid: this.orderDetail.pkid,
					userPkid: this.orderDetail.userPkid,
					orderStatus:this.orderDetail.orderStatus,
					supplierPkid: this.userPkid,
				}
				this.API.service.postToken(this.URL.uploadProgress, params).then(res => {
					if (res.code == 200) {
						this.$refs.uploadProgressPop.close()
						app.globalData.showToast('上传成功!');
						this.init()
					}
				})
				
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
						.more{
							color: #6271AC;
							// border: 1px solid #fff5f5;
							font-size: 29upx;
							font-weight: 600;
							padding-top: 8upx;
							padding-bottom: 8upx;
							display: flex;
							justify-content: center;
							align-items: center;
							image{
								width: 32upx;
								height: 32upx;
							}
						}

						.production-item {

							margin-top: 25upx;

							.production-item-title {
								display: flex;
								align-items: center;
								color: #888888;
								font-size: 29upx;
								font-weight: 600;
								padding-top: 10upx;
								padding-bottom: 6upx;
								.production-item-title-left{
									display: flex;
									align-items: center;
								}
								.production-item-title-des{
									display: flex;
									align-items: center;
									margin-left: 15upx;
								}
							}


							.production-item-value {
								color: #999999;
								font-size: 25upx;
								//font-weight: 600;
								padding-top: 6upx;
								padding-bottom: 10upx;
							}
						}

						.production-item:first-child {

							.production-item-title {
								color: #333333 !important;

							}

						}
					}

					.processNoData{
						margin-top: 25upx;
						margin-left: 20upx;
						margin-right: 20upx;
						background-color: #FFFFFF;
						color: #999999;
						font-size: 29upx;
						font-weight: 600;
						padding-top: 20upx;
						padding-bottom: 20upx;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 15upx;
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
							padding-top: 10upx;
							padding-bottom: 10upx;
							display: flex;
							align-items: center;

							.product-title {
								
							}

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
						position: fixed;
						bottom: 0;
						height: 100upx;
						background-color: #FFFFFF;
						display: flex;
						align-items: center;
						justify-content: center;
						width: 100%;
						border-top: 1px solid #E5E5E5;

						.btn-item {
							 // width: 50%;
							 flex: 1;
							height: 100%;
							display: flex;
							justify-content: center;
							align-items: center;
							color: #6271AC;
							font-size: 30upx;
							border-right: 1px solid #E5E5E5;
						}
						view:last-child {
							border: none;
							
						}
					}

				}
			}
		}
	}
</style>
