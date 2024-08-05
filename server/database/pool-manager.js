// pool-manager.js
import mssql from "mssql";

const pools = new Map();

export const get = async (name, config) => {
  if (!pools.has(name)) {
    if (!config) {
      throw new Error(
        "Pool does not exist and no config provided to create one."
      );
    }

    try {
      const pool = new mssql.ConnectionPool(config);
      // Automatically remove the pool from the cache if `pool.close()` is called
      const close = pool.close.bind(pool);
      pool.close = (...args) => {
        pools.delete(name);
        return close(...args);
      };

      const connect = pool.connect();
      pools.set(name, connect);
      await connect; // Ensure the connection is established before returning
    } catch (error) {
      console.error(`Error creating or connecting to pool ${name}:`, error);
      throw error;
    }
  }

  return pools.get(name);
};

export const closeAll = async () => {
  try {
    await Promise.all(
      Array.from(pools.values()).map((connect) =>
        connect.then((pool) => pool.close())
      )
    );
    console.log("All pools closed successfully.");
  } catch (error) {
    console.error("Error closing pools:", error);
  }
};
