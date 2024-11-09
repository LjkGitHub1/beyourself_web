<template>
    <el-progress style="margin: 10px 0 0 10px" :percentage="percent" :status="current+1 == questions.length ?'success' : ''" :format="format"></el-progress>
    <div class="container">
        <h1 style="font-size: 25px;">{{ scaleData.title }}</h1>
        
        <div class="main">
            <h3 style="margin-bottom: 5px;">{{ current+1 }}. <span>{{ currentQ.text }}</span></h3>
            <el-radio-group v-model="result[current].answer" @change="selected">
                <div style="width: 100%;" v-for="(item, index) in currentQ.options">
                    <el-radio :value="item.text" border style="margin: 5px;">{{ item.text }}</el-radio>
                </div>
            </el-radio-group>

            <el-row style="margin-top: 30px">
                <el-col :span="2"><el-button :disabled="current < 1" @click="before()">上一题</el-button></el-col>
                <el-col :span="2" :offset="8">
                    <el-button v-if="current < questions.length - 1" @click="next()">下一题</el-button>
                    <el-button v-else @click="commit()">提交</el-button>
                </el-col>
                
            </el-row>
        </div>


    </div>


</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue';

const emits = defineEmits(['customEvent']);

const props = defineProps(['data'])
const scaleData = props.data
const questions = scaleData.questions

let answer = ref('')
let current = ref(0)
let currentQ = ref(questions[current.value])
let percent = ref(1)

// currentQ = watch(current.value, (newValue, oldValue) => {
//   console.log(`Message changed from "${oldValue}" to "${newValue}"`);
//   return questions[newValue]
// });


let result = ref([{
    question: questions[0].id,
    answer: ''
}])


const format = (percentage) => {
    return percentage === 100 ? '完成' : `${current.value+1}/${questions.length}`;
}

const selected = (e) => {

    answer.value = e
    console.log(answer)
    next()
}

const before = () => {
    // current.value--
    currentQ.value = questions[--current.value]
    console.log(result.value)
    percent.value = (current.value+1)/questions.length * 100
}
const next = () => {
    current.value++
    // 没有该question的时候才添加
    if (!!!result.value.find(item => item.question === questions[current.value].id)) {
        result.value.push({
            question: questions[current.value].id,
            answer: ''
        })
    }
    currentQ.value = questions[current.value]
    percent.value = (current.value+1)/questions.length * 100
    // console.log(currentQ)
    console.log(result.value)
}

onMounted(async () => {
    console.log('scale_id111', props.data)
    // Object.assign(scaleData, props.data) 
    // await GetList({id :props.scale_id}).then((res)=>{
    //     Object.assign(scale, res.data[0])
    //     // scale = res.data[0]
    //     console.log('scale', scale)
    // })
})
</script>


<style scoped lang='scss'>
.container {
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    margin: auto;
    padding: 10px;
    align-items: center;

    .text {
        color: #b9b9b9;
    }

    .indent {
        text-indent: 2em;
    }

    .main {
        margin-top: 50px;
        font-size: 15px;
    }
}
</style>
