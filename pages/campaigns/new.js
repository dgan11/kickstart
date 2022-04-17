import React, { Component, useState } from 'react'
import Layout from '../../components/Layout';
import { Form, Button, Input } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

class CampaignNew extends Component {
  state = {
    minimumContribution: '', // always assume user input is a string
  }

  onSubmit = async (event) => {
    // Prevent browser from auto-submitting
    event.preventDefault();
    console.log('onSubmit()...')

    const accounts = await web3.eth.getAccounts();
    await factory.methods
      .createCampaign(this.state.minimumContribution)
      .send({
        from: accounts[0],
      });
  }

  render() {
    return (
      <Layout>
        <h1>New Campaign</h1>

        <Form onSubmit={this.onSubmit}> 
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition='right'
              placeholder="0"
              value={this.state.minimumContribution}
              onChange={event => this.setState({minimumContribution: event.target.value})}
            />
          </Form.Field>
          <Button type="submit">Create</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
