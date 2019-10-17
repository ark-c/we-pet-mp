<template>
	<view>
		<view class="header-swiper">
			<swiper class="swiper" :indicator-dots="false" :autoplay="true" :interval="interval" :duration="duration">
				<swiper-item v-for="item">
					<view class="swiper-item uni-bg-red">A</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item uni-bg-green">B</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item uni-bg-blue">C</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script lang="ts">
	import Vue from 'vue'
	import Component from 'vue-class-component'
	import petItem from '@components/petItem'

	@Component({
		components: {
			petItem
		}
	})
	export default class PetDetail extends Vue {

	}
</script>

<style lang="less" rel="stylesheet/less">

</style>
