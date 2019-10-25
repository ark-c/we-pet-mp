<template>
	<view class="release-index-wrap">
		<view class="content">
			<view class="u-fz-large u-fz-w">发布宠物领养信息</view>
			<view class="u-fz-small excision">请选择你要发布的宠物</view>
			<view class="u-flex-b-c">
				<view v-for="(item, index) in releaseConfig" :key="index" @click="releaseInfo(item.id)">
					<image :src="item.logo"></image>
					<view class="u-fz-big u-fz-w">{{item.name}}</view>
					<view class="u-fz-small">{{item.cname}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import { uNavigateTo } from '@/utils/navigateAction';

	@Component
	export default class Index extends Vue {
		releaseConfig: Array<object> = [
			{ name: 'CAT', cname: '猫咪', id: 0, logo: '../../static/images/release-cat.png' },
			{ name: 'DOG', cname: '狗狗', id: 1, logo: '../../static/images/release-dog.png' },
			{ name: 'PET', cname: '其他宠物', id: 2, logo: '../../static/images/release-other.png' }
		];

		releaseInfo(id: number) {
			uNavigateTo(`/pages/release/release?id=${ id }`).then();
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
			.base-position(60%, 50%);
			text-align: center;
			image {
				display: block;
				.base-square(183px);
				margin-bottom: 20px;
			}
			.excision {
				margin: 20px auto 100px;
			}
		}
	}
</style>
