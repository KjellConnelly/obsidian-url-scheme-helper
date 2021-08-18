import type ObsidianURLSchemeHelperPlugin from './main'

export interface MyPluginSettings {
	mySetting: string
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

export async function loadSettings(plugin : ObsidianURLSchemeHelperPlugin) {
  plugin.settings = Object.assign({}, DEFAULT_SETTINGS, await plugin.loadData())
}

export async function saveSettings(plugin : ObsidianURLSchemeHelperPlugin) {
  await plugin.saveData(plugin.settings)
}
