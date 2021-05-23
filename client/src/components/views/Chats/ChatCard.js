import React, { Component } from "react";
import { Comment, Avatar, Tooltip } from "antd"
import moment from "moment";

class ChatCard extends Component {
  render() {
    return (
        <div style={{ width: "100%" }}>
            <Comment 
                author={this.props.sender.name}
                avatar={<Avatar src={this.props.sender.image} />}
                content={
                    <p>
                        {this.props.message}
                    </p>
                }
                datetime={
                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment().fromNow()}</span>
                    </Tooltip>
                }
                />
        </div>);
  }
}

export default ChatCard;
