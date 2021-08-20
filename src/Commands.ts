import type { App, Editor, Plugin, View } from 'obsidian';
import type ObsidianURLSchemeHelperPlugin from './main'
import { saveSettings } from './MyPluginSettings'

class CommandsHelper {
  private readonly plugin: ObsidianURLSchemeHelperPlugin

  constructor(plugin: ObsidianURLSchemeHelperPlugin) {
    this.plugin = plugin
  }
//,cb:()=>void;
  public addCommand({id,name,cb} : {id:string,name:string,cb:()=>void}) {
    this.plugin.addCommand({
			id: id,
			name: name,
			checkCallback: (checking: boolean) => {
				let leaf = this.plugin.app.workspace.activeLeaf
				if (leaf) {
					if (!checking) {
						cb()
					}
					return true
				}
				return false
			}
		})
  }
}

export default class Commands {
  private readonly plugin: ObsidianURLSchemeHelperPlugin;
  private readonly commandsHelper: CommandsHelper;

  constructor(plugin : ObsidianURLSchemeHelperPlugin) {
    this.plugin = plugin
    this.commandsHelper = new CommandsHelper(plugin)
    this.load_insertURL()
  }

  private load_insertURL() {
    const {plugin, commandsHelper} = this
    commandsHelper.addCommand({
      id: 'Obsidian URL Scheme Helper Plugin: Insert URL',
			name: 'Insert URL',
      cb: ()=>{
        //plugin.consoleHelper.toggle(!this.plugin.settings.consoleOn)
        //plugin.settings.consoleOn = !this.plugin.settings.consoleOn
        saveSettings(this.plugin)
      }
    })
  }
}
