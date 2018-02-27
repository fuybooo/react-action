import * as React from 'react';
import {Row, Col, List} from 'antd';
import * as $ from 'jquery';
import urls, {HttpRes} from '../../shared/http/urls';
import * as moment from 'moment';
import './dashboard.scss';
interface DashboardState {
  params: {
    search: string;
    queryDevice: string; // 设备名称
    queryOwner: string; // username
    queryLevel: string; // '' / 1 / 2 / 3
    queryDept: string; // 部门名称
    lastTimeFrom: string; // 默认值 今天
    lastTimeTo: string; // 默认值 今天
    pageSize: number; // 默认值 100
    pageNumber: number; // 默认值 1
    sortName: string; // 默认值 时间
    sortOrder: string; // 默认值 倒序
  };
  summary: any[];
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
  lastTimeFrom: moment().subtract(30, 'day').format('YYYY-MM-DD'), // 默认值 今天
  lastTimeTo: moment(Date.now()).format('YYYY-MM-DD'), // 默认值 今天
  pageSize: 100, // 默认值 100
  pageNumber: 1, // 默认值 1
  sortName: '', // 默认值 时间
  sortOrder: '', // 默认值 倒序
};

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
      params: defaultParams
    };
  }

  getSummary(params: any = {}) {
    $.get(urls.get_users_and_devices_number, (res: HttpRes) => {
      console.log(res);
    });
    $.get(urls.get_illegal_device_list, Object.assign({}, defaultParams, params), (res: HttpRes) => {
      if (res.code === '200') {
        let summary: any[] = $.extend(true, [], this.state.summary);
        summary.find(value => value.title === 'Department').items = res.data.illegalDep;
        summary.find(value => value.title === 'User').items = res.data.illegalUser;
        summary.find(value => value.title === 'Level').items = res.data.illegalLevel.length ? res.data.illegalLevel : defaultLevelSummary;
        summary.find(value => value.title === 'Device').items = res.data.illegalDevice;
        this.setState({summary});
      }
    });
  }
  componentDidMount() {
    this.getSummary();
  }
  render() {
    return (
      <Row gutter={16}>
        {
          ...(
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
                          ((function(name){
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
          )
        }
      </Row>
    );
  }
}