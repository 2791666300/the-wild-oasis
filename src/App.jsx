import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";

//
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// 获取新数据后，会经过staleTime的时间后才会变成旧数据，当再一次回到页面时，会再去请求新的数据
			staleTime: 60 * 1000,
			// staleTime: 0,
		},
	},
});

function App() {
	return (
		<>
			<DarkModeProvider>
				<QueryClientProvider client={queryClient}>
					{/* react query 的一个工具 */}
					<ReactQueryDevtools initialIsOpen={false} />
					<GlobalStyles />
					<BrowserRouter>
						<Routes>
							<Route
								element={
									<ProtectedRoute>
										<AppLayout />
									</ProtectedRoute>
								}>
								<Route index element={<Navigate replace to='dashboard' />} />
								<Route path='dashboard' element={<Dashboard />} />
								<Route path='bookings' element={<Bookings />} />
								<Route path='bookings/:bookingId' element={<Booking />} />
								<Route path='checkin/:bookingId' element={<Checkin />} />
								<Route path='cabins' element={<Cabins />} />
								<Route path='users' element={<Users />} />
								<Route path='settings' element={<Settings />} />
								<Route path='account' element={<Account />} />
							</Route>
							<Route path='login' element={<Login />} />
							<Route path='*' element={<PageNotFound />} />
						</Routes>
					</BrowserRouter>

					{/* 一个类似于alert的弹出提示的库， 可以自己设置一些配置 notifications(通知) */}
					<Toaster
						position='top-center'
						gutter={12}
						containerStyle={{ margin: "8px" }}
						toastOptions={{
							success: {
								duration: 3000,
							},
							error: {
								duration: 5000,
							},
							style: {
								fontSize: "16px",
								maxWidth: "500px",
								padding: "16px 24px",
								backgroundColor: "var(--color-grey-0)",
								color: "var(--color-grey-700)",
							},
						}}
					/>
				</QueryClientProvider>
			</DarkModeProvider>
		</>
	);
}

export default App;
