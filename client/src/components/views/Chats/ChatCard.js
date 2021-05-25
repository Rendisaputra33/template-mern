import React, { Component } from "react";
import { Comment, Avatar, Tooltip } from "antd";
import moment from "moment";

class ChatCard extends Component {
  render() {
    return (
      <div style={{ width: "100%" }}>
        <Comment
          author={`${this.props.sender.name} ${this.props.sender.lastname}`}
          avatar={<Avatar src={this.props.sender.image} />}
          content={
            this.props.message.substring(0, 8) === "uploads/" ? (
              this.props.message.substring(
                this.props.message.length - 3,
                this.props.message.length
              ) === "mp4" ? (
                <video
                  src={`http://192.168.1.15:5000/${this.props.message}`}
                  width="200px"
                  typeof="video/mp4"
                  controls
                />
              ) : (
                <img
                  src={`http://192.168.1.15:5000/${this.props.message}`}
                  width="200px"
                  alt={this.props.message}
                />
              )
            ) : (
              <p>{this.props.message}</p>
            )
          }
          datetime={
            <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
              <span>{moment().fromNow()}</span>
            </Tooltip>
          }
        />
      </div>
    );
  }
}

export default ChatCard;
