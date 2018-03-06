import * as React from 'react';
import {Row, Col, List, Radio, DatePicker, Input, Table} from 'antd';
import * as $ from 'jquery';
import urls, {HttpRes} from '../../shared/http/urls';
import * as moment from 'moment';
import './dashboard.scss';

interface DashboardState {
  summary: any[];
  data: any[];
  currentType: number;
  loading: boolean;
}

const defaultLevelSummary = [
  {
    name: '1',
    count: 0
  },
  {
    name: '2',
    count: 0
  },
  {
    name: '3',
    count: 0
  },
];
const defaultParams = {
  search: '',
  queryDevice: '', // 设备名称
  queryOwner: '', // username
  queryLevel: '', // '' / 1 / 2 / 3
  queryDept: '', // 部门名称
  lastTimeFrom: moment().subtract(60, 'day').format('YYYY-MM-DD'), // 默认值 今天
  lastTimeTo: moment(Date.now()).format('YYYY-MM-DD'), // 默认值 今天
  pageSize: 100, // 默认值 100
  pageNumber: 1, // 默认值 1
  sortName: '', // 默认值 时间
  sortOrder: '', // 默认值 倒序
};
const dashboardTypeList = [
  {
    label: '敏感词',
    value: 1
  },
  {
    label: '违规网址',
    value: 2
  },
  {
    label: '违规设备',
    value: 3
  },
];
const dashboardTypeKeyList = [
  {
    label: 'sensitiveWord',
    value: 1
  },
  {
    label: 'ilegalURL',
    value: 2
  },
  {
    label: 'illegalType',
    value: 3
  },
];

export default class Dashboard extends React.Component<any, DashboardState> {
  constructor(props: any) {
    super(props);
    this.state = {
      summary: [
        {
          title: 'Department',
          items: [
            {
              name: 'Headquarters',
              count: 5
            },
            {
              name: 'pig',
              count: 5
            },
          ]
        },
        {
          title: 'User',
          items: [
            {
              name: 'fuybooo',
              count: 5
            },
            {
              name: 'piggy',
              count: 5
            },
          ]
        },
        {
          title: 'Level',
          items: [
            {
              name: 'Level 1',
              count: 5
            },
            {
              name: 'Level 2',
              count: 5
            },
            {
              name: 'Level 3',
              count: 5
            },
          ]
        },
        {
          title: 'Device',
          items: [
            {
              name: 'HUAWEI',
              count: 5
            },
            {
              name: 'XIAOMI',
              count: 5
            },
          ]
        },
      ],
      data: [],
      currentType: 3,
      loading: false
    };
  }

  getColumns(type: number) {
    let currentTypeLabel: any = dashboardTypeList.find(v => v.value === type);
    let currentTypeKey: any = dashboardTypeKeyList.find(v => v.value === type);
    return [
      {
        title: '设备型号&持有人',
        dataIndex: 'devicename',
        key: 'devicename',
        width: '30%',
        render: (text: any, record: any) => {
          return <div>
            <a>{text}</a>
            <p className={'p0 m0'}>{record.owner}</p>
          </div>;
        }
      },
      {
        title: '部门',
        dataIndex: 'deptName',
        key: 'deptName',
        width: '15%',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
        width: '15%',
      },
      {
        title: currentTypeLabel.label,
        width: '15%',
        dataIndex: currentTypeKey
      },
      {
        title: '级别',
        dataIndex: 'alarmLevel',
        key: 'alarmLevel',
        width: '10%',
        render: (text: any) => {
          let res = '一级';
          let cls = 'level-1';
          if (text === 2) {
            res = '二级';
            cls = 'level-2';
          } else if (text === 3) {
            res = '三级';
            cls = 'level-3';
          }
          return <span className={cls}>{res}</span>;
        }
      },
      {
        title: '时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        width: '15%',
      }
    ];
  }

