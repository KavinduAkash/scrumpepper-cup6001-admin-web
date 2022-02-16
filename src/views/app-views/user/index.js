import React from "react";
import {Button, Table} from "antd";
import Cookies from "js-cookie";
import axios from "axios";

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

class User extends React.Component {

    state = {
        data_source: []
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

        axios[method](`http://localhost:8080/v1/user/all`, {headers: headers})
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

    render() {

        let data_source_list = [];
        this.state.data_source.map((r, i)=>{
            let obj = {
                user_id: 'USER_'+ r.id,
                ref: r.refNo,
                fname: r.firstName,
                lname: r.lastName,
                email: r.email,
                contact1: r.contact,
                date: r.createdDate,
                status: r.statusType,
                action: <Button type={'text'}>View</Button>
            }
            data_source_list.push(obj);
        })

        return(
            <div>
                <div>
                    <h2>User</h2>
                </div>
                <div>
                    <Table columns={columns} dataSource={data_source_list} />
                </div>
            </div>
        );
    }

}

export default User;
