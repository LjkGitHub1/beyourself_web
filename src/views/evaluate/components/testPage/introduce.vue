<template>
    <div class="container" v-if="scaleData">
        <span>{{ scaleData.title }}</span>
        <el-image src="http://localhost:8000/media/files/f/8/f8df13b78fcca3620bb67b23c7a290e1.png" fit="fill" />
        <span class="text">{{ scaleData.testCount }}人测试过</span>
        <span class="text indent">{{ scaleData.description }}</span>
        <el-button type="primary" round @click="start">开始</el-button>
    </div>
    
    
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { GetList } from '/@/views/evaluate/mainTable/api';

const emits = defineEmits(['customEvent']);

const props = defineProps(['data'])
const scaleData = props.data

// let scaleData = reactive({})

const start = ()=>{
    emits('startTest', false)
}

onMounted( async()=>{
    console.log('scale_id111',props.data)
    // Object.assign(scaleData, props.data) 
    // await GetList({id :props.scale_id}).then((res)=>{
    //     Object.assign(scale, res.data[0])
    //     // scale = res.data[0]
    //     console.log('scale', scale)
    // })
})
</script>

<style scoped lang='scss'>
.container{
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    margin: auto;
    padding: 5px;
    align-items: center;
    
    .text {
        color: #b9b9b9;
    }

    .indent {
        text-indent: 2em;
    }
}
</style>
