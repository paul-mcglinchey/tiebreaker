import Userfront from '@userfront/core';

const LogOutButton = (props) => {

	const handleLogout = () => {
		Userfront.logout();
	}

	return (
		<button
			onClick={() => handleLogout()}
			className="px-2 border border-purple-300 rounded-md text-sm font-medium text-purple-500 px-2 py-2 shadow-sm bg-white hover:text-white hover:bg-purple-500 transition-all"
		>
			Log Out
		</button>
	)
}

export default LogOutButton;