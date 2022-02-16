import React from "react";
import {Button, Table} from "antd";
import Cookies from 'js-cookie';
import axios from "axios";

const columns = [
    {
        title: '#ID',
        dataIndex: 'corp_id',
        key: 'corp_id',
    },
    {
        title: 'Corporate Logo',
        dataIndex: 'logo',
        key: 'logo',
    },
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


class Corporate extends React.Component {

    state = {
        data_source: []
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

        axios[method](`http://localhost:8080/v1/corporate/all`, {headers: headers})
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
                corp_id: 'CORP_'+ r.id,
                logo: (r.corporateLogo!=null & r.corporateLogo!='' & r.corporateLogo!=undefined)?<img src={r.corporateLogo} alt={r.name}/>: <img src={'https://lecrawengineering.com/images/projects/placeholder.png'} alt="corporate-logo" width={50} />,
                name: r.name,
                address: r.address,
                email: r.email,
                contact1: r.contactNumber1,
                contact2: r.contactNumber2,
                action: <Button type={'text'}>View</Button>
            }
            data_source_list.push(obj);
        })

        return(
            <div>
                <div>
                    <h2>Corporate</h2>
                </div>
                <div>
                    <Table columns={columns} dataSource={data_source_list} />
                </div>
            </div>
        );
    }

}

export default Corporate;
