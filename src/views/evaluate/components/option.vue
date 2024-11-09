<template>
    <el-button type="primary" plain icon="plus" @click="addOption()">添加选项</el-button>
    <el-form>
        <el-table :data="optionList" :show-header="false">
            <el-table-column prop="text">
                <!-- <template slot-scope="scope"> -->
                <template v-slot="scope">
                    <span v-if="!scope.row.editing">{{ scope.row.text }}</span>
                    <!-- <el-input v-show="scope.row.editing" v-model="scope.row.text" :ref="'autoFocus' + scope.row.id"
                        @change="saveOption(scope.row)"></el-input> -->
                    <el-input v-show="scope.row.editing" v-model="scope.row.text"
                        :ref="'autoFocus' + scope.row.id"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="score">
                <!-- <template slot-scope="scope"> -->
                <template v-slot="scope">
                    <span v-if="!scope.row.editing">{{ scope.row.score }}分</span>
                    <el-input type="number" v-show="scope.row.editing" v-model="scope.row.score"
                        @keyup.enter.native="saveOption(scope.row)">
                        <template #append>分</template>
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="180">
                <template v-slot="scope">
                    <el-button type="primary" plain v-if="scope.row.editing"
                        @click="saveOption(scope.row)">保存</el-button>
                    <el-button type="primary" icon="edit" circle v-if="!scope.row.editing"
                        @click="edit(scope.row)"></el-button>
                    <el-button type="info" v-if="scope.row.editing" @click="cancle(scope.row)">取消</el-button>
                    <el-button type="danger" icon="delete" circle v-if="!scope.row.editing"
                        @click="remove(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-form>
    <!-- <div v-for="(item, index) in optionList">
        <el-row>
            <el-col :span="15">
                <span v-if="!item.editing">{{ item.text }}</span>
                <el-input v-if="item.editing" v-model="item.text"></el-input>
            </el-col>
            <el-col :span="2">
                <el-button v-if="item.editing" @click="saveOption(item)">保存</el-button>
                <el-button v-if="!item.editing" @click="edit(item)">编辑</el-button>
            </el-col>
            <el-col :span="2">
                <el-button v-if="item.editing" @click="cancle(item)">取消</el-button>
                <el-button v-if="!item.editing" @click="remove(item)">删除</el-button>
            </el-col>
        </el-row>
    </div> -->

</template>


<script setup>
import { onMounted, reactive, nextTick, getCurrentInstance } from 'vue';
import { GetList, AddObj, UpdateObj, DelObj } from '../option/api'
import { ElNotification } from 'element-plus';

const { proxy } = getCurrentInstance();

const props = defineProps(['questionId'])
const questionId = props.questionId

let optionList = reactive([])
// let optionList = ref([])

const addOption = () => {
    // 用item.editing来判断当前的编辑状态
    console.log('点到我了')
    optionList.push({ question: props.questionId, text: '', editing: true })
    // handleInputFocus()
    focusInput(optionList.length - 1)
    console.log('editing状态', optionList[optionList.length - 1])
    // optionList = [...optionList, [{question_id: questionId, text:''}]]
    // optionList.value.push({question_id: props.questionId, text:''})
}

const saveOption = (item) => {
    console.log(typeof (props.questionId))
    // 如果 item.id 存在（truthy 值），则会将 { id: item.id } 添加到 param 对象中，否则不添加
    const param = { ...(item.id && { id: item.id }), question: props.questionId, text: item.text, score: item.score }
    if (item.id) {
        return UpdateObj(param).then(res => {
            if (res.code == 2000) {
                item.editing = false
                refresh()
                return ElNotification({
                    title: '成功',
                    message: res.msg,
                    type: 'success'
                });
            }
            ElNotification({
                title: '失败',
                message: res.msg,
                type: 'danger'
            });
        })
    }
    AddObj(param).then(res => {
        if (res.code == 2000) {
            item.editing = false
            refresh()
            return ElNotification({
                title: '成功',
                message: res.msg,
                type: 'success'
            });
        }
        ElNotification({
            title: '失败',
            message: res.msg,
            type: 'danger'
        });
    })
}

const cancle = (item) => {
    // 不打算新增了  则去掉push的空数据
    if (!item.text) {
        optionList.pop()
    }
    item.editing = false
}

const edit = (item) => {
    item.editing = true
    focusInput(item)
    // handleInputFocus()
}

const getData = () => {
    GetList({ question: props.questionId }).then(res => {
        //给每一个item都加上editing
        // optionList = [...res.data.map(item => ({...item, editing: false }))];
        // 上面的代码是一个错误示范，视图不会更新，需要使用Object.assign
        Object.assign(optionList, res.data)
    })
}

const refresh = () => {
    getData()
    console.log('after', optionList)
}


const remove = (item) => {
    // optionList.splice(0,1)
    console.log('item', item)
    console.log('before', optionList)
    proxy.$confirm('您确定要删除该记录吗?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // type: 'warning'
    }).then(() => {
        DelObj(item.id).then(res => {
            if (res.code == 2000) {
                item.editing = false
                refresh()
                //pop  特别呆瓜的办法  因为删除之后总是会有最新的一条重复，找不到原因，无语  出此下策
                optionList.pop()
                console.log('optionListddd', optionList)
                return ElNotification({
                    title: '成功',
                    message: res.msg,
                    type: 'success'
                });

            }
            ElNotification({
                title: '失败',
                message: res.msg,
                type: 'danger'
            });
        })
    }).catch(() => { })

}


//input框自动聚焦
const focusInput = (indexOrItem) => {
    console.log('indexOrItem', indexOrItem)
    let id;
    if (typeof indexOrItem === 'number') {
        id = 'autoFocus' + optionList[indexOrItem].id;
    } else {
        id = 'autoFocus' + indexOrItem.id;
    }
    console.log(id)
    nextTick(() => {
        //this.$refs报错 需使用proxy.$refs
        const inputElement = proxy.$refs[id];
        if (inputElement) {
            inputElement.focus();
        }
    });
    // console.log(proxy.$refs.autoFocus)
};

// 页面打开后获取列表数据
onMounted(async () => {
    getData()

    console.log('questionId', props.questionId)
});
</script>
