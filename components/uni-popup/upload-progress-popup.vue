<template>
	<view>
		<view class="content">
			<view class="top">
				<text class="cancel" @tap='cancel'>取消</text>
				<text class="title">上报进度</text>
				
				<text class="submit" @tap="submitProgress()">提交</text>
			</view>
			<view class="bottom">
				<view class="bottom-item">
					<input :focus="inputFocus" class="uni-input" cursor-spacing = "80" maxlength="10" type="text" v-model="form.title" placeholder-style="color:#CCCCCC;text-align:left"  placeholder="请输入进度标题" />
					<text class="text-des-input">{{form.title.length}}/10</text>
				</view>
				<view class="bottom-item">
					<textarea maxlength="200" class="uni-input"  cursor-spacing = "80"  v-model="form.des" :placeholder-style="plcolor" placeholder="请详细描述您的需求" />
						<view class="text-des">{{form.des.length}}/200</view>
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
				form:{
					title:'',
					des:''
				},
				inputFocus:false,
				plcolor:"color:#CCCCCC"
			}
		},
		created() {
			
		},
		methods: {
			/* android textholder样式处理 */
			setPlSty() {
				this.plcolor = "color:#cccccc"
			},
			/**
			 * submit提交
			 */
			submitProgress(form) {
				console.log('form',this.form)
				this.$emit('submitProgress',this.form, () => {
					this.popup.close()
				})
			},
			/**
			 * 关闭窗口
			 */
			close() {
				this.form.des = ''
				this.form.title = ''
				this.inputFocus = false;
				
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
		height: 800upx;
	}
	.top{
		display: flex;
		justify-content: space-between;
		font-size: 32upx;
		.cancel{
			color: #6271AC;
		}
		.title{
			color: #000000;
		}
		.submit{
			color: #FFC800;
		}
	}
	.bottom{
		margin-top: 15upx;
		
		.bottom-item{
			position: relative;
			.text-des{
				position: absolute;
				bottom: 15upx;
				right: 30upx;
				color: #999999;
			}
			.text-des-input{
				top: 30upx;
				position: absolute;
				right: 10upx;
				color: #999999;
			}
			
		}
		.plcolor{
			color: #cccccc !important; 
		}
		
		textarea{
			margin-top: 15upx;
			background-color: #F7F7F7;
			padding: 15upx;
			width: 100%;
			height: 600upx;
			border-radius: 15upx;
			
		}
		input{
			background-color: #F7F7F7;
			padding: 15upx;
			width: 100%;
			height: 80upx;
			border-radius: 15upx;
			
		}
	}
</style>
