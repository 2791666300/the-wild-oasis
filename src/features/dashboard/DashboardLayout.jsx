import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";

import TodayActivitye from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;

const DashboardLayout = () => {
	const { isLoading: isLoadingBookings, bookings } = useRecentBookings();
	const {
		isLoading: isLoadingStays,
		confirmedStays,
		numDays,
	} = useRecentStays();

	const { cabins, isLoading: isLoadingCains } = useCabins();

	if (isLoadingBookings || isLoadingStays || isLoadingCains) return <Spinner />;
	return (
		<div>
			<StyledDashboardLayout>
				<Stats
					bookings={bookings}
					confirmedStays={confirmedStays}
					numDays={numDays}
					cabinCount={cabins.length}
				/>
				<TodayActivitye />
				<DurationChart confirmedStays={confirmedStays} />
				<SalesChart bookings={bookings} numDays={numDays} />
			</StyledDashboardLayout>
		</div>
	);
};

export default DashboardLayout;
