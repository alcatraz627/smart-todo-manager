export const isDenoDeploy = Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;
export const DenoStore = isDenoDeploy
    ? undefined
    : Deno.env.get("KV_REMOTE_DB") || undefined;

// TODO: Replace this with the logged in user in the future
export const USER_NAME = "default_user";
