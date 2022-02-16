import React from 'react'
import {Card, Col, Row} from "antd";
import './home.css';
import Cookies from "js-cookie";
import axios from "axios";

class Home extends React.Component {

	state = {
		dashboard: null
	}

	componentDidMount() {
		this.load_dashboard();
	}

	load_dashboard = () => {
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

		axios[method](`http://localhost:8080/v1/dashboard`, {headers: headers})
			.then(async response => {
				if(response.data.success) {
					this.setState({
						dashboard: response.data.body
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

		let u1 = 0;
		let u2 = 0;
		let u3 = 0;
		let u4 = 0;

		let c1 = 0;
		let c2 = 0;
		let c3 = 0;
		let c4 = 0;

		let p1 = 0;
		let p2 = 0;
		let p3 = 0;
		let p4 = 0;

		if(this.state.dashboard!=null) {
			let d = this.state.dashboard;
			c1 = d.corporatesCount;
			c2 = d.activeCorporatesCount;
			c3 = d.inactiveCorporatesCount;
			c4 = d.deletedCorporatesCount;

			u1 = d.usersCount;
			u2 = d.activeUsersCount;
			u3 = d.inactiveUsersCount;
			u4 = d.deletedUsersCount;

			p1 = d.projectsCount;
			p2 = d.activeProjectsCount;
			p3 = d.inactiveProjectsCount;
			p4 = d.deletedProjectsCount;
		}

		return (
			<div>
				<div>
					<Row>
						<Col>
							<Card title="Users" bordered={false} style={{ width: 300, textAlign: 'center', backgroundColor: '#90caf9'}}>
								<h1>{u1}</h1>
							</Card>
						</Col>
						<Col>
							<Card title="Active Users" bordered={false} style={{ width: 300, textAlign: 'center', backgroundColor: '#90caf9'}}>
								<h1>{u2}</h1>
							</Card>
						</Col>
						<Col>
							<Card title="Inactive Users" bordered={false} style={{ width: 300, textAlign: 'center', backgroundColor: '#90caf9'}}>
								<h1>{u3}</h1>
							</Card>
						</Col>
						<Col>
							<Card title="Deleted Users" bordered={false} style={{ width: 300, textAlign: 'center', backgroundColor: '#90caf9'}}>
								<h1>{u4}</h1>
							</Card>
						</Col>
					</Row>
					<hr/>
					<Row>
						<Col>
							<Card title="Corporates" bordered={false} style={{ width: 300, textAlign: 'center', backgroundColor: '#90caf9'}}>
								<h1>{c1}</h1>
							</Card>
						</Col>
						<Col>
							<Card title="Active Corporates" bordered={false} style={{ width: 300, textAlign: 'center', backgroundColor: '#90caf9'}}>
								<h1>{c2}</h1>
							</Card>
						</Col>
						<Col>
							<Card title="Inactive Corporates" bordered={false} style={{ width: 300, textAlign: 'center', backgroundColor: '#90caf9'}}>
								<h1>{c3}</h1>
							</Card>
						</Col>
						<Col>
							<Card title="Deleted Corporates" bordered={false} style={{ width: 300, textAlign: 'center', backgroundColor: '#90caf9'}}>
								<h1>{c4}</h1>
							</Card>
						</Col>
					</Row>
					<hr/>
					<Row>
						<Col>
							<Card title="Projects" bordered={false} style={{ width: 300, textAlign: 'center', backgroundColor: '#90caf9'}}>
								<h1>{p1}</h1>
							</Card>
						</Col>
						<Col>
							<Card title="Active Projects" bordered={false} style={{ width: 300, textAlign: 'center', backgroundColor: '#90caf9'}}>
								<h1>{p2}</h1>
							</Card>
						</Col>
						<Col>
							<Card title="Inactive Projects" bordered={false} style={{ width: 300, textAlign: 'center', backgroundColor: '#90caf9'}}>
								<h1>{p3}</h1>
							</Card>
						</Col>
						<Col>
							<Card title="Deleted Projects" bordered={false} style={{ width: 300, textAlign: 'center', backgroundColor: '#90caf9'}}>
								<h1>{p4}</h1>
							</Card>
						</Col>
					</Row>
				</div>
			</div>
		);
	}

}

export default Home
