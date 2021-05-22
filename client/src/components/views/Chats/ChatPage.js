import React, { Component } from "react";
import { Form, Icon, Input, Button, Row, Col } from "antd";
import { connect } from "react-redux";
import moment from "moment";
import io from "socket.io-client";
import axios from "axios";

class ChatPage extends Component {
  state = {
    chatMessage: "",
    listChat: [],
  };

  componentDidMount() {
    axios
      .get("/api/getChat")
      .then((res) => this.setState({ listChat: res.data }));

    const server = "http://localhost:5000";
    this.socket = io(server);
    this.socket.on("Output Chat Message", (messagefrombackend) => {
      this.setState({
        listChat: [...this.state.listChat, { ...messagefrombackend }],
      });
      console.log(this.state.listChat);
    });
  }

  handleChange = (e) => {
    this.setState({
      chatMessage: e.target.value,
    });
  };

  submitChat = (e) => {
    e.preventDefault();
    const chatMessage = this.state.chatMessage;
    const userId = this.props.user.userData._id;
    const userName = this.props.user.userData.name;
    const nowTime = moment();
    const type = "image";

    this.socket.emit("Input Chat Message", {
      chatMessage,
      userId,
      userName,
      nowTime,
      type,
    });

    this.setState({ chatMessage: "" });
  };

  render() {
    return (
      <React.Fragment>
        {/* this title */}
        <div>
          <p style={{ fontSize: "2rem", textAlign: "center" }}>Gibah Room</p>
        </div>
        {/* this header */}
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div className="infinite-container">
            {/* this for chat */}
            <div
              ref={(el) => {
                this.messageEnd = el;
              }}
              style={{ float: "left", clear: "both" }}
            />
          </div>
          <Row>
            <Form layout="inline" onSubmit={this.submitChat}>
              <Col span={18}>
                <Input
                  id="message"
                  prefix={
                    <Icon type="message" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="ayo mulai gibah"
                  type="text"
                  value={this.state.chatMessage}
                  onChange={this.handleChange}
                />
              </Col>
              <Col span={2}></Col>
              <Col span={4}>
                <Button
                  type="primary"
                  style={{ width: "100%" }}
                  htmlType="submit"
                  onClick={this.submitChat}
                >
                  <Icon type="enter" />
                </Button>
              </Col>
            </Form>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapState)(ChatPage);
