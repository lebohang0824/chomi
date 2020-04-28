import React from 'react';
import { View, Image, Animated, ActivityIndicator, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

// Service
import axios from 'axios';
import Storage from './services/Storage';
import { chatbotMessage, userMessage, quickReply, systemMessage } from './services/messages';

// Components
import Typing from './components/Typing';
import Toolbar from './components/Toolbar';
import SendButton from './components/SendButton';

export default class Main extends React.Component {

	constructor() {
		super(...arguments);

		// State
		this.state = {
			messages: [], typing: false, loading: true
		}		

		// Private properties
		this._timer = null;
		this._messages = [];
		this._session = null;
		this._typing = false;
		this._active = true;

		// Bindings
		this._footer = this._footer.bind(this);
		this._isActive = this._isActive.bind(this);
		this._isTyping = this._isTyping.bind(this);
		this._messageSend = this._messageSend.bind(this);
		this._onQuickReply = this._onQuickReply.bind(this);
		this._messageReply = this._messageReply.bind(this);
		this._updateMessages = this._updateMessages.bind(this);
		this._displayMessages = this._displayMessages.bind(this);
		this._linkUserToSession = this._linkUserToSession.bind(this);
	}

	componentDidMount() {
		axios.post('https://wiki101.herokuapp.com/api/session')
			.then(res => {
				this._session = res.data.session;
				this.setState({ loading: false });
				this._displayMessages(systemMessage('Send a message.', 1));
				
				Storage.get('name').then(name => {
					this._updateMessages(
						chatbotMessage(`Hey ${name}. ${res.data.greetings}`, this._messages.length)
					);

					// Linking user with session for better identification
					// this._linkUserToSession(this._name, res.data.session);
				});
			})
		.catch(err => this._displayMessages(systemMessage('Error detected', 1)));		
	}

	componentDidUpdate() {
		this._isActive(1);
	}

	// Private methods
	_linkUserToSession(name, session) {
		axios.post('https://wiki101.herokuapp.com/api/database/link-users',{
				name: name,
				session: session
			}).then(res => {
				console.log('Success!');
			})
		.catch(err => console.log(err));
	}

	_messageReply(messageText) {
		axios.post('https://wiki101.herokuapp.com/api/message', {
				session: this._session, 
				message: messageText 
			})
			.then(({ data }) => {
				this._isTyping(true);

				// Get intents
				const response = data.output.generic;

				// Response time
				let responseTime = (response[0].response_type == "text") ? response[0].text.length * 50: 1500;

				// Response
				const timer = setTimeout(() => {
					clearTimeout(timer);
					this._isTyping(false);
					response.forEach(res => {
						switch(res.response_type) {
							case "text":
								this._displayMessages(chatbotMessage(res.text, this._messages.length));
								break;

							case "image":
								this._displayMessages(
									chatbotMessage(res.description, this._messages.length, res.source)
								);
								break;

							case "option":
								this._displayMessages(
									quickReply(res.text, this._messages.length, res.options)
								);
								break;
						}
					})

				}, responseTime)
			})
		.catch(err => console.log(err));
	}

	_messageSend(messages) {
		// DO NOT Send message if conversation expired.
		if (!this._active) return;
		// Display user message
		this._displayMessages(messages);
		// Reply user
		this._messageReply(messages[0].text);
	}

	_updateMessages(messages) {
		this._messages = messages;
		this.setState({ messages: messages });
	}

	_isTyping(typing) {
		this.setState({ 
			typing, messages: GiftedChat.append(this._messages, []) 
		});
	}

	_displayMessages(message) {
		this._updateMessages(
			GiftedChat.append(this._messages, message)
		);
	}

	_isActive(count) {		
	}

	_footer(props) {
		return this.state.typing ? <Typing /> : null;
	}

	_onQuickReply(options) {
		return options.forEach(option => {
			this._messageSend(userMessage(option.title, this._messages.length));
		});
	}

	_viewSplash() {
		return (
			<View style={{ flex: 1, justifyContent: "center" }}>
				<Image source={ require('./img.png') } style={{ alignSelf: 'center' }} />
				<Text style={{ color: '#0084ff', alignSelf: 'center' }}>Loading...</Text>
			</View>
		);
	}

	render() {
		return (
			!this.state.loading && <GiftedChat 
				user={{ _id: 1 }}
				isAnimated={false}
				alwaysShowSend={true}
				onSend={this._messageSend}
				renderFooter={this._footer}
				messages={this.state.messages}
				onQuickReply={this._onQuickReply}
				renderSend={props => <SendButton {...props} />}
				renderInputToolbar={props => <Toolbar {...props} />}
			/> || this._viewSplash()
		);
	}
}

Main.options = {
    topBar: { visible: false }
}