  changeDataType(type: number) {
    this.setState({
      currentType: type
    });
    this.fetch(type);
  }

  fetch(type = this.state.currentType) {
    let url = urls.get_sensitive_word_list;
    if (type === 2) {
      url = urls.get_illegal_url_list;
    } else if (type === 3) {
      url = urls.get_illegal_device_list;
    }
    $.get(url, Object.assign({}, defaultParams), (res: HttpRes) => {
      if (res.code === '200') {
        let summary: any[] = $.extend(true, [], this.state.summary);
        summary.find(value => value.title === 'Department').items = res.data.illegalDep;
        summary.find(value => value.title === 'User').items = res.data.illegalUser;
        summary.find(value => value.title === 'Level').items = res.data.illegalLevel.length ? res.data.illegalLevel : defaultLevelSummary;
        summary.find(value => value.title === 'Device').items = res.data.illegalDevice;
        this.setState({summary, data: res.data.result});
      }
    });
  }

  changeDateType(e: any) {
    console.log('当前日期类型', e);
  }

  changeDate(date: Date, dateString: string) {
    console.log('当前日期:', date, dateString);
  }

  search(value: string) {
    console.log('查询search:', value);
  }

  componentDidMount() {
    $.get(urls.get_users_and_devices_number, (res: HttpRes) => {
      console.log(res);
    });
    this.fetch();
  }

  render() {
    return (
      <div>
        <Row gutter={16}>
          {
            Array(this.state.summary.length).fill(0).map((v, index) => {
              const value = this.state.summary[index];
              return (
                <Col key={index} span={6}>
                  <List
                    bordered={true}
                    key={value.title}
                    header={value.title}
                    dataSource={value.items}
                    renderItem={(item: any) => (
                      <List.Item
                        key={item.name}
                        className={value.title === 'Level' ? 'list-level' : ''}
                      >
                        <span className={'dif w_80'}>{
                          ((function (name) {
                            let res = name;
                            if (value.title === 'Level') {
                              if (name === '1') {
                                res = '一级';
                              } else if (name === '2') {
                                res = '二级';
                              } else if (name === '3') {
                                res = '三级';
                              }
                            }
                            return res;
                          })(item.name))
                        }</span>
                        <span className={'w_20 tar'}>{item.count}</span>
                      </List.Item>
                    )}
                  />
                </Col>
              );
            })
          }
        </Row>
        <div className={'common-box mt20'}>
        <div>
          <Radio.Group defaultValue={1} onChange={this.changeDateType.bind(this)} className={'fl'}>
            <Radio.Button value={1}>今天</Radio.Button>
            <Radio.Button value={2}>近7天</Radio.Button>
            <Radio.Button value={3}>近30天</Radio.Button>
          </Radio.Group>
          <DatePicker.RangePicker onChange={this.changeDate.bind(this)} className={'fl ml10'}/>
          <Input.Search placeholder={'Input search text'} onSearch={this.search.bind(this)} enterButton
                        className={'dashboard-input-search min-w277'}/>
        </div>
        <div className={'cb'}/>
        <Row className={'common-content-wrap mt20'}>
          <Col className={'common-ul-wrap common-border'} xxl={3} xl={3} lg={4} md={4} sm={4} xs={5}>
            <ul className={'common-ul h518'}>
              {
                $.extend(true, [], dashboardTypeList).map((item: any) => {
                  return (
                    <li key={item.value} onClick={this.changeDataType.bind(this, item.value)}>
                      <a>{item.label}</a>
                    </li>
                  );
                })
              }
            </ul>
          </Col>
          <Col className={'common-center-wrap common-border common-left-border-none'} xxl={21} xl={21} lg={20} md={20} sm={20} xs={19}>
            <Table loading={this.state.loading}
                   columns={this.getColumns(this.state.currentType)}
                   dataSource={this.state.data}
                   scroll={{y: 400}}/>
          </Col>
        </Row>
        </div>
      </div>
    );
  }
}