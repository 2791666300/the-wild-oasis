import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
	HiOutlineBanknotes,
	HiOutlineBriefcase,
	HiOutlineCalendarDays,
	HiOutlineChartBar,
} from "react-icons/hi2";
const Stats = ({ bookings, confirmedStays, cabinCount, numDays }) => {
	// 1、点单量
	const numBookings = bookings.length;
	// 2、总销售额
	const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
	// 3、确认入住量
	const checkins = confirmedStays.length;
	// 4、入住夜量 / 总量 = 入住率
	const occupation =
		confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
		(numDays * cabinCount);
	return (
		<>
			<Stat
				title='Bookings'
				color='blue'
				icon={<HiOutlineBriefcase />}
				value={numBookings}
			/>
			<Stat
				title='Sales'
				color='green'
				icon={<HiOutlineBanknotes />}
				value={formatCurrency(sales)}
			/>
			<Stat
				title='Check ins'
				color='indigo'
				icon={<HiOutlineCalendarDays />}
				value={checkins}
			/>
			<Stat
				title='Occupancy rate'
				color='yellow'
				icon={<HiOutlineChartBar />}
				value={Math.round(occupation * 100) + "%"}
			/>
		</>
	);
};
export default Stats;
