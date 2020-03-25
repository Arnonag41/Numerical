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
        title: "fx",
        dataIndex: "fx",
        key: "fx"
    },
    {
        title: "fx1",
        dataIndex: "fx1",
        key: "fx1"
    },
    {
        title: "value",
        dataIndex: "value",
        key: "value"
    },
    {
        title: "Error",
        key: "error",
        dataIndex: "error"
    }
];
class Newton extends Component{
    constructor(){
        super();
        this.state={
            fx:"",
            fx1:"",
            value:0,
            showTable: false,
            showGraph: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.Newton = this.Newton.bind(this);
    }
    Newton(value){
        var fx = this.state.fx;
        var fx1 = this.state.fx1;
        var XFunction = false;
        var value = 0;
        var value1 = 0;
        var sum = parseFloat(0.000000);
        var i = 0;
        var data = []
        data['value'] = []
        data['fx'] = []
        data['fx1'] = []
        data['error'] = []
        data['iteration'] = []
        
        do {
            //xm = (xl + xr) / 2;
            if (i<4){
                value1=value;
                sum=value-(this.func(fx)/this.func(fx1));
                sum=this.error(value,value1);
            }
            
            data['iteration'][i] = i;
            data['value'][i] = value.toFixed(6);
            //data['xr'][i] = xr.toFixed(6);
            //data['x'][i] = xm.toFixed(6);
            data['error'][i] = Math.abs(sum).toFixed(6);
            i++;
            
        } while (Math.abs(sum) > 0.000001);
        this.createTable(data['value'], data['error']);
        this.setState({
            showTable: true,
            showGraph: true,
        })
    }
    func(X){
        let scope = { x: parseFloat(X) }; //แปลงค่า string หรือตัวแปรให้เป็น Number
        var variable = math.compile(this.state.fx);
        var variable = math.compile(this.state.fx1);
        return variable.eval(scope); //eval compile 'String'
    }
    error(xnew,xold){
        return Math.abs((xnew - xold) /xnew);

    }
    createTable(value, error) {
        dataT = []
        dataA = []
        for (var i = 0; i < 4; i++) {
            dataT.push({
                iteration: i + 1,
                value: value[i],
                error: error[i],
            });
            dataA.push({
                iteration: i + 1,
                value: value[i],
                //y: this.func(x[i]).toFixed(6),
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
                    <h2>Newton Raphson</h2>
                    <div onChange={this.handleChange}>
                        <h2>f(x)</h2>
                        <Input size="large" name="fx" style={{ width: 300}}></Input>
                        <h2>f'(x)</h2>
                        <Input size="large" name="fx1" style={{ width: 300}}></Input>
                        <h2>ค่าเริ่มต้น</h2>
                        <Input size="large" name="value" style={{ width: 300}}></Input>
                        <Button onClick={() => this.Newton(parseFloat(this.state.value))}
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
export default Newton;