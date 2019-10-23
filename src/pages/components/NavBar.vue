<template>
	<view :style="{'background': config.backgroundColor, 'color': config.color,'height': navBarInfo.navBarHeight+navBarInfo.navBarExtendHeight+'px'}">
		<view class="nav-bar-placeholder" :class="ios ? 'ios' : 'android'" :style="{'padding-top': navBarInfo.navBarHeight+navBarInfo.navBarExtendHeight + 'px'}"></view>
		<view class="nav-bar-wrap" :class="ios ? 'ios' : 'android'" :style="[navBarInfo.navigationBarStyle]">
			<view class="nav-bar-left">
				<view v-if="config.back" @click="goBack" class="iconfont icon-back"></view>
				<slot name="left" v-if="!config.back"></slot>
			</view>
			<view class="nav-bar-center">
				<view v-if="config.title">{{config.title}}</view>
				<slot name="center" v-if="!config.title"></slot>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'
	import { NavBarOptions, NavBarInfo } from '@/interfaces/navBar'
	import { uNavigateBack } from '@/utils/navigateAction'

	declare const uni: any

	const defaultConfig: NavBarOptions = {
		color: '#000',
		backgroundColor: '#fff',
		title: '我是title',
		back: false
	}
	@Component
	export default class NavBar extends Vue {
		navBarInfo: NavBarInfo = {}
		@Prop({ default: defaultConfig, required: false }) config: NavBarOptions = defaultConfig

		created () {
			this.getSystemInfo()
			this.setStyle()
		}

		/**
		 * 默认返回上一页
		 */
		goBack () {
			uNavigateBack(1)
		}

		getSystemInfo () {
			if (uni.globalSystemInfo && !uni.globalSystemInfo.ios) {
				return uni.globalSystemInfo
			} else {
				let systemInfo: any = uni.getSystemInfoSync()
				let ios = !!(systemInfo.system.toLowerCase().search('ios') + 1)
				let rect: any = uni.getMenuButtonBoundingClientRect ? uni.getMenuButtonBoundingClientRect() : null
				uni.getMenuButtonBoundingClientRect()

				let navBarHeight: any = ''
				if (!systemInfo.statusBarHeight) {
					systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20
					navBarHeight = (function () {
						let gap = rect.top - systemInfo.statusBarHeight
						return 2 * gap + rect.height
					})()

					systemInfo.statusBarHeight = 0
					systemInfo.navBarExtendHeight = 0 //下方扩展4像素高度 防止下方边距太小
				} else {
					navBarHeight = (function () {
						let gap = rect.top - systemInfo.statusBarHeight
						return systemInfo.statusBarHeight + 2 * gap + rect.height
					})()
					if (ios) {
						systemInfo.navBarExtendHeight = 4 //下方扩展4像素高度 防止下方边距太小
					} else {
						systemInfo.navBarExtendHeight = 0
					}
				}
				systemInfo.navBarHeight = navBarHeight //导航栏高度不包括statusBarHeight
				systemInfo.capsulePosition = rect //右上角胶囊按钮信息bottom: 58 height: 32 left: 317 right: 404 top: 26 width: 87 目前发现在大多机型都是固定值 为防止不一样所以会使用动态值来计算nav元素大小
				systemInfo.ios = ios //是否ios
				uni.globalSystemInfo = systemInfo //将信息保存到全局变量中,后边再用就不用重新异步获取了
				console.log('systemInfo1111', systemInfo)
				return systemInfo
			}
		}

		setStyle () {
			const {
							statusBarHeight,
							navBarHeight,
							capsulePosition,
							navBarExtendHeight,
							ios,
							windowWidth
						} = uni.globalSystemInfo
			console.log('this.config', this.config)
			let leftWidth = windowWidth - capsulePosition.left //胶囊按钮左侧到屏幕右侧的边距
			let navigationBarStyle = {
				background: this.config.backgroundColor,
				color: this.config.color,
				height: `${ navBarHeight + navBarExtendHeight }px`,
				'padding-top': `${ statusBarHeight }px`,
				'padding-right': `${ leftWidth }px`,
				'padding-bottom': `${ navBarExtendHeight }px`
			}
			this.navBarInfo = {
				navigationBarStyle,
				navBarHeight,
				capsulePosition,
				navBarExtendHeight,
				ios
			}
			console.log('this.styleData', this.navBarInfo)
		}
	}
</script>

<style lang="less" rel="stylesheet/less" scoped>
	@height: 88px;
	@androidHeight: 96px;
	@right: 194px;
	@navBarExtendHeight: 8px;
	.nav-bar-placeholder {
		height: @height;
		background: #f8f8f8;
		position: relative;
		z-index: 50;
		visibility: hidden;
		&.android {
			height: @androidHeight;
		}
	}
	.nav-bar-wrap {
		width: 100vw;
		box-sizing: border-box;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		display: flex;
		align-items: center;
		height: @height;
		padding-right: @right;
		padding-bottom: @navBarExtendHeight;
		&.android {
			height: @androidHeight;
		}
		.nav-bar-left {
			width: @right;
			height: 64px;
			display: flex;
			align-items: center;
			margin-left: 20px;
			.icon-back {
				font-size: 30px;
				font-weight: bold;
				margin-left: 15px;
			}
		}
		.nav-bar-center {
			font-size: 34px;
			line-height: 34px;
			text-align: center;
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			padding-left: 20px;
		}
	}
</style>
