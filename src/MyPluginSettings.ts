import type ObsidianURLSchemeHelperPlugin from './main'
import { allDefaultSchemeTypes } from './DefaultSchemeTypes'
import { URLSchemeType } from './MyTypes'

export interface MyPluginSettings {
	schemeSelected: string,
	schemesEnabled: {
		[propName : string] : boolean
	},
}

const defaultSchemesEnabled : {
	[propName : string] : boolean
} = {}
allDefaultSchemeTypes.forEach((schemeType : URLSchemeType)=>{
	defaultSchemesEnabled[schemeType.name] = true
})
const DEFAULT_SETTINGS: MyPluginSettings = {
	schemeSelected: allDefaultSchemeTypes[0].name,
	schemesEnabled: defaultSchemesEnabled
}

export async function loadSettings(plugin : ObsidianURLSchemeHelperPlugin) {
  plugin.settings = Object.assign({}, DEFAULT_SETTINGS, await plugin.loadData())
}

export async function saveSettings(plugin : ObsidianURLSchemeHelperPlugin) {
  await plugin.saveData(plugin.settings)
}
