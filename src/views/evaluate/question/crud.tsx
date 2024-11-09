import * as api from './api';
import { UserPageQuery, AddReq, DelReq, EditReq, CreateCrudOptionsProps, CreateCrudOptionsRet, dict } from '@fast-crud/fast-crud';
import { dictionary } from '/@/utils/dictionary';

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
			request: {
				pageRequest,
				addRequest,
				editRequest,
				delRequest,
			},
			actionbar: {
				buttons: {
					add: {
						show: true,
					},
				},
			},
			rowHandle: {
				fixed: 'right',
				width: 200,
				buttons: {
					view: {
						type: 'text',
					},
					edit: {
						text: '编辑',
						type: 'text',
						iconRight: 'Edit',
						show: true,
					},
					remove: {
						type: 'text',
						iconRight: 'Delete',
						show: true,
					},
					// addOption: {
					// 	type: 'text',
					// 	text: '添加选项',
					// 	iconRight: 'circle-plus',
					// 	show: true,
					// },
				},
			},
			columns: {
				$expand: {
					title: "展开",
					form: { show: false },
					column: {
						type: "expand",
						align: "center",
						width: "55px",
						columnSetDisabled: true //禁止在列设置中选择
					},
				},
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
				scale: {
					title: '量表',
					search: {
						disabled: true,
					},
					type: 'dict-select',
					dict: dict({
						url: "/api/evaluate/scale",
						value: 'id',
						label: 'title'
						// async getNodesByValues(values:any[]){
						//   const res:any[] = await api.getByIds(values)
						//   //注意：这里res必须是数组
						//   return res;
						// }
					}),
					column: {
						minWidth: 120,
					},
					form: {
						disabled: true,
						component: {
							placeholder: '选择量表',
							name: 'fs-dict-select'
						},
					},
				},
				text: {
					title: '题目',
					search: {
						disabled: false,
					},
					type: 'input',
					column: {
						minWidth: 120,
					},
					form: {
						component: {
							placeholder: '请输入题目',
						},
					},
				},
				type: {
					title: '题目类型',
					search: {
						disabled: true,
					},
					disabled: true,
					type: 'dict-select',
					column: {
						minWidth: 120,
					},
					dict: dict({
						// data: [
						// 	{ value: "1", label: "单选题" },
						// 	{ value: "2", label: "多选题" },
						// 	{ value: "3", label: "判断题" },
						// ]
						data: dictionary('question_type')
					}),
					form: {
						component: {
							placeholder: '题目类型',
						},
					},
				},
			},
		},
	};
};
