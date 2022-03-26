import React from "react";
import {Button, Card, Col, message, Modal, Row, Select, Table} from "antd";
import Cookies from 'js-cookie';
import axios from "axios";
import * as BaseUrl from "../../../server/base_urls";

const columns = [
            {
                title: '#ID',
                dataIndex: 'corp_id',
                key: 'corp_id',
            },
            // {
            //     title: 'Corporate Logo',
            //     dataIndex: 'logo',
            //     key: 'logo',
            // },
            {
                title: 'Corporate Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Corporate Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Corporate Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Corporate Contact 1',
        dataIndex: 'contact1',
        key: 'contact1',
    },
    {
        title: 'Corporate Contact 2',
        dataIndex: 'contact2',
        key: 'contact2',
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
    },
];


const { Option } = Select;

class Corporate extends React.Component {

    state = {
        data_source: [],
        openModal: false,
        selected_corporate: null,
        status: "ACTIVE"
    }

    componentDidMount() {
        this.load_corporates();
    }

    load_corporates = () => {
        if(Cookies.get('68e78905f4cx')=="" ||
            Cookies.get('68e78905f4cx')==null ||
            Cookies.get('68e78905f4cx')==undefined) {
            this.props.history.push("/auth/login");
        }

        let headers = {
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + Cookies.get('68e78905f4cx')
        };

        let method = 'get';

        axios[method](`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}corporate/all`, {headers: headers})
            .then(async response => {
                if(response.data.success) {
                    this.setState({
                        data_source: response.data.body
                    })
                }
            }).catch(async error => {
            this.setState({loading: false});

            this.setState({showMessage:1});
            setTimeout(() => {
                this.setState({showMessage:0});
            }, 2000);

        });
    }

    setVisible = (val, open) => {
        if(open) {
            this.setState({
                openModal: true,
                selected_corporate: val,
                status: val.statusType
            })
        } else {
            this.setState({
                openModal: false,
                selected_corporate: null
            })
        }
    }

    changeStatus = e => {
        this.setState({
            status: e
        })
    }

    statusChange = () => {
        if(Cookies.get('68e78905f4cx')=="" ||
            Cookies.get('68e78905f4cx')==null ||
            Cookies.get('68e78905f4cx')==undefined) {
            this.props.history.push("/auth/login");
        }

        let headers = {
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + Cookies.get('68e78905f4cx')
        };

        let method = 'patch';

        axios[method](`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}corporate/status?id=${this.state.selected_corporate.id}&st=${this.state.status}`, {headers: headers})
            .then(async response => {
                if(response.data.success) {
                    message.success("Corporate status updated successfully!");
                    this.setVisible(null, false);
                }
            }).catch(async error => {
            this.setState({loading: false});

            this.setState({showMessage:1});
            setTimeout(() => {
                this.setState({showMessage:0});
            }, 2000);

        });
    }

    render() {

        let data_source_list = [];
        this.state.data_source.map((r, i)=>{
            let obj = {
                corp_id: 'CORP_'+ r.id,
                logo: (r.corporateLogo!=null & r.corporateLogo!='' & r.corporateLogo!=undefined)?<img src={r.corporateLogo} alt={r.name}/>: <img src={'https://lecrawengineering.com/images/projects/placeholder.png'} alt="corporate-logo" width={50} />,
                name: r.name,
                address: r.address,
                email: r.email,
                contact1: r.contactNumber1,
                contact2: r.contactNumber2,
                action: <Button type={'text'} onClick={()=>this.setVisible(r, true)}>View</Button>
            }
            data_source_list.push(obj);
        })

        return(
            <div>
                <div>
                    <h2>Corporate</h2>
                </div>
                {
                    this.state.openModal?
                    <Modal
                        title=""
                        centered
                        visible={this.state.openModal}
                        onCancel={() => this.setVisible(null, false)}
                        footer={false}
                        width={1000}
                    >
                        <div>
                            <Row>
                                <Col>
                                    <img src={(this.state.selected_corporate!=null)?this.state.selected_corporate.corporateLogo:'https://lecrawengineering.com/images/projects/placeholder.png'} alt="" width={270}/>
                                </Col>
                                <Col>
                                    <div style={{marginLeft: '5px'}}>
                                        <h3>{(this.state.selected_corporate!=null)?this.state.selected_corporate.name:""}</h3>
                                        <table>
                                            <tr>
                                                <th>Address</th>
                                                <td>:</td>
                                                <td>{(this.state.selected_corporate!=null)?this.state.selected_corporate.address:""}</td>
                                            </tr>
                                            <tr>
                                                <th>Email</th>
                                                <td>:</td>
                                                <td>{(this.state.selected_corporate!=null)?this.state.selected_corporate.email:""}</td>
                                            </tr>
                                            <tr>
                                                <th>Contact 1</th>
                                                <td>:</td>
                                                <td>{(this.state.selected_corporate!=null)?this.state.selected_corporate.contactNumber1:""}</td>
                                            </tr>
                                            <tr>
                                                <th>Contact 2</th>
                                                <td>:</td>
                                                <td>{(this.state.selected_corporate!=null)?this.state.selected_corporate.contactNumber2:""}</td>
                                            </tr>
                                            <tr>
                                                <th>Status</th>
                                                <td>:</td>
                                                <td>{(this.state.selected_corporate!=null)?this.state.selected_corporate.statusType:""}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col xs={24} sm={24} md={12} lg={6} xl={12}>
                                    <Card title="Employees" bordered={false} style={{ width: '99%', textAlign: 'center', backgroundColor: '#90caf9', margin: '2px'}}>
                                        <h1>{(this.state.selected_corporate!=null)?this.state.selected_corporate.employeeCount:0}</h1>
                                    </Card>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={6} xl={12}>
                                    <Card title="Projects" bordered={false} style={{ width: '99%', textAlign: 'center', backgroundColor: '#90caf9', margin: '2px'}}>
                                        <h1>{(this.state.selected_corporate!=null)?this.state.selected_corporate.projectCount:0}</h1>
                                    </Card>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Select value={(this.state.selected_corporate!=null)?this.state.selected_corporate.statusType:"DELETE"} onChange={this.changeStatus} style={{ width: 120 }}>
                                    <Option value="ACTIVE">ACTIVE</Option>
                                    <Option value="INACTIVE">INACTIVE</Option>
                                    <Option value="DELETE">DELETE</Option>
                                </Select>
                                <Button type="primary" style={{marginLeft: '5px'}} onClick={this.statusChange}>Update</Button>
                            </Row>
                        </div>
                    </Modal>
                        :
                        null
                }
                <div>
                    <Table columns={columns} dataSource={data_source_list} />
                </div>
            </div>
        );
    }

}

export default Corporate;
