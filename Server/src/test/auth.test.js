// import "dotenv/config";
// import request from 'supertest';
// import app from '../app'; 

// describe('POST /auth/register', () => {
//   test('should register a new user successfully', async () => {
//     const userData = {
//       firstName: 'Akmal',
//       lastName: 'Malik',
//       email: 'akmal@example.com',
//       password: '123456',
//       eToken: 'wuefhdywefywebyhbrfberhfbreybfher',
//       expiryTimestamps: "2024-04-16 16:23:28.218+05",
//     };

//     const response = await request(app)
//       .post('/auth/register')
//       .send(userData);

//     expect(response.status).toBe(201);
//     expect(response.body.message).toBe('User has Registred, Please Verify your Email');
//   });
// });

// import "dotenv/config";
// import request from "supertest"
// import app from "../app";
// import { Sequelize } from "sequelize";

// // const token = "weubfcywbfhbrfuvbwrbcurhfurbfjernuifgn";

// describe("POST /auth/register", () => {
//     test("should successfully register a user with valid input", async () => {
//         const userData = {
//             firstName: "akmal",
//             lastName: "malik",
//             email: "akmal@gmail.com",
//             password: "123456",
//         };

//         return await request(app)
//         .post("/auth/register")
//         .send(userData)
//         .expect(201)
//     });
// });

// test("1+1 should be equal to 2", ()=>{
// let a=1;
// let b=1;

// expect(a+b).toBe(2); 
// });