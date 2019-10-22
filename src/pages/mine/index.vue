<template>
	<view class="mine-wrap">
		<view class="header">
			<view class="">
				<image></image>
				<view>Merlin</view>
			</view>
			<view class="tab">
				<view class="" v-if="activeTab === 0" @click="activeTab = 0"></view>
				<view class="" v-if="activeTab === 1" @click="activeTab = 1"></view>
			</view>
		</view>

		<view class="content">
			<block v-if="true">
				<pet-item></pet-item>
			</block>
		</view>
	</view>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { Component } from 'vue-property-decorator';
	import PetItem from '@components/petItem.vue';

	@Component({
		components: { PetItem }
	})
	export default class Index extends Vue {
		activeTab: number = 0;

		created() {
			this.initData();
		};

		initData() {
			console.log('=====');
		}
	}
</script>

<style lang="less" scoped>
</style>
