<template>
	<view>
		<number-keyboard tabBar ref='KeyboarHid' @input='setInput' psdLength='6'></number-keyboard>
		
		<view class="content">
			<view class="top">
				
				<text class="title">输入密码</text>
				<text class="reset" @tap="reset()">重置密码</text>
			</view>
			<view class="password-input" @tap="KeyboarOpen()">
				<password-input :numLng='password'></password-input>
			</view>
			<view class="submit-btn">
				
					<view v-if="password.length == 6" class="item-submit" @tap="submit()">
						<text>确认</text>
					</view>
					<view v-else class=" item-submit item-submit-no">
						<text>确认</text>
					</view>
				
			</view>
			<view class="submit-btn-cancel">
				<view class="item-submit-cancel" @tap="cancel()">
						<text>取消</text>
					</view>
			</view>
		</view>

	</view>
</template>

<script>
	/**
	 * PopUp 弹出层-消息提示
	 * @description 弹出层-消息提示
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=329
	 * @property {String} type = [success|warning|info|error] 主题样式
	 *  @value success 成功
	 * 	@value warning 提示
	 * 	@value info 消息
	 * 	@value error 错误
	 * @property {String} message 消息提示文字
	 * @property {String} duration 显示时间，设置为 0 则不会自动关闭
	 */

	export default {
		name: 'ProgressUpload',
		props: {
			
		},
		inject: ['popup'],
		data() {
			return {
				password:'',
				form:uni.getStorageSync('bankInfo')
			}
		},
		created() {
			
		},
		methods: {
			
			/**
			 * submit提交
			 */
			submit() {
				this.$emit('submitPassword',this.password, () => {
					this.popup.close()
				})
			},
			//重置密码
			reset() {
				// this.clearInput()
				
				let bankInfo = JSON.stringify(this.form)
				
				let pages = getCurrentPages();
				let curPage = pages[pages.length-1].is;
				uni.navigateTo({
					url: `identifyConfirm?bankInfo=${bankInfo}&curPage=${curPage}`
				})
				
				// uni.navigateTo({
				// 	url: `password-set-edit?bankInfo=${bankInfo}`
				// })
				
			},
			// 清空处理
			clearInput() {
				this.password = ''
				this.$refs.KeyboarHid.reset();
			},
			
			//打开键盘
			KeyboarOpen(e) {
				this.$refs.KeyboarHid.open();
			},
			//输入的值
			setInput(val) {
				console.log('val',val)
				this.password = val;
			},
			
			
			/**
			 * 关闭窗口
			 */
			close() {
				this.password = ''
				this.popup.close()
			},
			//取消
			cancel() {
				this.close()
			}
		}
	}
</script>
<style scoped lang="less">
	.content{
		
		background-color: #FFFFFF;
		padding: 30upx;
		min-height: 1000upx;
		display: flex;
		align-items: center;
		flex-direction: column;
		.top{
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			//position: relative;
			.title{
				color: #333333 ;
				font-size: 30upx;
				//position: absolute;
				//margin: 0 auto;
				//left: 0;
				//right: 0;
				//width: 100%;
			}
			.reset{
				position: absolute;
				right: 42upx;
				color: #6271AC ;
				font-size: 30upx;
			}
		}
		.password-input{
			width: 95%;
			padding: 10rpx 0rpx;
			margin-top: 40upx;
		}
		
		.submit-btn-cancel {
				width: 100%;
				margin-top: 30upx;
				display: flex;
				justify-content: center;
				.item-submit-cancel {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 95%;
					height: 80upx;
					font-size: 28upx;
					color: #999999;
				}
		}
		.submit-btn {
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
	
	
</style>
