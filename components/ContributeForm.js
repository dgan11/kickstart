import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component {
    state = {
        value: '', // This is in units of ether
        errorMessage: '',
        loading: false,
    };

    onSubmit = async (event) => {
        event.preventDefault();
        const campaign = Campaign(this.props.address);

        this.setState({ loading: true, errorMessage: '' })

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
            this.setState({ errorMessage: "Something went wrong. Make sure a valid value of ether was inputted."})
        }

        this.setState({ loading: false, value: ''})
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input 
                        label="ether" 
                        labelPosition="right"
                        value={this.state.value}
                        onChange={event => this.setState({ value: event.target.value })}
                    />
                </Form.Field>
                <Message error headore="Oops!" content={this.state.errorMessage} />
                <Button primary loading={this.state.loading}>Contribute!</Button>
            </Form>
        );
    }
}

export default ContributeForm;