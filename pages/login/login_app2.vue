<template>
	<view class="page-login">
		<ourLoading v-if="loading" active text="加载中..." />
		<!-- 	<navBar custom="false"></navBar> -->
		<view class="main">
			<view class="main-content">
				<view class="content">
					<view class="head-img"></view>
					
					<view class="login-content">
						<view class="login-icon">
							<image src="../../static/img/login/jx-logo2.png"></image>
						</view>
						<view class="login-user">
							<view class="username">
								<image src="../../static/img/login/username.png"></image>
							</view>
							<!-- <input class="item-input" v-model="form.username" placeholder="请输入用户名" /> -->
							<input class="uni-input" cursor-spacing = "10" type="text" v-model="form.username" placeholder-style="color:#CCCCCC;text-align:left"  placeholder="请输入用户名" />
							
						</view>
						<view class="login-password">
							<block v-if="!passwordShow">
								<view class="password">
									<image src="../../static/img/login/password.png"></image>
								</view>
								<!-- <input class="item-input" v-model="form.password" /> -->
								<input class="uni-input" cursor-spacing = "10" type="text" password=true v-model="form.password" placeholder-style="color:#CCCCCC;text-align:left" placeholder="请输入密码" />
								<view class="password-eye-open" @tap="changePassword(true)">
									<image src="../../static/img/login/password-open.png"></image>
								</view>
							</block>
							<block v-else>
								<view class="password">
									<image src="../../static/img/login/password.png"></image>
								</view>
								<!-- <input class="item-input" v-model="form.password" /> -->
								<input class="uni-input" cursor-spacing = "10" type="text"  v-model="form.password" placeholder-style="color:#CCCCCC;text-align:left" placeholder="请输入密码" />
								<view class="password-eye-open" @tap="changePassword(false)">
									<image src="../../static/img/login/password-close.png"></image>
								</view>
							</block>
							
						</view>
						
						
						
						<view class="login-submit" @tap="login">
							登陆
						</view>
<!-- 						<view class="login-opt">
							<view class="passForget">忘记密码</view>
							<view class="passForget">注册</view>
						</view> -->
					
					</view>
				</view>

			
				
			</view>
		</view>

	</view>
</template>

<script>
	import navBar from '@/components/navigation-bar/navigation-bar.vue';
	const app = getApp();
	
	export default {
		data() {
			return {
				passwordShow:false,
				form:{
					username:'',
					password:''
				}
			};
		},
		components: {
			navBar
		},
		computed:{
			loading() {
				return this.$store.state.loadingShow
			}
		},
		onShow() {
		
		},
		methods:{
			// 改变密码类型
			changePassword(item) {
				this.passwordShow = item
			},
			// 登陆
			login() {
				if(!this.form.username) {
					return app.globalData.showToast('请输入正确的用户名!');
				}
				if(!this.form.password) {
					return app.globalData.showToast('请输入正确的密码!');
				}
				
				let params = {
					supplierName: this.form.username.replace(/\s*/g,""),
					supplierPassword: this.form.password.replace(/\s*/g,""),
				}
				this.API.service.post(this.URL.login, params).then(res => {
					if (res.code == 200) {
						// Todo
						uni.setStorageSync('token',res.token)
						uni.setStorageSync('userPkid',res.pkid)
						app.globalData.showToast('登陆成功!');
						uni.setStorageSync('isLogin',true)
						this.$store.commit('isLogin')
						setTimeout( ()=> {
							uni.reLaunch({
							 	url: '../my/my'
							 })
						}, 1000)
						
						
					} else {
						app.globalData.showToast(res.msg);
					}
				})
				
			}
			
		},
	}
</script>

<style lang="less">
	.page-login{
		//background-color: #ffffff!important;
		min-height: 100%;
		.main {
			width: 100%;
			min-height: 100%;
			
			//background-color: #ffffff!important;
			
			.main-content {
				height: 100%;
				.content {
					width: 100%;
					height: 100%;
					display: flex;
					// justify-content: center;
					 align-items: center;
					flex-direction: column;
					// position: relative;
					
					.head{}
					.login-content{
						display: flex;
						justify-content: center;
						align-items: center;
						flex-direction: column;
						background-color: #FFFFFF;
						border-radius: 20upx;
						width: 94%;
						margin-top: 50upx;
						padding: 40upx;
						.login-icon{
							image{
								
								width: 226upx;
								height:407upx;
								display: flex;
								align-items: center;
								justify-content: center;
							}
						}
						.login-password{
							margin-top: 30upx;
							background-color:#f7f7f7 ;
							padding: 15upx;
							display: flex;
							align-items: center;
							width: 86%;
							height: 80upx;
							border-radius: 15upx;
							z-index: 9999;
							input{
								padding-left: 20upx;
								//text-align:left;
							}
							.password{
								
								image{
									width:32upx;
									height:32upx;
								}
							}
							.password-eye-open{
								margin-left: auto;
								image{
									width:47upx;
									height:32upx;
								}
							}
							.password-eye-close{
								margin-left: auto;
								image{
									width:60upx;
									height:32upx;
								}
							}
							.item-input{
								
							}
						}
						.login-user{
							margin-top: -45upx;
							padding: 15upx;
							background-color:#f7f7f7 ;
							display: flex;
							align-items: center;
							width: 86%;
							height: 80upx;
							border-radius: 15upx;
							z-index: 9999;
							input{
								padding-left: 20upx;
								//text-align:left;
							}
							.username{
								image{
									width:32upx;
									height:32upx;
								}
							}
							.item-input{
								
							}
						}
						.login-opt{
							width: 80%;
							margin-top: 20upx;
							display: flex;
							justify-content: space-between;
							.passForget{
								color: #cccccc;
								font-size: 26upx;
							}
						}
						.login-submit{
							margin-top: 40upx;
							width: 86%;
							background: #FFC800;
							color: #FFFFFF;
							font-size: 30upx;
							display: flex;
							align-items: center;
							justify-content: center;
							height: 80upx;
							border-radius: 15upx;
						}
					}

				}
				


				
			}
		}
		
	}
</style>