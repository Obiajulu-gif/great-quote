import { useEffect } from "react";
import { useBeforeUnload } from "react-router-dom";

const usePrompt = (message, when) => {
	useBeforeUnload(
		(event) => {
			if (when) {
				event.preventDefault();
				event.returnValue = message;
			}
		},
		[when]
	);

	useEffect(() => {
		const handleWindowClose = (event) => {
			if (!when) return;
			event.preventDefault();
			return (event.returnValue = message);
		};

		window.addEventListener("beforeunload", handleWindowClose);
		return () => {
			window.removeEventListener("beforeunload", handleWindowClose);
		};
	}, [when, message]);
};

export default usePrompt;
