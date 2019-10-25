<template>
	<view class="img-upload-wrap">
		<input @change="fileChange" type="file" accept="image/*" :multiple="multipleJudge" style="display: none" ref="ImgUpload"/>
		<view class="item" v-if="!multipleJudge && imgSrc">
			<image :src="imgSrc" class="upload-img"></image>
			<image class="upload-close" @click="clearImg()"></image>
		</view>
		<view v-if="multipleJudge && imgSrcArr.length" class="img-upload">
			<view class="item" v-for="(item, index) in imgSrcArr" :key="index">
				<image :src="item" class="upload-img"></image>
				<!--<image class="upload-close" @click="clearImg(index)" src="@/assets/images/new/upload-close.png"></image>-->
			</view>
		</view>
		<view v-if="showAdd" class="item item-add" @click="uploadClick">
			<image src="../../statics/images/add.png" alt="empty image"></image>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Vue, Prop } from 'vue-property-decorator';

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

		fileChange(el: any) {
			console.log('fileChange');
			const files = el.target.files;
			if (this.imgSrcArr.length + files.length > this.limit) {
				// this.$Message.info('up to three')
				return;
			}
			let formData = new FormData();
			for (let i = 0; i < files.length; i++) {
				formData.append('multipartFiles', files[i]);
			}
			// this.upload(formData).then((res: Array<any>) => {
			// 	this.imgSrcArr.push(...res);
			// 	this.emitData();
			// });
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
			// this.$refs.ImgUpload.click();
		};

		async upload(formData: any) {
			// this.$Spin.show()
			// const uploadUrl = `${process.env.apiPath}/thirdPayment/1/uploadBillImg`
			// const res = await axios.post(uploadUrl, formData, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
			// this.$Spin.hide()
			// return JSON.parse(decryptData(res.data)).data || []
		}
	}
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
