export default function PiCanvas({digits, size, cellSize, isFetching}) {
	const css = `repeat(${size}, ${cellSize}px)`;
	digits = digits.slice(0, size * size);
	return (
		<div id="canvas" style={{gridTemplateColumns: css, gridTemplateRows: css, opacity: isFetching ? 0.6 : 1}}>
			{digits.map((v, i) => {
				return <div key={i} style={{backgroundColor: v == 1 ? "black" : "white", width: `${cellSize}px`, height: `${cellSize}px`}} />;
			})}
		</div>
	);
}
