import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';

const ChatPanelToggleButton = props => {
	const history = useHistory();

	return (
		<IconButton className="w-40 h-40" onClick={ev => history.push('/apps/chat')}>
			{props.children}
		</IconButton>
	);
};

ChatPanelToggleButton.defaultProps = {
	children: <Icon>chat</Icon>
};

export default ChatPanelToggleButton;
