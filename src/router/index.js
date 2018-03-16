import Vue from 'vue'
import Router from 'vue-router'

import home from '@/components/home'
import siteSelect from '@/components/siteSelect'
import deviceManagement from '@/components/deviceManagement'
import areasInformation from '@/components/areasInformation'
import deviceDetail from '@/components/deviceDetail'
import dispatchManagement from '@/components/dispatchManagement'
import waitingOrderDetail from '@/components/waitingOrderDetail'
import monitorManagement from '@/components/monitorManagement'
import monitorDetail from '@/components/monitorDetail'
import materialAnalysis from '@/components/materialAnalysis'
import cleanRecord from '@/components/cleanRecord'
import cleanRecordUpdata from '@/components/cleanRecordUpdata'
import cleanDetail from '@/components/cleanDetail'
import feedRecord from '@/components/feedRecord'
import feedRecordUpdata from '@/components/feedRecordUpdata'
import feedOperate from '@/components/feedOperate'
import feedDetail from '@/components/feedDetail'
import cleanOperate from '@/components/cleanOperate'
import maintainUser from '@/components/maintainUser'
import siteSaleRecord from '@/components/siteSaleRecord'
import everySaleRecord from '@/components/everySaleRecord'
import revenueReport from '@/components/revenueReport'
//import receiveAddress from '@/components/receiveAddress'
//import editAddress from '@/components/editAddress'

import siteOperationRecord from '@/components/siteOperationRecord'
import siteOrderRecord from '@/components/siteOrderRecord'
import siteCleanRecord from '@/components/siteCleanRecord'
import siteRepairRecord from '@/components/siteRepairRecord'
import costAnalysis from '@/components/costAnalysis'
import operationAnalysis from '@/components/operationAnalysis'
import operateManagement from '@/components/operateManagement'
import operateDetail from '@/components/operateDetail'
import updateRecord from '@/components/updateRecord'
import areasManagement from '@/components/areasManagement'
import financeConfig from '@/components/financeConfig'
import benefitManagement from '@/components/benefitManagement'
import setBenefit from '@/components/setBenefit'
import repairOperate from '@/components/repairOperate'
import repairRecord from '@/components/repairRecord'
import repairRecordUpdata from '@/components/repairRecordUpdata'
import repairDetail from '@/components/repairDetail'
import orderRecord from '@/components/orderRecord'








Vue.use(Router)

