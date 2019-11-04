<template>
	<view class="code-wrap">
		<view class="mask u-flex-c-c" catchtouchmove="true" @click="closeCode">
			<view>
				<image src="https://xcauto-static.oss-cn-beijing.aliyuncs.com/pic/20190613/code.jpg"></image>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

	@Component
	export default class QrCode extends Vue {
		@Prop() qrCodeUrl: string
	}
</script>

<style lang="less" rel="stylesheet/less" scoped>
	.poster-wrap {
		.mask {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.7);
			z-index: 99999;
		}
	}
</style>
