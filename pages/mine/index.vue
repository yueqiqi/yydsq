<template>
	<view class=" center">
		<view class="header">
			<view class="bg" :style="{backgroundImage: 'url('+avatarUrl+')',backgroundSize: '100% 100%;'}">
				<view class="box">
					<view class="box-hd">
						<block v-if="token != ''">
							<view class="flex" >
								<view class="avator"><img :src="avatarUrl" /></view>
								<view class="phone-number">{{ userName }}</view>
							</view>
							<view class="icon" style="margin-top: -20upx;" @click="info">&#xe603;</view>
						</block>
						<block v-else>
								<view class="login font-main" @click="login"><button open-type="getUserInfo">登陆/注册</button></view>
						</block>
					</view>
				</view>
			</view>
		</view>

		<view class="center-list">
			<view class="center-list-item border-bottom" @click="fav">
				<text class="list-icon">&#xe606;</text>
				<text class="list-text">我的收藏</text>
				<text class="navigat-arrow">&#xe600;</text>
			</view>
			<view class="center-list-item border-bottom" @click="tel">
				<text class="list-icon">&#xe608;</text>
				<text class="list-text">联系商家</text>
				<text class="navigat-arrow">&#xe600;</text>
			</view>
			<view class="center-list-item ">
				<text class="list-icon" style="font-size: 44upx;">&#xe62c;</text>
				<text class="list-text">关于我们</text>
				<text class="navigat-arrow">&#xe600;</text>
			</view>
		</view>
		<view class="copy">Clowns Laughing At You 提供技术支持</view>
	</view>
</template>

<script>
export default {
	components: {
	},
	data() {
		return {
			token: '1',
			isAlert: false,
			isClear:false,
			avatarUrl: '',
			userName: ''
		};
	},
	methods: {
		fav(){
			uni.navigateTo({
				url:'/pages/loading/index'
			})
		},
		login(){
			let that=this
			uni.getUserInfo({
					provider: 'weixin',
					lang: 'zh_CN',
					success: res => {
						console.log(res)
						uni.setStorage({
							key: 'userInfo',
							data: res.userInfo,
						})
						this.avatarUrl=res.userInfo.avatarUrl
						this.userName=res.userInfo.nickName
					}
				})
		},
		tel(){
			uni.makePhoneCall({
				phoneNumber:'15183233274'
			})
		},
		info(){
			uni.navigateTo({
				url:'/pages/mine/info'
			})
		},
	},
	onLoad(options) {
		let user = uni.getStorageSync('userInfo')||''
		this.avatarUrl=user.avatarUrl
		this.userName=user.nickName
	}
};
</script>

<style scoped lang="scss">
	.alIcon {
		width: 40upx;
		height: 40upx;
		font-size: 34upx;
		color: #555;
		text-align: center;
		font-family: texticons;
	}

.center-list view {
	display: flex;
}

page {
	background-color: #f3f4f6;
}

.center {
	flex-direction: column;
}

.logo {
	width: 750upx;
	padding: 20upx;
	background-color: #1e90ff;
	display: flex;
	justify-content: center;
	align-items: center;
}

.logo-hover {
	opacity: 0.8;
}

.logo-img {
	width: 150upx;
	height: 150upx;
	border-radius: 150upx;
}

.logo-title {
	height: 150upx;
	flex: 1;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
	margin-left: 20upx;
}

.uer-name {
	height: 60upx;
	line-height: 60upx;
	font-size: 38upx;
	color: #ffffff;
}

.go-login.navigat-arrow {
	font-size: 38upx;
	color: #ffffff;
}

.login-title {
	height: 150upx;
	align-items: self-start;
	justify-content: center;
	flex-direction: column;
	margin-left: 20upx;
}

.center-list {
	background-color: #ffffff;
	width: 750upx;
	flex-direction: column;
}

.center-list-item {
	height: 90upx;
	width: 750upx;
	box-sizing: border-box;
	flex-direction: row;
	padding: 0upx 20upx;
}

.border-bottom {
	border-bottom-width: 1upx;
	border-color: #eeeeee;
	border-bottom-style: solid;
}

.list-icon {
	width: 50upx;
	height: 90upx;
	color: #303133;
	line-height: 90upx;
	font-size: 50upx;
	text-align: center;
	font-family: texticons;
	margin-right: 20upx;
}

.list-text {
	height: 90upx;
	line-height: 90upx;
	color: #555;
	flex: 1;
	text-align: left;
}

.navigat-arrow {
	height: 90upx;
	width: 40upx;
	line-height: 90upx;
	color: #555;
	text-align: right;
	font-family: texticons;
}
.header {
	background: #fff;
	height: 330upx;
	.bg {
		width: 100%;
		height: 100upx;
		padding-top: 100upx;
	}
}
.box {
	width: 650upx;
	height: 200upx;
	border-radius: 20upx;
	margin: 0 auto;
	background: #fff;
	box-shadow: 0 5upx 20upx 0upx rgba(0, 0, 150, 0.2);
	display: flex;
	align-items: center;
	.box-hd {
		margin-left: 30upx;
		margin-right: 30upx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		.avator {
			width: 110upx;
			height: 110upx;
			background: #fff;
			border-radius: 18upx;
			overflow: hidden;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.phone-number {
			line-height: 110upx;
			font-size: 36upx;
			margin-left: 30upx;
		}
	}
	.box-bd {
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: center;
		.item {
			flex: 1 1 auto;
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: center;
			border-right: 1px solid #f1f1f1;
			margin: 15upx 0;
			&:last-child {
				border: none;
			}
			.icon {
				width: 60upx;
				height: 60upx;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.text {
				width: 100%;
				text-align: center;
				margin-top: 10upx;
			}
		}
	}
}
.login{
	line-height: 200upx;
	text-align: center;
	width: 100%;
}
.copy{
	position: fixed;
	bottom: 10upx;
	font-size: 22upx;
	color: #909090;
	width: 100%;
	text-align: center;
}
button{
	background: #fff!important;
}
button::after{
	border-width: 0!important;
}
</style>
