import { createClient as createRedisClient } from "redis";
import redisMock from "async-redis-mock";
import { REDIS_URL } from "infrastructure/settings";
import { createLogger } from "shared/utils";

type RedisConfig = {
  url: string;
};
const createClient = (options: RedisConfig) => {
  if (process.env.NODE_ENV == "test") {
    return redisMock.createClient(options);
  }

  return createRedisClient(options);
};

export const REDIS_CLIENT = createClient({
  url: REDIS_URL,
});

const logger = createLogger("CacheService");

export class CacheService {
  static cacheData(
    key: string,
    data: Record<string, unknown>,
    expireTime: number = 60 * 60 * 24,
  ) {
    REDIS_CLIENT.set(key, JSON.stringify(data));
    REDIS_CLIENT.expire(key, expireTime);
  }

  static deleteKey(key: string) {
    REDIS_CLIENT.del(key);
  }

  static async retrieveKey<Data = object>(
    key: string,
  ): Promise<Record<string, Data | any> | null> {
    try {
      logger.info(`Retriving key "${key}"`);
      const data = await REDIS_CLIENT.get(key);

      if (!data) return null;
      return JSON.parse(data);
    } catch (error) {
      logger.error(`Error occured while retrieving key="${key}"`);
      logger.error(error);
      return null;
    }
  }
}

export type CacheServiceType = typeof CacheService;
