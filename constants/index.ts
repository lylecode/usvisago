import { addMonths } from 'date-fns';

export const headerData = [
  { title: '美签申请', href: '/term' },
  { title: 'EVUS登记', href: '/evus' },
  { title: '美国酒店', href: '/hotels' },
  { title: '面谈时间', href: '/interview' },
] as const;

export const termData = [
  {
    title: '服务内容',
    text: '本服务旨在为客户提供美国签证申请的代理协助。我们将根据您提供的资料和信息，向相关机构（如美国大使馆或领事馆）提交签证申请。',
  },
  {
    title: '资料真实性',
    text: '您承诺向我们提供的所有资料（包括但不限于个人信息、身份证明、财务状况、旅行目的等）均真实、准确、完整且合法。如因您提供虚假、不准确或不完整的信息导致签证申请失败、被拒签或其他法律后果，您将自行承担全部责任。',
  },
  {
    title: '信息使用与传递',
    text: '您同意并授权我们将您提供的资料直接传递给美国签证申请相关机构，用于完成签证申请流程。我们承诺仅将您的信息用于签证申请目的，不会将其用于其他未经您同意的用途，除非法律另有要求。',
  },
  {
    title: '免责声明',
    text: '我们将尽合理努力协助您办理签证或者EVUS登记，但审批结果由美国相关机构全权决定。我们不对最终结果（包括但不限于拒签、延误等）承担责任。',
  },
  {
    title: '隐私保护',
    text: '我们将采取合理措施保护您提供的信息安全，但因不可抗力（如网络攻击、系统故障）或第三方行为导致的信息泄露，我们不承担责任。具体隐私政策请参阅我们的《隐私声明》。',
  },
  {
    title: '协议变更',
    text: '我们保留随时修改本协议的权利，修改后的协议将在发布后立即生效。如您继续使用本服务，即视为接受修改后的条款。',
  },
  {
    title: '适用法律',
    text: '本协议适用中国法律。如发生争议，双方应协商解决；协商不成的，提交管辖权法院处理。',
  },
] as const;
export const homeAdvantage = [
  {
    icon: 'language',
    title: '中文服务',
    content: '全程中文支持，专业顾问1对1解答，语言零障碍，轻松搞定复杂流程。',
  },
  {
    icon: 'check-list',
    title: '预制选项',
    content: '智能预填申请表，自动匹配签证类型，避免填写错误，节省30%申请时间。',
  },
  {
    icon: 'timing',
    title: '极速申请',
    content: 'VIP加急通道，优先审核+材料极速提交，最快3个工作日出签，紧急出行无忧。',
  },
  {
    icon: 'spring-calendar',
    title: '预约面签',
    content: '一键查询领馆最新档期，实时抢占面签名额，告别排队，预约成功率提升90%。',
  },
  {
    icon: 'teacher',
    title: '面签指导',
    content: '模拟签证官高频问题，专业培训应答技巧，材料清单核对，助您一次通过！',
  },
  {
    icon: 'register',
    title: 'EVUS注册',
    content: '美国签证更新电子系统（EVUS）代注册，2小时完成登记，自动提醒续期，出行不延误。',
  },
] as const;

export const randomTravel = [
  {
    arrivalDate: addMonths(new Date(), 3),
    arrivalCity: '',
    arrivalFlight: '',
    departureDate: addMonths(new Date(), 4),
    departureCity: '',
    departureFlight: '',
    locations: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
  },
];
export const MARITAL_OPTION = [
  { key: 'MARRIED', label: '已婚' },
  { key: 'SINGLE', label: '未婚' },
  { key: 'WIDOWED', label: '离异' },
  { key: 'DIVORCED', label: '丧偶' },
  { key: 'DOMESTIC_PARTNERSHIP', label: '同居伴侣' },
] as const;

export const SEX_OPTION = [
  { key: 'M', label: '男' },
  { key: 'F', label: '女' },
] as const;

