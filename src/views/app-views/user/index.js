import React from "react";
import {Button, Card, Col, Modal, Row, Select, Table} from "antd";
import Cookies from "js-cookie";
import axios from "axios";
import * as BaseUrl from "../../../server/base_urls";

const columns = [
    {
        title: '#ID',
        dataIndex: 'user_id',
        key: 'user_id',
    },
    {
        title: 'Ref',
        dataIndex: 'ref',
        key: 'ref',
    },
    {
        title: 'First Name',
        dataIndex: 'fname',
        key: 'fname',
    },
    {
        title: 'last Name',
        dataIndex: 'lname',
        key: 'lname',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Contact',
        dataIndex: 'contact',
        key: 'contact',
    },
    {
        title: 'Created Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
    },
];

const { Option } = Select;

class User extends React.Component {

    state = {
        data_source: [],
        selected_user: null,
        openModal: false
    }

    componentDidMount() {
        this.load_users();
    }

    load_users = () => {
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

        axios[method](`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}user/all`, {headers: headers})
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
                selected_user: val
            })
        } else {
            this.setState({
                openModal: false,
                selected_user: null
            })
        }
    }

    render() {

        let data_source_list = [];
        this.state.data_source.map((r, i)=>{
            let obj = {
                user_id: 'USER_'+ r.id,
                ref: r.refNo,
                fname: r.firstName,
                lname: r.lastName,
                email: r.email,
                contact: r.contactNumber,
                date: r.createdDate,
                status: r.statusType,
                action: <Button type={'text'} onClick={()=>this.setVisible(r, true)}>View</Button>
            }
            data_source_list.push(obj);
        })

        return(
            <div>
                <div>
                    <h2>User</h2>
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
                                        <div style={{marginLeft: '5px'}}>
                                            <table>
                                                <tr>
                                                    <th>#ID</th>
                                                    <td>:</td>
                                                    <td>USER_{(this.state.selected_user!=null)?this.state.selected_user.id:""}</td>
                                                </tr>
                                                <tr>
                                                    <th>Ref</th>
                                                    <td>:</td>
                                                    <td><h3>{(this.state.selected_user!=null)?this.state.selected_user.refNo:""}</h3></td>
                                                </tr>
                                                <tr>
                                                    <th>First Name</th>
                                                    <td>:</td>
                                                    <td>{(this.state.selected_user!=null)?this.state.selected_user.firstName:""}</td>
                                                </tr>
                                                <tr>
                                                    <th>Last Name</th>
                                                    <td>:</td>
                                                    <td>{(this.state.selected_user!=null)?this.state.selected_user.lastName:""}</td>
                                                </tr>
                                                <tr>
                                                    <th>Email</th>
                                                    <td>:</td>
                                                    <td>{(this.state.selected_user!=null)?this.state.selected_user.email:""}</td>
                                                </tr>
                                                <tr>
                                                    <th>Contact</th>
                                                    <td>:</td>
                                                    <td>{(this.state.selected_user!=null)?this.state.selected_user.contactNumber:""}</td>
                                                </tr>
                                                <tr>
                                                    <th>Created Date</th>
                                                    <td>:</td>
                                                    <td>{(this.state.selected_user!=null)?this.state.selected_user.createdDate:""}</td>
                                                </tr>
                                                <tr>
                                                    <th>Status</th>
                                                    <td>:</td>
                                                    <td>{(this.state.selected_user!=null)?this.state.selected_user.statusType:""}</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </Col>
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

export default User;
