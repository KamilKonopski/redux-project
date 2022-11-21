import { useDispatch } from "react-redux";

import Card from "../UI/Card";
import { cartActions } from "../../store/cart-slice";

import classes from "./ProductItem.module.css";

function ProductItem(props) {
	const { id, name, price, description } = props;

	const dispatch = useDispatch();

	function addToCartHandler() {
		dispatch(
			cartActions.addItemtoCart({
				id,
				name,
				price,
			})
		);
	};

	return (
		<li className={classes.item}>
			<Card>
				<header>
					<h3>{name}</h3>
					<div className={classes.price}>${price.toFixed(2)}</div>
				</header>
				<p>{description}</p>
				<div className={classes.actions}>
					<button onClick={addToCartHandler}>Add to Cart</button>
				</div>
			</Card>
		</li>
	);
};

export default ProductItem;
