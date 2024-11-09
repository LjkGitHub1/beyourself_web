<template>
	<fs-page>
		<fs-crud ref="crudRef" v-bind="crudBinding">
			<template #cell_$expand="scope">
				<!-- <div style="height: 500px; width: 600px;"><Option :questionId="scope.row.id"/></div> -->
				 <Option :questionId="scope.row.id"/>
			</template>
		</fs-crud>
	</fs-page>
</template>

<script lang="ts" setup name="loginLog">
import { ref, onMounted } from 'vue';
import { useFs } from '@fast-crud/fast-crud';
import { createCrudOptions } from './crud';
// import Option from '../option/index.vue';
import Option from '../components/option.vue'

const { crudBinding, crudRef, crudExpose } = useFs({ createCrudOptions });

// 页面打开后获取列表数据
onMounted(() => {
	crudExpose.doRefresh();
});
</script>
