import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = () => {
	const [loadedUsers, setLoadedUsers] = useState([]);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	useEffect(() => { //use effect to stop running this fetch request every time the page re-renders, causing an infinite loop
		const fetchUsers = async () => {
			try {
				const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/users');
				setLoadedUsers(responseData.users);
			} catch (err) {
				console.log(err.message);
			}
		};
		fetchUsers();
	}, [sendRequest]);

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<div className='center'>
				{isLoading && <LoadingSpinner asOverlay />}
			</div>
			{!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
		</React.Fragment>
	);
};

export default Users;
