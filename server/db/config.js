var app = require ('../app.js');
var express = require('express');
var path = require('path');

if(process.env.DATABASE_URL) {
  var connection = process.env.DATABASE_URL;
} else {
  var connection = {
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'taskdrafter'
  };
}

var knex = require('knex')({
  client: 'pg',
  connection: connection,
  useNullAsDefault: true
});

var db = require('bookshelf')(knex);

//sqlite database is in gitignore because it creates merge hell

//only small parts of this table are in use
//username refers to a user's email, which we used as a unique identifier

db.knex.schema.createTableIfNotExists('users', function(users) {
  users.increments('id').primary();
  users.string('username', 65);
  users.string('password', 25);
  users.string('first_name', 25);
  users.string('last_name', 60);
  //users.string('role', 30).defaultTo('user');
  users.dateTime('date');
  users.string('photo');
  users.string('phone', 15);
  //users.string('phone_alt', 15);
  //users.integer('company_id');
  // users.foreign('company_id').references('company.id');
})
  .then( (table) => {
    console.log('user table exists: ', table);
  });

db.knex.schema.createTableIfNotExists('work_orders', function(orders) {
  orders.increments('id').primary();
  orders.text('username');
  orders.text('workername');
  orders.string('userphone');
  orders.string('workerphone');
  orders.text('notes', 'mediumtext');
  orders.text('job_info', 'mediumtext');
  orders.text('created_at', 'mediumtext');
  //Orders.boolean might be changed to an integer that relates to a completion status Completed, Pending, and Accepted.
  orders.boolean('is_done').defaultTo(false);
  orders.text('duration', 'mediumtext');
  // orders.integer('client_id');
  orders.string('client');
  orders.string('photo');
  // orders.integer('author_id');
  // orders.integer('worker_id');
  //foreign key author
  // orders.foreign('author_id').references('users.id');
  // //foreign key worker
  // orders.foreign('worker_id').references('users.id');
  // orders.foreign('company_id').references('company.id');
})
  .then( (table) => {
    console.log('work_orders table exists: ', table);
  });


//The following tables are not currently used in the app implementation.
//However, if you choose to implement features that allow the app to be used by
//more than one company at once, to reference clients for billing purposes, or
//to allow an admin to hand work to individual users, they may come in handy.
//We leave them, because delete is easier than re-create.
//
// db.knex.schema.createTableIfNotExists('clients', function(clients) {
//   clients.increments('id').primary();
//   clients.string('first_name', 25);
//   clients.string('last_name', 60);
//   clients.string('phone', 15);
//   clients.string('alt_phone', 15);
//   clients.string('street_address_1', 200);
//   clients.string('street_address_2', 200);
//   clients.string('city', 100);
//   clients.string('state_province', 10);
//   clients.string('postal_code', 10);
//   clients.string('email', 30);
// })
//   .then( (table) => {
//     console.log('Table exists: ', table);
//   });

// db.knex.schema.createTableIfNotExists('company', function(company) {
//   company.increments('id').primary();
//   company.integer('primary_contact');
//   // company.foreign('primary_contact').references('users.id');
//   company.string('street_address_1', 200);
//   company.string('street_address_2', 200);
//   company.string('city', 100);
//   company.string('state_province', 10);
//   company.string('postal_code', 10);
//   company.string('email', 30);
//   company.string('announcements', 1000);
// })
//   .then( (table) => {
//     console.log('Table exists: ', table);
//   });

// db.knex.schema.createTableIfNotExists('users_work_orders', function(table) {
//   table.increments('id').primary();
//   table.integer('user_id');
//   table.integer('work_order_id');
//   // table.foreign('user_id').references('users.id');
//   // table.foreign('work_order_id').references('orders.id');
// })
//   .then( (table) => {
//     console.log('Table exists: ', table);
//   });

module.exports.db = db;
