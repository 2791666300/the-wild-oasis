import styled from "styled-components";
const ErrorStyled = styled.div`
	color: red;
`;

const Error = ({ children }) => {
	return <ErrorStyled>{children}</ErrorStyled>;
};

export default Error;
