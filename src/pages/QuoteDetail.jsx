import React, { Fragment, useEffect } from "react";
import { useParams, Routes, Route, Link, Outlet } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import "./QuoteDetail.css";
import imagePath from "../assets/blue-speech-bubble.png";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const DUMMY_QUOTES = [
	{ id: "q1", author: "Max", text: "Learning React is Fun" },
	{ id: "q2", author: "Maximillian", text: "Learning React is great!" },
];

const QuoteDetail = () => {
	const params = useParams();
	const { quoteId } = params;
	const {
		sendRequest,
		status,
		data: loadedQuote,
		error,
	} = useHttp(getSingleQuote, true);

	useEffect(() => {
		sendRequest(quoteId);
	}, [sendRequest, quoteId]);

	if (status === "pending") {
		return (
			<div>
				<LoadingSpinner />
			</div>
		);
	}

	if (error) {
		return <p className="centered">{error}</p>;
	}

	if (!loadedQuote.text) {
		return <p>No Quote found</p>;
	}

	return (
		<Fragment>
			<div className="content-layout">
				<HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
				<img src={imagePath} alt="Quote Visual" className="quote-image" />
			</div>
			<div className="centered">
				<Link className="btn--flat" to="comments">
					Load Comments
				</Link>
			</div>
			<Routes>
				<Route path="comments" element={<Comments />} />
			</Routes>
			<Outlet />
		</Fragment>
	);
};

export default QuoteDetail;
