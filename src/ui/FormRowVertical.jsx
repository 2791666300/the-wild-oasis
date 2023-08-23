import styled from "styled-components";

const StyledFormRow = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	padding: 1.2rem 0;
`;

const StyledLabel = styled.label`
	font-weight: 500;
`;

const Error = styled.span`
	font-size: 1.4rem;
	color: var(--color-red-700);
`;

const FormRowVertical = ({ children, label, error }) => {
	return (
		<StyledFormRow>
			{label && <StyledLabel htmlFor={children.props.id}>{label}</StyledLabel>}
			{children}
			{error && <Error>{error}</Error>}
		</StyledFormRow>
	);
};

export default FormRowVertical;
