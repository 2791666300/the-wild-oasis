import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

const AddCabin = () => {
	return (
		<>
			<Modal>
				<Modal.Open opens='cabin-form'>
					<Button>Add new cabin</Button>
				</Modal.Open>
				<Modal.Window name='cabin-form'>
					<CreateCabinForm />
				</Modal.Window>
			</Modal>

			{/* 复合组件 */}
			{/* <Modal>
				<Modal.Open opens='demo'>
					<Button>open demo</Button>
				</Modal.Open>
				<Modal.Window name='demo'>
					<div>这是demo</div>
				</Modal.Window>
			</Modal> */}
		</>
	);
};
// const AddCabin = () => {
// 	const [isOpenModal, setIsOpenModal] = useState(false);
// 	return (
// 		<div>
// 			<Button onClick={() => setIsOpenModal((isOpenModal) => !isOpenModal)}>
// 				Add new cobin
// 			</Button>
// 			{isOpenModal && (
// 				<Modal onClose={() => setIsOpenModal(false)}>
// 					<CreateCabinForm onCloseModal={() => setIsOpenModal(false)}/>
// 				</Modal>
// 			)}
// 		</div>
// 	);
// };

export default AddCabin;
