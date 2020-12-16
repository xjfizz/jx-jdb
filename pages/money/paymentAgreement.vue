<template>
	<view class="page">
		<ourLoading v-if="loading" active text="加载中..." />
		<view class="main">
			<view class="main-content">
				<view class="content">
					<view class="title">一、服务条款的确认及接受</view>
					<view class="content-text">
						1、巨象（指巨象及其移动客户端软件、应用程序，以下称“本应用”）各项电子服务的所有权和运作权归属于“巨象”所有，本应用提供的服务将完全按照其发布的服务条款和操作规则严格执行。您确认所有服务条款并完成注册程序时，本协议在您与本应用间成立并发生法律效力，同时您成为本应用正式用户。
					</view>
					<view class="content-text">
						2、根据国家法律法规变化及本应用运营需要，巨象有权对本协议条款及相关规则不时地进行修改，修改后的内容一旦以任何形式公布在本应用上即生效，并取代此前相关内容，您应不时关注本应用公告、提示信息及协议、规则等相关内容的变动。您知悉并确认，如您不同意更新后的内容，应立即停止使用本应用；如您继续使用本应用，即视为知悉变动内容并同意接受。
					</view>

					<view class="title">二、服务需知</view>
					<view class="content-text">
						1.1本协议是您与苏州巨象信息技术有限公司（以下简称“公司”或“我们”）之间就您下载、安装、注册、登录、使用“巨象”软件，并获得“巨象”软件提供的相关服务所订立的协议。
					</view>
					<view class="content-text">
						1.2“用户”指所有直接或间接获取和使用“巨象”软件及相关服务的使用者，包括自然人、法人和其他组织等。在本协议中称为“用户”或称“您”。
					</view>
					<view class="content-text">
						1.3“巨象”指由公司合法拥有并运营的、标注名称为“巨象”的客户端应用程序以及巨象相关的网站。公司有权对应用程序及网站名称单方变更（包括但不限于更名、新增等）。
					</view>
					<view class="content-text">
						1.4本协议内容同时包括公司已经发布及后续可能不断发布的关于“巨象”软件及相关服务的相关协议、规则等内容。公司将以适当的方式（网站公布、系统通知等）提醒您及时阅读。
					</view>
					<view class="content-text">
						1.5您使用“巨象”软件及相关服务，可以通过预装、公司已授权的第三方下载等方式获取“巨象”客户端应用程序或访问巨象相关网站。
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

			};
		},
		computed: {
			loading() {
				return this.$store.state.loadingShow
			},
		},
		methods: {

		},
	}
</script>

<style lang="less">
	.page {
		height: 100%;

		.main {
			width: 100%;
			background-color: #FFFFFF;
			height: 100%;

			.main-content {
				.content {
					padding: 25upx;
					width: 100%;

					.title {
						color: #333333;
						font-size: 30upx;
						font-weight: 600;
					}

					.content-text {
						color: #333333;
						font-size: 28upx;
						letter-spacing: 2upx;
						text-indent: 2em;
					}


				}




			}
		}

	}
</style>
