import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";


export function useCabins() {
    // useQuery的queryFn接收一个异步函数，并且返回加载状态，数据，等
    const { isLoading, data: cabins } = useQuery({

        // queryKey 数组是依赖项，每当queryKey数组里面的数发生改变时都会再一次调用queryFn函数
        queryKey: ["cabins"],
        queryFn: getCabins,
    });

    return { isLoading, cabins }

}