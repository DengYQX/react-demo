import React, { Component, PropTypes } from 'react';
import Echarts from 'echarts';
import { connect } from 'dva'
import { Input, Button, Select, Form, Modal, Row, Col, Icon, Table } from 'antd';

const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;

const chartOption = (datas) => {
  return {
    title: { text: 'demo数据' },
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: [
          '一月',
          '二月',
          '三月',
          '四月',
          '五月',
          '六月',
          '七月',
          '八月',
          '九月',
          '十月',
          '十一月',
          '十二月'
        ],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '直接访问',
        type: 'bar',
        barWidth: '60%',
        data: datas
      }
    ]
  };
}
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 }
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.Element = 'chartElement';
  }
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('表单内容: ', values);
    });
  }
  handleReset = () => {
    this.props.form.resetFields();
  }
  componentWillMount() {
    const data = [10, 52, 200, 334, 390, 330, 220, 154, 123, 67, 123, 34];
    this.setState({ data });
    setTimeout(() => {
      const myChart = Echarts.init(document.getElementById('chartElement'));
      myChart.setOption(chartOption(data));
    }, 300)
    this.props.queryList();
    this.props.queryTable();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { list, loading } = this.props;
    const { page, size, key } = this.props.location.query;
    const columns = [
      {
        title: '服务名称',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '类型',
        dataIndex: 'type',
        key: 'type'
      }, {
        title: '描述',
        dataIndex: 'desc',
        key: 'desc'
      }, {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100
      }
    ];
    const pagination = {
      current: parseInt(list.page, 10),
      total: list.total,
      pageSize: parseInt(size, 10),
      showSizeChanger: true,
      onShowSizeChange: (pageIndex, pageSize) => {
        // console.log(this.props, this.context.router);
        this.changeQuery({ page: 1, size: pageSize });
        // this.props.queryList({ size });
      },
      onChange: (pageIndex) => {
        this.changeQuery({ page: pageIndex });
        // this.props.queryList({ page });
      }
    };
    return (
      <div>
        <Row >
          <Form className="ant-advanced-search-form" onSubmit={this.handleSearch} layout="horizontal" >
            <Col span={6} key="条件查询一">
              <FormItem {...formItemLayout} label="条件查询一">
                {getFieldDecorator('条件查询一')(
                  <Input placeholder=" " />
                )}
              </FormItem>
            </Col>
            <Col span={6} key="条件查询二">
              <FormItem {...formItemLayout} label="条件查询二">
                {getFieldDecorator('条件查询二')(
                  <Input placeholder=" " />
                )}
              </FormItem>
            </Col>
            <Col span={6} key="条件查询三">
              <FormItem {...formItemLayout} label="条件查询三">
                {getFieldDecorator('条件查询三')(
                  <Input placeholder=" " />
                )}
              </FormItem>
            </Col>
            <Col span={6} key="agment">
              <Button style={{ marginLeft: 20 }} type="primary" htmlType="submit">搜索</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
               清空赛选内容
              </Button>
            </Col>
          </Form>
        </Row>
        <Row type="flex" justify="center" style={{ marginTop: 40 }}>
          <Col span={20} style={{ height: 400 }} id="chartElement" />
        </Row>
        <Row type="flex" justify="center" style={{ marginTop: 40 }}>
          <Col span={20} style={{ height: 300 }} >
            <Table dataSource={list.items} columns={columns} rowKey="id" pagination={pagination} />
          </Col>
      </Row>
      </div>
    )
  }
}
function mapStateToProps(state, ownProps) {
  return {
    data: state.data,
    list: state.services.list,
    loading: !!state.loading.home
  }
}

function dispatchToProps(dispatch) {
  return {
    queryList(payload = {}) {
      dispatch({
        type: 'home/queryList',
        payload
      })
    },
    queryTable(payload = {}) {
      dispatch({
        type: 'services/queryList',
        payload
      })
    }
  }
}
export default connect(mapStateToProps, dispatchToProps)(Form.create()(App));
