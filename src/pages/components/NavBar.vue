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
	import { Getter } from 'vuex-class'
	import { NavBarOptions, NavBarInfo } from '@/interfaces/navBar'
	import { uNavigateBack } from '@/utils/navigateAction'
	import { SystemInfo } from '@/store/types'

	const namespace: string = 'system'
	const defaultConfig: NavBarOptions = {
		color: '#000',
		backgroundColor: '#fff',
		title: '我是title',
		back: false
	}
	@Component
	export default class NavBar extends Vue {
		@Getter('systemInfo', { namespace }) public systemInfo: SystemInfo

		navBarInfo: NavBarInfo = {}
		@Prop({ default: defaultConfig, required: false }) config: NavBarOptions

		created () {
			this.setStyle()
		}

		/**
		 * 默认返回上一页
		 */
		goBack () {
			uNavigateBack(1)
		}

		/**
		 * 设置导航栏参数
		 */
		setStyle () {
			const {
							statusBarHeight,
							navBarHeight,
							capsulePosition,
							navBarExtendHeight,
							ios,
							windowWidth
						} = this.systemInfo
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
			min-width: @right;
			height: 64px;
			display: flex;
			align-items: center;
			.icon-back {
				font-size: 30px;
				font-weight: bold;
				margin-left: 35px;
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
