import {
    useQueryClient,
    useMutation
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
    const queryClient = useQueryClient();
    // useMutation 返回加载状态， 返回一个回调函数mutate，就是 触发事件后调用的函数
    const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
        mutationFn: deleteBookingApi,
        // 如果上面的函数调用成功，则让queryKey指定的数据调用Invalidate使其变成旧数据，
        // 一旦数据旧了之后，useQuery方法则会重新获取数据
        onSuccess: () => {
            toast.success("booking successfully deleted");
            queryClient.invalidateQueries({
                queryKey: ["bookings"],
            });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
    return { isDeleting, deleteBooking }
}