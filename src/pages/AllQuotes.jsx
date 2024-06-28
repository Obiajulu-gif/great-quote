import React, { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import ReactLogo from "../assets/undraw_source_code_re_wd9m.svg";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
const DUMMY_QUOTES = [
	{ id: "q1", author: "Max", text: "Learning React is Fun" },
	{ id: "q2", author: "Maximillian", text: "Learning React is great!" },
];

const AllQuotes = () => {
	const {
		sendRequest,
		status,
		data: loadedQuotes,
		error,
	} = useHttp(getAllQuotes, true);

	useEffect(() => {
		sendRequest();
	}, [sendRequest]);

	if (status === 'pending') {
		return (
			<div className="centered">
				<LoadingSpinner/>
			</div>
		)
	}

	if (error) {
		return <p className="centered focused">{ error}</p>
	}

	if (status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0)) {
		return <NoQuotesFound/>
	}

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				width: "100%",
				flexWrap: "wrap",
			}}
		>
			<div style={{ flex: 2, minWidth: "300px", maxWidth: "100%" }}>
				<QuoteList quotes={loadedQuotes} />
			</div>
			<img
				src={ReactLogo}
				alt="React Logo"
				style={{
					flex: 1,
					minWidth: "300px",
					width: "100%",
					objectFit: "cover",
				}}
			/>
		</div>
	);
};
export default AllQuotes;
