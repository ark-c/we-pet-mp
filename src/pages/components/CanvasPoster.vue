<template>
	<view class="poster-wrap">
		<view class="mask u-flex-c-s" catchtouchmove="true" @click="closePoster">
			<view>
				<canvas class="canvas" :style="{width: screenWidth * 158 +'px', height: canvasHeight + 'px'}" canvas-id="poster"></canvas>
				<view class="text">
					<view>每一个转发分享</view>
					<view>都能为TA找到新家出一份力</view>
				</view>
				<button class="save-btn" @click="save">保存到手机</button>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
	import { Getter } from 'vuex-class'
	import { SystemInfo } from '@/store/types'
	import { petSex } from '@/utils/const'

	const namespace: string = 'system'

	@Component
	export default class CanvasPoster extends Vue {
		@Getter('systemInfo', { namespace }) public systemInfo: SystemInfo
		@Prop() detailInfo: any
		screenWidth: number = 1
		staticImg: any | never[] = []
		canvasHeight: number = 396

		mounted () {
			const { windowWidth } = this.systemInfo
			this.screenWidth = windowWidth / 375
			this.getStaticImgList().then(() => {
				this.canvasPoster()
			})
		}

		async getStaticImgList () {
			uni.showLoading({
				title: '正在生成图片'
			})
			let imgArr = [
				'../../static/poster-img/adoption.png',
				'../../static/poster-img/bottom.png',
				'../../static/poster-img/intro.png',
				'../../static/poster-img/middle.png',
				'../../static/poster-img/more-info.png',
				'../../static/poster-img/top-cat.png',
				'../../static/poster-img/top-dog.png',
				'../../static/poster-img/top-pet.png',
				'https://xcauto-static.oss-cn-beijing.aliyuncs.com/pic/20190613/code.jpg',
				// this.detailInfo.petImages[0]
			]
			for (let i = 0; i < imgArr.length; i++) {
				await this.dealImg(imgArr[i])
			}
		}

		/**
		 * 图片需要在getImageInfo里边转一下才能在真机上展示，网络图片需要在合法域名内
		 */
		dealImg (img: any) {
			return new Promise((resolve, reject) => {
				uni.getImageInfo({
					src: img,
					success: (image: any) => {
						this.staticImg.push(image.path)
						resolve(image)
					},
					fail: (err) => {
						reject(err)
					}
				})
			})
		}

		/**
		 * 绘制海报
		 */
		canvasPoster () {
			// TODO 高度没法自己算，文本不会自己换行
			console.log('staticImg', this.staticImg)
			let rpx = this.screenWidth
			// 多行文本的行高
			let lineHeight = 10
			const context = uni.createCanvasContext('poster', this)
			let concatStr = '../../'
			context.setFillStyle('transparent')
			context.drawImage(concatStr + this.staticImg[7], 0, 0, 158 * rpx, 78 * rpx)
			let middleLength = 36
			for (let i = 0; i < middleLength; i++) {
				context.drawImage(concatStr + this.staticImg[3], 0, (78 + 7 * i) * rpx, 158 * rpx, 7 * rpx)
			}

			context.setLineWidth(1)
			context.setStrokeStyle('#434343')
			context.strokeRect(6 * rpx, 78 * rpx, 146 * rpx, 120 * rpx)
			// context.drawImage(this.staticImg[9], 6 * rpx, 78 * rpx, 146 * rpx, 120 * rpx)

			context.setFillStyle('#fff')
			context.setFontSize(10)
			context.fillText(`照片共${ this.detailInfo.petImages.length }张`, 100 * rpx, 192 * rpx)

			context.drawImage(concatStr + this.staticImg[2], 4 * rpx, (78 + 7 * 18) * rpx, 52 * rpx, 15 * rpx)

			context.setFillStyle('#000')
			context.setFontSize(8)
			let baseTop = 78 + 7 * 18
			let introTop = baseTop + 28
			let name = this.detailInfo.petNikeName ? `我叫${this.detailInfo.petNikeName}，` : ''
			let introText = `${name}我是一只${this.detailInfo.petAge}大的${this.detailInfo.petAssortmentName}{petSex[this.detailInfo.petSex]}，我在${this.detailInfo.petCity + this.detailInfo.petDistrict}，希望你能接我回家，包养我的余生。`
			let introHeight = this.textFill(context, introText, introTop, lineHeight)

			context.drawImage(concatStr + this.staticImg[0], 4 * rpx, (introHeight + 4) * rpx, 98 * rpx, 15 * rpx)

			context.setFillStyle('#000')
			context.setFontSize(8)
			let requirementsTop = introHeight + 31
			let requirementsHeight = this.textFill(context, this.detailInfo.petAdoptionRequirements, requirementsTop, lineHeight)

			let middleLength1 = (requirementsHeight - baseTop) / 10
			for (let i = 0; i < middleLength1; i++) {
				context.drawImage(concatStr + this.staticImg[3], 0, (requirementsHeight + 7 * i) * rpx, 158 * rpx, 7 * rpx)
			}

			context.drawImage(concatStr + this.staticImg[4], 4 * rpx, (requirementsHeight + 2) * rpx, 69 * rpx, 15 * rpx)
			context.drawImage(concatStr + this.staticImg[1], 0, (requirementsHeight + 30) * rpx, 158 * rpx, 82 * rpx)

			context.fillStyle = '#000'
			context.setFontSize(8)
			context.fillText('品种：' + this.detailInfo.petAssortmentName, 10 * rpx, (requirementsHeight + 30) * rpx)
			context.fillText('性别：' + petSex[this.detailInfo.petSex], 10 * rpx, (requirementsHeight + 40) * rpx)
			context.fillText('年龄：' + this.detailInfo.petAge, 10 * rpx, (requirementsHeight + 50) * rpx)
			context.fillText('坐标：' + this.detailInfo.petCity + this.detailInfo.petDistrict, 10 * rpx, (requirementsHeight + 60) * rpx)
			context.fillText('联系人：' + this.detailInfo.petContactsName, 10 * rpx, (requirementsHeight + 70) * rpx)

			context.drawImage(this.staticImg[8], 106 * rpx, (requirementsHeight + 28) * rpx, 40 * rpx, 40 * rpx)

			this.canvasHeight = this.canvasHeight + (requirementsHeight - baseTop - 80)
			context.stroke()
			context.draw()

			uni.hideLoading()
		}

		textFill (ctx: any, txt: string, top: number, lineHeight: number = 20) {
			let rpx = this.screenWidth
			const rowNum = 18 // 字数
			while (txt) {
				const fillTxt = txt.slice(0, rowNum)
				ctx.fillText(fillTxt, 10 * rpx, top * rpx)
				top += lineHeight
				txt = txt.slice(rowNum)
			}
			return top
		}

		save () {
			uni.canvasToTempFilePath({
				canvasId: 'poster',
				success: (res: any) => {
					let tempFilePath = res.tempFilePath
					uni.saveImageToPhotosAlbum({
						filePath: tempFilePath,
						success: () => {
							uni.showToast({
								title: '图片已保存到相册'
							})
						},
						fail: (res) => {
							uni.showToast({
								title: res.errMsg,
								icon: 'none',
								duration: 2000
							})
						}
					})
				}
			})
		}

		@Emit()
		close () {}

		/**
		 * 关闭海报
		 */
		closePoster () {
			this.close()
		}
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
			padding-top: 180px;
		}
		.text {
			margin-top: 35px;
			color: #fff;
			text-align: center;
			font-size: 20px;
		}
		.save-btn {
			width: 298px;
			background: #F0928F;
			color: #fff;
			border-radius: 40px;
			padding: 20px 0;
			text-align: center;
			margin-top: 28px;
			font-size: 24px;
		}
	}
</style>
