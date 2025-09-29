import { useDonationStore } from "@/store/DonationStore";
import { Card, Image, Text, Button, Group, CardSection } from "@mantine/core";
import { IconMinus } from "@tabler/icons-react";

export interface Dog {
  message: string;
  status: string;
}

interface DogCardProps {
  dog: Dog;
}

const DogCard = ({ dog }: DogCardProps) => {
  const formatBreedName = dog.message.split("/")[4];
  const breedName = formatBreedName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const quantity = useDonationStore((state) => state.getQuantity(dog.message));
  const increaseQuantity = useDonationStore((state) => state.increaseQuantity);
  const decreaseQuantity = useDonationStore((state) => state.decreaseQuantity);

  return (
    <Card
      className="transition bg-[#242424] ease-in-out delay-100 hover:scale-105 duration-500"
      shadow="sm"
      padding="lg"
      radius="md"
    >
      <CardSection>
        <Image
          className="w-full h-[300px] object-cover"
          width={300}
          height={250}
          src={dog.message}
          alt="doggo"
        />
      </CardSection>
      <Group justify="space-between" mt="md" mb="xs">
        <Text className="text-white text-xl lg:text-2xl" fw={600}>
          {breedName}
        </Text>
      </Group>
      <Text size="sm" c="dimmed">
        Woof, Woof! Im ready for a new home and plenty of adventures. Everyone
        needs a tail-wagging buddy!
      </Text>
      {quantity === 0 ? (
        <div className="flex justify-start">
          <Button
            className="text-black"
            onClick={() => increaseQuantity(dog.message, dog)}
            variant="white"
            color="black"
            mt="md"
            radius="md"
          >
            Donate
          </Button>
        </div>
      ) : (
        <div className="flex justify-start mt-5">
          <Button
            className="w-[45px]"
            onClick={() => decreaseQuantity(dog.message)}
            variant="transparent"
            color="red"
            size="xs"
          >
            <IconMinus color="red" />
          </Button>
        </div>
      )}
    </Card>
  );
};

export default DogCard;
