import React, { Component } from "react";
import factory from "../ethereum/factory";
import { Card } from  'semantic-ui-react'


class CampaignIndex extends Component {
  // Requirement/Exclusive to Next.js - get the data without having to render the component
  // static not assigned to instances of class, but the class itself
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns }
  }

  renderCampaigns() {
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: <a>View Campaign</a>,
        fluid: true
      }
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <div>{this.renderCampaigns()}</div>
      </div>
    );
  }
}

export default CampaignIndex;