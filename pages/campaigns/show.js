// Component that shows details of a campaign
import React, { Component } from 'react'
import { Card, Grid } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';

class CampaignShow extends Component {

  // Hook to get data before this component even loads.
  static async getInitialProps(props) {
    const campaignAddress = props.query.address;
    const campaign = Campaign(campaignAddress)
    const summary = await campaign.methods.getSummary().call();
    console.log('show.js | summary: ', summary)
    // console.log('show.js | props: ', props)
    return {
      minimumContribution: summary['0'],
      balance: summary['1'],
      requestCount: summary['2'],
      approverCount: summary['3'],
      manager: summary['4'],
      campaignAddress: campaignAddress,
      address: props.query.address,
    };
  }

  renderCards() {
    const items = [
      {
        // header: `${this.props.manager.slice(0,6)}...${this.props.manager.slice(-4)}`,
        header: `${this.props.manager}`,
        meta: "Address of Manager",
        description: "The manager created this campaign and can create ",
        style: { overflowWrap: "break-word" },
      },
      {
        header: `${this.props.minimumContribution} wei`,
        meta: `Minimum Contribution`,
        description:
          "Smallest amount you can enter and be part of the campaign",
      },
      {
        header: `${this.props.requestCount}`,
        description:
          "Number of Requests.",
        meta: `Request Count`,
      },
      {
        header: `${this.props.approverCount}`,
        description:
          "Number of approvers.",
        meta: `Approver Account`,
      },
      {
        header: `${web3.utils.fromWei(this.props.balance, 'ether')}`,
        description:
          "Balance locked in the contract.",
        meta: `balance`,
      },
    ];

    return <Card.Group items={items} />
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Column width={10}>
            { this.renderCards() }
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={this.props.address}/>
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
