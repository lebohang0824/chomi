export const chatbotMessage = (text, id, image = null) => {
	return [{
		_id: id,
		text: text,
		createdAt: new Date(),
		user: {
			_id: 2,
			name: 'Mr Frank',
			avatar: 'https://placeimg.com/140/140/avatar',
		},
		image
	}];
}

export const userMessage = (text, id) => {
	return [{
		_id: id,
		text: text,
		createdAt: new Date(),
		user: {
			_id: 1
		},
	}];
}

export const systemMessage = (text, id) => {
	return [{
		_id: id,
		text: text,
		createdAt: new Date(),
		system: true,
	}];
}

export const quickReply = (text, id, options) => {

	let values = [];

	options.forEach(({ label, value }) => {
		values.push({
			title: label,
			value: value.input.text
		})
	});

	return [{
		_id: id,
		text: text,
    	createdAt: new Date(),
    	quickReplies: {
	    	type: 'radio',
	    	values: values,
	    },
	    user: {
			_id: 2,
			name: 'Mr Frank',
			avatar: 'https://placeimg.com/140/140/avatar',
		},
	}];
}