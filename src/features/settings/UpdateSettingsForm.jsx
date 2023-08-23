import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";
import Spinner from "../../ui/Spinner";

function UpdateSettingsForm() {
	const { isLoading, settings } = useSettings();
	const {
		minBookingLength,
		maxBookingLength,
		maxGuestsPerBooking,
		breakfastPrice,
	} = settings ?? {};

	const { updateSetting } = useUpdateSetting();

	if (isLoading) return <Spinner />;

	function handleUpdate(e, field) {
		const { value } = e.target;

		if (!value || Number(value) === settings[field]) return;
		updateSetting({ [field]: value });
	}

	return (
		<Form>
			<FormRow label='Minimum nights/booking'>
				<Input
					type='number'
					id='min-nights'
					defaultValue={minBookingLength}
					// onBlur 事件是当鼠标离开时触发回调
					onBlur={(e) => handleUpdate(e, "minBookingLength")}
				/>
			</FormRow>
			<FormRow label='Maximum nights/booking'>
				<Input
					type='number'
					id='max-nights'
					defaultValue={maxBookingLength}
					onBlur={(e) => handleUpdate(e, "maxBookingLength")}
				/>
			</FormRow>
			<FormRow label='Maximum guests/booking'>
				<Input
					type='number'
					id='max-guests'
					defaultValue={maxGuestsPerBooking}
					onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
				/>
			</FormRow>
			<FormRow label='Breakfast price'>
				<Input
					type='number'
					id='breakfast-price'
					defaultValue={breakfastPrice}
					onBlur={(e) => handleUpdate(e, "breakfastPrice")}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
