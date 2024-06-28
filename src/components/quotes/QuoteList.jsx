import { Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const QuoteList = (props) => {
	const navigate = useNavigate();
	const location = useLocation();

	const sortQuotesFunction = (quotes, ascending) => {
		return quotes.sort((quoteA, quoteB) => {
			if (ascending) {
				return quoteA.id > quoteB.id ? 1 : -1;
			} else {
				return quoteA.id < quoteB.id ? 1 : -1;
			}
		});
	};

	const queryParams = new URLSearchParams(location.search);
	const isSortingAscending = queryParams.get("sort") === "asc";

	const sortedQuotes = sortQuotesFunction(props.quotes, isSortingAscending);

	const changeSortingHandler = () => {
		navigate(
			`${location.pathname}?sort=${isSortingAscending ? "desc" : "asc"}`
		);
	};

	return (
		<Fragment>
			<div className={classes.sorting}>
				<button onClick={changeSortingHandler}>
					Sort {isSortingAscending ? "Descending" : "Ascending"}
				</button>
			</div>
			<ul className={classes.list}>
				{sortedQuotes.map((quote) => (
					<QuoteItem
						key={quote.id}
						id={quote.id}
						author={quote.author}
						text={quote.text}
					/>
				))}
			</ul>
		</Fragment>
	);
};

export default QuoteList;
