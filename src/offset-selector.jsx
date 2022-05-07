import {useState, useEffect} from "preact/hooks";

export default function OffsetSelector({pageSize, offset, onChangeOffset}) {
	const [offsetBy, setOffsetBy] = useState(1);
	const [jumpToOffset, setJumpToOffset] = useState(1);

	const move = () => {
		onChangeOffset(+offsetBy + +offset);
	};
	const moveBack = () => {
		onChangeOffset(-offsetBy + +offset);
	};
	const movePageBack = () => {
		onChangeOffset(+offset - pageSize);
	};
	const movePage = () => {
		onChangeOffset(+offset + pageSize);
	};
	const jumpTo = () => {
		onChangeOffset(jumpToOffset - 1);
	};
	const getFieldHandler = (fn) => {
		return (ev) => {
			const val = +ev.target.value;
			if (val === val || val === "") {
				fn(ev.target.value);
			}
		};
	};
	return (
		<div id="controls">
			<div>
				<button onClick={movePageBack}>{"< Previous page"}</button>
				<button onClick={moveBack}>{"< Left"}</button>
				<span>{+offset + 1}</span>
				<input type="text" value={offsetBy} onInput={getFieldHandler(setOffsetBy)} />
				<button onClick={move}>{"Right >"}</button>
				<button onClick={movePage}>{"Next page >"}</button>
			</div>
			<br />
			<div>
				<span>Offset</span>
				<input type="text" value={jumpToOffset} onInput={getFieldHandler(setJumpToOffset)} />
				<button onClick={jumpTo}>Go</button>
			</div>
		</div>
	);
}
