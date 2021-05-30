import merge from 'lodash.merge';

export interface SiteConfig {
  /**
   * The site name, displayed as page titles and site header
   */
  name: string;
  /**
   * logo to show at the top
   * use image url
   */
  logo?: string;
  /**
   * notion credentials and keys
   */
  notion: {
    /**
     * notion database id, can be extracted from URL
     */
    databaseId: string;
  };
  /**
   * your site url - localhost or something.vercel.app
   */
  siteURL: string;
}

const defaultConfig: SiteConfig = {
  name: 'Dhruv Jain',
  notion: {
    databaseId: 'as',
  },
  siteURL: 'http://localhost:3000',
};

export const getSiteConfig = (): SiteConfig => {
  let siteConfig = {};
  try {
    siteConfig = require('../site.config.js');
  } catch (err) {
    console.warn('No site config was found, will use the defaults');
  }

  return merge(defaultConfig, siteConfig);
};
