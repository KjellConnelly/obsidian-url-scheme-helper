import { PluginSettingTab, Setting, Notice, ToggleComponent } from 'obsidian'
import type ObsidianURLSchemeHelperPlugin from './main'
import { URLSchemeType } from './MyTypes'
import { allDefaultSchemeTypes } from './DefaultSchemeTypes'
import { saveSettings } from './MyPluginSettings'

export default class SettingsTab extends PluginSettingTab {
  private readonly plugin: ObsidianURLSchemeHelperPlugin

  constructor(plugin : ObsidianURLSchemeHelperPlugin) {
    super(plugin.app, plugin)
    this.plugin = plugin
  }

  public display(): void {
    const { containerEl } = this
		containerEl.empty()
    const {settings} = this.plugin

		containerEl.createEl('h1', {text: 'URL Scheme Settings'})

		containerEl.createEl('h2', {text: "Default Schemes"})

    allDefaultSchemeTypes.forEach((schemeType : URLSchemeType, i : number)=>{
      const {name, description, format, parameters} = schemeType
      const setting = new Setting(containerEl)
        .setName(name)
        .setDesc(description)
        setting.descEl.innerHTML += `<div style="margin-left:8px;">${format}</div>`

        setting.addToggle((toggle : ToggleComponent)=>{
          toggle.setValue(settings.schemesEnabled[name])
          .onChange(async (value:boolean)=>{
            settings.schemesEnabled[name] = value
            await saveSettings(this.plugin)
          })
        })
    })
  }
}
