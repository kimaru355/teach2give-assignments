const items = [{ price: 10.99 }, { price: 5.99 }, { price: 29.99 }];

const totalPrice = items
  .map((item) => item.price)
  .reduce((total, current) => {
    return (total += current);
  });

let totalPrice2 = 0;
items.map((item) => {
  totalPrice2 += item.price;
});
