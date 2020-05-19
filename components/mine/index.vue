<template>
	<view class=" center">
		<view class="header">
			<view class="bg">
				<view class="box">
					<view class="box-hd">
						<view class="avator" v-if="token != ''"><img :src="avatarUrl" /></view>
						<view class="phone-number" v-if="token == ''" @click="login">登陆/注册</view>
						<view class="phone-number" v-else>{{ userName }}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="center-list">
			<view class="center-list-item border-bottom">
				<text class="list-icon">&#xe6ac;</text>
				<text class="list-text">我的收藏</text>
				<text class="navigat-arrow">&#xe600;</text>
			</view>
			<view class="center-list-item">
				<text class="list-icon">&#xe617;</text>
				<text class="list-text">联系客服</text>
				<text class="navigat-arrow">&#xe600;</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	components: {
	},
	data() {
		return {
			token: '',
			isAlert: false,
			isClear:false,
			avatarUrl: '',
			userName: ''
		};
	},
	methods: {
	},
	onLoad(options) {}
};
</script>

<style scoped lang="scss">
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_1713587_0obd4odh8sre.ttf') format('truetype')
	}
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
	background-color: #f8f8f8;
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
	margin-top: 20upx;
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
	width: 40upx;
	height: 90upx;
	line-height: 90upx;
	font-size: 34upx;
	color: #555;
	text-align: center;
	font-family: texticons;
	margin-right: 20upx;
}

.list-text {
	height: 90upx;
	line-height: 90upx;
	font-size: 34upx;
	color: #555;
	flex: 1;
	text-align: left;
}

.navigat-arrow {
	height: 90upx;
	width: 40upx;
	line-height: 90upx;
	font-size: 34upx;
	color: #555;
	text-align: right;
	font-family: texticons;
}
.header {
	background: #fff;
	height: 290upx;
	padding-bottom: 110upx;
	.bg {
		width: 100%;
		height: 200upx;
		padding-top: 100upx;
		background-color: #4191ea;
	}
}
.box {
	width: 650upx;
	height: 280upx;
	border-radius: 20upx;
	margin: 0 auto;
	background: #fff;
	box-shadow: 0 5upx 20upx 0upx rgba(0, 0, 150, 0.2);
	.box-hd {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
		.avator {
			width: 160upx;
			height: 160upx;
			background: #fff;
			border: 5upx solid #fff;
			border-radius: 50%;
			margin-top: -80upx;
			overflow: hidden;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.phone-number {
			width: 100%;
			text-align: center;
			margin-top: 40upx;
			font-size: 40upx;
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
</style>
