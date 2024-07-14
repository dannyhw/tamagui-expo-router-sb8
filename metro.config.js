// Learn more https://docs.expo.io/guides/customizing-metro
/**
 * @type {import('expo/metro-config').MetroConfig}
 */
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

// Enable Tamagui and add nice web support with optimizing compiler + CSS extraction
const { withTamagui } = require("@tamagui/metro-plugin");
const withStorybook = require("@storybook/react-native/metro/withStorybook");

config.resolver.sourceExts.push("mjs");

const intermediateConfig = withTamagui(config, {
  components: ["tamagui"],
  config: "./tamagui.config.ts",
  outputCSS: "./tamagui-web.css",
  disableCSSInterop: true,
});

const finalconfig = withStorybook(intermediateConfig, {
  enabled: true,
  configPath: path.resolve(__dirname, "./.storybook"),
});

module.exports = finalconfig;