export default new Router({
//	mode: 'history',
routes: [
    { 
    	path: '/',
    	redirect: '/home'
    },
    {
	   	path: '/home',
	   	name: 'home',
	   	component: home,
	   	meta: { keepAlive: false }
	},
    {
	   	path: '/siteSelect',
	   	name: 'siteSelect',
	   	component: siteSelect,
	   	meta: { keepAlive: false }
	},
	{
	   	path: '/deviceManagement/:id',
	   	name: 'deviceManagement',
	   	component: deviceManagement,
	   	meta: { keepAlive: true }
	},
	{
	   	path: '/areasInformation',
	   	name: 'areasInformation',
	   	component: areasInformation,
	   	meta: { keepAlive: false }
	},
	{
	   	path: '/deviceDetail/:id',
	   	name: 'deviceDetail',
	   	component: deviceDetail,
	   	meta: { keepAlive: false }
	},
	{
	   	path: '/dispatchManagement',
	   	name: 'dispatchManagement',
	   	component: dispatchManagement,
	   	meta: { keepAlive: true }
	},
	{
	   	path: '/waitingOrderDetail/:id',
	   	name: 'waitingOrderDetail',
	   	component: waitingOrderDetail,
	   	meta: { keepAlive: false }
	},

	{
	   	path: '/monitorManagement/:id',
	   	name: 'monitorManagement',
	   	component: monitorManagement,
	   	meta: { keepAlive: true }
	},
	{
	   	path: '/monitorDetail/:id',
	   	name: 'monitorDetail',
	   	component: monitorDetail,
	   	meta: { keepAlive: false }
	},
	{
	   	path: '/materialAnalysis',
	   	name: 'materialAnalysis',
	   	component: materialAnalysis,
	   	meta: { keepAlive: false }
	},
	{
	   	path: '/cleanRecord',
	   	name: 'cleanRecord',
	   	component: cleanRecord,
	   	meta: { keepAlive: true }
	},
	{
	   	path: '/cleanRecordUpdata',
	   	name: 'cleanRecordUpdata',
	   	component: cleanRecordUpdata,
	   	meta: { keepAlive: false }
	},
	{
	   	path: '/cleanDetail/:id',
	   	name: 'cleanDetail',
	   	component: cleanDetail,
	   	meta: { keepAlive: true }
	},
	{
	   	path: '/feedRecord',
	   	name: 'feedRecord',
	   	component: feedRecord,
	   	meta: { keepAlive: true }
	},
	{
	   	path: '/feedRecordUpdata',
	   	name: 'feedRecordUpdata',
	   	component: feedRecordUpdata,
	   	meta: { keepAlive: false }
	},
	{
	   	path: '/feedOperate',
	   	name: 'feedOperate',
	   	component: feedOperate,
	   	meta: { keepAlive: false }
	},
	{
	   	path: '/feedDetail/:id',
	   	name: 'feedDetail',
	   	component: feedDetail,
	   	meta: { keepAlive: true }
	},
	{
	   	path: '/cleanOperate',
	   	name: 'cleanOperate',
	   	component: cleanOperate,
	   	meta: { keepAlive: false }
	},
	{
	   	path: '/maintainUser',
	   	name: 'maintainUser',
	   	component: maintainUser,
	   	meta: { keepAlive: false }
	},
	{
	   	path: '/siteSaleRecord',
	   	name: 'siteSaleRecord',
	   	component: siteSaleRecord,
	   	meta: { keepAlive: true }
	},
	{
	   	path: '/everySaleRecord/:id',
	   	name: 'everySaleRecord',
	   	component: everySaleRecord,
	   	meta: { keepAlive: false }
	},
	{
	   	path: '/revenueReport',
	   	name: 'revenueReport',
	   	component: revenueReport,
	   	meta: { keepAlive: false }
	},
	{
	   	path: '/siteOperationRecord/:id',
	   	name: 'siteOperationRecord',
	   	component: siteOperationRecord,
	   	meta: { keepAlive: true }
	},
	{
	   	path: '/siteCleanRecord',
	   	name: 'siteCleanRecord',
	   	component: siteCleanRecord,
	   	meta: { keepAlive: false }
	},
	{
	   	path: '/siteOrderRecord',
	   	name: 'siteOrderRecord',
	   	component: siteOrderRecord,
	   	meta: { keepAlive: false }
	},
	{
	   	path: '/siteRepairRecord',
	   	name: 'siteRepairRecord',
	   	component: siteRepairRecord,
	   	meta: { keepAlive: false }
	},
	{
	   	path: '/costAnalysis',
	   	name: 'costAnalysis',
	   	component: costAnalysis,
	   	meta: { keepAlive: false }
	},
	{
	   	path: '/operationAnalysis',
	   	name: 'operationAnalysis',
	   	component: operationAnalysis,
	   	meta: { keepAlive: true }
	},
	{
	   	path: '/operateManagement',
	   	name: 'operateManagement',
	   	component: operateManagement,
	   	meta: { keepAlive: false }
	},
	{
	   	path: '/operateDetail',
	   	name: 'operateDetail',
	   	component: operateDetail,
	   	meta: { keepAlive: false }
	},
	{
	   	path: '/updateRecord',
	   	name: 'updateRecord',
	   	component: updateRecord,
	   	meta: { keepAlive: false }
	},
	{
	   	path: '/areasManagement',
	   	name: 'areasManagement',
	   	component: areasManagement,
	   	meta: { keepAlive: false }
	},
	{
	   	path: '/financeConfig',
	   	name: 'financeConfig',
	   	component: financeConfig,
	   	meta: { keepAlive: false }
	},
	{
	   	path: '/benefitManagement',
	   	name: 'benefitManagement',
	   	component: benefitManagement,
	   	meta: { keepAlive: false }
	},
	{
	   	path: '/setBenefit',
	   	name: 'setBenefit',
	   	component: setBenefit,
	   	meta: { keepAlive: false }
	},
	{
	   	path: '/repairOperate',
	   	name: 'repairOperate',
	   	component: repairOperate,
	   	meta: { keepAlive: false }
	},
	{
	   	path: '/repairRecord',
	   	name: 'repairRecord',
	   	component: repairRecord,
	   	meta: { keepAlive: true }
	},
	{
	   	path: '/repairRecordUpdata',
	   	name: 'repairRecordUpdata',
	   	component: repairRecordUpdata,
	   	meta: { keepAlive: false }
	},
	{
	   	path: '/repairDetail/:id',
	   	name: 'repairDetail',
	   	component: repairDetail,
	   	meta: { keepAlive: true }
	},
	{
	   	path: '/orderRecord',
	   	name: 'orderRecord',
	   	component: orderRecord,
	   	meta: { keepAlive: false }
	},
	
   ]
})
