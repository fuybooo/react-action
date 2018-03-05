import * as React from 'react';
import {Link} from 'react-router-dom';
import RouteWithSubRoutes from '../shared/RouteWithSubRoutes';
import {Layout, Menu, Breadcrumb} from 'antd';
import './main.scss';
import routes from '../routes';
import * as $ from 'jquery';
import urls from '../shared/http/urls';
const logo = require('../logo.svg');
const {Header, Content, Footer} = Layout;
const {SubMenu} = Menu;
interface MainState {
  activeKey: string;
  breadcrumbItems: any[]
}
export default class Main extends React.Component<any, MainState> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeKey: 'dashboard',
      breadcrumbItems: getDefaultBreadcrumb()
    }
  }

  handleClick(e: any) {
    this.setState({
      activeKey: e.key,
      breadcrumbItems: getBreadcrumbItems(e.key)
    })
  }
  logoutClick() {
    $.post(urls.logout, {}, () => {
      this.props.history.push('/');
    });
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
            className={'h64 lh64i fl'}
            selectedKeys = {[this.state.activeKey]}
            // selectedKeys = {['user']}
            onClick={this.handleClick.bind(this)}
          >
            {...getAppMenu()}
          </Menu>
          <ul className={'main-user-part'}>
            <li>Fuybooo</li>
            <li><a onClick={this.logoutClick.bind(this)}>退出</a></li>
          </ul>
        </Header>
        <Content className={'main-content p050'}>
          <Breadcrumb className={'main-breadcrumb m16_0'}>
            {/*<Breadcrumb.Item>Home</Breadcrumb.Item>*/}
            {/*<Breadcrumb.Item>List</Breadcrumb.Item>*/}
            {/*<Breadcrumb.Item>App</Breadcrumb.Item>*/}
            {...this.state.breadcrumbItems}
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
function getDefaultBreadcrumb() {
  const mainRoute: any =  routes.find(value => value.path === '/main');
  const defaultBreadcrumb =  mainRoute.routes.find((value: any) => value.key === 'dashboard');
  return [(
    <Breadcrumb.Item key={defaultBreadcrumb.title}>
      {defaultBreadcrumb.title}
    </Breadcrumb.Item>
  )];
}
function getBreadcrumbItems(activeKey: string) {
  const mainRoute: any =  routes.find(value => value.path === '/main');
  const firstMenu = mainRoute.routes.find((value: any) => value.key === activeKey);
  if (firstMenu) {
    return [(
      <Breadcrumb.Item key={firstMenu.title}>
        {firstMenu.title}
      </Breadcrumb.Item>
    )];
  } else {
    const breadcrumbItems = [];
    for (let fr of mainRoute.routes) {
      if (fr.routes) {
        for (let sr of fr.routes) {
          if (sr.key === activeKey) {
            breadcrumbItems.push((
              <Breadcrumb.Item key={fr.title}>
                {fr.title}
              </Breadcrumb.Item>
            ), (
              <Breadcrumb.Item key={sr.title}>
                {sr.title}
              </Breadcrumb.Item>
            ));
            return breadcrumbItems;
          }
        }
      }
    }
    return []
  }
}