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
						show: false,
					},
					addRow: { show: true, text: '添加选项' },
				},
			},
			search: {
				show: false
			},
			toolbar: {
				show: false,
				buttons: {
					refresh: {
						show: false
					},
					search: {
						show: false
					}
				}
			},
			pagination: { show: false, pageSize: 9999999 },
			rowHandle: {
				fixed: 'right',
				width: 200,
				buttons: {
					// view: {
					// 	type: 'text',
					// },
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
				question: {
					title: '题目',
					search: {
						disabled: true,
					},
					type: 'dict-select',
					dict: dict({
						url: `/api/evaluate/scale/question/5`,
						value: 'id',
						label: 'text'
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
						component: {
							placeholder: '请输入题目',
						},
					},
				},
				text: {
					title: '选项内容',
					search: {
						disabled: true,
					},
					// disabled: true,
					type: 'input',
					column: {
						minWidth: 120,
					},
					form: {
						component: {
							placeholder: '选项内容',
						},
					},
				},
			},
			table: {
				editable: {
					enabled: true,
					mode: "row"
				},
				data: [pageRequest({question_id : 6})]
			},
		},
	};
};
