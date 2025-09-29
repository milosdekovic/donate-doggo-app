const BASE_URL = "https://dog.ceo/api/breeds/image/random";

export const fetchDogs = async () => {
  try {
    const dogsData = [];
    for (let i = 0; i < 10; i++) {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      dogsData.push(data);
    }
    return dogsData;
  } catch {
    throw new Error(
      "Oops, there was an error fetching the pets! Please try again."
    );
  }
};
