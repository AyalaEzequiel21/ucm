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
      "balance": 1000000.50,
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
      "_id": "5f4dcc3b5aa765d61d8327deb882cf99",
      "fullname": "Juan Pérez",
      "phone": "+5491123456789",
      "category": "cat_1",
      "in_delivery": true,
      "balance": 1500.75,
      "sales": ["sale12345", "sale67890"],
      "payments": ["payment12345", "payment67890"],
      "is_active": true,
      "createdAt": "2024-05-05T18:44:29Z"
    },
    {
      "_id": "7c6a180b36896a0a8c02787eeafb0e4c",
      "fullname": "María García",
      "phone": "+5491198765432",
      "category": "cat_2",
      "in_delivery": false,
      "balance": 2300.00,
      "sales": ["sale24680", "sale13579"],
      "payments": ["payment24680", "payment13579"],
      "is_active": false,
      "createdAt": "2024-05-05T19:00:00Z"
    },
    {
      "_id": "dsff43534fd34654fv345r24354t34",
      "fullname": "Juan ramon",
      "phone": "+435934854435",
      "category": "cat_2",
      "in_delivery": true,
      "balance": 15000.75,
      "sales": ["sale1233445", "sale678940"],
      "payments": ["payment1452345", "payment677890"],
      "is_active": true,
      "createdAt": "2024-05-05T18:44:29Z"
    },
    {
      "_id": "545345435dsfdfdsvcsdb435fcg",
      "fullname": "María pepa",
      "phone": "+4354324324354",
      "category": "cat_2",
      "in_delivery": false,
      "balance": 23030.00,
      "sales": ["sale24630", "sale135729"],
      "payments": ["payment24680", "payment13579"],
      "is_active": false,
      "createdAt": "2024-05-05T19:00:00Z"
    }
  ]

    return clients
}

const getSomeSuppliers = () => {
  const suppliers = [
    {
      "_id": "1",
      "supplier_name": "JuanCarlos",
      "phone": "123-456-7890",
      "primeProduct": "Product A",
      "balance": 1000,
      "purchases": ["Purchase 1", "Purchase 2"],
      "payments": ["Payment 1"],
      "createdAt": "2024-05-05T00:00:00.000Z"
    },
    {
      "_id": "2",
      "supplier_name": "Ale increible",
      "phone": "234-567-8901",
      "primeProduct": "Product B",
      "balance": 2000,
      "purchases": ["Purchase 3"],
      "payments": ["Payment 2", "Payment 3"],
      "createdAt": "2024-05-05T00:00:00.000Z"
    },
    {
      "_id": "3",
      "supplier_name": "Mariano",
      "phone": "345-678-9012",
      "primeProduct": "Product C",
      "balance": 3000,
      "purchases": ["Purchase 4", "Purchase 5"],
      "payments": ["Payment 4"],
      "createdAt": "2024-05-05T00:00:00.000Z"
    },
    {
      "_id": "4",
      "supplier_name": "Diego",
      "phone": "456-789-0123",
      "primeProduct": "Product D",
      "balance": 4000,
      "purchases": ["Purchase 6"],
      "payments": ["Payment 5", "Payment 6"],
      "createdAt": "2024-05-05T00:00:00.000Z"
    },
    {
      "_id": "5",
      "supplier_name": "Esteban",
      "phone": "567-890-1234",
      "primeProduct": "Product E",
      "balance": 5000,
      "purchases": ["Purchase 7", "Purchase 8"],
      "payments": ["Payment 7"],
      "createdAt": "2024-05-05T00:00:00.000Z"
    },
    {
      "_id": "6",
      "supplier_name": "Sergio",
      "phone": "678-901-2345",
      "primeProduct": "Product F",
      "balance": 6000,
      "purchases": ["Purchase 9"],
      "payments": ["Payment 8", "Payment 9"],
      "createdAt": "2024-05-05T00:00:00.000Z"
    },
    {
      "_id": "7",
      "supplier_name": "Fabian",
      "phone": "789-012-3456",
      "primeProduct": "Product G",
      "balance": 7000,
      "purchases": ["Purchase 10", "Purchase 11"],
      "payments": ["Payment 10"],
      "createdAt": "2024-05-05T00:00:00.000Z"
    },
    {
      "_id": "8",
      "supplier_name": "Supplier 8",
      "phone": "890-123-4567",
      "primeProduct": "Gustavo",
      "balance": 8000,
      "purchases": ["Purchase 12"],
      "payments": ["Payment 11", "Payment 12"],
      "createdAt": "2024-05-05T00:00:00.000Z"
    },
    {
      "_id": "9",
      "supplier_name": "Horacio",
      "phone": "901-234-5678",
      "primeProduct": "Product I",
      "balance": 9000,
      "purchases": ["Purchase 13", "Purchase 14"],
      "payments": ["Payment 13"],
      "createdAt": "2024-05-05T00:00:00.000Z"
    },
    {
      "_id": "10",
      "supplier_name": "Martin",
      "phone": "012-345-6789",
      "primeProduct": "Product J",
      "balance": 10000,
      "purchases": ["Purchase 15"],
      "payments": ["Payment 14", "Payment 15"],
      "createdAt": "2024-05-05T00:00:00.000Z"
    },
    {
      "_id": "11",
      "supplier_name": "Lautaro",
      "phone": "123-456-7890",
      "primeProduct": "Product K",
      "balance": 11000,
      "purchases": ["Purchase 16", "Purchase 17"],
      "payments": ["Payment 16"],
      "createdAt": "2024-05-05T00:00:00.000Z"
    },
    {
      "_id": "12",
      "supplier_name": "Julian",
      "phone": "234-567-8901",
      "primeProduct": "Product L",
      "balance": 12000,
      "purchases": ["Purchase 18"],
      "payments": ["Payment 17", "Payment 18"],
      "createdAt": "2024-05-05T00:00:00.000Z"
    },
    {
      "_id": "13",
      "supplier_name": "Thiago",
      "phone": "345-678-9012",
      "primeProduct": "Product M",
      "balance": 13000,
      "purchases": ["Purchase 19", "Purchase 20"],
      "payments": ["Payment 19"],
      "createdAt": "2024-05-05T00:00:00.000Z"
    },
    {
      "_id": "14",
      "supplier_name": "Abraham",
      "phone": "456-789-0123",
      "primeProduct": "Product N",
      "balance": 14000,
      "purchases": ["Purchase 21"],
      "payments": ["Payment 20", "Payment 21"],
      "createdAt": "2024-05-05T00:00:00.000Z"
    },
    {
      "_id": "15",
      "supplier_name": "papelera",
      "phone": "567-890-1234",
      "primeProduct": "Product O",
      "balance": 15000,
      "purchases": ["Purchase 22", "Purchase 23"],
      "payments": ["Payment 22"],
      "createdAt": "2024-05-05T00:00:00.000Z"
    }
  ]
  return suppliers
}

export {getSomeProducts, getSomeClients, getSomeSuppliers}