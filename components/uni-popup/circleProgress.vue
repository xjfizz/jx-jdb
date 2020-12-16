<template>
	<view>

		<view class="container">
			<view class='progress_box'>
				<canvas class="progress_bg" canvas-id="canvasProgressbg"> </canvas>
				<canvas class="progress_canvas" canvas-id="canvasProgress"> </canvas>
				<view class="progress_text">
					<view class="progress_dot"></view>
					<text class='progress_info'> {{progress_text}}</text>
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
		name: 'circleProgress',
		props: {
			phone: {
				type: String,
				default: ''
			}
		},
		inject: ['popup'],
		data() {
			return {
				progress_text: '正在抢单中...',
				count: 0, // 设置 计数器 初始为0
				countTimer: null, // 设置 定时器 初始为null
				order:{}
			}
		},
		created() {},
		onReady() {

		},
		onLoad() {

		},
		methods: {
			// 微信开发者版本报错
			// toJSON(){},
			//初始化数据
			init() {
				this.progress_text = '正在抢单中...',
					this.count = 0, // 设置 计数器 初始为0
					this.countTimer = null // 设置 定时器 初始为null
			},
			//初始化
			initCircle(item) {
				this.order = item
				this.init()
				this.drawProgressbg();
				// this.drawCircle(2)
				this.countInterval()
			},
			/**
			 * 抢单
			 */
			circleRob() {
				this.$emit('circleRob',this.order,  () => {
					this.popup.close()
				})
			},
			/**
			 * 关闭窗口
			 */
			close() {
				this.popup.close()
			},

			// 画圆
			drawProgressbg() {
				console.log('drawProgressbg===')
				// 使用 wx.createContext 获取绘图上下文 context
				var ctx = wx.createCanvasContext('canvasProgressbg', this)
				ctx.setLineWidth(4); // 设置圆环的宽度
				ctx.setStrokeStyle('#999999'); // 设置圆环的颜色
				ctx.setLineCap('round') // 设置圆环端点的形状
				ctx.beginPath(); //开始一个新的路径
				ctx.arc(110, 110, 100, 0, 2 * Math.PI, false);
				//设置一个原点(110,110)，半径为100的圆的路径到当前路径
				ctx.stroke(); //对当前路径进行描边
				ctx.draw();
			},

			// 设置彩色圆形
			drawCircle(step) {
				console.log('drawCircle===')
				var context = wx.createCanvasContext('canvasProgress', this);
				// 设置渐变
				var gradient = context.createLinearGradient(200, 100, 100, 200);
				gradient.addColorStop("0", "#ffc44e");
				gradient.addColorStop("0.5", "#40ED94");
				gradient.addColorStop("1.0", "#ffc800");

				context.setLineWidth(10);
				context.setStrokeStyle(gradient);
				context.setLineCap('round')
				context.beginPath();
				// 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角
				context.arc(110, 110, 100, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
				context.stroke();
				context.draw()
			},
			countInterval() {
				console.log('countInterval===')
				// 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
				this.countTimer = setInterval(() => {
					if (this.count <= 60) {
						/* 绘制彩色圆环进度条
						注意此处 传参 step 取值范围是0到2，
						所以 计数器 最大值 60 对应 2 做处理，计数器count=60的时候step=2
						*/
						this.drawCircle(this.count / (60 / 2))
						this.count++;
					} else {
						if(this.order) {
							this.progress_text = "抢单成功"
							clearInterval(this.countTimer);
							this.circleRob()
							this.close()
						} else {
							this.progress_text = "抢单失败"
							clearInterval(this.countTimer);
							this.circleRob()
							// this.close()
						}

					}
				}, 100)
			},


		}
	}
</script>
<style scoped lang="less">
	// wxss
	.progress_box {
		position: relative;
		width: 220px;
		height: 220px;
		// 这里的宽高是必须大于等于canvas圆环的直径 否则绘制到盒子外面就看不见了
		// 一开始设置 width:440rpx; height:440rpx; 发现 在360X640分辨率的设备，下绘制的圆环跑盒子外去了
		// 小程序使用rpx单位适配 ，但是canvas绘制的是px单位的。所以只能用px单位绘制的圆环在盒子内显示
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #eee;
	}

	.progress_bg {
		position: absolute;
		width: 220px;
		height: 220px;
	}

	.progress_canvas {
		width: 220px;
		height: 220px;
	}

	.progress_text {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center
	}

	.progress_info {
		font-size: 36rpx;
		padding-left: 16rpx;
		letter-spacing: 2rpx
	}

	.progress_dot {
		width: 16rpx;
		height: 16rpx;
		border-radius: 50%;
		background-color: #fb9126;
	}
</style>
