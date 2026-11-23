1. What is Redis?
Redis is an in-memory data store that stores data primarily in RAM for very fast access.
2. Why use Redis?
- Faster data retrieval.
- Reduces PostgreSQL database load.
- Stores temporary data.
- Supports caching and sessions.
3. Redis vs PostgreSQL
- PostgreSQL: Stores permanent data (users, orders, products).
- Redis: Stores frequently accessed or temporary data (cache, OTPs, sessions).
localhost = Local machine.



6379 = Default Redis port.

8. Common Use Cases
     1. Caching
     2. User sessions
     3. OTP storage
     4. JWT blacklist
     5. Rate limiting     

     
A Redis server is an in-memory database that stores data in RAM, allowing your application to read and write data very quickly.

In simple words:
- Redis Server → Stores and manages data.
- Redis Client → Your Node.js application that communicates with the Redis server.
Think of it this way: Your Node.js app sends a request, and the Redis server stores or retrieves the requested data.
