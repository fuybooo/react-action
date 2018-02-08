import * as React from 'react';
import {Link} from 'react-router-dom';
import RouteWithSubRoutes from '../shared/RouteWithSubRoutes';
import {Layout, Menu, Breadcrumb} from 'antd';
import './main.scss';
import routes from '../routes';
const logo = require('../logo.svg');
const {Header, Content, Footer} = Layout;
const {SubMenu} = Menu;
interface MainState {
  activeKey: string;
}
export default class Main extends React.Component<any, MainState> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeKey: 'dashboard'
    }
  }

  handleClick(e: any) {
    console.log(e);
    this.setState({
      activeKey: e.key
    })
  }
  render() {
    return (
      <Layout className={'layout'}>
        <Header>
          <div className={'logo-wrap'}>
            <img className={'main-logo'} src={logo} height={50} alt={'react-logo'}/>
          </div>
          <Menu
            theme={'dark'}
            mode={'horizontal'}
            className={'h64 lh64i'}
            selectedKeys = {[this.state.activeKey]}
            // selectedKeys = {['user']}
            onClick={this.handleClick.bind(this)}
          >
            {...getAppMenu()}
          </Menu>
        </Header>
        <Content className={'main-content p050'}>
          <Breadcrumb className={'main-breadcrumb m16_0'}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div className={'main-container'}>
            {this.props.routes.map((route: any, i: number) => (
              <RouteWithSubRoutes key={i} {...route}/>
            ))}
          </div>
        </Content>
        <Footer className={'tac'}>
          Fuybooo Design ©2018
        </Footer>
      </Layout>
    );
  }
}

function getAppMenu() {
  const appMenu: any[] = [];
  let mainRoute: any =  routes.find(value => value.path === '/main');
  for (const route of mainRoute.routes) {
    if (route.routes) {
      let subRoutes = [];
      for (const subRoute of route.routes) {
        subRoutes.push(
          <Menu.Item key={subRoute.key}>
            <Link to={subRoute.path}>{subRoute.title}</Link>
          </Menu.Item>
        );
      }
      appMenu.push(
        <SubMenu key={route.key} title={route.title}>
          {...subRoutes}
        </SubMenu>
      );
    } else {
      appMenu.push(
        <Menu.Item key={route.key}>
          <Link to={route.path}>{route.title}</Link>
        </Menu.Item>
      );
    }
  }
  return appMenu;
}