<template>
	<view class="release-index-wrap">
		<view class="u-flex-b-c content">
			<view v-for="(item, index) in releaseConfig" :key="index" @click="releaseInfo(item.id)">
				<image :src="item.logo"></image>
				<view>{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { Component } from 'vue-property-decorator';
	import { uNavigateTo } from '@/utils/navigateAction'

	@Component
	export default class Index extends Vue {
		releaseConfig: Array<object> = [
			{ name: 'pet', id: 0, logo: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132' },
			{ name: 'pet', id: 1, logo: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132' },
			{ name: 'pet', id: 2, logo: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicUgL8bc6EDn7CIiaj15c6Inj2laww5IFhOxVPHnIMM8Wibce5Dgib4XTfUORImluojyXev1QwT7nbg/132' }
		];

		static releaseInfo(id: number) {
			uNavigateTo(`/pages/release/release?id=${id}`).then()
		};
	}
</script>


<style lang="less" scoped>
	.release-index-wrap {
		width: 100vw;
		height: 100vh;
		position: relative;
		.content {
			width: 80vw;
			.base-position(50%, 50%);
			image {
				display: block;
				.base-square(50px);
				margin-bottom: 20px;
			}
		}
	}
</style>
