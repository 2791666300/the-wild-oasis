import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
	border: 1px solid var(--color-grey-100);
	background-color: var(--color-grey-50);
	box-shadow: var(--shadow-sm);
	border-radius: var(--border-radius-sm);
	padding: 0.4rem;
	display: flex;
	gap: 0.4rem;
`;

const FilterButton = styled.button`
	background-color: var(--color-grey-0);
	border: none;

	${(props) =>
		props.active &&
		css`
			background-color: var(--color-brand-600);
			color: var(--color-brand-50);
		`}

	border-radius: var(--border-radius-sm);
	font-weight: 500;
	font-size: 1.4rem;
	/* To give the same height as select */
	padding: 0.44rem 0.8rem;
	transition: all 0.3s;

	&:hover:not(:disabled) {
		background-color: var(--color-brand-600);
		color: var(--color-brand-50);
	}
`;

function Filter({ filterField, options }) {
	// 一个改变url的hook
	// http://127.0.0.1:5173/cabins?discount=with-discount
	const [searchParams, setSearchParams] = useSearchParams();

	const currentFilter = searchParams.get(filterField) || options.at(0).value;

	function handleClick(value) {
		searchParams.set(filterField, value);

		// 如果我们跳转到别的页面，则必须从page=1开始
		if (searchParams.get("page")) searchParams.set("page", 1);
		setSearchParams(searchParams);
	}

	return (
		<StyledFilter>
			{options.map((option) => (
				<FilterButton
					key={option.value}
					onClick={() => handleClick(option.value)}
					active={option.value === currentFilter}
					disabled={option.value === currentFilter}>
					{option.label}
				</FilterButton>
			))}
		</StyledFilter>
	);
}
export default Filter;
