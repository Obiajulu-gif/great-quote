import React, { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AllQuotes from "./pages/AllQuotes";
import NewQuote from "./pages/NewQuote";
import QuoteDetail from "./pages/QuoteDetail";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";
function App() {
	return (
		<Layout>
      <Routes>
        <Route path="/" exact element={<Navigate to="/quotes" replace />} />
        <Route path="quotes" element={<AllQuotes />} />
        <Route path="quotes/:quoteId/*" element={<QuoteDetail />} />
        <Route path="new-quote" element={<NewQuote />} />
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </Layout>
	);
}

export default App;
