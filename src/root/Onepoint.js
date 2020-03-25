import React, {Component} from 'react'
import { Card, Input, Button, Table ,Content} from 'antd';
import { Layout } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';

var math=require('mathjs')
var dataT=[]
var dataA=[]
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "Xl",
        dataIndex: "xl",
        key: "xl"
    },
    {
        title: "Xr",
        dataIndex: "xr",
        key: "xr"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Error",
        key: "error",
        dataIndex: "error"
    }
];
class Onepoint extends Component{
    constructor(){
        super();
        this.state={
            fx:"",
            xl: 0,
            xr: 0,
            showTable: false,
            showGraph: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.Onepoint = this.Onepoint.bind(this);
    }
    Onepoint(xl,xr){
        var fx = this.state.fx;
        var XFunction = false;
        var xm = 0;
        var sum = parseFloat(0.000000);
        var i = 0;
        var data = []
        data['xl'] = []
        data['xr'] = []
        data['x'] = []
        data['error'] = []
        data['iteration'] = []
        
        do {
            xm = (xl + xr) / 2;
            if (this.func(xm)* this.func(xl)< 0){
                sum=this.error(xm,xr);
                xr=xm;
            }
            else {
                sum=this.error(xm,xl);
                xl=xm;
            }
            data['iteration'][i] = i;
            data['xl'][i] = xl.toFixed(6);
            data['xr'][i] = xr.toFixed(6);
            data['x'][i] = xm.toFixed(6);
            data['error'][i] = Math.abs(sum).toFixed(6);
            console.log(data['xl'][i]); 
            i++;
            
        } while (Math.abs(sum) > 0.000001);
        this.createTable(data['xl'], data['xr'], data['x'], data['error']);
        this.setState({
            showTable: true,
            showGraph: true,
        })
    }
    func(X){
        let scope = { x: parseFloat(X) }; //แปลงค่า string หรือตัวแปรให้เป็น Number
        var variable = math.compile(this.state.fx);
        return variable.eval(scope); //eval compile 'String'
    }
    error(xnew,xold){
        return Math.abs((xnew - xold) /xnew);

    }
    createTable(xl, xr, x, error) {
        dataT = []
        dataA = []
        for (var i = 0; i < xl.length; i++) {
            dataT.push({
                iteration: i + 1,
                xl: xl[i],
                xr: xr[i],
                x: x[i],
                error: error[i],
            });
            dataA.push({
                iteration: i + 1,
                x: x[i],
                y: this.func(x[i]).toFixed(6),
                error: error[i],
            });
            
        }
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value 
        });
    }
    render(){
        return(
            <Layout>
                <div>
                    <h2>Onepoint iteration</h2>
                    <div onChange={this.handleChange}>
                        <h2>f(x)</h2>
                        <Input size="large" name="fx" style={{ width: 300}}></Input>
                        <h2>ต่าเริ่มต้น</h2>
                        <Input size="large" name="xr" style={{ width: 300}}></Input>
                        <Button onClick={() => this.Onepoint( parseFloat(this.state.xr))}
                                style={{  marginLeft: 90 ,color:'#ffffff',background:'#12406A'}}>Submit</Button><br /><br />
                    </div>
                    {this.state.showTable &&
                        <div
                        title={"Output12"}
                        bordered={true}
                        style={{ width: "50%", float: "inline-start", marginBlockStart: "2%" }}
                        id="output12"
                    >
                         <br /><br /> <Table style={{ width: 800 }} columns={columns} dataSource={dataT} pagination={{ pageSize: 10 }} >
                         </Table>    
                    </div>    
                    }
                    {this.state.showGraph &&
                        <div>
                            <LineChart
                                    width={2000}
                                     height={400}
                                    data={dataA}
                                     margin={{ top: 30, bottom: 10 }}
                                    style={{ backgroundColor: "#fff" }}
                                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="x" />
                                <YAxis
                                type="number"
                                 dataKey="y"
                                 domain={["auto", "auto"]}
                                 allowDataOverflow="true"
                                />
                                <Tooltip />
                                <Legend />
                                <Line type="linear" dataKey="y" stroke="#8884d8" />
                                </LineChart>
                        </div>
                    
                    }       
                        
                    
                </div>
            </Layout>
        )
    }
}
export default Onepoint;