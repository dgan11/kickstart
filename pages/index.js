import React, { Component } from "react";
import factory from "../ethereum/factory";
import { Card, Button } from  'semantic-ui-react'


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
        <div>
          <link
            async
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
          />
          {this.renderCampaigns()}
          <Button
            content="Create Campaign"
            icon="add circle"
            primary={true}
          />
        </div>
      </div>
    );
  }
}

export default CampaignIndex;