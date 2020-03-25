import React, {Component} from 'react'
import { Card, Input, Button, Table ,Content} from 'antd';
import { Layout } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';

var math=require('mathjs')
var dataT=[]
const columns = [
    {
        title: "x1",
        dataIndex: "Detx1",
        key: "Detx1"
    },
    {
        title: "x2",
        dataIndex: "Detx2",
        key: "Detx2"
    },
    {
        title: "x3",
        dataIndex: "Detx3",
        key: "Detx3"
    },
];
class Cramer extends Component{
    constructor(){
        super();
        this.state={
            Detx1:0,
            Detx2:0,
            Detx3:0,
            showTable: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.Cramer = this.Cramer.bind(this);
    }
    Cramer(a11,a12,a13,a21,a22,a23,a31,a32,a33,b11,b12,b13){
        //var sum = parseFloat(0.000000);
        var i = 0;
        var data = []
        var DetA =0;
        var Detx1 =0;
        var Detx2 =0;
        var Detx3 =0;
        DetA=((a11*a22*a33)+(a12*a23*a31)+(a13*a21*a32))-((a31*a22*a13)+(a32*a23*a11)+(a33*a21*a12));
        Detx1=((b11*a22*a33)+(a12*a23*b13)+(a13*b12*a32))-((b13*a22*a13)+(a32*a23*b11)+(a33*b12*a12))/DetA;
        Detx2=((a11*b12*a33)+(b12*a23*a31)+(a13*a21*b13))-((a31*b12*a13)+(b13*a23*a11)+(a33*a21*b11))/DetA;
        Detx3=((a11*a22*b13)+(a12*b12*a31)+(b11*a21*a32))-((a31*a22*b11)+(a32*b12*a11)+(b13*a21*a12))/DetA;
        this.createTable(Detx1,Detx2,Detx3);
        this.setState({
            showTable: true,
        })
    }
    createTable(Detx1,Detx2,Detx3) {
        Detx1=Detx1;
        Detx3=Detx3;
        Detx2=Detx2;
        dataT.push({
            Detx1: Detx1,
            Detx2: Detx2,
            Detx3: Detx3
        });
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
                    <h2>Cramer's rule</h2>
                    <div onChange={this.handleChange}>
                        <h2>Matrix A</h2>
                        <Input size="large" name="a11" style={{ width: 50}}></Input>
                        <Input size="large" name="a12" style={{ width: 50}}></Input>
                        <Input size="large" name="a13" style={{ width: 50}}></Input>
                        <br/>
                        <Input size="large" name="a21" style={{ width: 50}}></Input>
                        <Input size="large" name="a22" style={{ width: 50}}></Input>
                        <Input size="large" name="a23" style={{ width: 50}}></Input>
                        <br/>
                        <Input size="large" name="a31" style={{ width: 50}}></Input>
                        <Input size="large" name="a32" style={{ width: 50}}></Input>
                        <Input size="large" name="a33" style={{ width: 50}}></Input>
                        <br/>
                        <br/>
                        <h2>Matrix B</h2>
                        <Input size="large" name="b11" style={{ width: 50}}></Input><br/>
                        <Input size="large" name="b21" style={{ width: 50}}></Input><br/>
                        <Input size="large" name="b31" style={{ width: 50}}></Input><br/>
                        <Button onClick={() => this.Cramer(parseInt(this.state.a11), parseInt(this.state.a12), parseInt(this.state.a13),
                        parseInt(this.state.a21), parseInt(this.state.a22), parseInt(this.state.a23),
                        parseInt(this.state.a31), parseInt(this.state.a32), parseInt(this.state.a33),
                        parseInt(this.state.b11), parseInt(this.state.b12), parseInt(this.state.b13))}
                        style={{  marginLeft: 90 ,color:'#ffffff',background:'#12406A'}}>Submit</Button><br /><br />
                    </div>
                    {this.state.showTable &&
                        <div
                        title={"Output12"}
                        bordered={true}
                        style={{ width: "50%", Int: "inline-start", marginBlockStart: "2%" }}
                        id="output12"
                    >
                         <br /><br /> <Table style={{ width: 800 }} columns={columns} dataSource={dataT} pagination={{ pageSize: 10 }} >
                         </Table>    
                    </div>    
                    }
                 
                        
                    
                </div>
            </Layout>
        )
    }
}
export default Cramer;