export const question = [
  {
    title: '常见问题',
    items: [
      {
        key: 'q200',
        label:
          '你是否患有对公共健康有重大影响的传染病（包括软下疳、淋病、腹股沟肉芽肿、传染性麻风、腹股沟淋巴肉芽肿、传染期梅毒、活动性结核病以及其他由卫生与公共服务部确定的疾病）？',
      },
      {
        key: 'q201',
        label: '你是否有可能对自己或他人的安全或福祉构成威胁的精神或身体障碍？',
      },
      {
        key: 'q202',
        label: '你现在或曾经是否有药物滥用或成瘾的问题？',
      },
    ],
  },
  {
    title: '安全问题1',
    items: [
      {
        key: 'q300',
        label: '你是否曾经被逮捕或因任何违法或犯罪行为被定罪，即使已被赦免、特赦或采取其他类似行动？',
      },
      {
        key: 'q301',
        label: '你是否曾经违反或参与共谋违反任何与管制物质相关的法律？',
      },
      {
        key: 'q302',
        label: '你是否来美国从事卖淫或非法商业化的不道德行为，或在过去10年内是否从事过卖淫或协助介绍卖淫活动？',
      },
      {
        key: 'q303',
        label: '你是否曾经参与或试图参与洗钱活动？',
      },
      {
        key: 'q304',
        label: '你是否曾经在美国境内外实施或共谋实施人口贩运犯罪？',
      },
      {
        key: 'q305',
        label: '你是否曾经故意帮助、教唆、协助或勾结任何在美国境内外实施或共谋实施严重人口贩运犯罪的个人？',
      },
      {
        key: 'q306',
        label:
          '你是否是在美国境内外实施或共谋实施人口贩运犯罪的个人的配偶、子女，并在过去五年内故意从人口贩运活动中获益？',
      },
    ],
  },
  {
    title: '安全问题2',
    items: [
      {
        key: 'q400',
        label: '你是否试图在美国从事间谍、破坏、出口管制违法或任何其他非法活动？',
      },
      {
        key: 'q401',
        label: '你是否试图在美国从事恐怖活动或曾经参与过恐怖活动？',
      },
      {
        key: 'q402',
        label: '你是否曾经或打算为恐怖分子或恐怖组织提供经济援助或其他支持？',
      },
      {
        key: 'q403',
        label: '你是否是恐怖组织的成员或代表？',
      },
      {
        key: 'q404',
        label: '你是否是在过去五年内参与恐怖活动（包括为恐怖分子或恐怖组织提供经济援助或其他支持）的个人的配偶、子女？',
      },
      {
        key: 'q405',
        label: '你是否曾经下令、煽动、实施、协助或以其他方式参与种族灭绝？',
      },
      {
        key: 'q406',
        label: '你是否曾经下令、煽动、实施、协助或以其他方式参与酷刑？',
      },
      {
        key: 'q407',
        label: '你是否曾经下令、煽动、实施、协助或以其他方式参与法外处决、政治谋杀或其他暴力行为？',
      },
      {
        key: 'q408',
        label: '你是否曾经参与招募或使用童军？',
      },
      {
        key: 'q409',
        label: '作为政府官员，你是否曾在任何时候负责或直接实施特别严重的宗教自由侵犯行为？',
      },
      {
        key: 'q410',
        label: '你是否曾直接参与制定或执行强迫妇女违背其自由意愿堕胎或强迫男性或女性违背其自由意愿绝育的人口控制政策？',
      },
      {
        key: 'q411',
        label: '你是否曾直接参与强制移植人体器官或组织？',
      },
    ],
  },
  {
    title: '安全问题3',
    items: [
      {
        key: 'q500',
        label: '你是否曾经通过欺诈、故意虚假陈述或其他非法手段，试图获取或帮助他人获取美国签证、入境或其他移民利益？',
      },
      {
        key: 'q501',
        label: '你是否曾经被任何国家驱逐出境或遣返？',
      },
    ],
  },
  {
    title: '安全问题4',
    items: [
      {
        key: 'q600',
        label: '你是否曾在美国境外扣留一名美国公民儿童，使其脱离美国法院授予合法监护权的人？',
      },
      {
        key: 'q601',
        label: '你是否曾违反任何法律或规定在美国投票？',
      },
      {
        key: 'q602',
        label: '你是否曾为了逃避税收而放弃美国公民身份？',
      },
    ],
  },
];
