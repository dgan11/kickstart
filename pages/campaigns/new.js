import React, { Component, useState } from 'react'
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

class CampaignNew extends Component {
  state = {
    minimumContribution: '', // always assume user input is a string
    error: ''
  }

  onSubmit = async (event) => {
    // Prevent browser from auto-submitting
    event.preventDefault();
    console.log('onSubmit()...')

    // Check if input value is a number
    if (isNaN(event.target[0].value)) {
      this.setState({ error: "input value is not a number" });
      console.log(this.state.error)
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
    } catch (err) {
      console.log('err.message: ', err.message)
      this.setState({ error: err.message })
    }
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
          {/* {this.state.error.length > 0 &&
              <Message negative 
                header='Error'
                content={this.state.error}
              />
            } */}
          <Message error header="Error" content={this.state.error} />
          <Button type="submit">Create</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
