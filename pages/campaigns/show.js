// Component that shows details of a campaign
import React, { Component } from 'react'
import { Card } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign'

class CampaignShow extends Component {

  // Hook to get data before this component even loads.
  static async getInitialProps(props) {
    const campaignAddress = props.query.address;
    const campaign = Campaign(campaignAddress)
    const summary = await campaign.methods.getSummary().call();
    console.log('summary: ', summary)
    return {
      minimumContribution: summary['0'],
      balance: summary['1'],
      requestCount: summary['2'],
      approverCount: summary['3'],
      manager: summary['4'],
      campaignAddress: campaignAddress,
    };
  }

  renderCards() {
    const items = [
      {
        header: "Minimum Contribution",
        description:
          "Leverage agile frameworks to provide a robust synopsis for high level overviews.",
        meta: `${this.props.minimumContribution} wei`,
      },
      {
        header: "balance",
        description:
          "Bring to the table win-win survival strategies to ensure proactive domination.",
        meta: `${this.props.balance}`,
      },
      {
        header: "Request Count",
        description:
          "Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.",
        meta: `${this.props.requestCount}`,
      },
      {
        header: "Approver Count",
        description:
          "Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.",
        meta: `${this.props.approverCount}`,
      },
      {
        // header: `${this.props.manager.slice(0,6)}...${this.props.manager.slice(-4)}`,
        header: `${this.props.manager}`,
        meta: "Address of Manager",
        description: "The manager created this campaign and can create ",
        style: { overflowWrap: 'break-word'}
      },
    ];

    return <Card.Group items={items} />
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        { this.renderCards() }
      </Layout>
    );
  }
}

export default CampaignShow;
