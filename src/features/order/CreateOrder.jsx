// import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submiting";

  const formErrors = useActionData(); // be chizi ek az action return shode dastresi darim

  const cart = fakeCart;

  return (
    <div>
      <h2>{"Ready to order Let's go!"}</h2>

      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          {/* in input bala baraye ine ke : ma harchi to Form hast mitonim be action bedim vali cart ham bayad to form biyad pas : ma ya input hidden zadim ke tosh cart hastesh  va string kardim chon nemishe data obj dad behesh va bayad string bashe moqe estefade dobare obj mikonim */}
        </div>

        <div>
          <button disabled={isSubmitting}>
            {isSubmitting ? "placing order..." : "Order now"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData); //in tabdil mikone be obj
  // obj order hamon data hast vali ye seri chiza overRight shode masalan cart obj shode va priority true false shode
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on", //in ye tik to form hast baraye ajale daram   agar tik bezani miayad to obj
  };
  console.log(order);

  const errores = {};
  if (!isValidPhone(order.phone))
    errores.phone =
      "please give us your correct phone number. We might need it to contact you.";

  if (Object.keys(errores).length > 0) return errores;

  // if everything is ok create new order and redirect
  const newOrder = await createOrder(order); // createOrder ye function ke to api ha neveshte shode ye obj post mikone va data nahayi return mikone

  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
