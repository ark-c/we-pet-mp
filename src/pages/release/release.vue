<template>
	<view class="release-wrap">
		<nav-bar :config="navConfig">
			<text slot="left">取消</text>
		</nav-bar>

		<view class="content">
			<view class="header">
				<view class="title">说说宠物情况以及领养要求</view>
				<textarea name="" id="" cols="30" rows="10"></textarea>
				<img-upload></img-upload>
			</view>
			<view class="contact-info">
				<view class="title">联系信息</view>
				<view class="line">
					<label for="phone">手机号</label>
					<input id="phone" type="text">
				</view>
				<view class="line">
					<label for="weChat">微信号</label>
					<input id="weChat" type="text">
				</view>
			</view>
			<view class="more-info"></view>
		</view>

		<button></button>
	</view>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import { NavBarOptions } from '@/interfaces/navBar';
	import ImgUpload from '@components/imgUpload.vue';

	@Component({
		components: { ImgUpload }
	})
	export default class Index extends Vue {
		navConfig: NavBarOptions = {
			color: '#ffffff',
			backgroundColor: '#EC6863',
			title: '发布领养信息',
			back: false
		};
	}
</script>

<style lang="less" scoped>
	.release-wrap {
		padding: 32px;
		background-color: #f6f6f6;
	}
</style>
