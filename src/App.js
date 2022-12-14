import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { fetchCartData } from "./store/cart-slice";
import { uiActions } from "./store/ui-slice";

let isInitial = true;

function App() {
	const dispatch = useDispatch();
	const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
	const cart = useSelector((state) => state.cart);
	const notification = useSelector((state) => state.ui.notification);

	useEffect(() => {
		dispatch(fetchCartData());
	}, [dispatch]);

	useEffect(() => {
		if (cart.changed) {
			const sendCartData = async () => {
				dispatch(
					uiActions.showNotification({
						status: "pending",
						title: "Sending...",
						message: "Sending cart data.",
					})
				);
				const response = await fetch(
					"https://redux-project-7322a-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
					{
						method: "PUT",
						body: JSON.stringify({
							items: cart.items,
							totalQuantity: cart.totalQuantity,
						}),
					}
				);

				if (!response.ok) {
					throw new Error("Sending cart data failed!");
				}

				dispatch(
					uiActions.showNotification({
						status: "success",
						title: "Success!",
						message: "Send cart data successfully.",
					})
				);
			};

			if (isInitial) {
				isInitial = false;
				return;
			}

			sendCartData().catch((error) => {
				dispatch(
					uiActions.showNotification({
						status: "error",
						title: "Error!",
						message: "Sending cart data failed!",
					})
				);
			});
		}
	}, [cart, dispatch]);

	return (
		<Fragment>
			{notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					message={notification.message}
				/>
			)}
			<Layout>
				{cartIsVisible && <Cart />}
				<Products />
			</Layout>
		</Fragment>
	);
}

export default App;
