import React, { Component, useState } from 'react'
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Link, Router } from '../../routes';

class CampaignNew extends Component {
  state = {
    minimumContribution: '', // always assume user input is a string
    error: '',
    loading: false
  }

  onSubmit = async (event) => {
    // Prevent browser from auto-submitting
    event.preventDefault();
    console.log('onSubmit()...')
    this.setState({ loading: true });

    // Check if input value is a number
    if (isNaN(event.target[0].value)) {
      this.setState({ error: "input value is not a number" });
      console.log(this.state.error)
      this.setState({ loading: false });
      return;
    } else {
      this.setState({ error: "" });
    }

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0],
        });
      
      // After successful creation, route user to campaigns page
      Router.pushRoute('/')
    } catch (err) {
      console.log('err.message: ', err.message)
      this.setState({ error: err.message })
    } 
    this.setState({loading: false})
  }

  render() {
    return (
      <Layout>
        <h1>New Campaign</h1>

        <Form onSubmit={this.onSubmit} error={!!this.state.error}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              placeholder="0"
              value={this.state.minimumContribution}
              onChange={(event) =>
                this.setState({ minimumContribution: event.target.value })
              }
            />
          </Form.Field>
          <Message error header="Error" content={this.state.error} />
          <Button primary loading={this.state.loading} type="submit">Create</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
