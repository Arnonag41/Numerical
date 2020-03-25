import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import Bisection from './root/Bisection';
import FalseP from './root/FalseP';
import Onepoint from './root/Onepoint';
import Newton from './root/Newton';
import Cramer from './root/Cramer';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends Component {
  state = {
    openKeys: [''],
    collapsed: false,
  };
  rootSubmenuKeys = ['subroot', 'subalgebra', 'subinterpolate', 'subregression', 'subintegrate', 'subNDD', 'Ode'];
  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }
  onChangePage = (props) => {
    if (props.key.localeCompare("Bisection") === 0) {
      ReactDOM.render(<Bisection />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("FalseP") === 0){
      ReactDOM.render(<FalseP />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("Onepoint") === 0){
      ReactDOM.render(<Onepoint />, document.getElementById("content"));
    }   
    else if (props.key.localeCompare("Newton") === 0){
      ReactDOM.render(<Newton />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("Cramer") === 0){
      ReactDOM.render(<Cramer />, document.getElementById("content"));
    }
  }
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  

  render(){
     return (
      <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline"
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          onClick={this.onChangePage}
        >
          <Menu.Item key="1">     
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
              <span>Root Equation</span>
              </span>
            }
          >
            <Menu.Item key="Bisection">Bisection</Menu.Item>
            <Menu.Item key="FalseP">False Position</Menu.Item>
            <Menu.Item key="Onepoint">One-Point Iteration </Menu.Item>
            <Menu.Item key="Newton">Newton-Raphson </Menu.Item>
            <Menu.Item key="Taylor">Taylor Series</Menu.Item>
            <Menu.Item key="Secant">Secant Method</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
              <span>Linear Algebar</span>
              </span>
            }
          >
            <Menu.Item key="Cramer">Cramer's rule</Menu.Item>
            <Menu.Item key="GaussEli">Gauss Elimination Method</Menu.Item>
            <Menu.Item key="GuassJor">Gauss-Jordan Method</Menu.Item>
            <Menu.Item key="LU">Lu Decomposition Method</Menu.Item>
            <Menu.Item key="Jacobi">Jacobi Iteration Method</Menu.Item>
            <Menu.Item key="GaussSidel">Gauss-Sidel Iteration Method</Menu.Item>
            <Menu.Item key="Conjugate">ConJugate Gradient</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
              <span>Interpolation</span>
              </span>
            }
          >
            <Menu.Item key="Newtondivi">Newton's Divided-Differences</Menu.Item>
            <Menu.Item key="Lagrange">Lagrange Polynomials</Menu.Item>
            <Menu.Item key="Spline">Spline interpolation</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub4"
            title={
              <span>
              <span>Least Square Error</span>
              </span>
            }
          >
            <Menu.Item key="LinearRe">Linear Regression</Menu.Item>
            <Menu.Item key="Polynomial">Polynomial Regression</Menu.Item>
            <Menu.Item key="MultipleRe">Multiple Linear Regression</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub5"
            title={
              <span>
              <span>Intergration</span>
              </span>
            }
          >
            <Menu.Item key="Trapezoidal">Trapezoidal Rule</Menu.Item>
            <Menu.Item key="CompositeTrap">Composite Trapezoidal Rule</Menu.Item>
            <Menu.Item key="Simpson">Simpson's Rule</Menu.Item>
            <Menu.Item key="CompositeSim">Composite Simson's Rule</Menu.Item>
          </SubMenu>  
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
           
        
    
          </Breadcrumb>
          <div id="content" className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            Wellcome To Numerical Method
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
    );
  }
 
}

export default App;
