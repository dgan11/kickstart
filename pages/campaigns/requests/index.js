import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';

class RequestIndex extends Component {

    static async getInitialProps(props) {
        console.log('~~~ getInitalProps(props) in index.js ~~~ | props.query: ', props.query)
        const { address } = props.query;
        return { address };
    }

    render() {
        return (
            <Layout>
                <h3>Request List</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary>Add Request</Button>
                    </a>
                </Link>
            </Layout>
        );
    }
}

export default RequestIndex;