import React, { Component, PropTypes } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Router, Link } from 'dva/router';
import styles from './MainLayout.less';

const { Header, Sider, Content } = Layout;
const reg = /^\/(\w+[^/])/;
const SubMenu = Menu.SubMenu;

class MainLayout extends Component {
  state = {
    collapsed: false,
    current: '1',
    openKeys: []
  };
  getAncestorKeys = (key) => {
    const map = {
      sub3: ['sub2']
    };
    return map[key] || [];
  }
  handleClick = (e) => {
    console.log('Clicked: ', e);
    this.setState({ current: e.key });
  }
  onOpenChange = (openKeys) => {
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  }
  render() {
    const { children, location } = this.props;
    let keys = this.state.defaultSelectedKeys;
    if (location.pathname && reg.test(location.pathname)) {
      keys = reg.exec(location.pathname)[1];
    }
    return (
      <Layout className={styles.layout}>
        <Header>
          <div className="logo" /><span>头部内容为 用户登录信息及</span><a href="/">首页</a>
        </Header>
        <Layout>
          <Sider trigger={null} collapsed={this.state.collapsed}>
            <Menu theme="dark" mode="inline" onOpenChange={this.onOpenChange} onClick={this.handleClick}>
              <SubMenu key="sub1" title={<span > <Icon type="pie-chart" /><span> 数据统计 </span></span >}>
                <Menu.Item key="statistical">
                  <Link to="statistical">
                    <Icon type="pie-chart" />
                    <span className="nav-text">数据统计</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="analyze">
                  <Link to="analyze">
                    <Icon type="area-chart" />
                    <span className="nav-text">数据分析</span>
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span> <Icon type="setting" /> <span> 系统配置 </span></span >}>
                <Menu.Item key="config">
                  <Link to="config">
                    <Icon type="video-camera" />
                    <span className="nav-text">Demo数据</span>
                  </Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content>
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

MainLayout.propTypes = {
// Injected by React Router
  children: PropTypes.node // eslint-disable-line
};

export default MainLayout;
