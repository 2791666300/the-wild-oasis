import { styled } from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
`;

const ProtectedRoute = ({ children }) => {
	const navigate = useNavigate();
	// 1、load the authenticated user 加载经过身份验证的用户
	const { isLoading, isAuthenticated } = useUser();

	// 3、if there is no authenticated user, redirect to the /login
	// 如果没有经过身份验证的用户，则重定向到/login
	useEffect(
		function () {
			if (!isAuthenticated && !isLoading) navigate("/login");
		},
		[isAuthenticated, navigate, isLoading],
	);

	// 2、while loading, show a spinner 加载时，显示一个微调器
	if (isLoading) {
		return (
			<FullPage>
				<Spinner />;
			</FullPage>
		);
	}
	// 4、if there is a user, render the app 如果有用户，渲染应用程序
	if (isAuthenticated) return children;
};

export default ProtectedRoute;
