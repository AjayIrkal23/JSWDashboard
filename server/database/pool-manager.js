import mssql from "mssql";

const pools = new Map();

/**
 * Get a connection pool by name. If the pool doesn't exist, it creates one using the provided config.
 * @param {string} name - The name of the pool.
 * @param {object} config - The configuration for the pool.
 * @returns {Promise<mssql.ConnectionPool>} The connection pool.
 */
export const get = async (name, config) => {
  if (!pools.has(name)) {
    if (!config) {
      throw new Error(
        `Pool with name "${name}" does not exist, and no configuration provided to create one.`
      );
    }

    try {
      const pool = new mssql.ConnectionPool(config);

      // Override the close method to remove the pool from the map when it's closed
      const originalClose = pool.close.bind(pool);
      pool.close = async (...args) => {
        pools.delete(name); // Remove pool from the cache when closed
        return originalClose(...args);
      };

      // Set and connect the pool
      pools.set(name, pool.connect());
    } catch (error) {
      throw new Error(
        `Failed to create or connect to pool "${name}": ${error.message}`
      );
    }
  }

  return pools.get(name); // Return the pool (either existing or newly created)
};

/**
 * Close all connection pools.
 * @returns {Promise<void>}
 */
export const closeAll = async () => {
  try {
    const closePromises = Array.from(pools.values()).map(async (connect) => {
      const pool = await connect; // Wait for pool to be connected
      return pool.close(); // Close the pool
    });

    await Promise.all(closePromises); // Wait for all pools to be closed
  } catch (error) {
    console.error(`Error closing pools: ${error.message}`);
    throw error;
  }
};
