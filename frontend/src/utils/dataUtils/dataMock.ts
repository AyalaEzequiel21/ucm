import { IClient } from "../interfaces/IClient"


const getSomeProducts = () => {
    return {
        products: [
        {
          "_id": "1",
          "product_name": "Pechito de cerdo",
          "first_price": 100,
          "second_price": 90,
          "stock": 50,
          "is_active": true
        },
        {
          "_id": "2",
          "product_name": "Morcilla rosca",
          "first_price": 150,
          "second_price": 120,
          "stock": 30,
          "is_active": false
        },
        {
          "_id": "3",
          "product_name": "Ahumada",
          "first_price": 80,
          "second_price": 70,
          "stock": 70,
          "is_active": true
        },
        {
          "_id": "4",
          "product_name": "Chorizo de cerdo",
          "first_price": 200,
          "second_price": 180,
          "stock": 20,
          "is_active": true
        },
        {
          "_id": "5",
          "product_name": "Chorizo con morron",
          "first_price": 120,
          "second_price": 110,
          "stock": 40,
          "is_active": false
        },
        {
          "_id": "6",
          "product_name": "Salchicha viena",
          "first_price": 90,
          "second_price": 80,
          "stock": 60,
          "is_active": true
        },
        {
          "_id": "7",
          "product_name": "Product 7",
          "first_price": 180,
          "second_price": 160,
          "stock": 25,
          "is_active": false
        },
        {
          "_id": "8",
          "product_name": "Product 8",
          "first_price": 110,
          "second_price": 100,
          "stock": 35,
          "is_active": true
        },
        {
          "_id": "9",
          "product_name": "Product 9",
          "first_price": 130,
          "second_price": 115,
          "stock": 45,
          "is_active": false
        },
        {
          "_id": "10",
          "product_name": "Product 10",
          "first_price": 95,
          "second_price": 85,
          "stock": 55,
          "is_active": true
        },
        {
          "_id": "11",
          "product_name": "Product 11",
          "first_price": 170,
          "second_price": 150,
          "stock": 15,
          "is_active": true
        },
        {
          "_id": "12",
          "product_name": "Product 12",
          "first_price": 140,
          "second_price": 130,
          "stock": 65,
          "is_active": false
        },
        {
          "_id": "13",
          "product_name": "Product 13",
          "first_price": 250,
          "second_price": 220,
          "stock": 10,
          "is_active": true
        },
        {
          "_id": "14",
          "product_name": "Product 14",
          "first_price": 160,
          "second_price": 140,
          "stock": 30,
          "is_active": false
        },
        {
          "_id": "15",
          "product_name": "Product 15",
          "first_price": 200,
          "second_price": 190,
          "stock": 50,
          "is_active": true
        },
        // {
        //   "_id": "16",
        //   "product_name": "Product 16",
        //   "first_price": 110,
        //   "second_price": 100,
        //   "stock": 20,
        //   "is_active": false
        // },
        // {
        //   "_id": "17",
        //   "product_name": "Product 17",
        //   "first_price": 90,
        //   "second_price": 80,
        //   "stock": 40,
        //   "is_active": true
        // },
        // {
        //   "_id": "18",
        //   "product_name": "Product 18",
        //   "first_price": 180,
        //   "second_price": 160,
        //   "stock": 60,
        //   "is_active": false
        // },
        // {
        //   "_id": "19",
        //   "product_name": "Product 19",
        //   "first_price": 120,
        //   "second_price": 110,
        //   "stock": 35,
        //   "is_active": true
        // },
        // {
        //   "_id": "20",
        //   "product_name": "Product 20",
        //   "first_price": 150,
        //   "second_price": 140,
        //   "stock": 45,
        //   "is_active": false
        // }
      ]}
}

