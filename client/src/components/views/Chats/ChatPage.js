import React, { Component } from "react";
import { Form, Icon, Input, Button, Row, Col } from "antd";
import { connect } from "react-redux";
import moment from "moment";
import io from "socket.io-client";
import { getChats, loadChat } from "../../../_actions/chat_action";
import ChatCard from "./ChatCard";

class ChatPage extends Component {
  state = {
    chatMessage: "",
  };

  componentDidMount() {
    this.props.dispatch(getChats());
    const server = "http://localhost:5000/";
    this.socket = io(server);
    this.socket.on("Output Chat Message", (messagefrombackend) => {
      this.props.dispatch(loadChat(messagefrombackend));
    });
  }

  componentDidUpdate = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
  }

  renderCards = () => {
    return (this.props.chats.chats&&
    this.props.chats.chats.map(chat => {
      return(
        <ChatCard key={chat._id} {...chat} />
      )
    }))
  }

  handleChange = (e) => {
    this.setState({
      chatMessage: e.target.value,
    });
  };

  submitChat = (e) => {
    e.preventDefault();

    if(this.state.chatMessage != "") {
      this.socket.emit("Input Chat Message", {
        chatMessage : this.state.chatMessage,
        userId : this.props.user.userData._id,
        userName : this.props.user.userData.name,
        nowTime : moment(),
        type : "image",
      });
      this.setState({ chatMessage: "" });
    }
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
          <div className="infinite-container" style={{ height: '500px', overflowY: 'scroll' }}>

            {this.props.chats && (
              <div>{this.renderCards()}</div>
            )}

            <div
              ref={(el) => {
                this.messagesEnd = el;
              }}
              style={{ float: "left", clear: "both" }}
            />
          </div>
          <Row>
            <Form layout="inline" onSubmit={this.submitChat} style={{ marginTop: '10px' }}>
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
    chats: state.chat,
  };
};

export default connect(mapState)(ChatPage);
