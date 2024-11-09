import * as api from './api';
import { UserPageQuery, AddReq, DelReq, EditReq, CreateCrudOptionsProps, CreateCrudOptionsRet, dict } from '@fast-crud/fast-crud';
import { commonCrudConfig } from "/@/utils/commonCrud";
import { auth } from '/@/utils/authFunction';

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
						show: auth('ScaleView:Create'),
					},
				},
			},
			rowHandle: {
				fixed: 'right',
				width: 200,
				buttons: {
					view: {
						type: 'text',
						show: auth('ScaleView:Retrieve')
					},
					edit: {
						text: '编辑',
						type: 'text',
						iconRight: 'Edit',
						show: auth('ScaleView:Update'),
					},
					remove: {
						type: 'text',
						iconRight: 'Delete',
						show: auth('ScaleView:Delete'),
					},
					gotoTest: {
						type: 'text',
						text: '开始测试',
						show: !auth('ScaleView:gotoTest'),
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
				title: {
					title: '测试名称',
					search: {
						disabled: true,
					},
					type: 'input',
					column: {
						minWidth: 120,
					},
					form: {
						disabled: true,
						component: {
							placeholder: '测试名称',
						},
					},
				},
				description: {
					title: '项目描述',
					search: {
						disabled: false,
					},
					type: 'input',
					column: {
						minWidth: 120,
					},
					form: {
						disabled: true,
						component: {
							placeholder: '请输入项目描述',
						},
					},
				},
				duration: {
					title: '时长',
					search: {
						disabled: true,
					},
					disabled: true,
					type: 'input',
					column: {
						minWidth: 120,
					},
					form: {
						component: {
							placeholder: '时长',
						},
					},
				},
				testCount: {
					title: '已测试人次',
					type: 'input',
					column: {
						minWidth: 90,
					},
					form: {
						disabled: true,
						component: {
							placeholder: '请输入大州',
						},
					},
					component: { props: { color: 'auto' } }, // 自动染色
				},
			},
		},
	};
};
