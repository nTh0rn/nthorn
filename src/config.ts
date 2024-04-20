// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "nThorn";
export const SITE_DESCRIPTION =
  "Hey there! I'm a Computer Science student attending Clayton State University.";
export const TWITTER_HANDLE = "@yourtwitterhandle";
export const MY_NAME = "Nikolas Thornton";

// setup in astro.config.mjs
const BASE_URL = new URL(import.meta.env.SITE);
export const SITE_URL = BASE_URL.origin;
