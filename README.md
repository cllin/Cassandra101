##Cassandra 101

Simple example of a [node.js](http://nodejs.org/) server for database ([Apache Cassandra](http://cassandra.apache.org/)) management on local machine and a web interface.

##Features
- Insert new row
- Print table
- Truncate table

##Installation

```bash
$ git clone https://github.com/cllin/Cassandra101.git
```

##Using It - Server

```bash
$ sudo cassandra // Start cassandra on local machine
$ cd server
$ node server.js // Start server on local machine
```

##Screenshots
![](https://github.com/cllin/Cassandra101/blob/master/demo.png)

##Acknowledgements
This project uses [node-cassandra-cql](https://github.com/jorgebay/node-cassandra-cql) as driver for Apache Cassandra.
