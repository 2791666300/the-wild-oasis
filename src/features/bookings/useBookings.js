import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";


export function useBookings() {
    const queryClient = useQueryClient()
    const [searchParams,] = useSearchParams();

    // Filter 过滤
    const filterValue = searchParams.get('status')
    const filter =
        !filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue }

    // Sort 排序
    const sortByRaw = searchParams.get('sortBy') || "startDate-desc"
    const [field, direction] = sortByRaw.split("-");
    const sortBy = { field, direction }

    // 当前页，
    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));

    // Query 数据获取
    const { isLoading, data: { data: bookings, count } = {}, error } = useQuery({
        // 每当querykey里面的值发生改变时，queryFn里的函数都会重新调用
        queryKey: ["bookings", filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    });

    // Pre-fetching 预获取 意思就是，当进入当前页时就已经提前加载好了下一页
    // 如果点击下一页则会直接从存储器读取，而不是加载， 提升用户体验
    const pageCount = Math.ceil(count / PAGE_SIZE)
    // 防止最后一页后还继续预获取下一页，避免资源浪费
    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page + 1],
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
        })

    // 反过来，往前翻时也可以预获取前面那一页
    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page - 1],
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
        })


    return { isLoading, bookings, error, count }
}