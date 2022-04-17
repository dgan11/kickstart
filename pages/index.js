import React, { Component } from "react";
import factory from "../ethereum/factory";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";
import { Link } from '../routes'; 

class CampaignIndex extends Component {
  // Requirement/Exclusive to Next.js - get the data without having to render the component
  // static not assigned to instances of class, but the class itself
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        {/* 
          All the interior JSX between the open and close Layout
          gets passes as as a property "children" into the Layout component
        */}
        <div>
          <h3>Open Campaigns</h3>
          <Link route="/campaigns/new">
            <a>
              <Button
                style={{ marginTop: "0px" }}
                floated="right"
                content="Create Campaign"
                icon="add circle"
                primary={true}
              />
            </a>
          </Link>
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
