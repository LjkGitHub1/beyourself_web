import * as api from './api';
import { UserPageQuery, AddReq, DelReq, EditReq, CrudExpose, CrudOptions, CreateCrudOptionsProps, CreateCrudOptionsRet } from '@fast-crud/fast-crud';
import upload from './upload.vue';
import { render } from 'vue';

export const createCrudOptions = function ({ crudExpose }: CreateCrudOptionsProps): CreateCrudOptionsRet {
	const pageRequest = async (query: UserPageQuery) => {
		return await api.GetList(query);
	};
	const editRequest = async ({ form, row }: EditReq) => {
		form.id = row.id;
		return await api.UpdateObj(form);
	};
	const delRequest = async ({ row }: DelReq) => {
		return await api.DelObj(row.id);
	};
	const addRequest = async ({ form }: AddReq) => {
		return await api.AddObj(form);
	};
	return {
		crudOptions: {
			actionbar: {
				buttons: {
					add: {
						show: true,
						text: '上传'
					},
				},
			},
			// from: {
			// 	onSubmit({mode}:any){
			// 		console.log('add',mode)
			// 		if(mode === 'add') {
			// 			console.log('add',mode)
			// 		}
			// 	}
			// },
			request: {
				pageRequest,
				addRequest,
				editRequest,
				delRequest,
			},
			rowHandle: {
				//固定右侧
				fixed: 'right',
				width: 200,
				show:true,
				buttons: {
					view: {
						show: false,
					},
					edit: {
						show: true,
						iconRight: 'Edit',
						type: 'text',
					},
					remove: {
						show: true,
						iconRight: 'Delete',
						type: 'text',
					},
				},
			},
			columns: {
				_index: {
					title: '序号',
					form: { show: false },
					column: {
						//type: 'index',
						align: 'center',
						width: '70px',
						columnSetDisabled: true, //禁止在列设置中选择
						formatter: (context) => {
							//计算序号,你可以自定义计算规则，此处为翻页累加
							let index = context.index ?? 1;
							let pagination = crudExpose!.crudBinding.value.pagination;
							return ((pagination!.currentPage ?? 1) - 1) * pagination!.pageSize + index + 1;
						},
					},
				},
				search: {
					title: '关键词',
					column: {
						show: false,
					},
					search: {
						show: true,
						component: {
							props: {
								clearable: true,
							},
							placeholder: '请输入关键词',
						},
					},
					form: {
						show: false,
						component: {
							props: {
								clearable: true,
							},
						},
					},
				},
				// id: {
				// 	column: {
				// 		show: false
				// 	}
				// },
				name: {
					title: '文件名称',
					search: {
						show: true,
					},
					type: 'input',
					column:{
						minWidth: 120,
					},
					form: {
						component: {
							placeholder: '请输入文件名称',
						},
					},
				},
				url: {
					title: '文件地址',
					type: 'file-uploader',
					search: {
						disabled: true,
					},
					form: {
						component: {
							limit: 1
							// autoUpload: false,
							// name: upload
						}
					},
					column:{
						minWidth: 200,
					},
				},
				md5sum: {
					title: '文件MD5',
					search: {
						disabled: true,
					},
					column:{
						minWidth: 120,
					},
					form: {
						show: false, 
						disabled: false,
					},
				},
			},
		},
	};
};
