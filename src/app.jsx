import {useEffect, useState} from "preact/hooks";
import OffsetSelector from "./offset-selector";
import PiCanvas from "./picanvas";

const CANVAS_SIZE = 63;

export function App() {
	const [offset, setOffset] = useState(0);
	const [digits, setDigits] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [dummy, setDummy] = useState(false);

	useEffect(() => {
		(async () => {
			setIsFetching(true);
			console.log("fetching page", offset + 1);
			const response = await fetch(`https://api.pi.delivery/v1/pi?start=${offset}&numberOfDigits=${1000}&radix=10`, {
				cache: "force-cache",
			});
			if (response.ok) {
				const a = (await response.json()).content.split("").reduce((acc, v) => acc + (+v).toString(2).padStart(4, "0"), "");
				setDigits(a.split(""));
			} else {
				console.error(response.status, response.statusText, await response.text());
			}
			setIsFetching(false);
		})();
	}, [offset]);

	return (
		<>
			<h1>Image from constructed from the digits of PI!</h1>
			{localStorage.getItem("__pi_readnotice") !== "true" && (
				<footer>
					* each digit contributes to 4 pixels on the image{" "}
					<a href="#" onClick={() => (localStorage.setItem("__pi_readnotice", "true"), setDummy(true))}>
						hide
					</a>
				</footer>
			)}
			<PiCanvas digits={digits} size={CANVAS_SIZE} cellSize={6} isFetching={isFetching} />

			<br />
			<br />
			<br />
			<OffsetSelector onChangeOffset={(v) => setOffset(Math.max(v, 0))} pageSize={CANVAS_SIZE} offset={offset} />
			<br />
		</>
	);
}
