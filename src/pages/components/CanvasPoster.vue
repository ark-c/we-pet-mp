<template>
	<view class="poster-wrap">
		<view class="mask u-flex-c-s" catchtouchmove="true" @click="closePoster">
			<view>
				<canvas class="canvas" :style="{width: screenWidth * 158 +'px', height: '396px'}" canvas-id="poster"></canvas>
				<view class="text">
					<view>每一个转发分享</view>
					<view>都能为TA找到新家出一份力</view>
				</view>
				<button class="save-btn">保存到手机</button>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
	import { Getter } from 'vuex-class'
	import { SystemInfo } from '@/store/types'

	import adoption from '@/static/poster-img/adoption.png'
	import bottom from '@/static/poster-img/bottom.png'
	import intro from '@/static/poster-img/intro.png'
	import middle from '@/static/poster-img/middle.png'
	import moreInfo from '@/static/poster-img/more-info.png'
	import topCat from '@/static/poster-img/top-cat.png'
	import topDog from '@/static/poster-img/top-dog.png'
	import topPet from '@/static/poster-img/top-pet.png'

	const namespace: string = 'system'

	@Component
	export default class CanvasPoster extends Vue {
		@Getter('systemInfo', { namespace }) public systemInfo: SystemInfo
		@Prop() imgList: string[]
		screenWidth: number = 1
		qrcode: any = ''

		mounted () {
			const { windowWidth } = this.systemInfo
			this.screenWidth = windowWidth / 375
			console.log('screenWidth', this.screenWidth)

			setTimeout(() => {
				this.canvasPoster()
			}, 500)


			// TODO 图片需要在getImageInfo里边转一下才能在真机上展示，网络图片需要在合法域名内
			// uni.getImageInfo({
			// 	src: 'https://xcauto-static.oss-cn-beijing.aliyuncs.com/pic/20190613/code.jpg',
			// 	success: (image) => {
			//
			// 	}
			// })

		}

		/**
		 * 绘制海报
		 */
		canvasPoster () {
			// TODO 高度没法自己算，文本不会自己换行
			let rpx = this.screenWidth
			const context = uni.createCanvasContext('poster', this)
			context.setFillStyle('transparent')
			context.drawImage(topPet, 0, 0, 158 * rpx, 78 * rpx)
			let middleLength = 36
			for (let i = 0; i < middleLength; i++) {
				context.drawImage(middle, 0, (78 + 7 * i) * rpx, 158 * rpx, 7 * rpx)
			}

			context.setLineWidth(1)
			context.setStrokeStyle('#434343')
			context.strokeRect(6 * rpx, 78 * rpx, 146 * rpx, 120 * rpx)
			context.drawImage(this.imgList[0], 6 * rpx, 78 * rpx, 146 * rpx, 120 * rpx)

			context.setFillStyle('#fff')
			context.setFontSize(10)
			context.fillText(`照片共${ this.imgList.length }张`, 100 * rpx, 192 * rpx)

			context.drawImage(intro, 4 * rpx, (78 + 7 * 18) * rpx, 52 * rpx, 15 * rpx)

			context.setFillStyle('#000')
			context.setFontSize(8)
			context.fillText('圆角矩形选区', 10 * rpx, (78 + 7 * 18 + 28) * rpx)

			context.drawImage(adoption, 4 * rpx, (78 + 7 * 18 + 42) * rpx, 98 * rpx, 15 * rpx)

			context.setFillStyle('#000')
			context.setFontSize(8)
			context.fillText('圆角矩形选区', 10 * rpx, (78 + 7 * 18 + 70) * rpx)

			context.drawImage(moreInfo, 4 * rpx, (78 + 7 * 18 + 84) * rpx, 69 * rpx, 15 * rpx)

			context.fillStyle = '#fff'
			context.fillRect(3, (78 + 7 * 18 + 98) * rpx, 152 * rpx, 20 * rpx)

			context.drawImage(bottom, 0, (78 + 7 * 18 + 110) * rpx, 158 * rpx, 82 * rpx)

			context.fillStyle = '#000'
			context.setFontSize(8)
			context.fillText('品种：中华田园猫', 10 * rpx, (78 + 7 * 18 + 112) * rpx)
			context.fillText('性别：MM', 10 * rpx, (78 + 7 * 18 + 122) * rpx)
			context.fillText('年龄：0-3个月', 10 * rpx, (78 + 7 * 18 + 132) * rpx)
			context.fillText('坐标：中华田园猫', 10 * rpx, (78 + 7 * 18 + 142) * rpx)
			context.fillText('联系人：请在小程序内', 10 * rpx, (78 + 7 * 18 + 152) * rpx)

			context.drawImage('https://xcauto-static.oss-cn-beijing.aliyuncs.com/pic/20190613/code.jpg', 106 * rpx, (78 + 7 * 18 + 110) * rpx, 40 * rpx, 40 * rpx)
			context.stroke()
			context.draw()
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
