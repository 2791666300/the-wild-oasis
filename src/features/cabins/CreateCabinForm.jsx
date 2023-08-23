import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
	const { id: editId, ...editValues } = cabinToEdit;
	const isEditSession = Boolean(editId);

	// 用于处理表单的库register给input各种属性，比如，name、Onchange、onblur等
	// 而handleSubmi则是我们的Form的提交函数, reset则是一个表单重置的函数,
	// getValues是获取表单里面的某个值,formState则是表单里面的所有值或者错误信息
	const { register, handleSubmit, reset, getValues, formState } = useForm({
		// 有相应的值的话，会自动填充相应的input
		defaultValues: isEditSession ? editValues : {},
	});

	const { errors } = formState;

	// 创建
	const { isCreating, createCabin } = useCreateCabin();

	// 更新一个现有的cabin
	const { isEditing, editCabin } = useEditCabin();

	const isWorking = isCreating || isEditing;

	function onSubmit(data) {
		// 通过image字段类型来判断是更新cabin还是创建 一个cabin，因为当处于创建时，
		// image的类型应该为file， 而处于更新时，则是一个url也就是一个字符串
		const image = typeof data.image === "string" ? data.image : data.image[0];
		if (isEditSession)
			editCabin(
				{ newCabinData: { ...data, image }, id: editId },
				{
					// 创建成功后调用重置表单函数
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				},
			);
		else
			createCabin(
				{ ...data, image: image },
				{
					// 创建成功后调用重置表单函数
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				},
			);
	}

	function onError(error) {
		// console.log(error);
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			type={onCloseModal ? "modal" : "regular"}>
			<FormRow label='Cabin name' error={errors?.name?.message}>
				<Input
					type='text'
					id='name'
					disabled={isWorking}
					{...register("name", {
						required: "This field is required",
					})}
				/>
			</FormRow>
			<FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
				<Input
					type='number'
					id='maxCapacity'
					disabled={isWorking}
					{...register("maxCapacity", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Capacity should be at least 1",
						},
					})}
				/>
			</FormRow>
			<FormRow label='Regular price' error={errors?.regularPrice?.message}>
				<Input
					type='number'
					id='regularPrice'
					disabled={isWorking}
					{...register("regularPrice", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Capacity should be at least 1",
						},
					})}
				/>
			</FormRow>

			<FormRow label='Discount' error={errors?.discount?.message}>
				<Input
					type='number'
					id='discount'
					defaultValue={0}
					disabled={isWorking}
					{...register("discount", {
						required: "This field is required",
						validate: (value) =>
							value <= getValues().regularPrice ||
							"Discount should bu less the regular price",
					})}
				/>
			</FormRow>

			<FormRow
				label='Description for website'
				error={errors?.description?.message}>
				<Textarea
					type='number'
					id='description'
					defaultValue=''
					disabled={isWorking}
					{...register("description", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label='Cabin photo' error={errors?.image?.message}>
				<FileInput
					id='image'
					accept='image/*'
					type='file'
					{...register("image", {
						required: isEditSession ? false : "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation='secondary'
					type='reset'
					onClick={() => onCloseModal?.()}>
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isEditSession ? "Edit cabin" : "Create new cabin"}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
