import type { LeaderboardDateRange } from "../types";
import "./Slider.css";

interface SliderProps {
	selected: LeaderboardDateRange;
	setSelected: React.Dispatch<React.SetStateAction<LeaderboardDateRange>>;
	width: number;
}

const Slider = ({ selected, setSelected, width }: SliderProps) => {

	const options: LeaderboardDateRange[] = ["all", "day", "month"];

	return <div className="slider-container">
		{options.map(option => <div className="option" onClick={() => setSelected(option)}>
			<p className="option-text">{option}</p>
		</div>)}
		<div className="slider-selected" style={{ transform: `translateX(calc(100% * ${options.indexOf(selected)}))`}}></div>
	</div>
}

export default Slider;