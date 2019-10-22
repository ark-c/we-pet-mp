<template>
	<view class="nav-bar-wrap" :style="{'background': config.backgroundColor, 'color': config.color}">
		<slot v-if="config.customBack" name="customBack" class="back-item"></slot>
		<view class="back-item" v-if="!config.customBack" @click="localBack">s</view>
		<text class="title">{{config.title}}</text>
	</view>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator';
	import { NavBarOptions } from '@/interfaces/navBar'
	import { uNavigateBack } from '@/utils/navigateAction'
	const defaultConfig: NavBarOptions = {
		color: '#000',
		backgroundColor: '#fff',
		title: '我是title',
		customBack: false
	}
	@Component
	export default class NavBar extends Vue {
		@Prop({default: defaultConfig, required: false}) config: NavBarOptions = defaultConfig;

		/**
		 * 默认返回上一页
		 */
		static localBack () {
			uNavigateBack(1)
		}
	}
</script>

<style lang="less" rel="stylesheet/less" scoped>
	.nav-bar-wrap {
		width: 100vw;
		height: 100px;
		box-sizing: border-box;
		position: fixed;
		top: 0;
		left: 0;
	}
</style>
