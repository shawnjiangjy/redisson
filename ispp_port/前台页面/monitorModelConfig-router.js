import monitorModelConfig from './monitorModelConfigDetail.vue'
import subDefenseLineConfig from './subDefenseLineConfig.vue'
import itManagerList from './ItManagerList'
import fundsSystemConfig from './FundsSystemConfig'
import hisCleanStrategyConfig from './hisCleanStrategyConfig'
import warningStrategyConfig from './warningStrategyConfig'
import fundsSystemAspectConfig from './FundSystemAspectConfig'
import albListConfig from './AlbListConfig'
import dmapConfig from './DmapSecurityLevelConfig'

const monitorModelConfigRouter = [
  // ftp文件上传下载操作记录
  {
    path: '/monitorModelConfig/monitorModelConfigDetail',
    name: 'monitorModelConfigDetail',
    component: monitorModelConfig,
    meta: {
      permit: 'Service$Occ.MonitorModel$findMonitorModelPageList',
      parentPermit: 'itTrustedPeople'
    }
  },
  {
    path: '/monitorModelConfig/subDefenseLineConfig',
    name: 'subDefenseLineConfig',
    component: subDefenseLineConfig,
    meta: {
      permit: 'Service$Occ.EditLineDefenseService$findEditLineDefense',
      parentPermit: 'itTrustedPeople'
    }
  },
  // it管理员清单配置
  {
    path: '/monitorModelConfig/ItManagerList',
    name: 'itManagerList',
    component: itManagerList,
    meta: {
      permit: 'Service$Occ.ItManagerList$findPageList',
      parentPermit: 'itTrustedPeople'
    }
  },
  // 资金应用业务对象配置
  {
    path: '/monitorModelConfig/FundsSystemConfig',
    name: 'fundsSystemConfig',
    component: fundsSystemConfig,
    meta: {
      permit: 'Service$Occ.FundsSystemList$findFundsConfPageList',
      parentPermit: 'itTrustedPeople'
    }
  },
  // 数据清洗策略配置
  {
    path: '/monitorModelConfig/HisCleanStrategyConfig',
    name: 'hisCleanStrategyConfig',
    component: hisCleanStrategyConfig,
    meta: {
      permit: 'Service$Occ.HisCleanStrategyConfig$findCleanStrategyConfiglist',
      parentPermit: 'itTrustedPeople'
    }
  },
  // 告警策略配置
  {
    path: '/monitorModelConfig/WarningStrategyConfig',
    name: 'warningStrategyConfig',
    component: warningStrategyConfig,
    meta: {
      permit: 'Service$Occ.HisWarningStrategyConfig$findWarningStrategyConfiglist',
      parentPermit: 'itTrustedPeople'
    }
  },
  // 应用三切面配置
  {
    path: '/monitorModelConfig/fundsSystemAspectConfig',
    name: 'fundsSystemAspectConfig',
    component: fundsSystemAspectConfig,
    meta: {
      permit: 'Service$Occ.FundsSystemAspectConfig$findFundsAspectConfPageList',
      parentPermit: 'itTrustedPeople'
    }
  },
  // ALB上下文配置
  {
    path: '/monitorModelConfig/albListConfig',
    name: 'albListConfig',
    component: albListConfig,
    meta: {
      permit: 'Service$Occ.AlbConfig$findAlbConfPageList',
      parentPermit: 'itTrustedPeople'
    }
  },
  // DMAP字段密级配置
  {
    path: '/monitorModelConfig/dmapSecurityLevelConfig',
    name: 'dmapConfig',
    component: dmapConfig,
    meta: {
      permit: 'Service$Occ.DmapSecurityLevelConfig$findDmapSecurityLevelConfList',
      parentPermit: 'itTrustedPeople'
    }
  }
]
export default monitorModelConfigRouter
