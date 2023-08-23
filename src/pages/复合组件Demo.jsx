import { cloneElement, createContext, useContext, useState } from "react";

import { faker } from "@faker-js/faker";

import { styled } from "styled-components";

const Button = styled.button`
	border: none;
	border-radius: var(--border-radius-sm);
	box-shadow: var(--shadow-sm);
	font-size: 1.6rem;
	padding: 1.2rem 2.4rem;
	font-weight: 500;
	color: var(--color-brand-50);
	background-color: var(--color-brand-600);

	color: var(--color-brand-50);
	background-color: var(--color-brand-600);

	&:hover {
		background-color: var(--color-brand-700);
	}
`;

const ProductItemStyles = styled.li`
	display: grid;
	grid-template-columns: 1fr 64px;
	gap: 8px;
	border: 1px solid #ddd;
	border-radius: 5px;
	padding: 12px 16px;
	&:nth-child(0) {
		font-size: 18px;
		font-weight: 700;
	}
	&:nth-child(1) {
		text-align: right;
		font-weight: 700;
		color: rebeccapurple;
	}
	&:nth-child(2) {
		grid-column: -1 /1;
		font-size: 14px;
		color: #666;
	}
`;

const products = Array.from({ length: 20 }, () => {
	return {
		productName: faker.commerce.productName(),
		description: faker.commerce.productDescription(),
		price: faker.commerce.price(),
	};
});
function ProductItem({ product }) {
	return (
		<ProductItemStyles>
			<p className='product-name'>{product.productName}</p>
			<p className='product-price'>${product.price}</p>
			<p className='product-description'>{product.description}</p>
		</ProductItemStyles>
	);
}
const companies = Array.from({ length: 15 }, () => {
	return {
		companyName: faker.company.name(),
		phrase: faker.company.catchPhrase(),
	};
});

function CompanyItem({ company, defaultVisibility }) {
	const [isVisible, setIsVisisble] = useState(defaultVisibility);

	return (
		<li
			className='company'
			onMouseEnter={() => setIsVisisble(true)}
			onMouseLeave={() => setIsVisisble(false)}>
			<p className='company-name'>{company.companyName}</p>
			{isVisible && (
				<p className='company-phrase'>
					<strong>About:</strong> {company.phrase}
				</p>
			)}
		</li>
	);
}

const ListContext = createContext();

function List({ children, items }) {
	const [isOpen, setIsOpen] = useState(true);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const displayItems = isCollapsed ? items.slice(0, 3) : items;

	return (
		<ListContext.Provider
			value={{ isOpen, setIsOpen, isCollapsed, setIsCollapsed, displayItems }}>
			{children}
		</ListContext.Provider>
	);
}

function Open({ children }) {
	const { setIsOpen } = useContext(ListContext);
	return cloneElement(children, {
		onClick: () => setIsOpen((isOpen) => !isOpen),
	});
}
function AllLess({ children }) {
	const { setIsCollapsed } = useContext(ListContext);
	return cloneElement(children, {
		onClick: () => setIsCollapsed((isCollapsed) => !isCollapsed),
	});
}
function Body({ render }) {
	const { displayItems, isOpen } = useContext(ListContext);
	if (!displayItems.length || !isOpen) return;
	return <div>{displayItems.map(render)}</div>;
}

List.Open = Open;
List.AllLess = AllLess;
List.Body = Body;

const Demo = () => {
	return (
		<>
			<List items={products}>
				<h2>title</h2>
				<List.Open>
					<Button>点击</Button>
				</List.Open>
				<List.Body
					render={(product) => (
						<ProductItem key={product.productName} product={product} />
					)}
				/>
				<List.AllLess>
					<Button>AllLess</Button>
				</List.AllLess>
			</List>
			<List items={companies}>
				<h2>hello</h2>
				<List.Open>
					<Button>点击</Button>
				</List.Open>
				<List.AllLess>
					<Button>AllLess</Button>
				</List.AllLess>
				<List.Body
					render={(company) => (
						<CompanyItem
							key={company.companyName}
							company={company}
							defaultVisibility={false}
						/>
					)}
				/>
			</List>
		</>
	);
};

export default Demo;
