import { useDonationStore } from "@/store/DonationStore";
import { Button, Divider, Image } from "@mantine/core";
import { IconMinus } from "@tabler/icons-react";
import { useState } from "react";
import DonateButton from "../Donation";

const CartItem = () => {
  const cartItems = useDonationStore((state) => state.getCartItems());
  const removeFromCart = useDonationStore((state) => state.removeFromCart);
  const clearCart = useDonationStore((state) => state.clearCart);
  const cartQuantity = useDonationStore((state) =>
    state.cartItems.reduce((sum, item) => sum + item.quantity, 0)
  );
  const [message, setMessage] = useState("You have not rescued a doggo yet 😞");

  return (
    <div>
      <h1 className="font-bold text-2xl mb-1">Your doggos: </h1>
      <Divider />
      <div className="mb-5">
        {cartQuantity > 0 ? (
          <div className="mt-5 grid gap-5">
            {cartItems.map((item, index) => {
              const formatBreedName = item.dog.message.split("/")[4];
              const breedName = formatBreedName
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
              return (
                <div key={index}>
                  <div className="flex justify-between items-end" key={index}>
                    <div className="flex gap-5 items-center">
                      <Image
                        alt="Dog img"
                        src={item.dog.message}
                        style={{
                          objectFit: "cover",
                          width: "120px",
                          height: "100px",
                          borderRadius: 6,
                        }}
                      />
                      <p className="font-bold">{breedName}</p>
                    </div>
                    <div className="my-auto">
                      <Button
                        className="w-[45px]"
                        onClick={() => removeFromCart(item.id)}
                        variant="transparent"
                        size="xs"
                        radius="md"
                      >
                        <IconMinus color="red" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
            <Divider />
            <div className="flex w-full space-x-4">
              <DonateButton amount={5000} />
              <DonateButton amount={10000} />
              <DonateButton amount={20000} />
            </div>
            <Button
              variant="white"
              color="black"
              radius="md"
              onClick={() => {
                clearCart();
                setMessage("You have not rescued a doggo yet 😞");
              }}
            >
              Clear cart
            </Button>
          </div>
        ) : (
          <p className="mt-5 text-center">{message}</p>
        )}
      </div>
    </div>
  );
};

export default CartItem;