const getSomeClients = () => {
  const clients: IClient[] = [
    {
      "_id": "1",
      "fullname": "John Doe",
      "phone": "123456789",
      "category": "cat_1",
      "in_delivery": true,
      "balance": 100.50,
      "sales": ["Sale 1", "Sale 2"],
      "payments": ["Payment 1", "Payment 2"],
      "is_active": true,
      "createdAt": "2024-04-27T12:00:00Z"
    },
    {
      "fullname": "Jane Smith",
      "phone": "987654321",
      "category": "cat_2",
      "in_delivery": false,
      "_id": "2",
      "balance": 150.75,
      "sales": ["Sale 3", "Sale 4"],
      "payments": ["Payment 3", "Payment 4"],
      "is_active": false,
      "createdAt": "2024-04-27T13:00:00Z"
    },
    {
      "fullname": "Michael Johnson",
      "phone": "555444333",
      "category": "cat_1",
      "in_delivery": true,
      "_id": "3",
      "balance": 200.25,
      "sales": ["Sale 5", "Sale 6"],
      "payments": ["Payment 5", "Payment 6"],
      "is_active": true,
      "createdAt": "2024-04-27T14:00:00Z"
    },
    {
      "fullname": "Emily Davis",
      "phone": "111222333",
      "category": "cat_2",
      "in_delivery": false,
      "_id": "4",
      "balance": 300.00,
      "sales": ["Sale 7", "Sale 8"],
      "payments": ["Payment 7", "Payment 8"],
      "is_active": true,
      "createdAt": "2024-04-27T15:00:00Z"
    },
    {
      "fullname": "Mark Johnson",
      "phone": "666777888",
      "category": "cat_1",
      "in_delivery": true,
      "_id": "5",
      "balance": 250.20,
      "sales": ["Sale 9", "Sale 10"],
      "payments": ["Payment 9", "Payment 10"],
      "is_active": true,
      "createdAt": "2024-04-27T16:00:00Z"
    },
    {
      "fullname": "Sarah Parker",
      "phone": "999888777",
      "category": "cat_2",
      "in_delivery": false,
      "_id": "6",
      "balance": 350.60,
      "sales": ["Sale 11", "Sale 12"],
      "payments": ["Payment 11", "Payment 12"],
      "is_active": false,
      "createdAt": "2024-04-27T17:00:00Z"
    },
    {
      "fullname": "David Brown",
      "phone": "333222111",
      "category": "cat_1",
      "in_delivery": true,
      "_id": "7",
      "balance": 180.80,
      "sales": ["Sale 13", "Sale 14"],
      "payments": ["Payment 13", "Payment 14"],
      "is_active": true,
      "createdAt": "2024-04-27T18:00:00Z"
    },
    {
      "fullname": "Laura White",
      "phone": "777666555",
      "category": "cat_2",
      "in_delivery": false,
      "_id": "8",
      "balance": 400.90,
      "sales": ["Sale 15", "Sale 16"],
      "payments": ["Payment 15", "Payment 16"],
      "is_active": true,
      "createdAt": "2024-04-27T19:00:00Z"
    },
    {
      "fullname": "James Taylor",
      "phone": "444555666",
      "category": "cat_1",
      "in_delivery": true,
      "_id": "9",
      "balance": 275.30,
      "sales": ["Sale 17", "Sale 18"],
      "payments": ["Payment 17", "Payment 18"],
      "is_active": false,
      "createdAt": "2024-04-27T20:00:00Z"
    },
    {
      "fullname": "Emma Evans",
      "phone": "888999000",
      "category": "cat_2",
      "in_delivery": false,
      "_id": "10",
      "balance": 500.45,
      "sales": ["Sale 19", "Sale 20"],
      "payments": ["Payment 19", "Payment 20"],
      "is_active": true,
      "createdAt": "2024-04-27T21:00:00Z"
    },
    {
      "_id": "1",
      "fullname": "John Doe",
      "phone": "123456789",
      "category": "cat_1",
      "in_delivery": true,
      "balance": 100.50,
      "sales": ["Sale 1", "Sale 2"],
      "payments": ["Payment 1", "Payment 2"],
      "is_active": true,
      "createdAt": "2024-04-27T12:00:00Z"
    },
    {
      "fullname": "Jane Smith",
      "phone": "987654321",
      "category": "cat_2",
      "in_delivery": false,
      "_id": "2",
      "balance": 150.75,
      "sales": ["Sale 3", "Sale 4"],
      "payments": ["Payment 3", "Payment 4"],
      "is_active": false,
      "createdAt": "2024-04-27T13:00:00Z"
    },
    {
      "fullname": "Michael Johnson",
      "phone": "555444333",
      "category": "cat_1",
      "in_delivery": true,
      "_id": "3",
      "balance": 200.25,
      "sales": ["Sale 5", "Sale 6"],
      "payments": ["Payment 5", "Payment 6"],
      "is_active": true,
      "createdAt": "2024-04-27T14:00:00Z"
    },
    {
      "fullname": "Emily Davis",
      "phone": "111222333",
      "category": "cat_2",
      "in_delivery": false,
      "_id": "4",
      "balance": 300.00,
      "sales": ["Sale 7", "Sale 8"],
      "payments": ["Payment 7", "Payment 8"],
      "is_active": true,
      "createdAt": "2024-04-27T15:00:00Z"
    },
    {
      "fullname": "Mark Johnson",
      "phone": "666777888",
      "category": "cat_1",
      "in_delivery": true,
      "_id": "5",
      "balance": 250.20,
      "sales": ["Sale 9", "Sale 10"],
      "payments": ["Payment 9", "Payment 10"],
      "is_active": true,
      "createdAt": "2024-04-27T16:00:00Z"
    },
    {
      "fullname": "Sarah Parker",
      "phone": "999888777",
      "category": "cat_2",
      "in_delivery": false,
      "_id": "6",
      "balance": 350.60,
      "sales": ["Sale 11", "Sale 12"],
      "payments": ["Payment 11", "Payment 12"],
      "is_active": false,
      "createdAt": "2024-04-27T17:00:00Z"
    },
    {
      "fullname": "David Brown",
      "phone": "333222111",
      "category": "cat_1",
      "in_delivery": true,
      "_id": "7",
      "balance": 180.80,
      "sales": ["Sale 13", "Sale 14"],
      "payments": ["Payment 13", "Payment 14"],
      "is_active": true,
      "createdAt": "2024-04-27T18:00:00Z"
    },
    {
      "fullname": "Laura White",
      "phone": "777666555",
      "category": "cat_2",
      "in_delivery": false,
      "_id": "8",
      "balance": 400.90,
      "sales": ["Sale 15", "Sale 16"],
      "payments": ["Payment 15", "Payment 16"],
      "is_active": true,
      "createdAt": "2024-04-27T19:00:00Z"
    },
    {
      "fullname": "James Taylor",
      "phone": "444555666",
      "category": "cat_1",
      "in_delivery": true,
      "_id": "9",
      "balance": 275.30,
      "sales": ["Sale 17", "Sale 18"],
      "payments": ["Payment 17", "Payment 18"],
      "is_active": false,
      "createdAt": "2024-04-27T20:00:00Z"
    },
    {
      "fullname": "Emma Evans",
      "phone": "888999000",
      "category": "cat_2",
      "in_delivery": false,
      "_id": "10",
      "balance": 500.45,
      "sales": ["Sale 19", "Sale 20"],
      "payments": ["Payment 19", "Payment 20"],
      "is_active": true,
      "createdAt": "2024-04-27T21:00:00Z"
    }
  ]

    return clients
}

export {getSomeProducts, getSomeClients}