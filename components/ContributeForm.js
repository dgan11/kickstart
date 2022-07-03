import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component {
    state = {
        value: '' // This is in units of ether
    };

    onSubmit = async (event) => {
        event.preventDefault();
        const campaign = Campaign(this.props.address);

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')  // this is in units in Wei
            })

            // Round about way to refresh fetching campaing data
            Router.replaceRoute(`/campaigns/${this.props.address}`)
        } catch (err) {
            console.log('%% error: ', err)
        }
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input 
                        label="ether" 
                        labelPosition="right"
                        value={this.state.value}
                        onChange={event => this.setState({ value: event.target.value })}
                    />
                </Form.Field>
                <Button primary>Contribute!</Button>
            </Form>
        );
    }
}

export default ContributeForm;