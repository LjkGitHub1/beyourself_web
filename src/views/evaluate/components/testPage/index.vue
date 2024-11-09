<template>
	<div class="login-container flex z-10">
		<div class="login-right flex z-10">
			<div class="login-right-warp flex-margin">
				<!-- <Introduce v-if="state.introduceShow" :scale_id="id" @startTest="start"/>
				<Content v-if="!state.introduceShow" :scale_id="id"/> -->
				<Introduce v-if="state.introduceShow" :data="scaleData" @startTest="start"/>
				<Content v-if="!state.introduceShow" :data="scaleData"/>
				<!-- <span class="login-right-warp-one"></span> -->
				<!-- <span class="login-right-warp-two"></span> -->
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import Introduce from './introduce.vue';
import Content from './content.vue';
import { useRoute } from 'vue-router';
import { GetList } from '/@/views/evaluate/mainTable/api';

const route = useRoute()
let state = reactive({
	introduceShow: true
})
const { id } = route.query
const scaleData = reactive({})

const start = (data)=>{
	state.introduceShow = data
	// Object.assign(introduceShow, data)
	console.log('cData', state.introduceShow)
}

onMounted(async ()=>{
	await GetList({id}).then((res)=>{
        Object.assign(scaleData, res.data[0])
    })
	console.log('scaleData',scaleData)
})
</script>

<style scoped lang="scss">
.login-container {
	height: 100%;
	background: var(--el-color-white);
	display: flex;
	justify-content: center;

	.login-left {
		flex: 1;
		position: relative;
		background-color: rgba(211, 239, 255, 1);
		margin-right: 100px;

		.login-left-logo {
			display: flex;
			align-items: center;
			position: absolute;
			top: 50px;
			left: 80px;
			z-index: 1;
			animation: logoAnimation 0.3s ease;

			img {
				width: 52px;
				height: 52px;
			}

			.login-left-logo-text {
				display: flex;
				flex-direction: column;

				span {
					margin-left: 10px;
					font-size: 16px;
					color: var(--el-color-primary);
				}

				.login-left-logo-text-msg {
					font-size: 12px;
					color: var(--el-color-primary);
				}
			}
		}

		.login-left-img {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 100%;
			height: 52%;

			img {
				width: 100%;
				height: 100%;
				animation: error-num 0.6s ease;
			}
		}

		.login-left-waves {
			position: absolute;
			top: 0;
			right: -100px;
		}
	}

	.login-right {
		width: 700px;

		.login-right-warp {
			border: 1px solid var(--el-color-primary-light-3);
			border-radius: 3px;
			width: 500px;
			height: 500px;
			position: relative;
			overflow: hidden;
			background-color: var(--el-color-white);

			.login-right-warp-one,
			.login-right-warp-two {
				position: absolute;
				display: block;
				width: inherit;
				height: inherit;

				&::before,
				&::after {
					content: '';
					position: absolute;
					z-index: 1;
				}
			}

			.login-right-warp-one {
				&::before {
					filter: hue-rotate(0deg);
					top: 0px;
					left: 0;
					width: 100%;
					height: 3px;
					background: linear-gradient(90deg, transparent, var(--el-color-primary));
					animation: loginLeft 3s linear infinite;
				}

				&::after {
					filter: hue-rotate(60deg);
					top: -100%;
					right: 2px;
					width: 3px;
					height: 100%;
					background: linear-gradient(180deg, transparent, var(--el-color-primary));
					animation: loginTop 3s linear infinite;
					animation-delay: 0.7s;
				}
			}

			.login-right-warp-two {
				&::before {
					filter: hue-rotate(120deg);
					bottom: 2px;
					right: -100%;
					width: 100%;
					height: 3px;
					background: linear-gradient(270deg, transparent, var(--el-color-primary));
					animation: loginRight 3s linear infinite;
					animation-delay: 1.4s;
				}

				&::after {
					filter: hue-rotate(300deg);
					bottom: -100%;
					left: 0px;
					width: 3px;
					height: 100%;
					background: linear-gradient(360deg, transparent, var(--el-color-primary));
					animation: loginBottom 3s linear infinite;
					animation-delay: 2.1s;
				}
			}

			.login-right-warp-mian {
				display: flex;
				flex-direction: column;
				height: 100%;

				.login-right-warp-main-title {
					height: 130px;
					line-height: 130px;
					font-size: 27px;
					text-align: center;
					letter-spacing: 3px;
					animation: logoAnimation 0.3s ease;
					animation-delay: 0.3s;
					color: var(--el-text-color-primary);
				}

				.login-right-warp-main-form {
					flex: 1;
					padding: 0 50px 50px;

					.login-content-main-sacn {
						position: absolute;
						top: 2px;
						right: 12px;
						width: 50px;
						height: 50px;
						overflow: hidden;
						cursor: pointer;
						transition: all ease 0.3s;
						color: var(--el-color-primary);

						&-delta {
							position: absolute;
							width: 35px;
							height: 70px;
							z-index: 2;
							top: 2px;
							right: 21px;
							background: var(--el-color-white);
							transform: rotate(-45deg);
						}

						&:hover {
							opacity: 1;
							transition: all ease 0.3s;
							color: var(--el-color-primary) !important;
						}

						i {
							width: 47px;
							height: 50px;
							display: inline-block;
							font-size: 48px;
							position: absolute;
							right: 1px;
							top: 0px;
						}
					}
				}
			}
		}
	}

	.login-authorization {
		position: fixed;
		bottom: 30px;
		left: 0;
		right: 0;
		text-align: center;

		p {
			font-size: 14px;
			color: rgba(0, 0, 0, 0.5);
		}

		a {
			color: var(--el-color-primary);
			margin: 0 5px;
		}
	}
}
</style>
