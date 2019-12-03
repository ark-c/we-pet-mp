<template>
	<view class="img-upload-wrap">
		<view class="item" v-if="!multipleJudge && imgSrc">
			<image :src="imgSrc" class="upload-img image"></image>
			<image class="upload-close" @click="clearImg"></image>
		</view>
		<view v-if="multipleJudge && imgSrcArr.length" class="img-upload">
			<view class="item" v-for="(item, index) in imgSrcArr" :key="index">
				<image :src="item" class="upload-img image"></image>
				<!--<image class="upload-close" @click="clearImg(index)" src="@/assets/images/new/upload-close.png"></image>-->
			</view>
		</view>
		<view v-if="showAdd" class="item item-add" @click="uploadClick">
			<image src="../../static/images/add.png" alt="empty image "></image>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
	import { fileUpload } from '@/service/httpRequest';

	@Component
	export default class ImgUpload extends Vue {
		@Prop({ default: true, required: false }) multipleJudge: boolean; // 是否支持多选
		@Prop({ default: 1, required: false }) limit: number; // 张数限制

		showAdd: boolean = true;
		imgSrc: string = ''; // 单张图片
		imgSrcArr: Array<any> = []; // 多张图片

		emitData() {
			if (this.multipleJudge) this.$emit('imgUpload', this.imgSrcArr);
			if (!this.multipleJudge) this.$emit('imgUpload', this.imgSrc);
		};

		clearImg(index: number) {
			if (index === undefined) this.imgSrc = '';
			else {
				this.imgSrcArr = this.imgSrcArr.slice(0, index).concat(this.imgSrcArr.slice(index + 1));
			}
			this.emitData();
		};

		uploadClick() {
			if (this.multipleJudge && this.imgSrcArr.length >= this.limit) return;
			if (!this.multipleJudge && this.imgSrc) return;
			uni.chooseImage({
				count: this.limit, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				// sourceType: ['album'], // 从相册选择
				success: async (res: any) => {
					const tempFilePaths = res.tempFilePaths;
					tempFilePaths.forEach((item: any) => {
						fileUpload(item).then((res: any) => {
							if (!this.multipleJudge) this.imgSrc = res.url;
							if (this.multipleJudge) this.imgSrcArr.push(res.url);
						});
						this.emitData();
					});
				}
			});
		};
	}
</script>

<style lang="less" scoped>
	.img-upload-wrap {
		display: flex;
		flex-wrap: wrap;
		.item {
			width: 200px;
			height: 200px;
			overflow: hidden;
			display: inline-block;
		}
	}
</style>
